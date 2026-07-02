import React from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '1,200+', label: 'motos atendidas' },
  { value: '12', label: 'años de experiencia' },
  { value: '28', label: 'puntos de revisión' },
  { value: 'San Miguel', label: 'Lima, Perú' },
]

export default function TrustBar() {
  return (
    <section className="border-y border-chrome-300/10 bg-navy-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 sm:px-10 md:grid-cols-4 lg:px-16">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-3xl font-medium text-porcelain sm:text-4xl">{stat.value}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest2 text-chrome-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
