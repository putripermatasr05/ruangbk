import { Home, Users, MonitorPlay, Image, MessageCircle } from 'lucide-react'

const navItems = [
  { id: 'beranda', label: 'Beranda', Icon: Home },
  { id: 'profil', label: 'Profil Layanan', Icon: Users },
  { id: 'layanan', label: 'Layanan BK', Icon: MonitorPlay },
  { id: 'galeri', label: 'Galeri', Icon: Image },
  { id: 'konsultasi', label: 'Konsultasi', Icon: MessageCircle },
]

export default function Sidebar({ activePage, navigate }) {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-bg-2 border-r border-white/[0.07] z-50 px-4 py-6">
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 pb-6 mb-4 border-b border-white/[0.07]">
        <div className="w-8 h-8 rounded-xl bg-grad-primary flex items-center justify-center shadow-glow-primary flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="19" r="2.5" fill="#fff" />
          </svg>
        </div>
        <span className="font-display font-bold text-xl gradient-text">TemanBK</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1" role="navigation" aria-label="Navigasi utama">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150 group relative
                ${isActive
                  ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-primary-light border border-primary/20'
                  : 'text-slate-400 hover:bg-surface hover:text-slate-200'
                }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
              />
              <span className="flex-1 text-left">{label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-grad-primary flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/[0.07]">
        <div className="px-3 flex flex-col gap-0.5">
          <span className="text-xs text-slate-600">©2026 TemanBK Kelompok 1</span>
          <span className="text-[10px] text-slate-700">Untuk Siswa SMA</span>
        </div>
      </div>
    </aside>
  )
}
