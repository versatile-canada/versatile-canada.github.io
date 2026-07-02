import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-chrome-300/10 bg-obsidian px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="Polo BS Designs" className="h-8 w-8 rounded-full" />
          <span className="font-display text-xs font-medium uppercase tracking-widest2 text-chrome-300">
            Polo Designs
          </span>
        </div>

        <p className="font-mono text-xs text-chrome-400">
          © {new Date().getFullYear()} Polo Designs. San Miguel, Lima, Perú.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/polo_bs_designs/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-chrome-300 transition-colors hover:text-porcelain"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/51900000000"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-chrome-300 transition-colors hover:text-porcelain"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
