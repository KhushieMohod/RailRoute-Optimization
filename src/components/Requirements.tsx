'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, DatabaseZap, Clock, Layers, Maximize2, GitBranch, ArrowRight, ShieldAlert, Cpu, AlertCircle, Waypoints, Unlink2, Repeat } from 'lucide-react';

export default function Requirements() {
  const [activeTab, setActiveTab] = useState<'functional' | 'non-functional'>('functional');

  const edgeCases = [
    {
      id: "EC-01",
      title: "Isolated Nodes",
      icon: <Unlink2 className="w-6 h-6 text-amber-500" />,
      desc: "Station vertices with degree zero.",
      mitigation: "Pre-computation adjacency pruning."
    },
    {
      id: "EC-02",
      title: "Cyclic Deadlocks",
      icon: <Repeat className="w-6 h-6 text-amber-500" />,
      desc: "Infinite traversal loops in graph.",
      mitigation: "Strict visited node memoization."
    },
    {
      id: "EC-03",
      title: "Identical Weights",
      icon: <Waypoints className="w-6 h-6 text-amber-500" />,
      desc: "Multiple optimal paths with equal cost.",
      mitigation: "Secondary heuristic sorting (e.g. fewer transfers)."
    },
    {
      id: "EC-04",
      title: "Dynamic Edge Failures",
      icon: <GitBranch className="w-6 h-6 text-amber-500" />,
      desc: "Tracks closing during active routing.",
      mitigation: "Real-time recalculation interceptors."
    },
    {
      id: "EC-05",
      title: "Capacity Overflow",
      icon: <Maximize2 className="w-6 h-6 text-amber-500" />,
      desc: "Exceeding train passenger limits.",
      mitigation: "Constraint-based capacity tracking."
    },
    {
      id: "EC-06",
      title: "Unreachable Dest",
      icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
      desc: "No valid path exists in graph.",
      mitigation: "Early exit reachability validation."
    },
    {
      id: "EC-07",
      title: "Negative Weights",
      icon: <ShieldAlert className="w-6 h-6 text-amber-500" />,
      desc: "Erroneous time discounts in data.",
      mitigation: "Absolute value sanitation layer."
    },
    {
      id: "EC-08",
      title: "Memory Thrashing",
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      desc: "Vast graph allocations exceeding RAM.",
      mitigation: "Lazy loading sectorial chunks."
    },
    {
      id: "EC-09",
      title: "Temporal Desync",
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      desc: "Time-table misalignment during query.",
      mitigation: "Atomic clock synchronization pulls."
    }
  ];

  return (
    <section id="requirements" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-alabaster mb-4">Requirement Analysis</h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full" />
          <p className="text-cyan/80 mt-6 text-lg">Detailed formal audit of system requirements and fault tolerances.</p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate/50 p-1.5 rounded-xl border border-cyan/20 inline-flex">
            <button
              onClick={() => setActiveTab('functional')}
              className={`px-6 py-3 rounded-lg text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 ${
                activeTab === 'functional' 
                  ? 'bg-cyan text-navy shadow-[0_0_15px_rgba(100,255,218,0.3)]' 
                  : 'text-alabaster/60 hover:text-alabaster'
              }`}
            >
              Functional Requirements
            </button>
            <button
              onClick={() => setActiveTab('non-functional')}
              className={`px-6 py-3 rounded-lg text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 ${
                activeTab === 'non-functional' 
                  ? 'bg-cyan text-navy shadow-[0_0_15px_rgba(100,255,218,0.3)]' 
                  : 'text-alabaster/60 hover:text-alabaster'
              }`}
            >
              Non-Functional Constraints
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'functional' ? (
              <motion.div
                key="functional"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                {/* Data Flow Visualization */}
                <div className="bg-slate/30 border border-slate-500/20 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-alabaster border-b border-cyan/20 pb-4 mb-8 flex items-center gap-3">
                    <DatabaseZap className="w-6 h-6 text-cyan" />
                    Algorithmic Data Flow
                  </h3>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Input Node */}
                    <div className="flex-1 bg-navy/80 border border-cyan/40 p-6 rounded-xl relative w-full shadow-[0_0_20px_rgba(100,255,218,0.1)]">
                      <div className="absolute top-0 right-0 p-2 text-xs font-mono text-cyan/50">INPUT</div>
                      <h4 className="font-bold text-alabaster mb-2">(Source, Dest)</h4>
                      <p className="text-sm text-alabaster/60">GPS/ID Node Selection</p>
                    </div>

                    <ArrowRight className="w-8 h-8 text-cyan animate-pulse hidden md:block" />

                    {/* Process Node */}
                    <div className="flex-1 bg-cyan/10 border-2 border-cyan p-6 rounded-xl relative w-full shadow-[0_0_30px_rgba(100,255,218,0.2)]">
                      <div className="absolute top-0 right-0 p-2 text-xs font-mono text-cyan/70">PROCESS</div>
                      <h4 className="font-bold text-cyan mb-2">Heuristic Engine</h4>
                      <p className="text-sm text-alabaster/80">Dijkstra + A* Routing Alg</p>
                      <div className="mt-4 h-1 w-full bg-navy rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyan"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                      </div>
                    </div>

                    <ArrowRight className="w-8 h-8 text-cyan animate-pulse hidden md:block" />

                    {/* Output Node */}
                    <div className="flex-1 bg-navy/80 border border-cyan/40 p-6 rounded-xl relative w-full shadow-[0_0_20px_rgba(100,255,218,0.1)]">
                      <div className="absolute top-0 right-0 p-2 text-xs font-mono text-cyan/50">OUTPUT</div>
                      <h4 className="font-bold text-alabaster mb-2">Optimal Path</h4>
                      <p className="text-sm text-alabaster/60">Weighted Edge Traversal</p>
                    </div>
                  </div>
                </div>

                {/* Functional Modules */}
                <div className="bg-slate/30 border border-cyan/20 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-alabaster border-b border-cyan/20 pb-4 mb-8 flex items-center gap-3">
                    <DatabaseZap className="w-6 h-6 text-cyan" />
                    Functional Modules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-navy/80 border border-cyan/10 rounded-3xl p-6">
                      <h4 className="text-lg font-semibold text-alabaster mb-3">Module 1: Graph Construction Engine</h4>
                      <p className="text-sm text-alabaster/70 leading-relaxed">
                        Handles the conversion of raw station data into a topological map, generating vertices, directed weighted edges, and an adjacency list representation for memory-efficient route modeling.
                      </p>
                    </div>
                    <div className="bg-navy/80 border border-cyan/10 rounded-3xl p-6">
                      <h4 className="text-lg font-semibold text-alabaster mb-3">Module 2: Pathfinding Analytics</h4>
                      <p className="text-sm text-alabaster/70 leading-relaxed">
                        Executes graph-traversal algorithms to compute shortest paths and route cost aggregation, supporting dynamic distance/time metrics for station-to-station navigation.
                      </p>
                    </div>
                    <div className="bg-navy/80 border border-cyan/10 rounded-3xl p-6">
                      <h4 className="text-lg font-semibold text-alabaster mb-3">Module 3: Spanning Tree Optimizer</h4>
                      <p className="text-sm text-alabaster/70 leading-relaxed">
                        Simplifies complex networks into hierarchical trees for infrastructure planning, deriving the minimum spanning tree to expose the most efficient backbone without redundancy.
                      </p>
                    </div>
                    <div className="bg-navy/80 border border-cyan/10 rounded-3xl p-6">
                      <h4 className="text-lg font-semibold text-alabaster mb-3">Module 4: Cycle Detection Logic</h4>
                      <p className="text-sm text-alabaster/70 leading-relaxed">
                        Uses DFS-based traversal to identify and manage loops in the railway tracks, isolating cyclic edge groups and preventing routing inconsistencies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edge Case Matrix */}
                <div>
                  <h3 className="text-xl font-bold text-alabaster mb-6 border-l-4 border-amber-500 pl-4 py-1">Edge Case Audit Matrix</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {edgeCases.map((ec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-slate/40 border border-amber-500/20 hover:border-amber-500/60 p-5 rounded-xl backdrop-blur-md transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                            {ec.icon}
                          </div>
                          <span className="text-xs font-mono bg-navy px-2 py-1 rounded text-amber-500/60 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-navy transition-colors">
                            {ec.id}
                          </span>
                        </div>
                        <h4 className="font-bold text-alabaster mb-1">{ec.title}</h4>
                        <p className="text-xs text-alabaster/60 mb-4">{ec.desc}</p>
                        <div className="bg-navy/80 p-3 rounded border border-cyan/10">
                          <span className="text-[10px] font-bold text-cyan uppercase mb-1 block">Mitigation Strategy</span>
                          <span className="text-xs font-mono text-cyan/90">{ec.mitigation}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="non-functional"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="bg-slate/40 border-l-2 border-cyan p-8 rounded-r-2xl">
                   <Network className="w-10 h-10 text-cyan mb-6" />
                   <h3 className="text-2xl font-bold mb-4">Low-Latency Topology</h3>
                   <p className="text-alabaster/70 text-sm leading-relaxed mb-6">
                     The system must deserialize graph topologies exceeding 100,000 nodes within client memory in strictly under 200ms. Any degradation initiates sub-sampling routines.
                   </p>
                   <div className="flex items-center gap-3 text-sm font-mono text-cyan/80">
                      <span className="font-bold text-cyan">KPI Target:</span>
                      <span>DOM Parsing &#x2264; 50ms</span>
                   </div>
                </div>

                <div className="bg-slate/40 border-l-2 border-cyan p-8 rounded-r-2xl">
                   <Layers className="w-10 h-10 text-cyan mb-6" />
                   <h3 className="text-2xl font-bold mb-4">Fault Tolerance</h3>
                   <p className="text-alabaster/70 text-sm leading-relaxed mb-6">
                     Web-worker threads isolating heuristic process memory must restart autonomously without corrupting the active render state upon encountering stack overflow anomalies.
                   </p>
                   <div className="flex items-center gap-3 text-sm font-mono text-cyan/80">
                      <span className="font-bold text-cyan">Method:</span>
                      <span>Dead-Letter Queuing</span>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
