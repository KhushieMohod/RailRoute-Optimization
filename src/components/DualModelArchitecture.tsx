'use client';

import { motion } from 'framer-motion';
import { BlockMath } from 'react-katex';
import { GitBranch, TreeDeciduous } from 'lucide-react';

export default function DualModelArchitecture() {
  return (
    <section id="dual-model-architecture" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-alabaster mb-4">Dual-Model Architecture: Graphs & Trees</h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full" />
          <p className="text-cyan/80 mt-6 max-w-2xl mx-auto">
            A comparative exposition of connectivity and hierarchical representations for the railway network.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate/50 border border-cyan/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(18,52,76,0.15)]"
          >
            <div className="flex items-center gap-3 mb-6 text-cyan">
              <GitBranch className="w-8 h-8" />
              <div>
                <h3 className="text-2xl font-bold">Graph Implementation</h3>
                <p className="text-sm text-cyan/80">Connectivity & shortest-path discovery</p>
              </div>
            </div>
            <div className="space-y-5 text-alabaster/80">
              <div>
                <h4 className="text-lg font-semibold text-alabaster">Weighted Directed Graph</h4>
                <p className="mt-2 leading-relaxed text-sm">
                  The railway is modeled as a weighted directed graph where stations are vertices and travel segments are directed edges. Edge weights encode distance, travel time, or operational cost.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-alabaster">Adjacency List Efficiency</h4>
                <p className="mt-2 leading-relaxed text-sm">
                  Connectivity is stored using an adjacency list to minimize memory overhead for sparse transit networks, allowing rapid neighbor enumeration and incremental updates.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-alabaster">Shortest-Path Routing</h4>
                <p className="mt-2 leading-relaxed text-sm">
                  Dijkstra&apos;s Algorithm traverses the graph from source to destination, selecting the minimum cumulative weight path under dynamic distance/time metrics.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-navy/70 p-5 border border-cyan/10">
                <p className="text-cyan font-semibold mb-2">Mathematical Formalism</p>
                <BlockMath math="G = (V, E)" />
                <p className="text-sm text-alabaster/70 mt-3">
                  A graph with vertex set <span className="font-mono">V</span> and edge set <span className="font-mono">E</span> for directed route connectivity.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate/50 border border-cyan/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(18,52,76,0.15)]"
          >
            <div className="flex items-center gap-3 mb-6 text-cyan">
              <TreeDeciduous className="w-8 h-8" />
              <div>
                <h3 className="text-2xl font-bold">Tree Implementation</h3>
                <p className="text-sm text-cyan/80">Hierarchy & network backbone optimization</p>
              </div>
            </div>
            <div className="space-y-5 text-alabaster/80">
              <div>
                <h4 className="text-lg font-semibold text-alabaster">Minimum Spanning Tree</h4>
                <p className="mt-2 leading-relaxed text-sm">
                  The system derives an MST using Kruskal&apos;s or Prim&apos;s algorithm to identify the most efficient backbone spanning all stations while minimizing total edge weight.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-alabaster">Parent-Child Hierarchy</h4>
                <p className="mt-2 leading-relaxed text-sm">
                  Hierarchical trees represent hub stations as parent nodes with local stop branches as children, enabling structured route aggregation and branch-level optimization.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-navy/70 p-5 border border-cyan/10">
                <p className="text-cyan font-semibold mb-2">Mathematical Formalism</p>
                <BlockMath math="T = (V, E')" />
                <BlockMath math="|E'| = |V| - 1" />
                <p className="text-sm text-alabaster/70 mt-3">
                  A spanning tree with a reduced edge set <span className="font-mono">E&apos;</span> preserving connectivity and hierarchy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
