"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen relative">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[80vw] h-[80vw] rounded-full bg-gradient-to-t from-primary/30 to-secondary/30 blur-3xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2" />
        <div className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-accent/20 to-background/20 blur-2xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3" />
      </div>

      {/* Content */}
      <div className="relative">
        <section className="h-[90vh] flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl mt-4"
            >
              Page Not Found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl mt-4 text-muted-foreground"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Return Home
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  )
} 