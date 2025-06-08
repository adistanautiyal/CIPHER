import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import './App.css'
import Services from './components/Services'
import Contact from './components/Contact'

function App() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Landing Page Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <ParticleBackground />
        <Hero />
      </div>
      
      {/* About Us Section */}
      <AboutUs />
       {/* Services Section */}
      <Services />

      {/* Contact Section */}
      <Contact />
    </div>
  )
}

export default App