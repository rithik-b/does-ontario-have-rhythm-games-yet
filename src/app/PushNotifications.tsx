"use client"

import { Bell } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@seethe/components/ui/dialog"
import { Button } from "@seethe/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { Switch } from "@seethe/components/ui/switch"
import { env } from "@seethe/env"
import subscribeToPushNotifications from "@seethe/utils/subscribeToPushNotifications"

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/service.js")
}

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((r) => r.unregister()))
}

const subscribe = async () => {
  await unregisterServiceWorkers()
  const swRegistration = await registerServiceWorker()
  await window?.Notification.requestPermission()
  const options = {
    applicationServerKey: env.NEXT_PUBLIC_PUSH_PUBLIC_KEY,
    userVisibleOnly: true,
  }
  const subscription = await swRegistration.pushManager.subscribe(options)
  await subscribeToPushNotifications(subscription.toJSON())
}

const PushNotifications = () => {
  const [notificationsSupported, setNotificationsSupported] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [notificationsToggleEnabled, setNotificationsToggleEnabled] =
    useState(true)

  useEffect(() => {
    setNotificationsSupported(
      "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window,
    )
    setNotificationsEnabled(window?.Notification.permission === "granted")
  }, [])

  const toggleNotifications = useCallback(async (toggleState: boolean) => {
    setNotificationsToggleEnabled(false)
    setNotificationsEnabled(toggleState)

    try {
      if (toggleState) {
        await subscribe()
      } else {
        await unregisterServiceWorkers()
      }
    } catch (e) {
      setNotificationsEnabled(!toggleState)
    }

    setNotificationsToggleEnabled(true)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-row gap-5">
          <Bell />
          <span>Notifications Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications Settings</DialogTitle>
        </DialogHeader>
        {notificationsSupported ? (
          <div className="flex flex-col py-5">
            <div className="flex flex-row items-center justify-between">
              <span>Enable Notifications</span>
              <Switch
                checked={notificationsEnabled}
                disabled={!notificationsToggleEnabled}
                onCheckedChange={toggleNotifications}
              />
            </div>
          </div>
        ) : (
          <span>Notifications are not supported :(</span>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PushNotifications
