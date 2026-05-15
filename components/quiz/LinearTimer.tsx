'use client'
import { useEffect, useState, useRef } from 'react'

interface LinearTimerProps {
  timeLimit: number
  paused: boolean
  onExpire: () => void
}

function barColor(fraction: number): string {
  if (fraction > 0.33) return 'bg-blue-600'
  if (fraction > 0.15) return 'bg-amber-500'
  return 'bg-red-600'
}

export function LinearTimer({ timeLimit, paused, onExpire }: LinearTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const expiredRef = useRef(false)

  useEffect(() => {
    setTimeLeft(timeLimit)
    expiredRef.current = false
  }, [timeLimit])

  useEffect(() => {
    if (paused || expiredRef.current) return
    if (timeLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true
        onExpire()
      }
      return
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused, onExpire])

  const fraction = timeLeft / timeLimit

  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor(fraction)} rounded-full transition-all duration-1000 ease-linear`}
          style={{ width: `${fraction * 100}%` }}
        />
      </div>
      <span
        className={`text-xs font-mono w-5 text-right tabular-nums font-semibold ${
          fraction <= 0.15 ? 'text-red-600' : fraction <= 0.33 ? 'text-amber-600' : 'text-slate-500'
        }`}
        role="timer"
        aria-live="off"
        aria-label={`${timeLeft} seconds remaining`}
      >
        {timeLeft}
      </span>
    </div>
  )
}
