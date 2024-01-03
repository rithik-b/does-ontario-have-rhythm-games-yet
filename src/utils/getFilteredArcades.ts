"use server"

import type { Arcade, Machine, ZivResponse } from "@seethe/types/ZivResponse"
import { cache } from "react"
import getSupabaseClient from "@seethe/utils/getSupabaseClient"
import webpush, { WebPushError } from "web-push"
import { env } from "@seethe/env"

const danceGames = [
  "dancemania",
  "stepmania",
  "dancedancerevolution",
  "dance dance revolution",
  "in the groove",
  "pump it up",
]

const machineFilter = (machine: Machine) =>
  machine.game.genre === "Music Game" &&
  !danceGames.some((game) => machine.game.name.toLowerCase().includes(game))

const supabase = getSupabaseClient()

webpush.setVapidDetails(
  env.VAPID_CONTACT,
  env.NEXT_PUBLIC_PUSH_PUBLIC_KEY,
  env.PUSH_PRIVATE_KEY,
)

const mapToCache = (arcade: Arcade) => ({
  id: arcade.id,
  lastUpdateTime: arcade.lastUpdateTime,
  machines: arcade.machines.map((machine) => ({
    id: machine.id,
    game: {
      id: machine.game.id,
    },
  })),
})

const checkForUpdates = async (arcades: Arcade[]) => {
  let hasUpdates = false

  for (const arcade of arcades) {
    const { data: cachedArcade, error } = await supabase
      .from("arcades")
      .select("*")
      .eq("id", arcade.id)
      .maybeSingle()

    if (error) {
      console.error(error)
      continue
    }

    // if is new arcade
    if (!cachedArcade) {
      hasUpdates = true
      await supabase.from("arcades").insert(mapToCache(arcade))
      continue
    }

    if (cachedArcade.lastUpdateTime !== arcade.lastUpdateTime) {
      for (const machine of arcade.machines) {
        if (
          !cachedArcade.machines.some(
            (oldMachine) => oldMachine.id === machine.id,
          )
        )
          hasUpdates = true
        await supabase
          .from("arcades")
          .update(mapToCache(arcade))
          .eq("id", arcade.id)
      }
    }
  }

  return hasUpdates
}

const notifySubscribers = async () => {
  const { data, error } = await supabase.from("push_subscriptions").select("*")

  if (error) console.error(error)
  if (!data || error) return

  for (const subscription of data) {
    const payload = JSON.stringify({
      title: "Ontario Arcade Updates",
      body: "There have been updates to the arcades in Ontario!",
    })
    try {
      await webpush.sendNotification(subscription, payload)
    } catch (error) {
      if (error instanceof WebPushError && error.statusCode === 410) {
        await supabase
          .from("push_subscriptions")
          .delete()
          .eq("endpoint", subscription.endpoint)
      }
    }
  }
}

const getFilteredArcades = cache(async () => {
  const zivResponse = await fetch(
    "https://zenius-i-vanisher.com/api/arcades.php?action=query&country=Canada&skip_pictures=true&skip_visitors=true&skip_comments=true",
    {},
  ).then((res) => res.json() as Promise<ZivResponse>)
  const arcades = zivResponse.arcades.filter(
    (arcade) =>
      arcade.subregion === "Ontario" && arcade.machines.some(machineFilter),
  )
  for (const arcade of arcades) {
    arcade.machines = arcade.machines.filter(machineFilter)
  }

  if (await checkForUpdates(arcades)) await notifySubscribers()

  return {
    arcades: arcades.sort((a, b) =>
      a.postalCode.toLowerCase().localeCompare(b.postalCode.toLowerCase()),
    ),
    updatedAt: Date.now(),
  }
})

export default getFilteredArcades
