'use client'
import { motion } from 'motion/react'

export type OptionStatus =
  | 'default'
  | 'selected-correct'
  | 'selected-incorrect'
  | 'revealed-correct'
  | 'disabled'

const LABELS = ['A', 'B', 'C', 'D']

interface AnswerOptionProps {
  index: number
  text: string
  status: OptionStatus
  onClick: () => void
  disabled: boolean
}

export function AnswerOption({ index, text, status, onClick, disabled }: AnswerOptionProps) {
  const baseClass =
    'relative flex items-start gap-3 p-4 rounded-xl text-left w-full min-h-[52px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 border'

  const stateClass: Record<OptionStatus, string> = {
    default:
      'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50 focus:ring-blue-700 shadow-lg',
    'selected-correct':
      'bg-green-50 border-green-500 text-green-900 focus:ring-green-600 shadow-lg',
    'selected-incorrect':
      'bg-red-50 border-red-500 text-red-900 focus:ring-red-600 shadow-lg',
    'revealed-correct':
      'bg-green-50 border-green-400 text-green-900 focus:ring-green-600 shadow-lg',
    disabled:
      'bg-white border-slate-100 text-slate-400 cursor-not-allowed shadow-lg',
  }

  const labelClass: Record<OptionStatus, string> = {
    default: 'bg-slate-100 text-slate-600',
    'selected-correct': 'bg-green-200 text-green-800',
    'selected-incorrect': 'bg-red-200 text-red-800',
    'revealed-correct': 'bg-green-200 text-green-800',
    disabled: 'bg-slate-50 text-slate-300',
  }

  return (
    <motion.button
      className={`${baseClass} ${stateClass[status]}`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      whileHover={!disabled && status === 'default' ? { y: -1 } : {}}
      whileTap={!disabled && status === 'default' ? { scale: 0.99 } : {}}
      aria-label={`Option ${LABELS[index]}: ${text}`}
    >
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold shrink-0 mt-0.5 ${labelClass[status]}`}
        aria-hidden="true"
      >
        {LABELS[index]}
      </span>
      <span className="flex-1 leading-snug text-sm">{text}</span>
      {status === 'selected-correct' && (
        <span className="text-green-600 text-base shrink-0 font-bold" aria-hidden="true">
          ✓
        </span>
      )}
      {status === 'selected-incorrect' && (
        <span className="text-red-600 text-base shrink-0 font-bold" aria-hidden="true">
          ✗
        </span>
      )}
      {status === 'revealed-correct' && (
        <span className="text-green-600 text-base shrink-0 font-bold" aria-hidden="true">
          ✓
        </span>
      )}
    </motion.button>
  )
}
