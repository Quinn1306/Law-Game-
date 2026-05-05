'use client'
import { useEffect, useState, useRef } from 'react'

interface LinearTimerProps {
  timeLimit: number
  paused: boolean
  onExpire: () => void
}

function barColor(fraction: number): string {
  if (fraction > 0.33) return 'from-blue-400 to-cyan-400'
  if (fraction > 0.15) return 'from-amber-400 to-orange-400'
  return 'from-red-500 to-rose-400'
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
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor(fraction)} rounded-full transition-all duration-1000 linear`}
          style={{ width: `${fraction * 100}%` }}
        />
      </div>
      <span
        className="text-white/60 text-xs font-mono w-6 text-right tabular-nums"
        role="timer"
        aria-live="off"
        aria-label={`${timeLeft} seconds remaining`}
      >
        {timeLeft}
      </span>
    </div>
  )
}
