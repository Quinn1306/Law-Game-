'use client'
import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const w = canvas.width
    const h = canvas.height

    // Dark navy base
    ctx.fillStyle = '#040d1c'
    ctx.fillRect(0, 0, w, h)

    // Nebula cloud layers
    const clouds = [
      { x: 0.50, y: 1.05, r: 0.70, rgb: [20, 110, 210] as [number,number,number], a: 0.55 },
      { x: 0.35, y: 0.75, r: 0.50, rgb: [15,  80, 185] as [number,number,number], a: 0.30 },
      { x: 0.65, y: 0.55, r: 0.42, rgb: [10,  60, 160] as [number,number,number], a: 0.22 },
      { x: 0.20, y: 0.35, r: 0.38, rgb: [12,  55, 145] as [number,number,number], a: 0.18 },
      { x: 0.80, y: 0.30, r: 0.33, rgb: [18,  75, 170] as [number,number,number], a: 0.16 },
      { x: 0.50, y: 0.45, r: 0.55, rgb: [15,  85, 190] as [number,number,number], a: 0.12 },
      { x: 0.10, y: 0.60, r: 0.30, rgb: [10,  50, 140] as [number,number,number], a: 0.14 },
    ]

    for (const c of clouds) {
      const cx = c.x * w
      const cy = c.y * h
      const r  = c.r * Math.min(w, h)
      const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0,   `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},${c.a})`)
      g.addColorStop(0.45,`rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},${(c.a * 0.3).toFixed(3)})`)
      g.addColorStop(1,   `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    // Stars using a deterministic LCG so they look the same every render
    let seed = 31415
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff
      return seed / 0x7fffffff
    }

    const starCount = Math.round((w * h) / 22000)
    for (let i = 0; i < starCount; i++) {
      const x    = rng() * w
      // bias toward upper 75% of screen where stars show best
      const y    = rng() < 0.78 ? rng() * h * 0.78 : rng() * h
      const r    = rng() * 1.1 + 0.25
      const a    = rng() * 0.55 + 0.30
      const cyan = rng() > 0.6

      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = cyan
        ? `rgba(160, 220, 255, ${a})`
        : `rgba(200, 225, 255, ${a})`
      ctx.fill()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  )
}
