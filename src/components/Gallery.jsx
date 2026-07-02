import React from 'react'
import { motion } from 'framer-motion'

/**
 * NOTE FOR THE DEV TEAM:
 * Bajaj Dominar and Honda XR150 still use gradient placeholders (`swatch`)
 * since there's no real photo for them yet. Once one's available, add an
 * `image` field the same way Honda CB190R and Yamaha MT-03 do below — no
 * other changes needed, the card automatically prefers a real photo over
 * the gradient when `image` is present.
 */
const WORK = [
  {
    bike: 'Honda CB190R',
    finish: 'Azul perla — restauración total',
    image: '/images/gallery-honda-cb190r.jpg',
    swatch: 'linear-gradient(135deg, #101A44 0%, #22357A 45%, #5C7CF0 100%)',
  },
  {
    bike: 'Yamaha MT-03',
    finish: 'Negro mate — personalización',
    image: '/images/gallery-yamaha-mt03.jpg',
    swatch: 'linear-gradient(135deg, #08090C 0%, #1B2030 50%, #3A4050 100%)',
  },
  {
    bike: 'Bajaj Dominar',
    finish: 'Gris grafito — reparación de golpe',
    swatch: 'linear-gradient(135deg, #14171C 0%, #3A3F47 50%, #AEB4BF 100%)',
  },
  {
    bike: 'Honda XR150',
    finish: 'Azul navy — restauración de tanque',
    swatch: 'linear-gradient(135deg, #080B1A 0%, #182658 50%, #8CA3FF 100%)',
  },
]

export default function Gallery() {
  return (
    <section id="trabajos" className="relative bg-obsidian-2 px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest2 text-azure-300/80">
              Trabajos recientes
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tightest text-porcelain sm:text-5xl">
              El acabado habla por nosotros.
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-chrome-300">
            Una muestra de restauraciones y personalizaciones entregadas en
            San Miguel y alrededores.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WORK.map((item, i) => (
            <motion.div
              key={item.bike}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="clearcoat-sweep group relative aspect-[3/4] overflow-hidden rounded-2xl border border-chrome-300/10"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.bike}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ background: item.swatch }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-medium text-porcelain">{item.bike}</p>
                <p className="mt-1 font-mono text-xs text-chrome-200">{item.finish}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
