'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { FinalResult, DecisionNodeData, OutcomeQuality } from '@/data/phase2-scenario'

const QUALITY_CONFIG: Record<
  OutcomeQuality,
  { border: string; bg: string; badge: string; icon: string }
> = {
  best: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-900/15',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    icon: '✓',
  },
  partial: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-900/10',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    icon: '~',
  },
  problematic: {
    border: 'border-orange-500/40',
    bg: 'bg-orange-900/10',
    badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    icon: '!',
  },
  incorrect: {
    border: 'border-rose-500/40',
    bg: 'bg-rose-900/15',
    badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    icon: '✗',
  },
  correction: {
    border: 'border-blue-400/40',
    bg: 'bg-blue-900/15',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    icon: '↩',
  },
}

interface FinalResultCardProps {
  result: FinalResult
  path: string[]
  onNext: () => void
  isLast: boolean
  allOutcomes: DecisionNodeData[]
  chosenOutcomeId: string
}

export function FinalResultCard({
  result,
  path,
  onNext,
  isLast,
  allOutcomes,
  chosenOutcomeId,
}: FinalResultCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(chosenOutcomeId)

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

      {/* All outcomes review */}
      {allOutcomes.length > 0 && (
        <div className="border-t border-white/10 pt-4 space-y-2">
          <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">
            All Possible Outcomes — Review
          </h3>
          {allOutcomes.map((outcome) => {
            const cfg = QUALITY_CONFIG[outcome.quality ?? 'partial']
            const isChosen = outcome.id === chosenOutcomeId
            const isExpanded = expandedId === outcome.id

            return (
              <div
                key={outcome.id}
                className={`rounded-xl border ${cfg.border} ${isChosen ? cfg.bg : 'bg-white/3'} overflow-hidden`}
              >
                <button
                  className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : outcome.id)}
                  aria-expanded={isExpanded}
                >
                  <span className="text-sm shrink-0" aria-hidden="true">{cfg.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                    {outcome.qualityLabel}
                  </span>
                  {isChosen && (
                    <span className="text-xs font-bold text-white bg-blue-600/60 border border-blue-400/30 px-2 py-0.5 rounded-full ml-auto shrink-0">
                      Your Path
                    </span>
                  )}
                  {!isChosen && (
                    <span className="text-white/20 text-xs ml-auto shrink-0">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  )}
                  {isChosen && (
                    <span className="text-white/20 text-xs shrink-0 ml-1">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 text-sm border-t border-white/5 pt-3">
                        <div>
                          <h4 className="text-white/40 text-xs uppercase tracking-wider mb-1">Legal Position</h4>
                          <p className="text-white/80 leading-relaxed">{outcome.legalPosition}</p>
                        </div>
                        <div>
                          <h4 className="text-white/40 text-xs uppercase tracking-wider mb-1">Why This Matters</h4>
                          <p className="text-white/70 leading-relaxed">{outcome.whyItMatters}</p>
                        </div>
                        {outcome.legalBasis && (
                          <p className="text-blue-300/40 text-xs font-mono border-t border-white/10 pt-2 leading-relaxed">
                            {outcome.legalBasis}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}

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
