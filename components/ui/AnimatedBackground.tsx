'use client'
import { useEffect, useRef } from 'react'

interface Orb {
  bx: number
  by: number
  r: number
  rgb: [number, number, number]
  a: number
  speed: number
  phase: number
  driftX: number
  driftY: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const orbs: Orb[] = [
      { bx: 0.12, by: 0.18, r: 0.30, rgb: [59,  130, 246], a: 0.10, speed: 0.00030, phase: 0.0, driftX: 0.08, driftY: 0.06 },
      { bx: 0.78, by: 0.12, r: 0.35, rgb: [29,   78, 216], a: 0.08, speed: 0.00022, phase: 2.0, driftX: 0.07, driftY: 0.09 },
      { bx: 0.88, by: 0.72, r: 0.28, rgb: [96,  165, 250], a: 0.09, speed: 0.00038, phase: 4.1, driftX: 0.06, driftY: 0.07 },
      { bx: 0.35, by: 0.88, r: 0.32, rgb: [37,   99, 235], a: 0.07, speed: 0.00028, phase: 1.2, driftX: 0.09, driftY: 0.05 },
      { bx: 0.05, by: 0.62, r: 0.22, rgb: [147, 197, 253], a: 0.08, speed: 0.00042, phase: 3.5, driftX: 0.05, driftY: 0.08 },
      { bx: 0.55, by: 0.45, r: 0.18, rgb: [79,  140, 255], a: 0.05, speed: 0.00018, phase: 5.8, driftX: 0.10, driftY: 0.07 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      for (const orb of orbs) {
        const cx = (orb.bx + Math.sin(t * orb.speed + orb.phase) * orb.driftX) * canvas.width
        const cy = (orb.by + Math.cos(t * orb.speed * 0.73 + orb.phase + 1.1) * orb.driftY) * canvas.height
        const r  = orb.r * Math.min(canvas.width, canvas.height)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0,   `rgba(${orb.rgb[0]}, ${orb.rgb[1]}, ${orb.rgb[2]}, ${orb.a})`)
        grad.addColorStop(0.5, `rgba(${orb.rgb[0]}, ${orb.rgb[1]}, ${orb.rgb[2]}, ${orb.a * 0.4})`)
        grad.addColorStop(1,   `rgba(${orb.rgb[0]}, ${orb.rgb[1]}, ${orb.rgb[2]}, 0)`)

        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
