import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Programs from './components/Programs.jsx'
import Partners from './components/Partners.jsx'
import News from './components/News.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Admin from './components/Admin.jsx'

export default function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
    return <Admin />
  }

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Programs />
      <Partners />
      <News />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
