'use client';

import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function Constraints() {
  const constraints = [
    {
      id: "C-01",
      title: "Hard NP-Completeness",
      desc: "Finding optimal sub-graphs for user arbitrary waypoints mapping onto existing routing paths exhibits polynomial time intractability."
    },
    {
      id: "C-02",
      title: "Heuristic Degradation",
      desc: "Over-reliance on greedy heuristic optimization may lead to unpredicted convergence anomalies in dynamically updating environments."
    },
    {
      id: "C-03",
      title: "Render Throttling",
      desc: "Simultaneous animation of >10,000 distinct SVG nodes on standard consumer browsers faces severe frame-rate degradation."
    }
  ];

  return (
    <section id="constraints" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-amber-500 mb-4 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8" />
            System Constraints
          </h2>
          <div className="w-full h-[1px] bg-amber-500/20 mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {constraints.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-amber-950/20 backdrop-blur-md rounded-xl p-6 border-l-4 border-amber-500 border-t border-t-amber-500/10 border-r border-r-amber-500/10 border-b border-b-amber-500/10 shadow-[0_10px_30px_rgba(245,158,11,0.05)] hover:bg-amber-900/20 transition-all group"
            >
              <div className="text-xs font-mono text-amber-500/60 mb-2 group-hover:text-amber-400/80 transition-colors">{c.id}</div>
              <h3 className="text-xl font-bold text-amber-500 mb-3">{c.title}</h3>
              <p className="text-sm text-alabaster/70 leading-relaxed font-mono">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
