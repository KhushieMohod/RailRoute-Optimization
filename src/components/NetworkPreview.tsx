'use client';

import React, { useState, useEffect } from 'react';
import { 
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Route, GitMerge, Search } from 'lucide-react';

// --- Types & Data ---

interface FlowNode {
  id: string;
  position: { x: number; y: number };
  data: { label: React.ReactNode; tooltip: string };
  style?: Record<string, unknown>;
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: Record<string, unknown>;
  labelStyle?: Record<string, unknown>;
  labelBgStyle?: Record<string, unknown>;
  animated?: boolean;
  hidden?: boolean;
}

const STATIONS = [
  { id: '1', name: 'Central Hub', x: 300, y: 250 },
  { id: '2', name: 'North Terminal', x: 300, y: 100 },
  { id: '3', name: 'Port Side', x: 100, y: 250 },
  { id: '4', name: 'East District', x: 500, y: 200 },
  { id: '5', name: 'West Valley', x: 150, y: 400 },
  { id: '6', name: 'South Depot', x: 450, y: 450 }
];

const TRACKS = [
  { id: 'e1-2', source: '1', target: '2', weight: 12 },
  { id: 'e1-3', source: '1', target: '3', weight: 15 },
  { id: 'e1-4', source: '1', target: '4', weight: 10 },
  { id: 'e2-4', source: '2', target: '4', weight: 8 },
  { id: 'e3-5', source: '3', target: '5', weight: 22 },
  { id: 'e4-5', source: '4', target: '5', weight: 18 },
  { id: 'e4-6', source: '4', target: '6', weight: 25 },
  { id: 'e5-6', source: '5', target: '6', weight: 14 },
  { id: 'e1-6', source: '1', target: '6', weight: 30 }
];

const defaultNodeStyle = {
  background: '#112240',
  color: '#e6f1ff',
  border: '1px solid #64ffda',
  borderRadius: '8px',
  padding: '10px 15px',
  fontSize: '14px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  boxShadow: '0 0 10px rgba(100,255,218,0.1)'
};

const AVL_TREE_NODES = [
  {
    id: '1',
    position: { x: 360, y: 100 },
    data: {
      label: <div className="text-center"><strong>Central Hub</strong><br />h=3</div>,
      tooltip: 'Parent: Root / Children: North Terminal, East District'
    },
    style: defaultNodeStyle
  },
  {
    id: '2',
    position: { x: 220, y: 220 },
    data: {
      label: <div className="text-center"><strong>North Terminal</strong><br />h=2</div>,
      tooltip: 'Parent: Central Hub / Children: Port Side'
    },
    style: defaultNodeStyle
  },
  {
    id: '3',
    position: { x: 120, y: 340 },
    data: {
      label: <div className="text-center"><strong>Port Side</strong><br />h=1</div>,
      tooltip: 'Parent: North Terminal / Children: None'
    },
    style: defaultNodeStyle
  },
  {
    id: '4',
    position: { x: 500, y: 220 },
    data: {
      label: <div className="text-center"><strong>East District</strong><br />h=2</div>,
      tooltip: 'Parent: Central Hub / Children: West Valley, South Depot'
    },
    style: defaultNodeStyle
  },
  {
    id: '5',
    position: { x: 420, y: 340 },
    data: {
      label: <div className="text-center"><strong>West Valley</strong><br />h=1</div>,
      tooltip: 'Parent: East District / Children: None'
    },
    style: defaultNodeStyle
  },
  {
    id: '6',
    position: { x: 580, y: 340 },
    data: {
      label: <div className="text-center"><strong>South Depot</strong><br />h=1</div>,
      tooltip: 'Parent: East District / Children: None'
    },
    style: defaultNodeStyle
  }
];

const AVL_TREE_EDGES = [
  { id: 'avl1', source: '1', target: '2' },
  { id: 'avl2', source: '2', target: '3' },
  { id: 'avl3', source: '1', target: '4' },
  { id: 'avl4', source: '4', target: '5' },
  { id: 'avl5', source: '4', target: '6' }
];

const defaultEdgeStyle = {
  stroke: '#e6f1ff',
  strokeWidth: 2,
  opacity: 0.5
};

// --- Algorithms ---

class DisjointSet {
  parent: Record<string, string> = {};
  constructor(nodes: string[]) {
    nodes.forEach(n => this.parent[n] = n);
  }
  find(i: string): string {
    if (this.parent[i] === i) return i;
    return this.find(this.parent[i]);
  }
  union(i: string, j: string) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    this.parent[rootI] = rootJ;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMSTEdgeIds() {
  const edges = [...TRACKS].sort((a, b) => a.weight - b.weight);
  const ds = new DisjointSet(STATIONS.map(s => s.id));
  const mstEdges: string[] = [];
  
