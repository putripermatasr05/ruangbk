import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play, ArrowRight, Lock, Wifi, Lightbulb, GraduationCap,
  Sparkles, Compass, MessageCircle, BookOpen, Atom, HeartPulse,
  Users, Bell, CheckCircle2, ChevronRight, Video
} from 'lucide-react'

const filterTags = [
  { id: 'semua', label: 'Semua', target: null },
  { id: 'belajar', label: 'Edukasi Belajar', target: 'layanan' },
  { id: 'karir', label: 'Pilihan Karir', target: 'layanan' },
  { id: 'konsultasi', label: 'Ruang Curhat', target: 'konsultasi' },
  { id: 'galeri', label: 'Galeri Media', target: 'galeri' },
]

const featureItems = [
  { icon: Lock, title: 'Kerahasiaan Terjaga', desc: 'Setiap sesi konsultasi dijamin kerahasiaannya 100% tanpa takut bocor.' },
  { icon: Wifi, title: 'Etika Digital Positif', desc: 'Materi edukasi ramah siswa, bebas dari hoaks, ujaran kebencian, dan SARA.' },
  { icon: Lightbulb, title: 'Inovatif & Relevan', desc: 'Pendekatan modern berbasis psikologi perkembangan generasi Z.' },
  { icon: GraduationCap, title: 'Interaktif & Nyata', desc: 'Dilengkapi asesmen minat, teknik belajar saintifik, dan panduan karier.' },
]

