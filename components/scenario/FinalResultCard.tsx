'use client'
import { motion } from 'motion/react'
import type { FinalResult } from '@/data/phase2-scenario'

interface FinalResultCardProps {
  result: FinalResult
  path: string[]
  onNext: () => void
  isLast: boolean
}

export function FinalResultCard({ result, path, onNext, isLast }: FinalResultCardProps) {
  return (
    <motion.div
      className="rounded-2xl border-2 border-blue-500/40 bg-blue-950/40 p-6 space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <div className="text-blue-300/60 text-xs uppercase tracking-widest mb-1">
          ≡ Final Result ≡
        </div>
        <div className="text-white font-bold text-lg">EuroMed AG — Legal Position</div>
        <div className="text-white/30 text-xs mt-1">
          All pathways converge here — this is the actual legal position
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <section className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4">
          <h3 className="text-emerald-400 font-semibold uppercase text-xs mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">✓</span> Required under EU Law
          </h3>
          <p className="text-white/80 leading-relaxed">{result.required}</p>
        </section>

        <section className="bg-rose-900/20 border border-rose-500/20 rounded-xl p-4">
          <h3 className="text-rose-400 font-semibold uppercase text-xs mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">✗</span> No EU Legal Obligation
          </h3>
          <p className="text-white/80 leading-relaxed">{result.notRequired}</p>
        </section>

        <section className="bg-amber-900/15 border border-amber-500/20 rounded-xl p-4">
          <h3 className="text-amber-400 font-semibold uppercase text-xs mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">⚡</span> The Structural Tension
          </h3>
          <p className="text-white/80 leading-relaxed">{result.structuralTension}</p>
        </section>
      </div>

      <div className="text-white/20 text-xs border-t border-white/10 pt-3 leading-relaxed font-mono">
        Path taken: {path.join(' → ')}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
        autoFocus
      >
        {isLast ? 'View Final Results →' : 'Next Sub-Level →'}
      </button>
    </motion.div>
  )
}
