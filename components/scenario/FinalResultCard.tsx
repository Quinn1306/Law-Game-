'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { FinalResult, DecisionNodeData, OutcomeQuality } from '@/data/phase2-scenario'

function formatPath(optionIds: string[]): string {
  return optionIds.map((id) => id.split('-').pop() ?? id).join(' > ')
}

const QUALITY_CONFIG: Record<
  OutcomeQuality,
  { border: string; bg: string; badgeBg: string; badgeText: string }
> = {
  best: {
    border: 'border-green-300',
    bg: 'bg-green-50',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
  },
  partial: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
  },
  problematic: {
    border: 'border-orange-300',
    bg: 'bg-orange-50',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800',
  },
  incorrect: {
    border: 'border-red-300',
    bg: 'bg-red-50',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
  },
  correction: {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
  },
}

interface FinalResultCardProps {
  result: FinalResult
  path: string[]
  onNext: () => void
  isLast: boolean
  allOutcomes: DecisionNodeData[]
  chosenOutcomeId: string
  tension?: string
  outcomePaths?: Record<string, string[]>
  onBack?: () => void
}

export function FinalResultCard({
  result,
  path,
  onNext,
  isLast,
  allOutcomes,
  chosenOutcomeId,
  tension,
  outcomePaths,
  onBack,
}: FinalResultCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(chosenOutcomeId)

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="text-center border-b border-slate-100 pb-5">
        <div className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
          Final Result
        </div>
        <div className="text-slate-900 font-bold text-lg">EuroMed AG — Legal Position</div>
        <div className="text-slate-400 text-xs mt-1">
          All pathways converge here — this is the actual legal position
        </div>
      </div>

      {tension && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
          <h3 className="text-amber-800 font-semibold text-xs uppercase tracking-wider mb-1.5">
            Legal Tension
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">{tension}</p>
        </div>
      )}

      <div className="space-y-3 text-sm">
        <section className="bg-green-50 border border-green-300 rounded-xl p-4">
          <h3 className="text-green-800 font-semibold text-xs uppercase tracking-wider mb-1.5">
            Required under EU Law
          </h3>
          <p className="text-slate-700 leading-relaxed">{result.required}</p>
        </section>

        <section className="bg-red-50 border border-red-300 rounded-xl p-4">
          <h3 className="text-red-800 font-semibold text-xs uppercase tracking-wider mb-1.5">
            No EU Legal Obligation
          </h3>
          <p className="text-slate-700 leading-relaxed">{result.notRequired}</p>
        </section>

        <section className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h3 className="text-slate-600 font-semibold text-xs uppercase tracking-wider mb-1.5">
            The Structural Tension
          </h3>
          <p className="text-slate-700 leading-relaxed">{result.structuralTension}</p>
        </section>
      </div>

      {/* All outcomes review */}
      {allOutcomes.length > 0 && (
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
            All Possible Outcomes
          </h3>
          {allOutcomes.map((outcome) => {
            const cfg = QUALITY_CONFIG[outcome.quality ?? 'partial']
            const isChosen = outcome.id === chosenOutcomeId
            const isExpanded = expandedId === outcome.id

            return (
              <div
                key={outcome.id}
                className={`rounded-xl border overflow-hidden ${cfg.border} ${isChosen ? cfg.bg : 'bg-white'}`}
              >
                <button
                  className="w-full px-4 py-3 text-left flex items-center gap-2.5 hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : outcome.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${cfg.badgeBg} ${cfg.badgeText}`}
                    >
                      {outcome.qualityLabel}
                    </span>
                    {outcomePaths?.[outcome.id] && (
                      <span className="text-slate-400 text-xs mt-1 font-mono">
                        Path: {formatPath(outcomePaths[outcome.id])}
                      </span>
                    )}
                  </div>
                  {isChosen && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
                      Your path
                    </span>
                  )}
                  <span className="text-slate-400 text-xs shrink-0">{isExpanded ? '▲' : '▼'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 text-sm border-t border-slate-100 pt-3">
                        <div>
                          <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                            Legal Position
                          </h4>
                          <p className="text-slate-700 leading-relaxed">{outcome.legalPosition}</p>
                        </div>
                        <div>
                          <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                            Why This Matters
                          </h4>
                          <p className="text-slate-600 leading-relaxed">{outcome.whyItMatters}</p>
                        </div>
                        {outcome.legalBasis && (
                          <p className="text-slate-400 text-xs font-mono border-t border-slate-100 pt-2 leading-relaxed">
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

      <div className="text-slate-400 text-xs border-t border-slate-100 pt-3 font-mono">
        Path taken: {path.join(' > ')}
      </div>

      <div className="flex gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 min-h-[44px] py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl font-semibold text-sm transition-colors border border-slate-300"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          className={`min-h-[44px] py-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 shadow-sm ${onBack ? 'flex-[2]' : 'w-full'}`}
          autoFocus
        >
          {isLast ? 'View Final Results' : 'Next Sub-Level'}
        </button>
      </div>
    </motion.div>
  )
}