export default function Beranda({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('semua')

  const handleFilterClick = (tag) => {
    setActiveFilter(tag.id)
    if (tag.target) {
      navigate(tag.target)
    }
  }

  return (
    <div className="space-y-10 lg:space-y-12">
      {/* ── Top Header Greeting (inspired by Reference Mockup) ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200/60 text-purple-700 text-xs font-bold tracking-wide mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse-dot" />
            Layanan Bimbingan & Konseling Digital
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Halo Sahabat BK,{' '}
            <span className="gradient-text block mt-1">ada yang bisa kami bantu?</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Eksplorasi gaya belajar, rencanakan kampus impian, rawat kesehatan mental, atau curhat aman bersama konselor TemanBK.
          </p>
        </div>

        {/* Status / Quick Action Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="w-10 h-10 rounded-full bg-white/90 border border-purple-100 shadow-sm flex items-center justify-center text-slate-600 hover:text-purple-600 transition-colors">
            <Bell size={18} />
          </div>
          <div className="px-4 py-2 rounded-full bg-white/90 border border-purple-100 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Konselor Siap Membantu</span>
          </div>
        </div>
      </div>

      {/* ── Filter Pills Row (Matches Reference Mockup) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scroll" role="tablist" aria-label="Kategori cepat">
        {filterTags.map((tag) => {
          const isActive = activeFilter === tag.id
          return (
            <button
              key={tag.id}
              onClick={() => handleFilterClick(tag)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0
                ${isActive
                  ? 'bg-[#1E1B2E] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-purple-100/80 shadow-sm hover:text-purple-700'
                }`}
            >
              {tag.label}
            </button>
          )
        })}
      </div>

      {/* ── Bento Hero Section (Inspired by Left Phone Mockup) ── */}
      <section className="grid md:grid-cols-12 gap-5 items-stretch">
        {/* Left Large Card: Butter Yellow */}
        <motion.div
          whileHover={{ y: -3 }}
          className="md:col-span-7 card-pastel-yellow p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-300/25 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-amber-300/50 flex items-center justify-center text-amber-700 mb-5 shadow-sm">
              <MessageCircle size={24} />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 block mb-1">
              Ruang Konsultasi Privat
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight mb-3">
              Ceritakan Apa yang Kamu Rasakan Tanpa Takut Dihakimi
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-lg mb-6">
              Kewalahan dengan tugas? Cemas memikirkan jurusan kuliah? Atau butuh teman bicara? Konselor kami siap menyimak ceritamu dengan aman dan rahasia terjamin.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('konsultasi')}
              className="inline-flex items-center gap-2 bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-bold px-6 py-3.5 rounded-full text-sm shadow-[0_6px_20px_rgba(250,204,21,0.35)] transition-all hover:scale-[1.02]"
            >
              <span>Mulai Cerita Sekarang</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Right Column (2 Stacked Cards: Lavender & Dark Charcoal) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* Top Right: Soft Lavender */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => navigate('layanan')}
            className="card-pastel-purple p-6 sm:p-7 flex-1 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/80 border border-purple-200 flex items-center justify-center text-purple-700 shadow-sm">
                  <Compass size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500 text-white shadow-sm">
                  Kuis Baru
                </span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                Eksplorasi Minat Karir & IKIGAI
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Temukan kecocokan potensimu dengan 5 rumpun ilmu, pilihan prodi, dan prospek masa depan.
              </p>
            </div>
            <div className="flex items-center justify-end pt-3 text-purple-700 text-xs font-bold">
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ikuti Asesmen <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Bottom Right: Sleek Charcoal Dark Card */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => navigate('galeri')}
            className="card-pastel-dark p-6 sm:p-7 flex-1 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-sm">
                  <Video size={20} />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/15 text-slate-300">
                  Shorts & Reels
                </span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1 group-hover:text-purple-300 transition-colors">
                Galeri Konten Edukasi Kreatif
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Kumpulan infografis dan video edukasi visual di Instagram, TikTok, dan YouTube.
              </p>
            </div>
            <div className="flex items-center justify-end pt-3 text-purple-300 text-xs font-bold">
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Buka Galeri <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2x2 Grid Modul Edukasi (Matches Middle Phone Mockup) ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 block">Modul Pembelajaran</span>
            <h2 className="font-display font-bold text-2xl text-slate-900">4 Pilar Informasi BK</h2>
          </div>
          <button
            onClick={() => navigate('layanan')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
          >
            <span>Buka Semua</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Seni Belajar Efektif',
              subtitle: 'Gaya Belajar & 4 Teknik Anti Lupa',
              Icon: BookOpen,
              cardClass: 'card-pastel-purple',
              iconBg: 'bg-white/80 text-purple-700',
              linkText: 'Pelajari Modul',
            },
            {
              title: 'Perencanaan Masa Depan',
              subtitle: '5 Rumpun Ilmu & Refleksi IKIGAI',
              Icon: Atom,
              cardClass: 'card-pastel-mint',
              iconBg: 'bg-white/80 text-emerald-700',
              linkText: 'Pelajari Modul',
            },
            {
              title: 'Kesehatan Mental Remaja',
              subtitle: 'Toolkit P3K Psikologis & Self-Care',
              Icon: HeartPulse,
              cardClass: 'card-pastel-peach',
              iconBg: 'bg-white/80 text-orange-700',
              linkText: 'Pelajari Modul',
            },
            {
              title: 'Relasi & Dinamika Sosial',
              subtitle: 'Komunikasi Asertif & Anti-Bullying',
              Icon: Users,
              cardClass: 'card-pastel-yellow',
              iconBg: 'bg-white/80 text-amber-700',
              linkText: 'Pelajari Modul',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              onClick={() => navigate('layanan')}
              className={`${item.cardClass} p-5 flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                <div className={`w-10 h-10 rounded-2xl ${item.iconBg} flex items-center justify-center mb-3 shadow-sm`}>
                  <item.Icon size={19} />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-black/[0.04] text-xs font-bold text-slate-700 group-hover:text-purple-700">
                <span>{item.linkText}</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Main Big Pill CTA Button (Matches '+ New Notes' Button in Mockup) ── */}
      <div className="text-center pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('layanan')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1E1B2E] hover:bg-black text-white font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(30,27,46,0.25)] transition-all"
        >
          <Sparkles size={18} className="text-amber-400" />
          <span>+ Mulai Kuis Eksplorasi Diri (Gaya Belajar & Minat Karir)</span>
        </motion.button>
      </div>

      {/* ── Mengapa TemanBK Hadir ── */}
      <section className="glass-card p-7 sm:p-9 border border-white/80">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 block mb-1">Nilai & Komitmen</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Mengapa <span className="gradient-text">TemanBK</span> Hadir Untukmu?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mt-2">
            TemanBK dirancang sebagai sahabat digital terpercaya yang mendampingi perjalanan akademik, pemahaman diri, dan kesehatan emosional peserta didik.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureItems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/80 rounded-2xl p-5 border border-purple-100/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
