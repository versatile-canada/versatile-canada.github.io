import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

const SERVICES = [
  {
    title: 'Personalización',
    description:
      'Diseño de líneas, calcomanías, acabados mate o candy y detalles a medida para una moto que no se confunde con ninguna otra.',
    specs: ['Diseño en 3 propuestas', 'Vinil, pintura o mixto', 'Asesoría de estilo incluida'],
    image: '/images/personalizacion.jpg',
  },
  {
    title: 'Mantenimiento preventivo',
    description:
      'Revisión completa antes de que el desgaste se convierta en un problema: frenos, fluidos, cadena y puntos críticos del motor.',
    specs: ['Check-list de 28 puntos', 'Reporte fotográfico', 'Recordatorio de próximo servicio'],
    image: '/images/mantenimiento.jpg',
  },
  {
    title: 'Restauración de pintura',
    description:
      'Eliminación de rayones, óxido y golpes con preparación profesional, base, color y clearcoat de grado automotriz.',
    specs: ['Igualación exacta de color', 'Clearcoat de alta resistencia', 'Garantía de acabado'],
    image: '/images/restauracion.jpg',
  },
]

function TiltCard({ service, index }) {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])
  const glareBackground = useMotionTemplate`radial-gradient(280px circle at ${glareX} ${glareY}, rgba(140,163,255,0.14), transparent 70%)`

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative overflow-hidden rounded-2xl border border-chrome-300/15 bg-obsidian-2"
      >
        {/* Mouse-follow glare, reinforcing the paint-shop clearcoat motif */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />

        {/* Image block */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Legibility scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-2 via-obsidian-2/15 to-black/10" />

          {/* Corner brackets — a nod to inspection-tag/garage-ticket markings */}
          <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-azure-300/60" />
          <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-azure-300/60" />
        </div>

        {/* Text block — solid background, guaranteed legible regardless of the image above */}
        <div className="relative p-8" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-display text-2xl font-medium text-porcelain">{service.title}</h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-chrome-300">{service.description}</p>

          <ul className="mt-6 space-y-2.5 border-t border-chrome-300/10 pt-6">
            {service.specs.map((spec) => (
              <li key={spec} className="flex items-center gap-2.5 font-mono text-xs text-chrome-200">
                <span className="h-1 w-1 rounded-full bg-azure-400" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="relative bg-obsidian px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-widest2 text-azure-300/80">
            Lo que hacemos
          </p>
          <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tightest text-porcelain sm:text-5xl">
            Tres servicios. Un mismo estándar.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
