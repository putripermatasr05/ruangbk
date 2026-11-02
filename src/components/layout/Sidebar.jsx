import { Home, Users, MonitorPlay, Image, MessageCircle, Sparkles, ArrowRight } from 'lucide-react'

const navItems = [
  { id: 'beranda', label: 'Beranda', Icon: Home },
  { id: 'profil', label: 'Profil Layanan', Icon: Users },
  { id: 'layanan', label: 'Layanan BK', Icon: MonitorPlay },
  { id: 'galeri', label: 'Galeri', Icon: Image },
  { id: 'konsultasi', label: 'Konsultasi', Icon: MessageCircle },
]

export default function Sidebar({ activePage, navigate }) {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white/75 backdrop-blur-2xl border-r border-purple-100/70 z-50 px-4 py-6 shadow-[4px_0_30px_rgba(139,92,246,0.03)]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 pb-6 mb-3 border-b border-purple-100/60">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_6px_16px_rgba(139,92,246,0.3)] flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="19" r="2.5" fill="#fff" />
          </svg>
        </div>
        <div>
          <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight block">
            Teman<span className="text-purple-600">BK</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-400 block -mt-0.5">Ruang Edukasi & Konseling</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1.5 flex-1 mt-2" role="navigation" aria-label="Navigasi utama">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-2xl text-sm transition-all duration-200 group relative
                ${isActive
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white font-bold shadow-[0_8px_20px_rgba(139,92,246,0.3)]'
                  : 'text-slate-600 font-semibold hover:bg-purple-50/80 hover:text-purple-700'
                }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'text-slate-500 group-hover:text-purple-600'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="flex-1 text-left">{label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Mini Card Helper (matches the pastel card in the reference mockup) */}
      <div className="card-pastel-yellow p-4 mb-4 text-xs">
        <div className="flex items-center gap-2 mb-1.5 font-bold text-amber-900">
          <Sparkles size={15} className="text-amber-600" />
          <span>Butuh Teman Cerita?</span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
          Konselor kami siap mendengarkan tanpa menghakimi dan 100% privat.
        </p>
        <button
          onClick={() => navigate('konsultasi')}
          className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-900 font-bold px-3 py-2 rounded-full flex items-center justify-center gap-1.5 shadow-sm text-xs transition-colors"
        >
          <span>Mulai Chat</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-purple-100/60">
        <div className="px-2 flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-slate-500">© 2026 TemanBK Kelompok 1</span>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[11px] text-slate-400">Untuk Siswa SMA</span>
            <button
              onClick={() => navigate('konselor')}
              className="text-[10px] text-purple-600/70 hover:text-purple-800 hover:underline"
              title="Khusus Guru BK"
            >
              Portal Guru BK
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
