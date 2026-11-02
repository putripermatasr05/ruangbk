import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Beranda from './components/pages/Beranda'
import Profil from './components/pages/Profil'
import Layanan from './components/pages/Layanan'
import Galeri from './components/pages/Galeri'
import Konsultasi from './components/pages/Konsultasi'
import PortalKonselor from './components/pages/PortalKonselor'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
}

const pages = {
  beranda: Beranda,
  profil: Profil,
  layanan: Layanan,
  galeri: Galeri,
  konsultasi: Konsultasi,
  konselor: PortalKonselor,
  admin: PortalKonselor,
}

const getInitialPage = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase()
  if (hash === 'konselor' || hash === 'admin' || hash === 'portal-konselor') {
    return 'konselor'
  }
  const path = window.location.pathname.replace('/', '').toLowerCase()
  if (path === 'konselor' || path === 'admin') {
    return 'konselor'
  }
  return 'beranda'
}

export default function App() {
  const [activePage, setActivePage] = useState(getInitialPage)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      if (hash === 'konselor' || hash === 'admin' || hash === 'portal-konselor') {
        setActivePage('konselor')
      } else if (pages[hash]) {
        setActivePage(hash)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigate = (page) => {
    if (pages[page]) {
      setActivePage(page)
      if (page === 'konselor' || page === 'admin') {
        window.location.hash = 'konselor'
      } else {
        if (window.location.hash.replace('#', '') === 'konselor' || window.location.hash.replace('#', '') === 'admin') {
          window.location.hash = ''
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  const PageComponent = pages[activePage] || Beranda
  const isCounselorPortal = activePage === 'konselor' || activePage === 'admin'
  const isChatPage = activePage === 'konsultasi'

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-slate-800 relative">
      {/* Background Aurora Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="orb orb-1 absolute w-[520px] h-[520px] bg-purple-300/35 -top-24 -left-20" />
        <div className="orb orb-2 absolute w-[460px] h-[460px] bg-amber-200/40 top-1/4 -right-16" />
        <div className="orb orb-3 absolute w-[480px] h-[480px] bg-pink-200/35 bottom-0 left-1/4" />
        <div className="orb orb-1 absolute w-[380px] h-[380px] bg-emerald-200/30 -bottom-10 right-10" />
      </div>

      {/* Desktop Sidebar (hidden if in counselor portal for clean separation) */}
      {!isCounselorPortal && <Sidebar activePage={activePage} navigate={navigate} />}

      {/* Main content */}
      <main className={`${isCounselorPortal ? 'min-h-screen' : 'lg:ml-64 min-h-screen'} relative z-10 ${isChatPage ? 'pb-20 lg:pb-12' : 'pb-32 lg:pb-12'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <div className={`${isChatPage ? 'max-w-6xl mx-auto px-0 sm:px-4 lg:px-10 py-0 sm:py-4 lg:py-8' : 'max-w-6xl mx-auto px-5 lg:px-10 py-6 lg:py-10'}`}>
              <PageComponent navigate={navigate} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav (hidden in counselor portal) */}
      {!isCounselorPortal && <BottomNav activePage={activePage} navigate={navigate} />}
    </div>
  )
}
