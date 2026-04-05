'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Panel,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges
} from '@xyflow/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Database, Plus, RotateCcw, GitPullRequest, Search, Trash2, Activity, Train } from 'lucide-react';
import Hero from '@/components/Hero';
import ProblemAnalysis from '@/components/ProblemAnalysis';
import Objectives from '@/components/Objectives';
import Constraints from '@/components/Constraints';
import Footer from '@/components/Footer';

// --- Types & Constants ---
interface Station { id: string; name: string; x: number; y: number; }
interface Track { id: string; source: string; target: string; weight: number; }
interface PathResult { nodes: string[]; edges: string[]; }

const STATIONS: Station[] = [
  { id: 'pune', name: 'Pune Jn', x: 400, y: 400 },
  { id: 'mumbai', name: 'Mumbai CST', x: 100, y: 100 },
  { id: 'lonavala', name: 'Lonavala', x: 250, y: 250 },
  { id: 'thane', name: 'Thane', x: 150, y: 150 },
  { id: 'panvel', name: 'Panvel', x: 200, y: 350 },
  { id: 'karjat', name: 'Karjat', x: 300, y: 300 },
];

const TRACKS: Track[] = [
  { id: 'e-m-t', source: 'mumbai', target: 'thane', weight: 34 },
  { id: 'e-t-l', source: 'thane', target: 'lonavala', weight: 92 },
  { id: 'e-l-p', source: 'lonavala', target: 'pune', weight: 64 },
  { id: 'e-m-p', source: 'mumbai', target: 'panvel', weight: 45 },
  { id: 'e-p-k', source: 'panvel', target: 'karjat', weight: 28 },
  { id: 'e-k-l', source: 'karjat', target: 'lonavala', weight: 30 },
  { id: 'e-t-p', source: 'thane', target: 'panvel', weight: 52 },
];

function getShortestPath(startId: string, endId: string, disabledEdges: Set<string>): PathResult {
  if (!startId || !endId) return { nodes: [], edges: [] };

  const distances: Record<string, number> = {};
  const prev: Record<string, { node: string, edge: string } | null> = {};
  const queue: string[] = [];
  const activeTracks = TRACKS.filter(t => !disabledEdges.has(t.id));

  STATIONS.forEach(s => {
    distances[s.id] = Infinity;
    prev[s.id] = null;
    queue.push(s.id);
  });

  distances[startId] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a] - distances[b]);
    const u = queue.shift()!;
    if (distances[u] === Infinity || u === endId) break;

    activeTracks.filter(t => t.source === u || t.target === u).forEach(t => {
      const v = t.source === u ? t.target : t.source;
      if (queue.includes(v)) {
        const alt = distances[u] + t.weight;
        if (alt < distances[v]) {
          distances[v] = alt;
          prev[v] = { node: u, edge: t.id };
        }
      }
    });
  }

  const pEdges: string[] = [];
  const pNodes: string[] = [];
  let curr: string | null = endId;

  if (curr && (prev[curr] !== null || curr === startId)) {
    while (curr !== null) {
      pNodes.unshift(curr);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const step = prev[curr];
      if (step) {
        pEdges.unshift(step.edge);
        curr = step.node;
      } else {
        curr = null;
      }
    }
  }

  return { nodes: pNodes, edges: pEdges };
}

// --- AVL Node & Tree Logic ---
class AVLNode {
  id: number; 
  dest: string; 
  time: string; 
  height = 1;
  left: AVLNode | null = null; 
  right: AVLNode | null = null;

  constructor(id: number, dest: string, time: string) { 
    this.id = id; 
    this.dest = dest; 
    this.time = time;
  }
}

const getH = (n: AVLNode | null) => n ? n.height : 0;
const getB = (n: AVLNode | null) => n ? getH(n.left) - getH(n.right) : 0;

function rotateR(y: AVLNode): AVLNode {
  const x = y.left!; const T2 = x.right;
  x.right = y; y.left = T2;
  y.height = 1 + Math.max(getH(y.left), getH(y.right));
  x.height = 1 + Math.max(getH(x.left), getH(x.right));
  return x;
}

