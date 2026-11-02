import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Beranda from './components/pages/Beranda'
import Profil from './components/pages/Profil'
import Layanan from './components/pages/Layanan'
import Galeri from './components/pages/Galeri'
import Konsultasi from './components/pages/Konsultasi'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
}

const pages = {
  beranda: Beranda,
  profil: Profil,
  layanan: Layanan,
  galeri: Galeri,
  konsultasi: Konsultasi,
}

export default function App() {
  const [activePage, setActivePage] = useState('beranda')

  const navigate = (page) => {
    if (pages[page]) setActivePage(page)
  }

  const PageComponent = pages[activePage]

  return (
    <div className="flex min-h-screen bg-[#FAF8FF] text-slate-800 relative overflow-hidden">
      {/* Background Aurora Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="orb orb-1 absolute w-[520px] h-[520px] bg-purple-300/35 -top-24 -left-20" />
        <div className="orb orb-2 absolute w-[460px] h-[460px] bg-amber-200/40 top-1/4 -right-16" />
        <div className="orb orb-3 absolute w-[480px] h-[480px] bg-pink-200/35 bottom-0 left-1/4" />
        <div className="orb orb-1 absolute w-[380px] h-[380px] bg-emerald-200/30 -bottom-10 right-10" />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar activePage={activePage} navigate={navigate} />

      {/* Main content */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen pb-24 lg:pb-0 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <div className="overflow-y-auto h-screen custom-scroll">
              <div className="max-w-6xl mx-auto px-5 lg:px-10 py-6 lg:py-10">
                <PageComponent navigate={navigate} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav activePage={activePage} navigate={navigate} />
    </div>
  )
}
