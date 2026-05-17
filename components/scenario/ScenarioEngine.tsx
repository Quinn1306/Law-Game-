'use client'
import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useGameStore } from '@/store/gameStore'
import { DecisionNode } from './DecisionNode'
import { OutcomeCard } from './OutcomeCard'
import { FinalResultCard } from './FinalResultCard'
import { DecisionTreeMap } from './DecisionTreeMap'
import type { Sublevel, DecisionNodeData } from '@/data/phase2-scenario'

function computeOutcomePaths(
  nodes: Record<string, DecisionNodeData>,
  entryNode: string,
): Record<string, string[]> {
  const paths: Record<string, string[]> = {}
  function dfs(nodeId: string, optionPath: string[]) {
    const node = nodes[nodeId]
    if (!node) return
    if (node.type === 'outcome') {
      paths[nodeId] = optionPath
      return
    }
    for (const option of node.options ?? []) {
      dfs(option.nextNode, [...optionPath, option.id])
    }
  }
  dfs(entryNode, [])
  return paths
}

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
  const [direction, setDirection] = useState<1 | -1>(1)
  const [contextOpen, setContextOpen] = useState(false)
  const [treeOpen, setTreeOpen] = useState(true)
  const { addScenarioNode } = useGameStore()

  const currentNode = sublevel.nodes[currentNodeId]
  const showFinal = currentNodeId === 'final'

  const navigate = useCallback(
    (nextNodeId: string) => {
      setDirection(1)
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
    setDirection(-1)
    const prev = breadcrumb[breadcrumb.length - 2]
    setBreadcrumb((b) => b.slice(0, -1))
    setCurrentNodeId(prev)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
      {/* Sub-level header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-700">
              Sub-Level {sublevelIndex + 1} of {totalSublevels}
            </span>
            <h2 className="text-slate-900 font-bold text-base sm:text-lg mt-0.5 leading-snug">
              {sublevel.title}
            </h2>
          </div>
          <div className="sm:text-right shrink-0 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
            <span className="text-slate-500 text-xs font-medium block">Your Role</span>
            <span className="text-blue-700 text-sm font-bold">{sublevel.situationRole}</span>
          </div>
        </div>
      </div>

      {/* Decision tree map */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
        <button
          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
          onClick={() => setTreeOpen((o) => !o)}
          aria-expanded={treeOpen}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Decision Tree
          </span>
          <span className="text-slate-400 text-xs">{treeOpen ? 'Hide' : 'Show'}</span>
        </button>
        <AnimatePresence initial={false}>
          {treeOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-slate-100"
            >
              <div className="px-4 py-3">
                <DecisionTreeMap
                  nodes={sublevel.nodes}
                  entryNode={sublevel.entryNode}
                  currentNodeId={currentNodeId}
                  breadcrumb={breadcrumb}
                />
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-700 inline-block" />
                    Decision node
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-700 inline-block" />
                    Outcome
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                    Unvisited
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legal Context */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
        <button
          className="w-full px-4 py-3 text-left text-slate-600 text-sm font-semibold flex justify-between items-center hover:bg-slate-50 transition-colors"
          onClick={() => setContextOpen((o) => !o)}
          aria-expanded={contextOpen}
        >
          <span>Legal Context</span>
          <span className="text-slate-400 text-xs">{contextOpen ? 'Hide' : 'Show'}</span>
        </button>
        <AnimatePresence initial={false}>
          {contextOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-slate-100"
            >
              <p className="px-4 py-4 text-slate-600 text-sm leading-relaxed">
                {sublevel.legalContext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Situation */}
      {!showFinal && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-lg">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
            Situation
          </span>
          <p className="text-slate-700 text-sm leading-relaxed">{sublevel.situation}</p>
        </div>
      )}

      {/* Node content with directional animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          {showFinal ? (
            <FinalResultCard
              result={sublevel.finalResult}
              path={breadcrumb}
              onNext={onComplete}
              isLast={sublevelIndex === totalSublevels - 1}
              allOutcomes={Object.values(sublevel.nodes).filter((n) => n.type === 'outcome')}
              chosenOutcomeId={breadcrumb.find((id) => sublevel.nodes[id]?.type === 'outcome') ?? ''}
              tension={sublevel.tension}
              outcomePaths={computeOutcomePaths(sublevel.nodes, sublevel.entryNode)}
              onBack={goBack}
            />
          ) : currentNode?.type === 'outcome' ? (
            <OutcomeCard
              node={currentNode}
              onContinue={() => navigate('final')}
              onBack={goBack}
              canGoBack={breadcrumb.length > 1}
            />
          ) : (
            <DecisionNode
              node={currentNode}
              onSelect={navigate}
              onBack={goBack}
              canGoBack={breadcrumb.length > 1 && !showFinal}
              useRomanNumerals={breadcrumb.length > 1}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
