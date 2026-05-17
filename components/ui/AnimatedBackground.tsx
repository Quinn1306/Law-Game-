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
    const min = Math.min(w, h)

    // Dark navy base
    ctx.fillStyle = '#040d1c'
    ctx.fillRect(0, 0, w, h)

    // Nebula cloud layers — soft radial gradients layered for depth
    const clouds: Array<{ x: number; y: number; r: number; rgb: [number, number, number]; a: number }> = [
      // bright azure glow rising from bottom center
      { x: 0.50, y: 1.08, r: 0.75, rgb: [18, 108, 215], a: 0.58 },
      // mid-canvas diffuse blue haze
      { x: 0.45, y: 0.65, r: 0.60, rgb: [12, 72, 185], a: 0.28 },
      // upper-left darker cloud
      { x: 0.18, y: 0.38, r: 0.42, rgb: [10, 55, 155], a: 0.20 },
      // right-center cloud
      { x: 0.72, y: 0.50, r: 0.40, rgb: [8, 52, 148], a: 0.18 },
      // upper-right faint patch
      { x: 0.82, y: 0.22, r: 0.32, rgb: [14, 68, 168], a: 0.14 },
      // left-edge wisp
      { x: 0.08, y: 0.58, r: 0.28, rgb: [10, 50, 145], a: 0.13 },
    ]

    for (const c of clouds) {
      const cx = c.x * w
      const cy = c.y * h
      const r = c.r * min
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0,    `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},${c.a})`)
      g.addColorStop(0.42, `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},${+(c.a * 0.28).toFixed(3)})`)
      g.addColorStop(1,    `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    // Stars — deterministic LCG so identical every render, no animation
    let seed = 31415
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) & 0x7fffffff
      return seed / 0x7fffffff
    }

    const starCount = Math.round((w * h) / 32000)
    for (let i = 0; i < starCount; i++) {
      const x  = rng() * w
      const y  = rng() < 0.80 ? rng() * h * 0.80 : rng() * h
      const r  = rng() * 1.0 + 0.2
      const a  = rng() * 0.50 + 0.28
      const isCyan = rng() > 0.55
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = isCyan
        ? `rgba(155,215,255,${a})`
        : `rgba(205,225,255,${a})`
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
