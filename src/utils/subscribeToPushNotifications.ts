"use server"

import getSupabaseClient from "@seethe/utils/getSupabaseClient"
import { PushSubscription } from "web-push"

const supabase = getSupabaseClient()

const subscribeToPushNotifications = async (
  subscription: PushSubscriptionJSON,
) => {
  delete subscription.expirationTime
  await supabase
    .from("push_subscriptions")
    .insert(subscription as PushSubscription)
}

export default subscribeToPushNotifications
