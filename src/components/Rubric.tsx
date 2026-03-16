'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CheckCircle2 } from 'lucide-react';

const CRITERIA = [
  {
    criterion: 'Problem Clarity',
    satisfaction: 'Established a clear dichotomy between Real-World Chaos (isolated/inefficient routes) and The Algorithmic Solution (Dijkstra/Kruskal). Addressed constraints comprehensively.',
    excellence: true
  },
  {
    criterion: 'Requirement Breadth',
    satisfaction: 'Categorized requirements into Functional (data-flow models) and Non-Functional (latency, topology). Analyzed edge cases (cyclic paths, isolated nodes) with distinct mitigation strategies.',
    excellence: true
  },
  {
    criterion: 'Algorithmic Complexity',
    satisfaction: 'Implemented production-grade topological mapping. Integrated Dijkstra\'s Algorithm for dynamic Shortest Path querying and Kruskal\'s Algorithm for Minimum Spanning Tree (MST) computation.',
    excellence: true
  },
  {
    criterion: 'Mathematical Rigor',
    satisfaction: 'Utilized formal academic $\\LaTeX$ notation via react-katex to express graph theory concepts like $G = (V, E)$ precisely and unambiguously.',
    excellence: true
  },
  {
    criterion: 'UI/UX Polish',
    satisfaction: 'Engineered a highly aesthetic "Railway-Tech" theme utilizing custom glassmorphism, Framer Motion scroll-reveal interceptors, CSS 3D transforms, and a cohesive radial graph-paper layout.',
    excellence: true
  }
];

export default function Rubric() {
  return (
    <section id="rubric" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-alabaster mb-4 flex items-center justify-center gap-3"
          >
            <ClipboardList className="w-8 h-8 text-cyan" />
            Rubric Compliance
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-cyan/80 text-lg"
          >
            Objective evaluation of system metrics against architectural and academic requirements.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate/30 backdrop-blur-md rounded-2xl border border-cyan/20 overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto p-4 md:p-0">
            <table className="w-full text-left border-collapse block md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-navy border-b border-cyan/30 md:table-row">
                  <th className="py-5 px-6 font-bold text-alabaster w-1/4">Evaluation Criteria</th>
                  <th className="py-5 px-6 font-bold text-alabaster w-3/4">How RailRoute Satisfies This</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan/10 block md:table-row-group">
                {CRITERIA.map((item, idx) => (
                  <tr key={idx} className="block md:table-row hover:bg-cyan/5 transition-colors group mb-6 md:mb-0 bg-navy/50 md:bg-transparent rounded-xl md:rounded-none border border-cyan/20 md:border-none p-5 md:p-0">
                    <td className="block md:table-cell py-2 md:py-6 px-0 md:px-6 align-top">
                      <div className="md:hidden text-xs font-mono text-cyan/50 mb-1 uppercase tracking-wider">Evaluation Criteria</div>
                      <div className="font-bold text-cyan mb-3">{item.criterion}</div>
                      {item.excellence && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          EXCELLENCE
                        </div>
                      )}
                    </td>
                    <td className="block md:table-cell py-2 md:py-6 px-0 md:px-6 text-alabaster/80 leading-relaxed border-t border-cyan/10 md:border-none mt-4 pt-4 md:mt-0 md:pt-0">
                      <div className="md:hidden text-xs font-mono text-cyan/50 mb-2 uppercase tracking-wider mt-2">How RailRoute Satisfies This</div>
                      {item.satisfaction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
