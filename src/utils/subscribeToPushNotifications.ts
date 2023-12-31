"use server"

import getSupabaseClient from "@seethe/utils/getSupabaseClient"

const supabase = getSupabaseClient()

const subscribeToPushNotifications = async (
  subscription: PushSubscriptionJSON,
) => {
  delete subscription.expirationTime
  await supabase
    .from("push_subscriptions")
    .insert({ endpoint: subscription.endpoint!, keys: subscription.keys! })
}

export default subscribeToPushNotifications
