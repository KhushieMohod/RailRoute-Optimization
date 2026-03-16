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
  data: { label: string };
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

const defaultEdgeStyle = {
  stroke: '#e6f1ff',
  strokeWidth: 2,
  opacity: 0.5
};

// --- Algorithms ---

// Disjoint Set for Kruskal's
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

// Compute Minimum Spanning Tree
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

// Compute Shortest Path (Dijkstra)
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

// --- Component ---

export default function NetworkPreview() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);
  
  const [startNode, setStartNode] = useState<string>('');
  const [endNode, setEndNode] = useState<string>('');
  const [isMSTMode, setIsMSTMode] = useState(false);

  // Initialize graph
  useEffect(() => {
    const initNodes: FlowNode[] = STATIONS.map(s => ({
      id: s.id,
      position: { x: s.x, y: s.y },
      data: { label: s.name },
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
  }, [setNodes, setEdges]);

  // Handle Updates
  useEffect(() => {
    let pathEdges: string[] = [];
    let pathNodes: string[] = [];
    let mstEdges: string[] = [];

    if (isMSTMode) {
      mstEdges = getMSTEdgeIds();
    } else if (startNode && endNode && startNode !== endNode) {
      const result = getShortestPath(startNode, endNode);
      pathEdges = result.edges;
      pathNodes = result.nodes;
    }

    setNodes((nds: FlowNode[]) => nds.map((n: FlowNode) => {
      const inPath = pathNodes.includes(n.id);
      return {
        ...n,
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
      const inMST = mstEdges.includes(e.id);
      
      let hidden = false;
      if (isMSTMode && !inMST) hidden = true;

      return {
        ...e,
        hidden,
        animated: inPath,
        style: {
          ...defaultEdgeStyle,
          stroke: inPath ? '#64ffda' : (isMSTMode && inMST ? '#64ffda' : defaultEdgeStyle.stroke),
          strokeWidth: inPath ? 4 : (isMSTMode && inMST ? 3 : defaultEdgeStyle.strokeWidth),
          opacity: hidden ? 0 : (inPath || (isMSTMode && inMST) ? 1 : defaultEdgeStyle.opacity)
        }
      };
    }));
  }, [startNode, endNode, isMSTMode, setNodes, setEdges]);

  return (
    <section id="network" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-alabaster mb-4 flex items-center gap-3">
            <Route className="w-8 h-8 text-cyan" />
            Live Network Preview
          </h2>
          <p className="text-cyan/80 text-lg">Interactive React Flow topological viewer featuring dynamic pathfinding and spanning tree resolution.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-slate/20 p-6 rounded-2xl border border-cyan/10 backdrop-blur-sm">
          
          {/* Main React Flow Canvas */}
          <div className="flex-1 h-[600px] bg-navy/50 rounded-xl border border-slate relative overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              attributionPosition="bottom-left"
            >
              <Background color="#112240" gap={16} size={1} />
              <Controls className="bg-navy border-cyan fill-cyan" />
            </ReactFlow>
          </div>

          {/* Pathfinding Simulator Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-navy/80 p-6 rounded-xl border border-cyan/20">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-cyan/20 pb-3">
                <Search className="w-5 h-5 text-cyan" />
                Pathfinding Simulator
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-alabaster/60 mb-2 uppercase font-bold tracking-wider">Start Node</label>
                  <select 
                    className="w-full bg-slate border border-cyan/30 rounded-lg px-3 py-2 text-sm text-alabaster focus:outline-none focus:border-cyan transition-colors"
                    value={startNode}
                    onChange={(e) => setStartNode(e.target.value)}
                    disabled={isMSTMode}
                  >
                    <option value="">Select Origin...</option>
                    {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-alabaster/60 mb-2 uppercase font-bold tracking-wider">End Node</label>
                  <select 
                    className="w-full bg-slate border border-cyan/30 rounded-lg px-3 py-2 text-sm text-alabaster focus:outline-none focus:border-cyan transition-colors"
                    value={endNode}
                    onChange={(e) => setEndNode(e.target.value)}
                    disabled={isMSTMode}
                  >
                    <option value="">Select Destination...</option>
                    {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              {startNode && endNode && startNode !== endNode && !isMSTMode && (
                <div className="mt-6 p-4 bg-cyan/10 border border-cyan/30 rounded-lg">
                  <div className="text-xs font-mono text-cyan mb-1">Status:</div>
                  <div className="text-sm">Optimal path resolved using Dijkstra&apos;s algorithm.</div>
                </div>
              )}
            </div>

            <div className="bg-navy/80 p-6 rounded-xl border border-amber-500/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-3 text-amber-500">
                <GitMerge className="w-5 h-5" />
                Tree View
              </h3>
              <p className="text-sm text-alabaster/70 mb-6">
                Transform the full graph into a Minimum Spanning Tree (MST) using Kruskal&apos;s topological sort to determine minimal infrastructural track laying costs.
              </p>
              
              <button
                onClick={() => {
                  setIsMSTMode(!isMSTMode);
                  if (!isMSTMode) {
                    setStartNode('');
                    setEndNode('');
                  }
                }}
                className={`w-full py-3 px-4 rounded-lg font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isMSTMode 
                    ? 'bg-amber-500 text-navy shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                    : 'bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500/10'
                }`}
              >
                {isMSTMode ? 'Disable MST View' : 'Generate MST'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
