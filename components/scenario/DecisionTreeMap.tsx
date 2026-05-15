'use client'
import { useMemo } from 'react'
import type { DecisionNodeData } from '@/data/phase2-scenario'

interface LayoutNode {
  id: string
  nodeType: 'decision' | 'outcome' | 'final'
  quality?: string
  x: number
  y: number
}

interface Edge {
  fromId: string
  toId: string
  x1: number
  y1: number
  x2: number
  y2: number
}

const PADDING = 28
const LEVEL_HEIGHT = 60
const FINAL_ID = '__final__'

const QUALITY_FILL: Record<string, string> = {
  best: '#15803d',
  partial: '#b45309',
  problematic: '#c2410c',
  incorrect: '#b91c1c',
  correction: '#1d4ed8',
}

function buildLayout(
  nodes: Record<string, DecisionNodeData>,
  entryNode: string,
  width: number,
) {
  const childrenOf: Record<string, string[]> = {}
  const levels: Record<string, number> = {}

  function dfs(id: string, level: number) {
    if (levels[id] !== undefined) return
    levels[id] = level
    const node = nodes[id]
    if (!node) return
    if (node.type === 'outcome') {
      childrenOf[id] = [FINAL_ID]
      if (levels[FINAL_ID] === undefined) levels[FINAL_ID] = level + 1
    } else {
      childrenOf[id] = []
      for (const opt of node.options ?? []) {
        childrenOf[id].push(opt.nextNode)
        dfs(opt.nextNode, level + 1)
      }
    }
  }

  dfs(entryNode, 0)
  childrenOf[FINAL_ID] = []

  const maxLevel = Math.max(...Object.values(levels))
  const svgHeight = PADDING + maxLevel * LEVEL_HEIGHT + PADDING

  // Collect leaf nodes (outcomes) in DFS order for even horizontal spacing
  const leafOrder: string[] = []
  function collectLeaves(id: string) {
    const ch = childrenOf[id]
    if (!ch || ch.length === 0) return
    if (ch.includes(FINAL_ID)) {
      leafOrder.push(id)
      return
    }
    for (const child of ch) collectLeaves(child)
  }
  collectLeaves(entryNode)

  const positions: Record<string, { x: number; y: number }> = {}

  // Position leaves evenly
  leafOrder.forEach((id, i) => {
    positions[id] = {
      x:
        leafOrder.length === 1
          ? width / 2
          : PADDING + (i / (leafOrder.length - 1)) * (width - 2 * PADDING),
      y: PADDING + levels[id] * LEVEL_HEIGHT,
    }
  })

  positions[FINAL_ID] = { x: width / 2, y: PADDING + maxLevel * LEVEL_HEIGHT }

  // Position non-leaf nodes as midpoints of their children (bottom-up)
  function positionNode(id: string) {
    if (positions[id]) return
    const ch = childrenOf[id] ?? []
    ch.forEach((c) => positionNode(c))
    const xs = ch.map((c) => positions[c]?.x ?? width / 2)
    positions[id] = {
      x: xs.length > 0 ? xs.reduce((a, b) => a + b, 0) / xs.length : width / 2,
      y: PADDING + levels[id] * LEVEL_HEIGHT,
    }
  }
  positionNode(entryNode)

  const layoutNodes: LayoutNode[] = Object.keys(levels).map((id) => ({
    id,
    nodeType:
      id === FINAL_ID
        ? 'final'
        : nodes[id]?.type === 'outcome'
        ? 'outcome'
        : 'decision',
    quality: nodes[id]?.quality,
    x: positions[id]?.x ?? width / 2,
    y: positions[id]?.y ?? PADDING,
  }))

  const edges: Edge[] = []
  for (const [fromId, toIds] of Object.entries(childrenOf)) {
    for (const toId of toIds) {
      const from = positions[fromId]
      const to = positions[toId]
      if (from && to) {
        edges.push({ fromId, toId, x1: from.x, y1: from.y, x2: to.x, y2: to.y })
      }
    }
  }

  return { layoutNodes, edges, svgHeight }
}

interface DecisionTreeMapProps {
  nodes: Record<string, DecisionNodeData>
  entryNode: string
  currentNodeId: string
  breadcrumb: string[]
}

export function DecisionTreeMap({
  nodes,
  entryNode,
  currentNodeId,
  breadcrumb,
}: DecisionTreeMapProps) {
  const SVG_WIDTH = 560

  const { layoutNodes, edges, svgHeight } = useMemo(
    () => buildLayout(nodes, entryNode, SVG_WIDTH),
    [nodes, entryNode],
  )

  const visited = new Set(breadcrumb)
  const isFinalActive = currentNodeId === 'final'

  function isEdgeVisited(fromId: string, toId: string) {
    const fi = breadcrumb.indexOf(fromId)
    if (fi < 0) return false
    // Forward edge
    if (breadcrumb[fi + 1] === toId) return true
    // Outcome → final edge
    if (toId === FINAL_ID && isFinalActive && nodes[fromId]?.type === 'outcome' && visited.has(fromId))
      return true
    return false
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ height: Math.min(svgHeight, 220) }}
        aria-hidden="true"
        role="img"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const active = isEdgeVisited(edge.fromId, edge.toId)
          const midX = (edge.x1 + edge.x2) / 2
          const midY = (edge.y1 + edge.y2) / 2
          return (
            <path
              key={i}
              d={`M ${edge.x1} ${edge.y1} C ${edge.x1} ${midY + 10}, ${edge.x2} ${midY - 10}, ${edge.x2} ${edge.y2}`}
              fill="none"
              stroke={active ? '#1d4ed8' : '#e2e8f0'}
              strokeWidth={active ? 2 : 1.5}
              strokeLinecap="round"
            />
          )
        })}

        {/* Nodes */}
        {layoutNodes.map((node) => {
          const isCurrent =
            node.id === currentNodeId ||
            (node.id === FINAL_ID && isFinalActive)
          const isVisited =
            visited.has(node.id) || (node.id === FINAL_ID && isFinalActive)

          const r =
            node.nodeType === 'final'
              ? 8
              : node.nodeType === 'outcome'
              ? 6
              : 7

          const fill =
            isCurrent
              ? '#1d4ed8'
              : node.nodeType === 'outcome' && isVisited
              ? QUALITY_FILL[node.quality ?? 'partial'] ?? '#475569'
              : isVisited
              ? '#1d4ed8'
              : node.nodeType === 'outcome'
              ? '#cbd5e1'
              : '#94a3b8'

          const stroke = isCurrent ? '#1e3a8a' : '#ffffff'

          return (
            <g key={node.id}>
              {isCurrent && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r + 5}
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="1.5"
                  opacity="0.25"
                >
                  <animate
                    attributeName="r"
                    values={`${r + 3};${r + 7};${r + 3}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0.1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              {node.nodeType === 'final' && (
                <text
                  x={node.x}
                  y={node.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="7"
                  fill="#ffffff"
                  fontWeight="700"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  END
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
