'use client';

import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Train } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex items-center pt-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-alabaster tracking-tight">
            Rail<span className="text-cyan">Route</span>
          </h1>
          <div className="text-xl md:text-2xl text-cyan/90 h-16">
            <Typewriter 
              words={[
                'Algorithmic Transit Optimization.',
                'Mastering Topology & Scale.',
                'Heuristic Routing Solutions.'
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
          <p className="text-lg text-alabaster/70 max-w-lg leading-relaxed">
            A state-of-the-art visualization engine for exploring the computational complexity of modern railway networks.
          </p>
          <div className="pt-4">
            <button className="px-8 py-3 bg-cyan text-navy font-bold rounded-lg hover:bg-cyan/80 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(100,255,218,0.4)]">
              Initialize Analysis
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Glowing node-link visualization mockup */}
          <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] bg-slate/50 rounded-full border border-cyan/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(100,255,218,0.15)] glow-container">
            <Train className="w-32 h-32 text-cyan drop-shadow-[0_0_15px_rgba(100,255,218,0.8)] relative z-10" />
            
            {/* Abstract nodes orbiting - absolute positioned */}
            <div className="absolute top-10 left-20 w-3 h-3 bg-cyan rounded-full shadow-[0_0_10px_rgba(100,255,218,1)]" />
            <div className="absolute bottom-20 right-10 w-4 h-4 bg-alabaster rounded-full shadow-[0_0_10px_rgba(230,241,255,1)]" />
            <div className="absolute top-1/2 right-4 w-2 h-2 bg-cyan rounded-full shadow-[0_0_10px_rgba(100,255,218,1)]" />
            
            <svg className="absolute inset-0 w-full h-full opacity-30 z-0" viewBox="0 0 100 100">
               <line x1="25" y1="20" x2="50" y2="50" stroke="#64ffda" strokeWidth="0.5" />
               <line x1="80" y1="70" x2="50" y2="50" stroke="#64ffda" strokeWidth="0.5" />
               <line x1="90" y1="40" x2="50" y2="50" stroke="#e6f1ff" strokeWidth="0.5" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
