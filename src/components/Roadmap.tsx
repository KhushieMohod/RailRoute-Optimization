'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, Rocket, Code2, ShieldCheck, Database } from 'lucide-react';

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Architectural Foundation',
    icon: Database,
    description: 'Establishment of the Next.js App Router ecosystem, integration of Tailwind CSS for theming, and Framer Motion for structural animations. Defined the core graph modeling entities.',
    status: 'Completed'
  },
  {
    phase: 'Phase 2',
    title: 'Algorithmic Integration',
    icon: Code2,
    description: 'Implementation of the React Flow spatial renderer. Construction of topological pathfinding heuristics (Dijkstra) and Minimum Spanning Tree evaluation (Kruskal).',
    status: 'Completed'
  },
  {
    phase: 'Phase 3',
    title: 'Edge Case Audit & Mitigation',
    icon: ShieldCheck,
    description: 'Stress-testing against cyclic routes, isolated nodes, and identical path weights. Development of the comprehensive Requirements Matrix and Constraints evaluation.',
    status: 'Completed'
  },
  {
    phase: 'Phase 4',
    title: 'Production Deployment',
    icon: Rocket,
    description: 'Final Webpack build optimization, resolution of strict TypeScript/ESLint constraints, and deployment pipelining for continuous integration processes.',
    status: 'In Progress'
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 relative bg-navy">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-alabaster mb-4 flex items-center justify-center gap-3"
          >
            <Milestone className="w-8 h-8 text-cyan" />
            Development Roadmap
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-cyan/80 text-lg"
          >
            A chronological timeline of systemic development and deployment phases.
          </motion.p>
        </div>

        <div className="relative border-l-2 border-slate ml-4 md:ml-1/2">
          {PHASES.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 relative pl-8 md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute w-10 h-10 bg-navy border-2 border-cyan rounded-full flex items-center justify-center left-[-21px] top-0 shadow-[0_0_15px_rgba(100,255,218,0.4)]">
                  <Icon className="w-5 h-5 text-cyan" />
                </div>
                
                <div className="bg-slate/30 backdrop-blur-md p-6 rounded-xl border border-cyan/20 ml-2 hover:border-cyan/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <span className="text-cyan font-mono text-sm tracking-wider font-bold">{phase.phase}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border mb-2 md:mb-0 w-max ${
                      phase.status === 'Completed' 
                        ? 'bg-cyan/10 border-cyan text-cyan' 
                        : 'bg-amber-500/10 border-amber-500 text-amber-500'
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-alabaster mb-3">{phase.title}</h3>
                  <p className="text-alabaster/70 leading-relaxed text-sm">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
