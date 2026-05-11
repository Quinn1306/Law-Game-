'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'motion/react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { ScenarioEngine } from '@/components/scenario/ScenarioEngine'
import { useGameStore } from '@/store/gameStore'
import scenario from '@/data/phase2-scenario'

export default function Phase2Page() {
  const router = useRouter()
  const { score } = useGameStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)

  const handleComplete = () => {
    if (currentIndex + 1 >= scenario.length) {
      router.push('/results')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  if (!started) {
    return (
      <main className="relative min-h-screen flex flex-col overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col min-h-screen items-center justify-center px-4 py-12">
          <motion.div
            className="max-w-xl w-full text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Phase 1 summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
              <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Phase 1 Result</div>
              <div className="text-4xl font-bold text-white mb-1">
                {score} <span className="text-white/30 text-2xl">/ 12</span>
              </div>
              <div className="text-blue-300/60 text-sm">
                {score >= 10
                  ? 'Excellent — strong foundation for Phase 2'
                  : score >= 7
                  ? 'Good — some gaps to revisit after Phase 2'
                  : 'Phase 2 will clarify the core legal structure'}
              </div>
            </div>

            <div className="inline-block bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              Phase 2
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Scenario Module
            </h1>
            <p className="text-white/60 leading-relaxed mb-6">
              Apply post-Omnibus law to EuroMed AG — a German manufacturer with 1,200 employees and EUR 500m turnover. Three sub-levels. Three structural tensions. No time pressure. No right or wrong path.
            </p>

            <div className="flex flex-col gap-3 mb-8 text-left">
              {scenario.map((sl, i) => (
                <div
                  key={sl.id}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-blue-400/60 text-sm font-bold w-6 shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <div className="text-white text-sm font-semibold">{sl.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStarted(true)}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/40"
            >
              Begin Sub-Level 1 &rarr;
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              ERA
            </div>
            <span className="text-blue-300/60 text-xs font-semibold uppercase tracking-wider">
              Phase 2 — Scenario Module
            </span>
          </div>
          <div className="flex items-center gap-2">
            {scenario.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < currentIndex
                    ? 'bg-emerald-400'
                    : i === currentIndex
                    ? 'bg-blue-400'
                    : 'bg-white/15'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </header>

        <div className="flex-1 flex items-start justify-center p-4 sm:p-6">
          <ScenarioEngine
            key={scenario[currentIndex].id}
            sublevel={scenario[currentIndex]}
            sublevelIndex={currentIndex}
            totalSublevels={scenario.length}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </main>
  )
}
