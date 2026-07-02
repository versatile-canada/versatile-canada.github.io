import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contacto" className="relative bg-obsidian px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-navy-radial p-10 sm:p-16"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-azure-500/20 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest2 text-azure-300/80">
                Agenda tu cita
              </p>
              <h2 className="mt-4 max-w-md text-balance font-display text-4xl font-medium tracking-tightest text-porcelain sm:text-5xl">
                Tu moto merece un acabado que dure.
              </h2>
              <p className="mt-6 max-w-md font-body text-sm text-chrome-200 sm:text-base">
                Cuéntanos qué necesita tu moto y te respondemos con un
                diagnóstico y una cotización el mismo día.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/51900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clearcoat-sweep inline-flex items-center gap-2 rounded-full bg-porcelain px-7 py-3.5 font-body text-sm font-medium text-obsidian transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Escríbenos por WhatsApp
                </a>
                <a
                  href="tel:+51900000000"
                  className="inline-flex items-center gap-2 rounded-full border border-chrome-300/30 px-7 py-3.5 font-body text-sm font-medium text-porcelain transition-colors duration-300 hover:border-azure-300/60 hover:text-azure-300"
                >
                  Llamar al taller
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <dl className="space-y-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest2 text-chrome-300">
                    Ubicación
                  </dt>
                  <dd className="mt-1 font-display text-lg text-porcelain">San Miguel, Lima</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest2 text-chrome-300">
                    Horario
                  </dt>
                  <dd className="mt-1 font-display text-lg text-porcelain">Lun – Sáb, 9:00 – 19:00</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest2 text-chrome-300">
                    Correo
                  </dt>
                  <dd className="mt-1 font-display text-lg text-porcelain">hola@polodesigns.pe</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
