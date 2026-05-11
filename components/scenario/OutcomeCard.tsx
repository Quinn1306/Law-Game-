'use client'
import { motion } from 'motion/react'
import type { DecisionNodeData, OutcomeQuality } from '@/data/phase2-scenario'

const QUALITY_CONFIG: Record<
  OutcomeQuality,
  { border: string; bg: string; badge: string; icon: string }
> = {
  best: {
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-900/20',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    icon: '✓',
  },
  partial: {
    border: 'border-amber-500/50',
    bg: 'bg-amber-900/15',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    icon: '~',
  },
  problematic: {
    border: 'border-orange-500/50',
    bg: 'bg-orange-900/15',
    badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    icon: '!',
  },
  incorrect: {
    border: 'border-rose-500/50',
    bg: 'bg-rose-900/20',
    badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    icon: '✗',
  },
  correction: {
    border: 'border-blue-400/50',
    bg: 'bg-blue-900/20',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    icon: '↩',
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
      className={`rounded-2xl border-2 p-5 ${cfg.border} ${cfg.bg}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{cfg.icon}</span>
        <div>
          <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{node.label}</div>
          <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
            {node.qualityLabel}
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <section>
          <h3 className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Legal Position</h3>
          <p className="text-white/85 leading-relaxed">{node.legalPosition}</p>
        </section>
        <section>
          <h3 className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Why This Matters</h3>
          <p className="text-white/75 leading-relaxed">{node.whyItMatters}</p>
        </section>
        {node.legalBasis && (
          <div className="text-blue-300/40 text-xs font-mono border-t border-white/10 pt-3 leading-relaxed">
            {node.legalBasis}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={onBack}
            className="px-4 py-3 text-blue-400/70 hover:text-blue-300 border border-blue-700/30 hover:border-blue-500/50 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onContinue}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          autoFocus
        >
          Continue to Final Result &rarr;
        </button>
      </div>
    </motion.div>
  )
}
