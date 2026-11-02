import { motion } from 'framer-motion'
import { Home, Users, MonitorPlay, Image, MessageCircle } from 'lucide-react'

const navItems = [
  { id: 'beranda', label: 'Beranda', Icon: Home },
  { id: 'profil', label: 'Profil', Icon: Users },
  { id: 'layanan', label: 'Layanan', Icon: MonitorPlay },
  { id: 'galeri', label: 'Galeri', Icon: Image },
  { id: 'konsultasi', label: 'Chat', Icon: MessageCircle },
]

export default function BottomNav({ activePage, navigate }) {
  return (
    <nav
      className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-2xl rounded-full border border-white/80 shadow-[0_12px_40px_rgba(139,92,246,0.2)] max-w-[95vw]"
      role="navigation"
      aria-label="Navigasi mobile"
    >
      {navItems.map(({ id, label, Icon }) => {
        const isActive = activePage === id
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            aria-current={isActive ? 'page' : undefined}
            className="relative flex items-center justify-center p-1 rounded-full transition-all focus:outline-none"
            title={label}
          >
            {isActive ? (
              <motion.div
                layoutId="mobile-dock-active"
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-[0_6px_18px_rgba(139,92,246,0.45)]"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <Icon size={20} strokeWidth={2.4} />
              </motion.div>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-purple-600 transition-colors">
                <Icon size={19} strokeWidth={1.8} />
              </div>
            )}
          </button>
        )
      })}
    </nav>
  )
}