  for (const edge of edges) {
    if (ds.find(edge.source) !== ds.find(edge.target)) {
      ds.union(edge.source, edge.target);
      mstEdges.push(edge.id);
    }
  }
  return mstEdges;
}

function getShortestPath(startId: string, endId: string) {
  const distances: Record<string, number> = {};
  const prev: Record<string, { node: string, edge: string } | null> = {};
  const queue: string[] = [];

  STATIONS.forEach(s => {
    distances[s.id] = Infinity;
    prev[s.id] = null;
    queue.push(s.id);
  });
  distances[startId] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a] - distances[b]);
    const u = queue.shift()!;
    if (u === endId) break;

    const neighbors = TRACKS.filter(t => t.source === u || t.target === u);
    for (const t of neighbors) {
      const v = t.source === u ? t.target : t.source;
      if (!queue.includes(v)) continue;

      const alt = distances[u] + t.weight;
      if (alt < distances[v]) {
        distances[v] = alt;
        prev[v] = { node: u, edge: t.id };
      }
    }
  }

  const pathEdges: string[] = [];
  const pathNodes: string[] = [];
  let curr = endId;
  
  if (prev[curr] !== null || curr === startId) {
    while (curr !== null) {
      pathNodes.unshift(curr);
      const p = prev[curr];
      if (p) {
        pathEdges.unshift(p.edge);
        curr = p.node;
      } else {
        break;
      }
    }
  }
  
  return pathNodes.length > 1 ? { nodes: pathNodes, edges: pathEdges } : { nodes: [], edges: [] };
}

function getNodeDegrees() {
  const indegree: Record<string, number> = {};
  const outdegree: Record<string, number> = {};
  STATIONS.forEach(s => {
    indegree[s.id] = 0;
    outdegree[s.id] = 0;
  });

  TRACKS.forEach(edge => {
    outdegree[edge.source] += 1;
    indegree[edge.target] += 1;
  });

  return { indegree, outdegree };
}

function getCycleEdgeIds() {
  const adj: Record<string, string[]> = {};
  STATIONS.forEach(s => adj[s.id] = []);
  TRACKS.forEach(edge => {
    adj[edge.source].push(edge.target);
  });

  const indexMap: Record<string, number> = {};
  const lowLink: Record<string, number> = {};
  const onStack: Record<string, boolean> = {};
  const stack: string[] = [];
  let index = 0;
  const sccs: string[][] = [];

  function strongconnect(v: string) {
    indexMap[v] = index;
    lowLink[v] = index;
    index += 1;
    stack.push(v);
    onStack[v] = true;

    for (const w of adj[v]) {
      if (indexMap[w] === undefined) {
        strongconnect(w);
        lowLink[v] = Math.min(lowLink[v], lowLink[w]);
      } else if (onStack[w]) {
        lowLink[v] = Math.min(lowLink[v], indexMap[w]);
      }
    }

    if (lowLink[v] === indexMap[v]) {
      const component: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack[w] = false;
        component.push(w);
      } while (w !== v);
      if (component.length > 1) {
        sccs.push(component);
      }
    }
  }

  STATIONS.forEach(s => {
    if (indexMap[s.id] === undefined) {
      strongconnect(s.id);
    }
  });

  const cycleNodes = new Set(sccs.flat());
  return TRACKS.filter(edge => cycleNodes.has(edge.source) && cycleNodes.has(edge.target)).map(edge => edge.id);
}

// --- Component ---

