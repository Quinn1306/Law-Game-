'use client'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useGameStore } from '@/store/gameStore'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import questions from '@/data/phase1-questions'

export default function Phase1Page() {
  const router = useRouter()
  const { currentQuestion, nextQuestion, score, userName } = useGameStore()

  const question = questions[currentQuestion]

  const handleNext = () => {
    if (currentQuestion + 1 >= questions.length) {
      router.push('/phase2')
    } else {
      nextQuestion()
    }
  }

  return (
    <main className="min-h-screen min-h-dvh flex flex-col bg-transparent">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-blue-700 text-white font-bold text-xs tracking-tight">
            ERA
          </div>
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            Phase 1: Knowledge Module
          </span>
        </div>
        <div className="flex items-center gap-3">
          {userName && (
            <span className="hidden sm:block text-slate-400 text-xs">{userName}</span>
          )}
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-green-700">{score}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{currentQuestion}</span>
            <span className="text-slate-400 hidden sm:inline">correct</span>
          </div>
        </div>
      </header>

      {/* Section tabs */}
      <div className="bg-white border-b border-slate-200 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-1 py-2">
          {['A', 'B'].map((s) => {
            const sectionStart = s === 'A' ? 0 : 6
            const sectionEnd = s === 'A' ? 5 : 12
            const active = currentQuestion >= sectionStart && currentQuestion <= sectionEnd
            const done = s === 'A' ? currentQuestion > 5 : false
            return (
              <div
                key={s}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-blue-700 text-white'
                    : done
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {done ? 'Completed: ' : ''}Section {s} · {s === 'A' ? 'Pre-Omnibus' : 'Post-Omnibus'}
              </div>
            )
          })}
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion} className="w-full max-w-3xl">
            <QuestionCard
              question={question}
              questionNumber={currentQuestion + 1}
              total={questions.length}
              onNext={handleNext}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
