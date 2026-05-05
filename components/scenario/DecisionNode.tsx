'use client'
import { motion } from 'motion/react'
import type { DecisionNodeData } from '@/data/phase2-scenario'

interface DecisionNodeProps {
  node: DecisionNodeData
  onSelect: (nextNodeId: string) => void
  onBack: () => void
  canGoBack: boolean
}

export function DecisionNode({ node, onSelect, onBack, canGoBack }: DecisionNodeProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <span className="text-blue-300/60 text-xs uppercase tracking-widest font-semibold block mb-2">
          {node.label}
        </span>
        <p className="text-white text-base sm:text-lg font-medium leading-snug">
          {node.question}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {node.options?.map((opt, i) => (
          <motion.button
            key={opt.id}
            className="w-full text-left p-4 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 border border-blue-700/30 hover:border-blue-500/50 text-white text-sm leading-snug transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => onSelect(opt.nextNode)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.25 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-blue-300 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
            {opt.text}
          </motion.button>
        ))}
      </div>

      {canGoBack && (
        <button
          onClick={onBack}
          className="self-start text-blue-400/60 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors mt-1"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
