import type { Machine, ZivResponse } from "@seethe/types/ZivResponse"
import { cache } from "react"

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

  return {
    arcades: arcades.sort((a, b) =>
      a.postalCode.toLowerCase().localeCompare(b.postalCode.toLowerCase()),
    ),
    updatedAt: Date.now(),
  }
})

export default getFilteredArcades
