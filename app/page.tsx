"use client"

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[80vw] h-[80vw] rounded-full bg-gradient-to-t from-primary/30 to-secondary/30 blur-3xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2" />
        <div className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-accent/20 to-background/20 blur-2xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Hero section */}
        <section className="h-[90vh] flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Harmony
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mt-4"
          >
            Data Made Beautiful.
          </motion.p>
        </section>

      </div>
    </main>
  );
}
