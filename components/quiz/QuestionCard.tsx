'use client'
import { useState, useCallback, useMemo } from 'react'
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

  const shuffledOptions = useMemo(() => {
    const arr = [...question.options]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [question.id])

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
      className="flex flex-col gap-4 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-700">
          {SECTION_LABELS[question.section]}
        </span>
        <span className="text-xs text-slate-400 font-medium">
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
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h2 className="text-slate-900 text-base sm:text-lg font-semibold leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Answer grid */}
      <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2">
        {shuffledOptions.map((opt, i) => (
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
            className={`rounded-2xl border p-5 shadow-sm ${
              isCorrect
                ? 'bg-green-50 border-green-300'
                : 'bg-white border-slate-200'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-sm font-bold uppercase tracking-wide ${
                  isCorrect ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {isCorrect ? 'Correct' : selectedId === '__expired__' ? 'Time expired' : 'Incorrect'}
              </span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              {question.explanation}
            </p>
            <p className="text-slate-400 text-xs font-mono border-t border-slate-200 pt-3 leading-relaxed">
              {question.legalBasis}
            </p>
            <button
              onClick={onNext}
              className="mt-4 px-6 py-2.5 min-h-[44px] bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
              autoFocus
            >
              Next
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
