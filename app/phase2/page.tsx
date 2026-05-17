'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ScenarioEngine } from '@/components/scenario/ScenarioEngine'
import { useGameStore } from '@/store/gameStore'
import scenario from '@/data/phase2-scenario'

export default function Phase2Page() {
  const router = useRouter()
  const { score, userName } = useGameStore()
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
      <main className="min-h-screen min-h-dvh flex flex-col bg-transparent">
        <header className="bg-white border-b border-slate-100 shadow-md px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-blue-700 text-white font-bold text-xs tracking-tight">
              ERA
            </div>
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Phase 2: Scenario Module
            </span>
          </div>
          {userName && <span className="text-slate-400 text-xs hidden sm:block">{userName}</span>}
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            className="max-w-lg w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Phase 1 result */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-6 shadow-xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Phase 1 Result
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-1">
                {score}
                <span className="text-slate-300 text-3xl"> / 12</span>
              </div>
              <div className="text-blue-700 text-sm font-medium">
                {score >= 10
                  ? 'Excellent: strong foundation for Phase 2'
                  : score >= 7
                  ? 'Good: some gaps to revisit after Phase 2'
                  : 'Phase 2 will clarify the core legal structure'}
              </div>
            </div>

            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-4">
              Phase 2
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Scenario Module</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Apply post-Omnibus law to EuroMed AG, a German manufacturer with 1,200 employees and EUR 500m turnover. Three sub-levels. Three structural tensions. No time pressure.
            </p>

            <div className="space-y-2 mb-8">
              {scenario.map((sl, i) => (
                <div
                  key={sl.id}
                  className="bg-white border border-slate-100 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
                >
                  <span className="text-xs font-bold text-blue-700 w-5 shrink-0">{i + 1}</span>
                  <div>
                    <div className="text-slate-800 text-sm font-semibold">{sl.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 shadow-sm"
            >
              Begin Sub-Level 1
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen min-h-dvh flex flex-col bg-transparent">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-md px-5 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-blue-700 text-white font-bold text-xs tracking-tight">
            ERA
          </div>
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            Phase 2: Scenario Module
          </span>
        </div>
        <div className="flex items-center gap-2">
          {scenario.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentIndex
                  ? 'bg-green-500'
                  : i === currentIndex
                  ? 'bg-blue-700'
                  : 'bg-slate-200'
              }`}
              aria-hidden="true"
            />
          ))}
          {userName && (
            <span className="text-slate-400 text-xs hidden sm:block ml-2">{userName}</span>
          )}
        </div>
      </header>

      <div className="flex-1 p-4 sm:p-6">
        <ScenarioEngine
          key={scenario[currentIndex].id}
          sublevel={scenario[currentIndex]}
          sublevelIndex={currentIndex}
          totalSublevels={scenario.length}
          onComplete={handleComplete}
        />
      </div>
    </main>
  )
}
