import React, { useRef, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Bump this any time hero-track.mp4 / hero-poster.jpg are replaced with a
// new file, so browsers and GitHub Pages' CDN fetch the new version instead
// of serving a stale cached copy under the same filename.
const HERO_VIDEO_VERSION = 2

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  // Subtle cinematic zoom on the video as the hero is scrolled past —
  // reads from Framer Motion's scroll progress, so no manual scroll
  // listeners are needed.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  // React's `muted` JSX prop doesn't always reach the underlying DOM
  // property in time for mobile browsers' autoplay check, which silently
  // blocks playback (a well-known React/video quirk). Setting it directly
  // on the element, then explicitly calling play(), makes autoplay work
  // reliably on phones/tablets instead of just showing the poster frame.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked (e.g. data-saver mode) — poster frame stays
        // visible instead of a broken/black video, so this is a safe no-op.
      })
    }
  }, [])

  const headline = useMemo(
    () => ['Restauración y', 'mantenimiento de motos', 'en San Miguel.'],
    []
  )

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[70svh] w-full overflow-hidden bg-obsidian sm:min-h-[80svh] lg:min-h-[100svh]"
    >
      {/* Background video layer. The ?v= on the URLs is a cache-buster —
          bump HERO_VIDEO_VERSION below whenever the video file changes, so
          browsers/CDNs don't keep serving a stale cached copy under the
          same filename. */}
      <motion.video
        ref={videoRef}
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 h-full w-full object-cover"
        src={`/videos/hero-track.mp4?v=${HERO_VIDEO_VERSION}`}
        poster={`/videos/hero-poster.jpg?v=${HERO_VIDEO_VERSION}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Gradient scrim so headline/CTA stay legible over the footage */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/70" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/30" />

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex min-h-[70svh] w-full max-w-7xl flex-col justify-end px-6 pb-24 pt-40 sm:min-h-[80svh] sm:px-10 lg:min-h-[100svh] lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-mono text-xs uppercase tracking-widest2 text-chrome-300"
        >
          San Miguel, Lima — Taller especializado en motos
        </motion.p>

        <h1 className="max-w-3xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tightest text-porcelain sm:text-6xl lg:text-7xl">
          {headline.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-balance font-body text-base text-chrome-200 sm:text-lg"
        >
          Restauración de pintura, personalización y mantenimiento preventivo
          para quienes ven su moto como algo más que transporte. Acabado de
          taller de alta gama, en el corazón de San Miguel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contacto"
            className="clearcoat-sweep group relative inline-flex items-center gap-2 rounded-full bg-porcelain px-7 py-3.5 font-body text-sm font-medium text-obsidian shadow-glow-azure transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Reserva tu evaluación
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#trabajos"
            className="rounded-full border border-chrome-300/30 px-7 py-3.5 font-body text-sm font-medium text-porcelain transition-colors duration-300 hover:border-azure-300/60 hover:text-azure-300"
          >
            Ver restauraciones
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-chrome-300/40 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-chrome-200" />
        </motion.div>
      </motion.div>
    </section>
  )
}
