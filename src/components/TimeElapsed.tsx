"use client"

import { useState, useEffect } from "react"

interface Props {
  epochTime: number
}

const getTimeAsWords = (time: number) => {
  if (time < 1000) return "just now"

  const years = Math.floor(time / 31536000000)
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`

  const months = Math.floor(time / 2592000000)
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`

  const weeks = Math.floor(time / 604800000)
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`

  const days = Math.floor(time / 86400000)
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`

  const hours = Math.floor(time / 3600000)
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`

  const minutes = Math.floor(time / 60000)
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`

  const seconds = Math.floor(time / 1000)
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`
}

const TimeElapsed = ({ epochTime }: Props) => {
  const [currentTime, setCurrentTime] = useState<number | null>(null)

  useEffect(() => {
    setCurrentTime(Date.now())

    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const timeElapsed = () => {
    const elapsed = currentTime! - epochTime
    return getTimeAsWords(elapsed)
  }

  if (!currentTime) return null

  return (
    <span className="text-center text-sm text-slate-500 dark:text-slate-400">
      Last updated {timeElapsed()}
    </span>
  )
}

export default TimeElapsed
