import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import {
  X, ExternalLink, Play, Sparkles, LayoutGrid, Camera, Video,
  Eye, BookOpen, GraduationCap, Search, HeartPulse, Compass, Brain, ShieldCheck
} from 'lucide-react'

const FeaturedMedia = () => {
  useEffect(() => {
    // Load TikTok script
    if (!document.getElementById('tiktok-script')) {
      const script = document.createElement('script')
      script.id = 'tiktok-script'
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
    // Load Instagram script
    if (!document.getElementById('ig-script')) {
      const script = document.createElement('script')
      script.id = 'ig-script'
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  const tiktokHtml = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@audere24a/video/7642554946507820308" data-video-id="7642554946507820308" style="max-width: 100%; min-width: 100%; margin: 0;" > <section> <a target="_blank" title="@audere24a" href="https://www.tiktok.com/@audere24a?refer=embed">@audere24a</a> </section> </blockquote>`;

  const igHtml = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DYhLUH7u3QD/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; margin: 0; max-width:100%; min-width:100%; padding:0; width:100%;"></blockquote>`;

  return (
    <div className="mb-12">
      <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-accent" /> Highlight Edukasi
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* YouTube */}
        <div className="glass-card rounded-2xl overflow-hidden aspect-[9/16] relative bg-black shadow-lg">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/T6kNNmVtrls?autoplay=1&mute=1&loop=1&playlist=T6kNNmVtrls&controls=0"
            title="YouTube Shorts"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* TikTok */}
        <div className="glass-card rounded-2xl overflow-hidden aspect-[9/16] relative bg-black shadow-lg">
           <div className="absolute inset-0 overflow-y-auto custom-scroll bg-black flex items-center" dangerouslySetInnerHTML={{ __html: tiktokHtml }} />
        </div>

        {/* Instagram */}
        <div className="glass-card rounded-2xl overflow-hidden aspect-[9/16] relative bg-white shadow-lg">
           <div className="absolute inset-0 overflow-y-auto custom-scroll bg-white flex items-center" dangerouslySetInnerHTML={{ __html: igHtml }} />
        </div>

      </div>
    </div>
  )
}


/* ─── Gallery Data ─── */
const galeriData = [
  {
    id: 1, platform: 'instagram', title: 'Mengenal 3 Gaya Belajar: Visual, Auditori & Kinestetik',
    desc: 'Infografis interaktif tentang cara menemukan gaya belajarmu yang dominan.',
    Icon: Eye, bg: 'from-violet-600 to-purple-800', link: 'https://instagram.com',
    type: 'image',
  },
  {
    id: 2, platform: 'tiktok', title: '5 Tips Belajar Efektif untuk Siswa SMA',
    desc: 'Video singkat berisi strategi belajar yang terbukti meningkatkan fokus dan pemahaman.',
    Icon: BookOpen, bg: 'from-slate-800 to-slate-900', link: 'https://tiktok.com',
    type: 'video',
  },
  {
    id: 3, platform: 'youtube', title: 'Saintek vs Soshum: Mana yang Cocok Untukmu?',
    desc: 'Pembahasan mendalam tentang perbedaan dua rumpun ilmu dan prospek karirnya.',
    Icon: GraduationCap, bg: 'from-red-700 to-red-900', link: 'https://youtube.com',
    type: 'video',
  },
  {
    id: 4, platform: 'instagram', title: 'Mitos & Fakta Dunia Perkuliahan',
    desc: 'Carousel informatif membongkar mitos-mitos yang sering dipercaya siswa SMA.',
    Icon: Search, bg: 'from-pink-600 to-rose-800', link: 'https://instagram.com',
    type: 'image',
  },
  {
    id: 5, platform: 'tiktok', title: 'Cara Mengelola Stres Saat Ujian',
    desc: 'Teknik pernapasan dan mindfulness sederhana yang bisa dipraktikkan di mana saja.',
    Icon: HeartPulse, bg: 'from-teal-600 to-cyan-800', link: 'https://tiktok.com',
    type: 'video',
  },
  {
    id: 6, platform: 'youtube', title: 'Tips Memilih Jurusan Kuliah yang Tepat',
    desc: 'Panduan lengkap dari riset minat hingga analisis prospek karir masa depan.',
    Icon: Compass, bg: 'from-amber-600 to-orange-800', link: 'https://youtube.com',
    type: 'video',
  },
  {
    id: 7, platform: 'instagram', title: 'Mengenal RIASEC: Tipe Kepribadian Pekerja',
    desc: 'Infografis penjelasan 6 tipe kepribadian Holland dan jurusan yang cocok.',
    Icon: Brain, bg: 'from-indigo-600 to-blue-800', link: 'https://instagram.com',
    type: 'image',
  },
  {
    id: 8, platform: 'tiktok', title: 'Anti-Bullying: Cara Merespons dengan Bijak',
    desc: 'Video edukasi tentang cara mengenali dan merespons perundungan di sekolah.',
    Icon: ShieldCheck, bg: 'from-emerald-600 to-green-800', link: 'https://tiktok.com',
    type: 'video',
  },
]

const platformBadge = {
  instagram: { label: 'Instagram', color: 'bg-gradient-to-r from-purple-600 via-rose-500 to-amber-400' },
  tiktok: { label: 'TikTok', color: 'bg-black' },
  youtube: { label: 'YouTube', color: 'bg-red-600' },
}

const filters = ['semua', 'instagram', 'tiktok', 'youtube']

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState('semua')
  const [selectedItem, setSelectedItem] = useState(null)
  const dialogRef = useRef(null)

  const filtered = activeFilter === 'semua'
    ? galeriData
    : galeriData.filter((g) => g.platform === activeFilter)

  const openModal = useCallback((item) => {
    setSelectedItem(item)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedItem(null)
  }, [])

  // Open/close native dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (selectedItem) {
      dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [selectedItem])

  // Light-dismiss fallback (for browsers without closedby="any")
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handler = (e) => {
      if (e.target !== dialog) return
      const rect = dialog.getBoundingClientRect()
      const inside = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      )
      if (!inside) closeModal()
    }
    dialog.addEventListener('click', handler)
    return () => dialog.removeEventListener('click', handler)
  }, [closeModal])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handler = () => { if (!dialog.open) closeModal() }
    dialog.addEventListener('close', handler)
    return () => dialog.removeEventListener('close', handler)
  }, [closeModal])

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-purple-600 text-xs font-bold tracking-widest uppercase mb-1.5 block">Media & Konten Edukatif</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-2">
          Galeri <span className="gradient-text">Edukasi Kreatif</span>
        </h1>
        <p className="text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed">
          Kumpulan video reels, tiktok, dan infografis hasil karya tim konselor TemanBK.
        </p>
      </motion.div>

      {/* Highlight Videos */}
      <FeaturedMedia />

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter konten galeri">
        {filters.map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveFilter(f)}
            aria-pressed={activeFilter === f}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold capitalize transition-all
              ${activeFilter === f
                ? 'bg-[#1E1B2E] text-white shadow-md'
                : 'bg-white/80 text-slate-600 border border-purple-100 shadow-sm hover:text-purple-700 hover:bg-white'
              }`}
          >
            {f === 'semua' ? (
              <><LayoutGrid size={15} /> Semua</>
            ) : f === 'instagram' ? (
              <><Camera size={15} /> Instagram</>
            ) : f === 'tiktok' ? (
              <><Video size={15} /> TikTok</>
            ) : (
              <><Play size={15} /> YouTube</>
            )}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="list"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -5 }}
                className="bg-white/90 border border-purple-100/70 rounded-3xl shadow-sm hover:shadow-md overflow-hidden cursor-pointer group transition-all"
                role="listitem"
                tabIndex={0}
                onClick={() => openModal(item)}
                onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
                aria-label={`Buka konten: ${item.title}`}
              >
                {/* Thumbnail */}
                <div className={`relative aspect-video bg-gradient-to-br ${item.bg} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white/50 group-hover:scale-110 transition-transform duration-500">
                    <item.Icon size={52} />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center text-slate-900 shadow-md">
                      {item.type === 'video' ? <Play size={20} fill="currentColor" /> : <ExternalLink size={18} />}
                    </div>
                  </div>
                  {/* Platform badge */}
                  <span className={`absolute top-2.5 left-2.5 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full ${platformBadge[item.platform].color} shadow-sm`}>
                    {platformBadge[item.platform].label}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-purple-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Modal / Lightbox — Native <dialog> */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-label="Pratinjau konten media"
        aria-modal="true"
        className="bg-transparent border-none p-0 max-w-full max-h-full w-full h-full backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        style={{ background: 'transparent' }}
      >
        {selectedItem && (
          <div className="flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white border border-purple-100 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              {/* Media area */}
              <div className={`aspect-video bg-gradient-to-br ${selectedItem.bg} flex items-center justify-center text-white/50`}>
                <selectedItem.Icon size={72} />
              </div>

              {/* Info */}
              <div className="p-6">
                <span className={`inline-block text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-3 ${platformBadge[selectedItem.platform].color}`}>
                  {platformBadge[selectedItem.platform].label}
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 mb-2">{selectedItem.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{selectedItem.desc}</p>
                <div className="flex gap-3">
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLink size={15} /> Buka di {platformBadge[selectedItem.platform].label}
                  </a>
                  <button
                    onClick={closeModal}
                    className="flex items-center gap-2 text-slate-600 text-sm font-bold px-4 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-all"
                  >
                    <X size={15} /> Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </dialog>
    </div>
  )
}
