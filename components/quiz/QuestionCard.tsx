'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AnswerOption, type OptionStatus } from './AnswerOption'
import { LinearTimer } from './LinearTimer'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useGameStore } from '@/store/gameStore'
import type { Question } from '@/data/phase1-questions'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  total: number
  onNext: () => void
}

const SECTION_LABELS: Record<string, string> = {
  A: 'Section A — Pre-Omnibus Law',
  B: 'Section B — Post-Omnibus Law',
}

export function QuestionCard({ question, questionNumber, total, onNext }: QuestionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const { selectAnswer } = useGameStore()

  const handleSelect = useCallback(
    (optionId: string, correct: boolean) => {
      if (selectedId) return
      setSelectedId(optionId)
      selectAnswer(question.id, optionId, correct)
      setTimeout(() => setRevealed(true), 700)
    },
    [selectedId, question.id, selectAnswer],
  )

  const handleExpire = useCallback(() => {
    if (selectedId) return
    setSelectedId('__expired__')
    selectAnswer(question.id, '__expired__', false)
    setTimeout(() => setRevealed(true), 500)
  }, [selectedId, question.id, selectAnswer])

  const getStatus = (opt: { id: string; correct: boolean }): OptionStatus => {
    if (!selectedId) return 'default'
    if (opt.id === selectedId) return opt.correct ? 'selected-correct' : 'selected-incorrect'
    if (revealed && opt.correct) return 'revealed-correct'
    return 'disabled'
  }

  const isCorrect = selectedId
    ? question.options.find((o) => o.id === selectedId)?.correct ?? false
    : false

  return (
    <motion.div
      className="flex flex-col gap-5 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between text-xs text-blue-300/70 font-medium uppercase tracking-wider">
        <span>{SECTION_LABELS[question.section]}</span>
        <span>
          {questionNumber} / {total}
        </span>
      </div>

      <ProgressBar current={questionNumber} total={total} />

      {/* Timer */}
      <LinearTimer
        key={question.id}
        timeLimit={question.timeLimit}
        paused={!!selectedId}
        onExpire={handleExpire}
      />

      {/* Question */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6">
        <h2 className="text-white text-lg sm:text-xl font-semibold leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Answer grid */}
      <div
        className={`grid gap-3 ${
          question.options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {question.options.map((opt, i) => (
          <AnswerOption
            key={opt.id}
            index={i}
            text={opt.text}
            status={getStatus(opt)}
            onClick={() => handleSelect(opt.id, opt.correct)}
            disabled={!!selectedId}
          />
        ))}
      </div>

      {/* Feedback panel */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className={`rounded-2xl border p-5 ${
              isCorrect
                ? 'bg-emerald-900/30 border-emerald-500/40'
                : 'bg-slate-800/60 border-white/10'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl" aria-hidden="true">
                {isCorrect ? '✓' : '✗'}
              </span>
              <span
                className={`font-bold text-sm uppercase tracking-wide ${
                  isCorrect ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {isCorrect ? 'Correct' : selectedId === '__expired__' ? 'Time expired' : 'Incorrect'}
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-3">
              {question.explanation}
            </p>
            <p className="text-blue-300/50 text-xs font-mono border-t border-white/10 pt-3">
              {question.legalBasis}
            </p>
            <button
              onClick={onNext}
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              autoFocus
            >
              Next &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