export default function NetworkPreview() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);
  
  const [startNode, setStartNode] = useState<string>('');
  const [endNode, setEndNode] = useState<string>('');
  const [viewMode, setViewMode] = useState<'graph' | 'avl'>('graph');

  // Initialize graph
  useEffect(() => {
    const degrees = getNodeDegrees();
    const initNodes: FlowNode[] = STATIONS.map(s => ({
      id: s.id,
      position: { x: s.x, y: s.y },
      data: {
        label: (
          <div title={`In: ${degrees.indegree[s.id]} • Out: ${degrees.outdegree[s.id]}`}>
            {s.name}
          </div>
        ),
        tooltip: `In: ${degrees.indegree[s.id]} / Out: ${degrees.outdegree[s.id]}`
      },
      style: defaultNodeStyle
    }));

    const initEdges: FlowEdge[] = TRACKS.map(t => ({
      id: t.id,
      source: t.source,
      target: t.target,
      label: `${t.weight} kms`,
      style: defaultEdgeStyle,
      labelStyle: { fill: '#64ffda', fontWeight: 700 },
      labelBgStyle: { fill: '#112240', color: '#fff', fillOpacity: 0.8 },
      animated: false
    }));

    setNodes(initNodes);
    setEdges(initEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Updates
  useEffect(() => {
    const graphMode = viewMode === 'graph';
    const avlMode = viewMode === 'avl';
    const cycleEdges = graphMode ? getCycleEdgeIds() : [];

    if (avlMode) {
      setNodes(AVL_TREE_NODES.map(node => ({
        ...node,
        data: {
          ...node.data,
          label: (
            <div title={node.data.tooltip}>
              {node.data.label}
            </div>
          )
        }
      })));

      setEdges(AVL_TREE_EDGES.map(edge => ({
        ...edge,
        label: undefined,
        animated: false,
        style: {
          ...defaultEdgeStyle,
          stroke: '#64ffda',
          strokeWidth: 3,
          opacity: 1
        }
      })));
      return;
    }

    let pathEdges: string[] = [];
    let pathNodes: string[] = [];

    if (startNode && endNode && startNode !== endNode) {
      const result = getShortestPath(startNode, endNode);
      pathEdges = result.edges;
      pathNodes = result.nodes;
    }

    const degrees = getNodeDegrees();
    setNodes((nds: FlowNode[]) => nds.map((n: FlowNode) => {
      const inPath = pathNodes.includes(n.id);
      const tooltip = `In: ${degrees.indegree[n.id]} / Out: ${degrees.outdegree[n.id]}`;

      return {
        ...n,
        data: {
          ...n.data,
          label: (
            <div title={tooltip}>
              {STATIONS.find(s => s.id === n.id)?.name}
            </div>
          ),
          tooltip
        },
        style: {
          ...defaultNodeStyle,
          background: inPath ? '#64ffda' : defaultNodeStyle.background,
          color: inPath ? '#0a192f' : defaultNodeStyle.color,
          boxShadow: inPath ? '0 0 20px rgba(100,255,218,0.6)' : defaultNodeStyle.boxShadow,
        }
      };
    }));

    setEdges((eds: FlowEdge[]) => eds.map((e: FlowEdge) => {
      const inPath = pathEdges.includes(e.id);
      const inCycle = cycleEdges.includes(e.id);
      
      return {
        ...e,
        hidden: false,
        animated: inPath,
        style: {
          ...defaultEdgeStyle,
          stroke: inPath ? '#64ffda' : inCycle ? '#f59e0b' : defaultEdgeStyle.stroke,
          strokeWidth: inPath ? 4 : inCycle ? 3 : defaultEdgeStyle.strokeWidth,
          opacity: inPath || inCycle ? 1 : defaultEdgeStyle.opacity
        }
      };
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startNode, endNode, viewMode]);

  return (
    <section id="network" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Route className="w-8 h-8 text-[#64ffda]" />
            Live Network Preview
          </h2>
          <p className="text-[#64ffda]/80 text-lg">Interactive React Flow topological viewer featuring dynamic pathfinding and AVL tree visualization.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-[#112240]/20 p-6 rounded-2xl border border-[#64ffda]/10 backdrop-blur-sm">
          <div className="flex-1 h-[600px] bg-[#0a192f]/50 rounded-xl border border-[#233554] relative overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              attributionPosition="bottom-left"
            >
              <Background color="#112240" gap={16} size={1} />
              <Controls />
            </ReactFlow>
          </div>

          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#64ffda]/20">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-[#64ffda]/20 pb-3">
                <Search className="w-5 h-5 text-[#64ffda]" />
                View Mode
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#112240]/50 p-4 border border-[#64ffda]/20">
                  <div className="inline-flex rounded-full bg-[#0a192f] border border-[#64ffda]/20 p-1">
                    <button
                      onClick={() => setViewMode('graph')}
                      className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        viewMode === 'graph' ? 'bg-[#64ffda] text-[#0a192f]' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Graph
                    </button>
                    <button
                      onClick={() => {
                        setViewMode('avl');
                        setStartNode('');
                        setEndNode('');
                      }}
                      className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        viewMode === 'avl' ? 'bg-[#64ffda] text-[#0a192f]' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      AVL
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-2 uppercase font-bold tracking-wider">Start Node</label>
                  <select 
                    className="w-full bg-[#112240] border border-[#64ffda]/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#64ffda] transition-colors"
                    value={startNode}
                    onChange={(e) => setStartNode(e.target.value)}
                    disabled={viewMode === 'avl'}
                  >
                    <option value="">Select Origin...</option>
                    {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-2 uppercase font-bold tracking-wider">End Node</label>
                  <select 
                    className="w-full bg-[#112240] border border-[#64ffda]/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#64ffda] transition-colors"
                    value={endNode}
                    onChange={(e) => setEndNode(e.target.value)}
                    disabled={viewMode === 'avl'}
                  >
                    <option value="">Select Destination...</option>
                    {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#0a192f]/80 p-6 rounded-xl border border-amber-500/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-3 text-amber-500">
                <GitMerge className="w-5 h-5" />
                Logic Engine
              </h3>
              <p className="text-sm text-white/70">
                {viewMode === 'graph'
                  ? 'Spatial Engine: Resolving optimal rail topology using Dijkstra’s Shortest Path.'
                  : 'Logical Engine: Visualizing balanced O(log n) station schedule lookup.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}