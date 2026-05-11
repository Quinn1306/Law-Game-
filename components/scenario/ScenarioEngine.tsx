'use client'
import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useGameStore } from '@/store/gameStore'
import { DecisionNode } from './DecisionNode'
import { OutcomeCard } from './OutcomeCard'
import { FinalResultCard } from './FinalResultCard'
import type { Sublevel } from '@/data/phase2-scenario'

interface ScenarioEngineProps {
  sublevel: Sublevel
  sublevelIndex: number
  totalSublevels: number
  onComplete: () => void
}

export function ScenarioEngine({
  sublevel,
  sublevelIndex,
  totalSublevels,
  onComplete,
}: ScenarioEngineProps) {
  const [currentNodeId, setCurrentNodeId] = useState(sublevel.entryNode)
  const [breadcrumb, setBreadcrumb] = useState<string[]>([sublevel.entryNode])
  const [contextOpen, setContextOpen] = useState(false)
  const { addScenarioNode } = useGameStore()

  const currentNode = sublevel.nodes[currentNodeId]
  const showFinal = currentNodeId === 'final'

  const navigate = useCallback(
    (nextNodeId: string) => {
      if (nextNodeId === 'final') {
        setCurrentNodeId('final')
        setBreadcrumb((b) => [...b, 'final'])
        return
      }
      addScenarioNode(sublevel.id, nextNodeId)
      setBreadcrumb((b) => [...b, nextNodeId])
      setCurrentNodeId(nextNodeId)
    },
    [addScenarioNode, sublevel.id],
  )

  const goBack = () => {
    if (breadcrumb.length <= 1) return
    const prev = breadcrumb[breadcrumb.length - 2]
    setBreadcrumb((b) => b.slice(0, -1))
    setCurrentNodeId(prev)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
      {/* Sub-level header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-blue-300/50 text-xs uppercase tracking-wider">
            Sub-Level {sublevelIndex + 1} of {totalSublevels}
          </span>
          <h2 className="text-white font-bold text-base sm:text-lg mt-0.5 leading-snug">{sublevel.title}</h2>
        </div>
        <div className="sm:text-right shrink-0">
          <span className="text-blue-300/40 text-xs block">Your role</span>
          <span className="text-blue-200 text-xs font-semibold">{sublevel.situationRole}</span>
        </div>
      </div>

      {/* Tension badge */}
      <div className="bg-amber-900/15 border border-amber-500/20 rounded-xl px-4 py-3">
        <span className="text-amber-400/70 text-xs uppercase font-semibold tracking-wide block mb-0.5">
          Legal Tension
        </span>
        <p className="text-amber-100/70 text-xs leading-relaxed">{sublevel.tension}</p>
      </div>

      {/* Legal Context accordion */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <button
          className="w-full px-4 py-3 text-left text-white/60 text-sm font-semibold flex justify-between items-center hover:bg-white/5 transition-colors"
          onClick={() => setContextOpen((o) => !o)}
          aria-expanded={contextOpen}
        >
          <span>Legal Context</span>
          <span className="text-xs" aria-hidden="true">{contextOpen ? '▲' : '▼'}</span>
        </button>
        {contextOpen && (
          <motion.div
            className="px-4 pb-4 text-white/55 text-xs leading-relaxed border-t border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p className="pt-3">{sublevel.legalContext}</p>
          </motion.div>
        )}
      </div>

      {/* Situation */}
      {!showFinal && (
        <div className="bg-white/8 rounded-xl p-4">
          <span className="text-blue-300/60 text-xs uppercase tracking-wider font-semibold block mb-2">
            Situation
          </span>
          <p className="text-white/80 text-sm leading-relaxed">{sublevel.situation}</p>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-white/25 text-xs flex-wrap">
        {breadcrumb.map((id, i) => (
          <span key={`${id}-${i}`} className="flex items-center gap-1">
            {i > 0 && <span>→</span>}
            <span className={i === breadcrumb.length - 1 ? 'text-white/60' : ''}>{id}</span>
          </span>
        ))}
      </div>

      {/* Node content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
        >
          {showFinal ? (
            <FinalResultCard
              result={sublevel.finalResult}
              path={breadcrumb}
              onNext={onComplete}
              isLast={sublevelIndex === totalSublevels - 1}
            />
          ) : currentNode?.type === 'outcome' ? (
            <OutcomeCard
              node={currentNode}
              onContinue={() => navigate('final')}
            />
          ) : (
            <DecisionNode
              node={currentNode}
              onSelect={navigate}
              onBack={goBack}
              canGoBack={breadcrumb.length > 1 && !showFinal}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
