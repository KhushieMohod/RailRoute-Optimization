'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Train } from 'lucide-react';

export default function Loader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: 'backIn' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy/95 backdrop-blur-xl"
    >
      <div className="relative w-64 h-16 flex items-center justify-center">
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate overflow-hidden rounded-full">
          {/* Moving Line along track */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: 'linear' 
            }}
            className="w-1/2 h-full bg-cyan shadow-[0_0_10px_#64ffda]"
          />
        </div>
        
        {/* Train Icon */}
        <motion.div 
          initial={{ x: -128 }}
          animate={{ x: 128 }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="absolute text-cyan bg-navy p-2 rounded-full border border-cyan/30"
        >
          <Train className="w-6 h-6" />
        </motion.div>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-6 font-mono text-cyan text-sm font-bold tracking-widest uppercase"
      >
        Initializing Routes...
      </motion.p>
    </motion.div>
  );
}
