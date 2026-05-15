'use client'
import { motion } from 'motion/react'
import type { DecisionNodeData } from '@/data/phase2-scenario'

const ROMAN = ['I', 'II', 'III', 'IV']

interface DecisionNodeProps {
  node: DecisionNodeData
  onSelect: (nextNodeId: string) => void
  onBack: () => void
  canGoBack: boolean
  useRomanNumerals?: boolean
}

export function DecisionNode({ node, onSelect, onBack, canGoBack, useRomanNumerals }: DecisionNodeProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
          {node.label}
        </span>
        <p className="text-slate-900 text-base sm:text-lg font-semibold leading-snug">
          {node.question}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {node.options?.map((opt, i) => (
          <motion.button
            key={opt.id}
            className="w-full text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-800 text-sm leading-snug transition-all focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 shadow-sm group"
            onClick={() => onSelect(opt.nextNode)}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.22 }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-blue-700 font-bold mr-2 group-hover:text-blue-800">
              {useRomanNumerals ? ROMAN[i] : String.fromCharCode(65 + i)}.
            </span>
            {opt.text}
          </motion.button>
        ))}
      </div>

      {canGoBack && (
        <button
          onClick={onBack}
          className="self-start text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center gap-1 transition-colors mt-1 min-h-[44px] px-1"
        >
          Back
        </button>
      )}
    </div>
  )
}
