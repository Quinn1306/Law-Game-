'use client'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useGameStore } from '@/store/gameStore'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import questions from '@/data/phase1-questions'

export default function Phase1Page() {
  const router = useRouter()
  const { currentQuestion, nextQuestion, score } = useGameStore()

  const question = questions[currentQuestion]

  const handleNext = () => {
    if (currentQuestion + 1 >= questions.length) {
      router.push('/phase2')
    } else {
      nextQuestion()
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              ERA
            </div>
            <span className="text-blue-300/60 text-xs font-semibold uppercase tracking-wider">
              Phase 1 — Knowledge Module
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <span className="text-emerald-400 font-bold">{score}</span>
            <span>/</span>
            <span>{currentQuestion}</span>
            <span className="text-white/25">correct</span>
          </div>
        </header>

        {/* Section indicator */}
        <div className="flex items-center justify-center gap-2 py-3 px-4">
          {['A', 'B'].map((s) => {
            const sectionStart = s === 'A' ? 0 : 6
            const sectionEnd = s === 'A' ? 5 : 11
            const active = currentQuestion >= sectionStart && currentQuestion <= sectionEnd
            const done = s === 'A' ? currentQuestion > 5 : false
            return (
              <div
                key={s}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-blue-600/40 text-blue-200 border border-blue-500/40'
                    : done
                    ? 'bg-emerald-900/30 text-emerald-400/60 border border-emerald-500/20'
                    : 'bg-white/5 text-white/25 border border-white/10'
                }`}
              >
                {done ? '✓ ' : ''}Section {s} · {s === 'A' ? 'Pre-Omnibus' : 'Post-Omnibus'}
              </div>
            )
          })}
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
      </div>
    </main>
  )
}