function rotateL(x: AVLNode): AVLNode {
  const y = x.right!; const T2 = y.left;
  y.left = x; x.right = T2;
  x.height = 1 + Math.max(getH(x.left), getH(x.right));
  y.height = 1 + Math.max(getH(y.left), getH(y.right));
  return y;
}

function insert(n: AVLNode | null, id: number, dest: string, time: string): AVLNode {
  if (!n) return new AVLNode(id, dest, time);
  if (id < n.id) n.left = insert(n.left, id, dest, time);
  else if (id > n.id) n.right = insert(n.right, id, dest, time);
  else return n;

  n.height = 1 + Math.max(getH(n.left), getH(n.right));
  const b = getB(n);
  if (b > 1 && id < n.left!.id) return rotateR(n);
  if (b < -1 && id > n.right!.id) return rotateL(n);
  if (b > 1 && id > n.left!.id) { n.left = rotateL(n.left!); return rotateR(n); }
  if (b < -1 && id < n.right!.id) { n.right = rotateR(n.right!); return rotateL(n); }
  return n;
}

function deleteNode(n: AVLNode | null, id: number): AVLNode | null {
  if (!n) return null;
  if (id < n.id) n.left = deleteNode(n.left, id);
  else if (id > n.id) n.right = deleteNode(n.right, id);
  else {
    if (!n.left || !n.right) return n.left || n.right;
    let m = n.right; while (m.left) m = m.left;
    n.id = m.id; n.dest = m.dest; n.time = m.time; n.right = deleteNode(n.right, m.id);
  }
  n.height = 1 + Math.max(getH(n.left), getH(n.right));
  const b = getB(n);
  if (b > 1 && getB(n.left) >= 0) return rotateR(n);
  if (b > 1 && getB(n.left) < 0) { n.left = rotateL(n.left!); return rotateR(n); }
  if (b < -1 && getB(n.right) <= 0) return rotateL(n);
  if (b < -1 && getB(n.right) > 0) { n.right = rotateR(n.right!); return rotateL(n); }
  return n;
}

