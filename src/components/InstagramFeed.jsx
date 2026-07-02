import React from 'react'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const INSTAGRAM_HANDLE = 'polo_bs_designs'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

/**
 * NOTE FOR THE DEV TEAM — upgrading to a live, auto-updating feed:
 * A true embedded Instagram grid (pulling real posts automatically) needs
 * a small free third-party widget, because Instagram doesn't offer a public
 * no-auth embed for a whole profile. There's no signup-free way around
 * that — it requires connecting the shop's own Instagram account once.
 *
 * Quick path (~2 minutes, free): create a widget at https://snapwidget.com
 * pointed at @polo_bs_designs, then paste the widget ID it gives you into
 * SNAPWIDGET_ID below. Once set, this section automatically swaps the photo
 * grid below for a live iframe embed — no other code changes needed.
 */
const SNAPWIDGET_ID = ''

// Reuses real shop photos already in the project for the preview grid, so
// this section looks intentional and finished even before a live feed is
// wired up — nothing here reads as a placeholder to site visitors.
const PREVIEW_IMAGES = [
  '/images/personalizacion.jpg',
  '/images/mantenimiento.jpg',
  '/images/restauracion.jpg',
  '/videos/hero-poster.jpg',
]

export default function InstagramFeed() {
  const hasLiveEmbed = SNAPWIDGET_ID.trim().length > 0

  return (
    <section id="instagram" className="relative bg-obsidian-2 px-6 py-28 sm:px-10 lg:px-16">
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
              Síguenos
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tightest text-porcelain sm:text-5xl">
              Nuestro trabajo, día a día.
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-chrome-300">
            Compartimos cada restauración, personalización y detalle del
            taller en Instagram — la forma más fácil de ver nuestro trabajo
            entre visita y visita.
          </p>
        </motion.div>

        {hasLiveEmbed ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 overflow-hidden rounded-2xl border border-chrome-300/15"
          >
            <iframe
              src={`https://snapwidget.com/embed/${SNAPWIDGET_ID}`}
              className="w-full"
              style={{ border: 'none', overflow: 'hidden', minHeight: 480 }}
              title={`Feed de Instagram de @${INSTAGRAM_HANDLE}`}
              loading="lazy"
            />
          </motion.div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {PREVIEW_IMAGES.map((src, i) => (
              <motion.a
                key={src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="clearcoat-sweep group relative aspect-square overflow-hidden rounded-xl border border-chrome-300/10"
              >
                <img
                  src={src}
                  alt="Publicación de Polo Designs en Instagram"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-colors duration-300 group-hover:bg-obsidian/50">
                  <Instagram
                    className="h-6 w-6 text-porcelain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    strokeWidth={1.6}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="clearcoat-sweep inline-flex items-center gap-2 rounded-full border border-chrome-300/30 px-7 py-3.5 font-body text-sm font-medium text-porcelain transition-colors duration-300 hover:border-azure-300/60 hover:text-azure-300"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.8} />
            Ver @{INSTAGRAM_HANDLE}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
