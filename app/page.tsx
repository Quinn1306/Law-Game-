'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { useGameStore } from '@/store/gameStore'

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Knowledge Module',
    desc: '13 timed questions on pre- and post-Omnibus I law',
    icon: '⚡',
  },
  {
    phase: 'Phase 2',
    title: 'Scenario Module',
    desc: '3 branching decision scenarios — EuroMed AG',
    icon: '⚖',
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
  const { reset } = useGameStore()

  const handleStart = () => {
    reset()
    router.push('/phase1')
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              ERA
            </div>
            <span className="text-white/60 text-sm">European Law Academy</span>
          </div>
          <span className="hidden sm:block text-blue-300/40 text-xs font-mono">
            Directive (EU) 2026/470 — Omnibus I
          </span>
        </header>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-block bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              EU Corporate Sustainability Law
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              CSRD &amp; CSDDD
              <br />
              <span className="text-blue-400">Post-Omnibus I</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
              Master the three structural tensions created by Directive (EU) 2026/470. Test your knowledge, then apply the law to EuroMed AG.
            </p>
          </motion.div>

          {/* Phase cards */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {PHASES.map((p) => (
              <div
                key={p.phase}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-left"
              >
                <div className="text-2xl mb-2" aria-hidden="true">{p.icon}</div>
                <div className="text-blue-300/60 text-xs uppercase tracking-wider mb-0.5">{p.phase}</div>
                <div className="text-white font-semibold">{p.title}</div>
                <div className="text-white/50 text-xs mt-1 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </motion.div>

          {/* Tensions */}
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="text-white/30 text-xs uppercase tracking-wider mb-3 text-center">
              Three Structural Tensions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TENSIONS.map((t, i) => (
                <div
                  key={i}
                  className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-3 text-left"
                >
                  <div className="text-amber-400/80 text-xs font-semibold mb-1">{t.label}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{t.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Start Training &rarr;
            </button>
            <p className="text-white/30 text-xs mt-3">Phase 1 · 13 questions · ~15 minutes</p>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-3 flex flex-wrap items-center justify-between gap-y-1 text-white/20 text-xs">
          <span>ERA EU Sustainability Law Training Tool</span>
          <span className="hidden sm:block">Directive (EU) 2026/470 · Omnibus I · 18 March 2026</span>
        </footer>
      </div>
    </main>
  )
}