// --- Dashboard Component ---
export default function DualEngineDashboard() {
  const [activeTab, setActiveTab] = useState<'graph' | 'tree'>('graph');
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [disabledEdges, setDisabledEdges] = useState<Set<string>>(new Set());
  const [stationSearch, setStationSearch] = useState('');
  const [root, setRoot] = useState<AVLNode | null>(null);
  const [treeInput, setTreeInput] = useState('');
  const [searchHighlight, setSearchHighlight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setDisabledEdges((prev) => {
      const next = new Set(prev);
      if (next.has(edge.id)) next.delete(edge.id);
      else next.add(edge.id);
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const result = getShortestPath(startNode, endNode, disabledEdges);
    setNodes(STATIONS.map(s => {
      const isPath = result.nodes.includes(s.id);
      const isMatch = stationSearch !== '' && s.name.toLowerCase().includes(stationSearch.toLowerCase());
      return {
        id: s.id, position: { x: s.x, y: s.y }, data: { label: s.name },
        style: { background: isMatch ? '#facc15' : (isPath ? '#64ffda' : '#112240'), color: (isPath || isMatch) ? '#0a192f' : '#e6f1ff', borderColor: isMatch ? '#fbbf24' : '#64ffda', borderWidth: 2, borderRadius: '8px', fontWeight: 'bold', width: 100, textAlign: 'center' },
        className: isMatch ? 'animate-pulse' : ''
      };
    }));
    setEdges(TRACKS.map(t => {
      const isDisabled = disabledEdges.has(t.id);
      const isPath = result.edges.includes(t.id);
      return {
        id: t.id, source: t.source, target: t.target, label: isDisabled ? 'OFFLINE' : `${t.weight}km`, animated: isPath && !isDisabled,
        style: { stroke: isDisabled ? '#ef4444' : (isPath ? '#64ffda' : '#233554'), strokeWidth: isPath ? 4 : 2, opacity: isDisabled ? 0.3 : 1, cursor: 'pointer' },
        labelStyle: { fill: isDisabled ? '#ef4444' : '#64ffda', fontSize: 10, fontWeight: 'bold' }
      };
    }));
  }, [startNode, endNode, disabledEdges, stationSearch, setNodes, setEdges]);

  const stats = useMemo(() => {
    const count = (n: AVLNode | null): number => n ? 1 + count(n.left) + count(n.right) : 0;
    return { h: getH(root), c: count(root) };
  }, [root]);

  const renderAVL = (n: AVLNode | null, x: number, y: number, offset: number): React.ReactNode => {
    if (!n) return null;
    const isH = searchHighlight === n.id;
    return (
      <g key={n.id}>
        {n.left && <line x1={x} y1={y} x2={x - offset} y2={y + 80} stroke="#233554" strokeWidth="2" />}
        {n.right && <line x1={x} y1={y} x2={x + offset} y2={y + 80} stroke="#233554" strokeWidth="2" />}
        <motion.g animate={{ scale: isH ? 1.2 : 1 }}>
          <circle cx={x} cy={y} r="32" fill={isH ? '#64ffda' : '#112240'} stroke="#64ffda" strokeWidth="2" />
          <text x={x} y={y - 8} textAnchor="middle" fill={isH ? '#0a192f' : '#e6f1ff'} fontSize="11" fontWeight="bold">#{n.id}</text>
          <text x={x} y={y + 6} textAnchor="middle" fill={isH ? '#0a192f' : '#64ffda'} fontSize="8" fontWeight="bold">{n.dest}</text>
          <text x={x} y={y + 18} textAnchor="middle" fill={isH ? '#0a192f' : '#8892b0'} fontSize="7">{n.time}</text>
          
          <rect x={x + 22} y={y - 38} width="18" height="18" rx="4" fill="#f59e0b" />
          <text x={x + 31} y={y - 26} textAnchor="middle" fill="#0a192f" fontSize="9" fontWeight="bold">{getB(n)}</text>
        </motion.g>
        {renderAVL(n.left, x - offset, y + 80, offset / 2)}
        {renderAVL(n.right, x + offset, y + 80, offset / 2)}
      </g>
    );
  };

  const mockData = [
    { dest: 'Mumbai', time: '10:30 AM' },
    { dest: 'Pune', time: '12:45 PM' },
    { dest: 'Delhi', time: '02:15 PM' },
    { dest: 'Bangalore', time: '04:00 PM' },
    { dest: 'Chennai', time: '06:30 PM' },
    { dest: 'Kolkata', time: '09:00 PM' },
  ];

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a192f] flex items-center justify-center z-50"
          >
            <div className="text-center">
              <Train size={64} className="text-[#64ffda] mx-auto mb-4 animate-pulse" />
              <p className="text-[#64ffda] text-xl">Initializing Routes...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <>
          <Hero />
          <ProblemAnalysis />
          <section id="implementation" className="py-24 bg-[#0a192f] text-[#64ffda]">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Dual-Engine Dashboard</h2>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setActiveTab('graph')} className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'graph' ? 'bg-[#64ffda] text-[#0a192f]' : 'border border-[#64ffda]'}`}><Network size={18} /> Topology</button>
                  <button onClick={() => setActiveTab('tree')} className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'tree' ? 'bg-[#64ffda] text-[#0a192f]' : 'border border-[#64ffda]'}`}><Database size={18} /> Time-Table</button>
                </div>
              </div>

              <div className="bg-[#112240] rounded-3xl p-8 border border-[#64ffda]/20 min-h-[600px] shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {activeTab === 'graph' ? (
                    <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[600px] relative">
                      <Panel position="top-right" className="bg-[#0a192f] p-4 rounded-xl border border-[#64ffda] space-y-3 z-50">
                        <div className="flex items-center gap-2 text-[#64ffda] bg-[#112240] px-2 py-1 rounded"><Search size={14} /> <input placeholder="Search station..." className="bg-transparent outline-none text-xs w-full" onChange={e => setStationSearch(e.target.value)} /></div>
                        <select className="w-full bg-[#112240] text-white text-xs p-2 border border-[#64ffda]" onChange={e => setStartNode(e.target.value)} value={startNode}><option value="">From...</option>{STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
                        <select className="w-full bg-[#112240] text-white text-xs p-2 border border-[#64ffda]" onChange={e => setEndNode(e.target.value)} value={endNode}><option value="">To...</option>{STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
                        <button onClick={() => { setDisabledEdges(new Set()); setStartNode(''); setEndNode(''); setStationSearch(''); }} className="w-full text-[10px] text-[#64ffda] border border-[#64ffda] py-1 rounded flex items-center justify-center gap-1"><RotateCcw size={10} /> Reset All</button>
                      </Panel>
                      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onEdgeClick={onEdgeClick} fitView><Background color="#233554" /><Controls /></ReactFlow>
                    </motion.div>
                  ) : (
                    <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[600px] flex flex-col">
                      <div className="flex justify-between items-start mb-8">
                        <div><h3 className="text-xl font-bold text-white flex items-center gap-2"><GitPullRequest className="text-[#64ffda]" /> Time-Table Management</h3><p className="text-xs text-[#8892b0]">Database orchestration using AVL self-balancing logic.</p></div>
                        <div className="flex gap-2">
                          <input placeholder="Train ID..." className="bg-[#0a192f] border border-[#64ffda] rounded-lg px-3 py-1 text-white text-sm w-24 outline-none" value={treeInput} onChange={e => setTreeInput(e.target.value)} />
                          <button 
                            onClick={() => { 
                              const id = parseInt(treeInput); 
                              if (!isNaN(id)) { 
                                const data = mockData[Math.floor(Math.random() * mockData.length)];
                                setRoot(prev => insert(prev, id, data.dest, data.time)); 
                                setTreeInput(''); 
                              } 
                            }} 
                            className="bg-[#64ffda] text-[#0a192f] px-4 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Plus size={14} /> Add Train
                          </button>
                          <button onClick={() => { const id = parseInt(treeInput); if (!isNaN(id)) { setRoot(prev => deleteNode(prev, id)); setTreeInput(''); } }} className="bg-red-500 text-white px-4 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><Trash2 size={14} /> Remove</button>
                        </div>
                      </div>
                      <div className="flex-1 bg-[#0a192f]/50 rounded-2xl relative overflow-hidden border border-[#64ffda]/5">
                        <div className="absolute top-4 left-4 flex gap-4"><div className="bg-[#1d2d50] p-2 rounded-lg border border-[#64ffda]/20 text-center"><span className="text-[8px] text-[#64ffda] block">HEIGHT</span><span className="text-lg font-bold text-white">{stats.h}</span></div><div className="bg-[#1d2d50] p-2 rounded-lg border border-[#64ffda]/20 text-center"><span className="text-[8px] text-[#64ffda] block">NODES</span><span className="text-lg font-bold text-white">{stats.c}</span></div></div>
                        <svg width="100%" height="100%" viewBox="0 0 800 500" className="mx-auto mt-10" onClick={() => setSearchHighlight(null)}>{renderAVL(root, 400, 60, 180)}</svg>
                        <Panel position="bottom-right" className="bg-[#0a192f]/90 p-3 rounded-lg border border-[#64ffda]/20 max-w-xs"><div className="flex items-center gap-1 text-[#64ffda] text-[10px] font-mono mb-1"><Activity size={12} /> Database Analysis</div><p className="text-[9px] text-[#8892b0]">Each node stores a Train ID as the primary key and its schedule as the record value.</p></Panel>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-8 flex justify-center gap-8 text-[10px] font-mono text-[#64ffda]/40 uppercase tracking-widest"><div className="flex items-center gap-1"><span className="w-2 h-2 border border-[#64ffda]" /> Database Records</div><div className="flex items-center gap-1"><span className="w-2 h-2 bg-[#64ffda]" /> Key Search</div><div className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500" /> Balance Factor</div></div>
            </div>
          </section>
          <Objectives />
          <Constraints />
          <Footer />
        </>
      )}
    </>
  );
}