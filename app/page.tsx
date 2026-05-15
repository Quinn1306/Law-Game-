'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { useGameStore } from '@/store/gameStore'

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Knowledge Module',
    desc: '13 timed questions on pre- and post-Omnibus I law',
    num: '01',
  },
  {
    phase: 'Phase 2',
    title: 'Scenario Module',
    desc: '3 branching decision scenarios — EuroMed AG',
    num: '02',
  },
]

const TENSIONS = [
  {
    label: 'Transition Plan Gap',
    desc: 'CSRD requires disclosure. CSDDD Art. 22 deleted. Disclose what you have no obligation to implement.',
  },
  {
    label: 'Scope Gap',
    desc: 'CSRD mandates disclosure of supply chain harms. CSDDD due diligence obligations do not apply.',
  },
  {
    label: 'Civil Liability Fragmentation',
    desc: 'Art. 29(1) deleted. Rome II Art. 4(1) directs claims to host-state law across 27 systems.',
  },
]

export default function LandingPage() {
  const router = useRouter()
  const { reset, setUserName, userName } = useGameStore()
  const [step, setStep] = useState<'name' | 'intro'>('name')
  const [inputName, setInputName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (userName) setStep('intro')
  }, [userName])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputName.trim()
    if (!trimmed) {
      setError('Please enter your name to continue.')
      return
    }
    setUserName(trimmed)
    setStep('intro')
  }

  const handleStart = () => {
    reset()
    router.push('/phase1')
  }

  return (
    <main className="min-h-screen min-h-dvh flex flex-col bg-slate-50">
      <AnimatePresence mode="wait">
        {step === 'name' ? (
          <motion.div
            key="name-entry"
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
              <div className="max-w-5xl mx-auto flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-700 text-white font-bold text-xs tracking-tight">
                  ERA
                </div>
                <span className="text-slate-500 text-sm font-medium">European Law Academy</span>
              </div>
            </header>

            {/* Name entry */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
                  <div className="mb-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-4">
                      EU Corporate Sustainability Law
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                      Welcome to the ERA Training Tool
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      An interactive course on CSRD, CSDDD and Omnibus I. Enter your name to begin.
                    </p>
                  </div>

                  <form onSubmit={handleNameSubmit} noValidate>
                    <div className="mb-4">
                      <label
                        htmlFor="participant-name"
                        className="block text-sm font-semibold text-slate-700 mb-1.5"
                      >
                        Full name or preferred name
                      </label>
                      <input
                        id="participant-name"
                        type="text"
                        value={inputName}
                        onChange={(e) => {
                          setInputName(e.target.value)
                          if (error) setError('')
                        }}
                        placeholder="e.g. Maria Schmidt"
                        autoComplete="given-name"
                        autoFocus
                        className={`w-full px-4 py-3 rounded-xl border text-slate-900 text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors ${
                          error ? 'border-red-400' : 'border-slate-300'
                        }`}
                      />
                      {error && (
                        <p className="mt-1.5 text-xs text-red-600">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-sm rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                    >
                      Continue
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-slate-400 text-center">
                    Your name is used only to personalise this session.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {TENSIONS.map((t, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm"
                    >
                      <div className="text-xs font-semibold text-amber-700 mb-1">{t.label}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="intro"
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-700 text-white font-bold text-xs tracking-tight">
                    ERA
                  </div>
                  <span className="text-slate-500 text-sm font-medium">European Law Academy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">Participant:</span>
                  <span className="text-slate-700 text-sm font-semibold">{userName}</span>
                  <button
                    onClick={() => { setUserName(''); setStep('name'); setInputName('') }}
                    className="ml-2 text-slate-400 hover:text-slate-600 text-xs underline underline-offset-2 transition-colors"
                  >
                    Change
                  </button>
                </div>
              </div>
            </header>

            {/* Hero */}
            <section className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-5">
                  Directive (EU) 2026/470 — Omnibus I
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
                  CSRD &amp; CSDDD
                  <br />
                  <span className="text-blue-700">Post-Omnibus I</span>
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
                  Master the three structural tensions created by Directive (EU) 2026/470. Test your knowledge, then apply the law to EuroMed AG.
                </p>
              </motion.div>

              {/* Phase cards */}
              <motion.div
                className="grid sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {PHASES.map((p) => (
                  <div
                    key={p.phase}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="text-blue-700 text-3xl font-bold mb-3 font-mono opacity-20">{p.num}</div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-1">{p.phase}</div>
                    <div className="text-slate-900 font-bold text-lg mb-1">{p.title}</div>
                    <div className="text-slate-500 text-sm leading-relaxed">{p.desc}</div>
                  </div>
                ))}
              </motion.div>

              {/* Three tensions */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  Three Structural Tensions
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {TENSIONS.map((t, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm border-l-4 border-l-amber-400"
                    >
                      <div className="text-sm font-semibold text-slate-800 mb-1">{t.label}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-col items-start gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <button
                  onClick={handleStart}
                  className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-base font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 shadow-sm"
                >
                  Begin Training
                </button>
                <p className="text-slate-400 text-xs">Phase 1 · 13 questions · approx. 15 minutes</p>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 px-6 py-3">
              <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-y-1 text-slate-400 text-xs">
                <span>ERA EU Sustainability Law Training Tool</span>
                <span className="hidden sm:block">Directive (EU) 2026/470 · Omnibus I · 18 March 2026</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
