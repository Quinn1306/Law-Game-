'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { useGameStore } from '@/store/gameStore'
import questions from '@/data/phase1-questions'
import scenario from '@/data/phase2-scenario'

const GRADE_CONFIG = [
  { min: 11, label: 'Expert', color: 'text-emerald-400', bg: 'bg-emerald-900/20 border-emerald-500/30' },
  { min: 9, label: 'Proficient', color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-500/30' },
  { min: 7, label: 'Developing', color: 'text-amber-400', bg: 'bg-amber-900/15 border-amber-500/20' },
  { min: 0, label: 'Foundational', color: 'text-white/60', bg: 'bg-white/5 border-white/10' },
]

export default function ResultsPage() {
  const router = useRouter()
  const { score, answers, scenarioPaths, reset } = useGameStore()

  const grade = GRADE_CONFIG.find((g) => score >= g.min) ?? GRADE_CONFIG[3]

  const wrongAnswers = questions.filter((q) => {
    const selected = answers[q.id]
    if (!selected || selected === '__expired__') return true
    return !q.options.find((o) => o.id === selected)?.correct
  })

  const handleRestart = () => {
    reset()
    router.push('/')
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              ERA
            </div>
            <span className="text-blue-300/60 text-xs font-semibold uppercase tracking-wider">
              Training Complete
            </span>
          </div>
        </header>

        <div className="flex-1 flex items-start justify-center p-4 sm:p-6">
          <div className="max-w-2xl w-full space-y-6 py-4">
            {/* Score hero */}
            <motion.div
              className={`rounded-2xl border p-6 text-center ${grade.bg}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-white/40 text-xs uppercase tracking-widest mb-2">Phase 1 Score</div>
              <div className="text-6xl font-bold text-white mb-1">
                {score}
                <span className="text-white/30 text-4xl"> / 12</span>
              </div>
              <div className={`text-lg font-bold ${grade.color}`}>{grade.label}</div>
              <div className="text-white/40 text-sm mt-1">
                {Math.round((score / 12) * 100)}% correct · {wrongAnswers.length} to review
              </div>
            </motion.div>

            {/* Scenario paths */}
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-white font-bold mb-4">Phase 2 — Decision Paths Taken</h2>
              <div className="space-y-3">
                {scenario.map((sl) => {
                  const path = scenarioPaths[sl.id] ?? []
                  return (
                    <div key={sl.id} className="text-sm">
                      <div className="text-blue-300/60 text-xs uppercase tracking-wider mb-1">
                        {sl.title}
                      </div>
                      {path.length > 0 ? (
                        <div className="text-white/50 text-xs font-mono leading-relaxed break-all">
                          {path.join(' → ')}
                        </div>
                      ) : (
                        <div className="text-white/25 text-xs italic">Not completed</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Review wrong answers */}
            {wrongAnswers.length > 0 && (
              <motion.div
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="text-white font-bold mb-4">
                  Questions to Review ({wrongAnswers.length})
                </h2>
                <div className="space-y-4">
                  {wrongAnswers.map((q) => {
                    const correct = q.options.find((o) => o.correct)
                    return (
                      <div key={q.id} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">
                          {q.sectionTitle}
                        </div>
                        <p className="text-white/80 text-sm mb-2">{q.question}</p>
                        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-300 text-xs leading-relaxed mb-1">
                          <span className="font-semibold">Correct: </span>{correct?.text}
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed">{q.explanation}</p>
                        <p className="text-blue-300/30 text-xs font-mono mt-1">{q.legalBasis}</p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Key takeaways */}
            <motion.div
              className="bg-amber-900/10 border border-amber-500/15 rounded-2xl p-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-amber-400 font-bold mb-3">Three Structural Tensions — Summary</h2>
              <div className="space-y-3 text-sm">
                {scenario.map((sl) => (
                  <div key={sl.id}>
                    <div className="text-white/70 font-semibold">{sl.title.replace('Sub-Level ', 'Tension ').replace(/\d: /, '')}</div>
                    <p className="text-white/45 text-xs leading-relaxed mt-0.5">{sl.tension}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <button
                onClick={handleRestart}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors"
              >
                Start Again
              </button>
              <button
                onClick={() => router.push('/phase1')}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-colors"
              >
                Retake Phase 1
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
