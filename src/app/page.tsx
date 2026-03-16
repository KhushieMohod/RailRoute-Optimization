'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ProblemAnalysis from '@/components/ProblemAnalysis';
import Requirements from '@/components/Requirements';
import NetworkPreview from '@/components/NetworkPreview';
import Anatomy from '@/components/Anatomy';
import Objectives from '@/components/Objectives';
import Constraints from '@/components/Constraints';
import Roadmap from '@/components/Roadmap';
import Rubric from '@/components/Rubric';
import Loader from '@/components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-12 w-full"
        >
          <Hero />
          <ProblemAnalysis />
          <NetworkPreview />
          <Requirements />
          <Anatomy />
          <Objectives />
          <Constraints />
          <Roadmap />
          <Rubric />
        </motion.div>
      )}
    </>
  );
}
