import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-8">
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`glass flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-shadow duration-500 sm:px-7 ${
          scrolled ? 'shadow-glass' : ''
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="Polo BS Designs" className="h-9 w-9 rounded-full" />
          <span className="font-display text-sm font-medium uppercase tracking-widest2 text-porcelain">
            Polo Designs
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-chrome-200 transition-colors duration-200 hover:text-porcelain"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="clearcoat-sweep hidden rounded-full bg-porcelain px-5 py-2.5 font-body text-sm font-medium text-obsidian transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97] md:inline-flex"
        >
          Reserva tu cita
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-5">
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 block h-[1.5px] w-5 origin-center bg-porcelain"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 bg-porcelain"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 block h-[1.5px] w-5 origin-center bg-porcelain"
            />
          </span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-4 top-[4.5rem] flex flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 font-body text-sm text-chrome-200 transition-colors hover:bg-white/5 hover:text-porcelain"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-porcelain px-3 py-3 text-center font-body text-sm font-medium text-obsidian"
            >
              Reserva tu cita
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
