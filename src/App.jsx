import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import InstagramFeed from './components/InstagramFeed.jsx'
import TrustBar from './components/TrustBar.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import GrainOverlay from './components/GrainOverlay.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-obsidian">
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <InstagramFeed />
        <TrustBar />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
