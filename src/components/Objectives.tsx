'use client';

import { motion } from 'framer-motion';
import { Network, Zap, Cpu, Database } from 'lucide-react';

export default function Objectives() {
  const objectives = [
    {
      title: "Topological Integrity",
      desc: "Preserving the spatial mapping relationships whilst applying deformation algorithms to ensure uniform informational density.",
      icon: <Network className="w-6 h-6" />,
      colSpan: "md:col-span-2"
    },
    {
      title: "O(1) Access",
      desc: "Optimized data structures for immediate schedule retrieval in vast transit nodes.",
      icon: <Zap className="w-6 h-6" />,
      colSpan: "md:col-span-1"
    },
    {
      title: "Computational Efficiency",
      desc: "Minimizing DOM repaints overhead via generic canvas rendering strategies.",
      icon: <Cpu className="w-6 h-6" />,
      colSpan: "md:col-span-1"
    },
    {
      title: "Data Mutability",
      desc: "Unidirectional data flow architectures enabling predictable state transformations under high-frequency updates.",
      icon: <Database className="w-6 h-6" />,
      colSpan: "md:col-span-2"
    }
  ];

  return (
    <section id="objectives" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-alabaster mb-4">Strategic Objectives</h2>
          <p className="text-cyan/80 max-w-2xl text-lg">Core targets for our robust visualization engine architecture.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-slate/60 backdrop-blur-md rounded-2xl p-6 border border-slate-500/20 hover:border-cyan/40 transition-colors flex flex-col justify-between ${obj.colSpan}`}
            >
              <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center text-cyan border border-cyan/10">
                {obj.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-alabaster mb-2">{obj.title}</h3>
                <p className="text-sm text-alabaster/60 leading-relaxed">{obj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
