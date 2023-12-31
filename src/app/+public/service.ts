declare let self: ServiceWorkerGlobalScope

// eslint-disable-next-line @typescript-eslint/no-misused-promises
self.addEventListener("push", async (event) => {
  if (!event.data) return
  const eventData = (await event.data.json()) as { title: string; body: string }
  await self.registration.showNotification(eventData.title, {
    body: eventData.body,
  })
})
