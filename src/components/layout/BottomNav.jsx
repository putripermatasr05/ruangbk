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
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 z-50 flex items-center justify-around px-2"
      style={{ background: 'rgba(10,15,30,0.97)', borderTop: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
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
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-150 min-w-[48px]
              ${isActive ? 'text-primary-light' : 'text-slate-600'}`}
          >
            <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
