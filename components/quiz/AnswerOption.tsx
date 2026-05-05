'use client'
import { motion } from 'motion/react'

export type OptionStatus =
  | 'default'
  | 'selected-correct'
  | 'selected-incorrect'
  | 'revealed-correct'
  | 'disabled'

const TILE_COLORS: Record<number, string> = {
  0: 'bg-blue-700 hover:bg-blue-600',
  1: 'bg-sky-700 hover:bg-sky-600',
  2: 'bg-indigo-700 hover:bg-indigo-600',
  3: 'bg-cyan-800 hover:bg-cyan-700',
}

const LABELS = ['A', 'B', 'C', 'D']
const SHAPES = ['▲', '◆', '●', '■']

interface AnswerOptionProps {
  index: number
  text: string
  status: OptionStatus
  onClick: () => void
  disabled: boolean
}

export function AnswerOption({ index, text, status, onClick, disabled }: AnswerOptionProps) {
  const base =
    'relative flex items-start gap-3 p-4 rounded-xl text-white font-medium text-left w-full min-h-[64px] transition-all focus:outline-none focus:ring-2 focus:ring-white/60'

  const colorClass: Record<OptionStatus, string> = {
    default: `${TILE_COLORS[index]} active:scale-95`,
    'selected-correct':
      'bg-emerald-600 ring-2 ring-emerald-300 scale-[1.02]',
    'selected-incorrect': 'bg-rose-700/80',
    'revealed-correct': 'bg-emerald-700 ring-1 ring-emerald-400',
    disabled: `${TILE_COLORS[index]} opacity-30 cursor-not-allowed`,
  }

  return (
    <motion.button
      className={`${base} ${colorClass[status]}`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={!disabled && status === 'default' ? { scale: 1.02 } : {}}
      whileTap={!disabled && status === 'default' ? { scale: 0.97 } : {}}
      aria-label={`Option ${LABELS[index]}: ${text}`}
    >
      <span
        className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/15 text-sm font-bold shrink-0 mt-0.5"
        aria-hidden="true"
      >
        {SHAPES[index]}
      </span>
      <span className="flex-1 leading-snug text-sm sm:text-base">{text}</span>
      {status === 'selected-correct' && (
        <span className="text-emerald-200 text-lg shrink-0" aria-hidden="true">✓</span>
      )}
      {status === 'selected-incorrect' && (
        <span className="text-rose-200 text-lg shrink-0" aria-hidden="true">✗</span>
      )}
      {status === 'revealed-correct' && (
        <span className="text-emerald-300 text-lg shrink-0" aria-hidden="true">✓</span>
      )}
    </motion.button>
  )
}
