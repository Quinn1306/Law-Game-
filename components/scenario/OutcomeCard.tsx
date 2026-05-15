'use client'
import { motion } from 'motion/react'
import type { DecisionNodeData, OutcomeQuality } from '@/data/phase2-scenario'

const QUALITY_CONFIG: Record<
  OutcomeQuality,
  { border: string; bg: string; badgeBg: string; badgeText: string; label: string }
> = {
  best: {
    border: 'border-green-300',
    bg: 'bg-green-50',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
    label: 'border-l-green-500',
  },
  partial: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    label: 'border-l-amber-500',
  },
  problematic: {
    border: 'border-orange-300',
    bg: 'bg-orange-50',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800',
    label: 'border-l-orange-500',
  },
  incorrect: {
    border: 'border-red-300',
    bg: 'bg-red-50',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
    label: 'border-l-red-500',
  },
  correction: {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    label: 'border-l-blue-500',
  },
}

interface OutcomeCardProps {
  node: DecisionNodeData
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

export function OutcomeCard({ node, onContinue, onBack, canGoBack }: OutcomeCardProps) {
  const cfg = QUALITY_CONFIG[node.quality ?? 'partial']

  return (
    <motion.div
      className={`rounded-2xl border-2 p-5 shadow-sm ${cfg.border} ${cfg.bg}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div>
          <div className="text-slate-500 text-xs uppercase tracking-widest mb-1.5">{node.label}</div>
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}
          >
            {node.qualityLabel}
          </span>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <section className="bg-white rounded-xl p-4 border border-white/60 shadow-sm">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            Legal Position
          </h3>
          <p className="text-slate-700 leading-relaxed">{node.legalPosition}</p>
        </section>
        <section className="bg-white rounded-xl p-4 border border-white/60 shadow-sm">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            Why This Matters
          </h3>
          <p className="text-slate-600 leading-relaxed">{node.whyItMatters}</p>
        </section>
        {node.legalBasis && (
          <p className="text-slate-400 text-xs font-mono border-t border-slate-200 pt-3 leading-relaxed">
            {node.legalBasis}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={onBack}
            className="min-h-[44px] px-4 py-2.5 text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
          >
            Back
          </button>
        )}
        <button
          onClick={onContinue}
          className="flex-1 min-h-[44px] py-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 shadow-sm"
          autoFocus
        >
          Continue to Final Result
        </button>
      </div>
    </motion.div>
  )
}
