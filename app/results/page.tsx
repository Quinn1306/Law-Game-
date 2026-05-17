'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { useGameStore } from '@/store/gameStore'
import questions from '@/data/phase1-questions'
import scenario from '@/data/phase2-scenario'

const GRADE_CONFIG = [
  { min: 11, label: 'Expert', color: 'text-green-700', bg: 'bg-green-50 border-green-300' },
  { min: 9, label: 'Proficient', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-300' },
  { min: 7, label: 'Developing', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-300' },
  { min: 0, label: 'Foundational', color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
]

export default function ResultsPage() {
  const router = useRouter()
  const { score, answers, scenarioPaths, reset, userName } = useGameStore()

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
    <main className="min-h-screen min-h-dvh flex flex-col bg-transparent">
      <header className="bg-white border-b border-slate-100 shadow-md px-5 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-blue-700 text-white font-bold text-xs tracking-tight">
            ERA
          </div>
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            Training Complete
          </span>
        </div>
        {userName && <span className="text-slate-400 text-xs hidden sm:block">{userName}</span>}
      </header>

      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-5 py-4">
          {/* Score hero */}
          <motion.div
            className={`rounded-2xl border p-6 text-center shadow-sm ${grade.bg}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            {userName && (
              <div className="text-slate-500 text-sm mb-2">
                Well done, <span className="font-semibold text-slate-700">{userName}</span>
              </div>
            )}
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Phase 1 Score
            </div>
            <div className="text-6xl font-bold text-slate-900 mb-1">
              {score}
              <span className="text-slate-300 text-4xl"> / 12</span>
            </div>
            <div className={`text-lg font-bold ${grade.color}`}>{grade.label}</div>
            <div className="text-slate-500 text-sm mt-1">
              {Math.round((score / 12) * 100)}% correct &middot; {wrongAnswers.length} to review
            </div>
          </motion.div>

          {/* Decision paths */}
          <motion.div
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <h2 className="text-slate-900 font-bold text-base mb-4">Phase 2: Decision Paths</h2>
            <div className="space-y-3">
              {scenario.map((sl) => {
                const path = scenarioPaths[sl.id] ?? []
                return (
                  <div key={sl.id} className="text-sm">
                    <div className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-1">
                      {sl.title}
                    </div>
                    {path.length > 0 ? (
                      <div className="text-slate-500 text-xs font-mono leading-relaxed break-all">
                        {path.join(' > ')}
                      </div>
                    ) : (
                      <div className="text-slate-400 text-xs italic">Not completed</div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Review wrong answers */}
          {wrongAnswers.length > 0 && (
            <motion.div
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
            >
              <h2 className="text-slate-900 font-bold text-base mb-4">
                Questions to Review ({wrongAnswers.length})
              </h2>
              <div className="space-y-4">
                {wrongAnswers.map((q) => {
                  const correct = q.options.find((o) => o.correct)
                  return (
                    <div
                      key={q.id}
                      className="border-t border-slate-100 pt-4 first:border-0 first:pt-0"
                    >
                      <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        {q.sectionTitle}
                      </div>
                      <p className="text-slate-700 text-sm mb-2">{q.question}</p>
                      <div className="bg-green-50 border border-green-300 rounded-lg px-3 py-2 text-green-800 text-xs leading-relaxed mb-1">
                        <span className="font-semibold">Correct answer: </span>
                        {correct?.text}
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{q.explanation}</p>
                      <p className="text-slate-400 text-xs font-mono mt-1">{q.legalBasis}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Tensions summary */}
          <motion.div
            className="bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-amber-800 font-bold text-base mb-3">
              Three Structural Tensions: Summary
            </h2>
            <div className="space-y-3 text-sm">
              {scenario.map((sl) => (
                <div key={sl.id}>
                  <div className="text-slate-800 font-semibold">
                    {sl.title.replace('Sub-Level ', 'Tension ').replace(/\d: /, '')}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed mt-0.5">{sl.tension}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
          >
            <button
              onClick={handleRestart}
              className="flex-1 min-h-[44px] py-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 shadow-sm"
            >
              Start Again
            </button>
            <button
              onClick={() => router.push('/phase1')}
              className="flex-1 min-h-[44px] py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Retake Phase 1
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
