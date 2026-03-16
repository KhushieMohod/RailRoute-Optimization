'use client';

import { motion } from 'framer-motion';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { GitGraph, FastForward, GitMerge, MapPin } from 'lucide-react';

export default function Anatomy() {
  const cards = [
    {
      title: "Graphs",
      icon: <GitGraph className="w-8 h-8 text-cyan" />,
      frontDesc: "Modeling non-linear station connectivity.",
      math: "G = (V, E)",
      backDesc: "A tuple where V represents station vertices and E signifies track edges. This formulation is cardinal to topological algorithms."
    },
    {
      title: "Weighted Edges",
      icon: <FastForward className="w-8 h-8 text-cyan" />,
      frontDesc: "Representing cost, time, and distance.",
      math: "w: E \\to \\mathbb{R}^+",
      backDesc: "A function assigning a non-negative real weight to each edge, enabling optimized heuristic pathfinding (e.g., Dijkstra)."
    },
    {
      title: "Trees",
      icon: <GitMerge className="w-8 h-8 text-cyan" />,
      frontDesc: "For hierarchical routing and MSTs.",
      math: "T \\subseteq G",
      backDesc: "A connected acyclic subgraph that minimizes infrastructure cost over the entire transit network, typically computed via Kruskal's."
    },
    {
      title: "Spatial Mapping",
      icon: <MapPin className="w-8 h-8 text-cyan" />,
      frontDesc: "Translating GPS coordinates to adjacency lists.",
      math: "f: (\\lambda, \\phi) \\to V_i",
      backDesc: "A mapping function that discretizes continuous longitudinal and latitudinal coordinates into computational nodes within the graph."
    }
  ];

  return (
    <section id="anatomy" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-alabaster mb-4">The Anatomy of RailRoute</h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full" />
          <p className="text-alabaster/70 mt-6 max-w-2xl mx-auto">
            Deconstructing the topological foundations using formal graph theory constructs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="w-full h-[320px] group [perspective:1000px]"
            >
              <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative">
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full bg-slate/50 backdrop-blur-md rounded-2xl p-6 border border-cyan/20 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(100,255,218,0.2)]">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-alabaster mb-3">{card.title}</h3>
                  <p className="text-sm text-alabaster/70 font-mono">
                    {card.frontDesc}
                  </p>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full bg-navy backdrop-blur-md rounded-2xl p-6 border border-cyan flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[0_0_30px_rgba(100,255,218,0.15)]">
                  <div className="mb-4 text-cyan w-full overflow-hidden">
                    <BlockMath math={card.math} />
                  </div>
                  <p className="text-sm text-alabaster/80 leading-relaxed font-mono">
                    {card.backDesc}
                  </p>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
