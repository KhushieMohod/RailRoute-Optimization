'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProblemAnalysis() {
  return (
    <section id="problem" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-alabaster mb-4">Problem Analysis</h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: Real-World Chaos */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate/40 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]"
          >
            <div className="flex items-center gap-4 mb-6 text-red-400">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="text-2xl font-semibold">The Real-World Chaos</h3>
            </div>
            <p className="text-alabaster/80 mb-6 leading-relaxed">
              Current transit visualization methodologies fail to adequately represent the intrinsic complexity of multi-modal routing. The unstructured aggregation of spatiotemporal data leads to visual obstruction and cognitive overload.
            </p>
            <ul className="space-y-3 text-sm text-alabaster/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span>Inefficient rendering of dense topological clusters.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span>Suboptimal real-time anomaly propagation.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span>Lack of predictive modeling integration.</span>
              </li>
            </ul>
          </motion.div>

          {/* Column 2: Algorithmic Solution */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate/40 backdrop-blur-md rounded-2xl p-8 border border-cyan/20 shadow-[0_0_30px_rgba(100,255,218,0.08)]"
          >
            <div className="flex items-center gap-4 mb-6 text-cyan">
              <CheckCircle2 className="w-8 h-8" />
              <h3 className="text-2xl font-semibold">The Algorithmic Solution</h3>
            </div>
            <p className="text-alabaster/80 mb-6 leading-relaxed">
              By applying advanced graph-theoretic algorithms and heuristic optimization techniques, we synthesize structured, coherent visual narratives from high-dimensional transit datasets.
            </p>
            <ul className="space-y-3 text-sm text-alabaster/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 flex-shrink-0" />
                <span>Planar embedding optimizations for minimal edge crossing.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 flex-shrink-0" />
                <span>Dijkstra&apos;s &amp; A* integration for dynamic pathfinding logic.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 flex-shrink-0" />
                <span>Real-time graph recalculation using Web Workers.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
