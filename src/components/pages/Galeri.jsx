import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import {
  X, ExternalLink, Play, Sparkles, LayoutGrid, Camera, Video,
  Eye, BookOpen, GraduationCap, Search, HeartPulse, Compass, Brain,
  ShieldCheck, Clock, Target, Shield, AlertTriangle, Briefcase, Users
} from 'lucide-react'

// Helper extract YouTube ID
const getYoutubeId = (url) => {
  if (!url) return null
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

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

  const tiktokHtml = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@audere24a/video/7642554946507820308" data-video-id="7642554946507820308" style="max-width: 100%; min-width: 100%; margin: 0;" > <section> <a target="_blank" title="@audere24a" href="https://www.tiktok.com/@audere24a?refer=embed">@audere24a</a> </section> </blockquote>`

  const igHtml = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DYhLUH7u3QD/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; margin: 0; max-width:100%; min-width:100%; padding:0; width:100%;"></blockquote>`

  return (
    <div className="mb-12">
      <h2 className="font-display font-bold text-2xl text-slate-900 mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-600" /> Highlight Edukasi
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

/* ─── Gallery Data (30 Items Lengkap Sesuai Link) ─── */
const galeriData = [
  /* ── BIDANG PRIBADI (8) ── */
  {
    id: 'pribadi-1',
    bidang: 'pribadi',
    platform: 'youtube',
    title: 'Stop Overthinking',
    desc: 'Panduan meredakan pikiran yang berputar terus-menerus dan mengembalikan ketenangan emosional.',
    Icon: Brain,
    bg: 'from-purple-600 to-indigo-800',
    link: 'https://youtu.be/5VMdH_GkKTU?si=RGfFyaNj-GIsUXol',
    type: 'video',
  },
  {
    id: 'pribadi-2',
    bidang: 'pribadi',
    platform: 'youtube',
    title: 'Kenapa Sulit Mengatakan "Tidak" pada Permintaan Orang Lain?',
    desc: 'Memahami alasan psikologis di balik kesulitan menolak dan cara membangun batasan yang sehat.',
    Icon: ShieldCheck,
    bg: 'from-rose-500 to-pink-700',
    link: 'https://youtube.com/shorts/HDl8x3Y2RUM?si=yv6lSjwsVsP-lqIl',
    type: 'video',
  },
  {
    id: 'pribadi-3',
    bidang: 'pribadi',
    platform: 'youtube',
    title: 'Mencintai Diri Sendiri (Self-Love)',
    desc: 'Langkah awal menghargai kelebihan dan menerima ketidaksempurnaan diri dengan penuh kasih.',
    Icon: HeartPulse,
    bg: 'from-pink-500 to-rose-600',
    link: 'https://youtube.com/shorts/bgo6E92bVf8?si=1VsfgegEEDxMnx7w',
    type: 'video',
  },
  {
    id: 'pribadi-4',
    bidang: 'pribadi',
    platform: 'youtube',
    title: 'Gimana Cara Lo Bangun Percaya Diri?',
    desc: 'Tips praktis membentuk rasa percaya diri dari kebiasaan kecil sehari-hari.',
    Icon: Sparkles,
    bg: 'from-amber-500 to-orange-600',
    link: 'https://youtube.com/shorts/_9eaBXvxT64?si=TJeF-X8N0-ZGezeM',
    type: 'video',
  },
  {
    id: 'pribadi-5',
    bidang: 'pribadi',
    platform: 'youtube',
    title: 'Cara Mengenali Emosi',
    desc: 'Belajar mengidentifikasi dan menamai emosi yang kamu rasakan sebelum meresponsnya.',
    Icon: Eye,
    bg: 'from-teal-600 to-emerald-700',
    link: 'https://youtu.be/LXsDPqsujIA?si=Uz9GlgNB8OJ-zKs7',
    type: 'video',
  },
  {
    id: 'pribadi-6',
    bidang: 'pribadi',
    platform: 'tiktok',
    title: 'Beda Sibuk dan Produktif',
    desc: 'Membedakan antara sekadar terlihat sibuk dengan menghasilkan dampak yang bermakna bagi diri.',
    Icon: Clock,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgEEqX7b/',
    type: 'video',
  },
  {
    id: 'pribadi-7',
    bidang: 'pribadi',
    platform: 'instagram',
    title: 'Sering Merasa Cemas dan Marah? Tanda Inner Child Terluka',
    desc: 'Mengenali tanda-tanda luka emosional masa lalu yang memengaruhi respons dan suasana hati saat ini.',
    Icon: HeartPulse,
    bg: 'from-purple-600 via-rose-500 to-amber-500',
    link: 'https://www.instagram.com/p/DdGk3KtFMXg/?obrf=MWdjNGhtamk0c2pvMg==',
    type: 'image',
  },
  {
    id: 'pribadi-8',
    bidang: 'pribadi',
    platform: 'instagram',
    title: 'Cara Melatih Emosi Anak dan Remaja',
    desc: 'Wawasan tentang regulasi emosi sehat dan pendampingan psikologis dalam keluarga.',
    Icon: Users,
    bg: 'from-violet-600 via-pink-500 to-amber-400',
    link: 'https://www.instagram.com/p/DedZe3BoN9p/?cplk=bG1tczRrZG16YWI1',
    type: 'image',
  },

  /* ── BIDANG KARIER (8) ── */
  {
    id: 'karir-1',
    bidang: 'karir',
    platform: 'youtube',
    title: 'Memahami Minat dan Bakat Siswa',
    desc: 'Menemukan potensi tersembunyi diri untuk menentukan arah studi dan masa depan yang tepat.',
    Icon: Compass,
    bg: 'from-blue-600 to-indigo-800',
    link: 'https://youtu.be/tvQFj6GAFE0?si=IXFTJ4nYorqj0VSa',
    type: 'video',
  },
  {
    id: 'karir-2',
    bidang: 'karir',
    platform: 'youtube',
    title: 'Menentukan Arah Masa Depan & Pilihan Karir',
    desc: 'Strategi memetakan cita-cita, peluang profesi, dan langkah persiapan sejak bangku sekolah.',
    Icon: GraduationCap,
    bg: 'from-indigo-600 to-purple-800',
    link: 'https://youtu.be/umXhAjTtfPM?si=SVcxfuMU_BwB3kWM',
    type: 'video',
  },
  {
    id: 'karir-3',
    bidang: 'karir',
    platform: 'youtube',
    title: 'Cara Memilih Jurusan Kuliah yang Tepat',
    desc: 'Tips ringkas memilih program studi agar tidak merasa salah jurusan di kemudian hari.',
    Icon: BookOpen,
    bg: 'from-emerald-600 to-teal-800',
    link: 'https://youtube.com/shorts/ZDW423DvNM8?si=GaB-5Q8dnmQUVi46',
    type: 'video',
  },
  {
    id: 'karir-4',
    bidang: 'karir',
    platform: 'instagram',
    title: 'Rekomendasi Jurusan Kuliah Sesuai Mata Pelajaran yang Kamu Suka',
    desc: 'Panduan mencocokkan mata pelajaran favorit di sekolah dengan rumpun program studi impian.',
    Icon: GraduationCap,
    bg: 'from-purple-600 via-rose-500 to-amber-500',
    link: 'https://www.instagram.com/p/DejZl_Cmm8R/?cplk=ODRhZWZqY29nMXA5',
    type: 'image',
  },
  {
    id: 'karir-5',
    bidang: 'karir',
    platform: 'instagram',
    title: 'Kamu Beneran Mau Jurusan Ini atau Cuma Takut Nyesel?',
    desc: 'Refleksi mendalam untuk memastikan pilihan jurusan didasari kesadaran diri, bukan sekadar ikut-ikutan.',
    Icon: Search,
    bg: 'from-pink-600 via-rose-500 to-purple-600',
    link: 'https://www.instagram.com/p/Def8YX-H4ne/?img_index=2&obrf=MTJjMGtrcDFxbHJmdg==',
    type: 'image',
  },
  {
    id: 'karir-6',
    bidang: 'karir',
    platform: 'instagram',
    title: 'Gelar Sarjana dan Pilihan Karir',
    desc: 'Daftar gelar sarjana dan berbagai peluang prospek pekerjaan nyata di industri modern.',
    Icon: Briefcase,
    bg: 'from-blue-600 via-indigo-600 to-purple-600',
    link: 'https://www.instagram.com/p/DeGfYqzAV2E/?exln=cWc0ZHRjaXIzemhm',
    type: 'image',
  },
  {
    id: 'karir-7',
    bidang: 'karir',
    platform: 'instagram',
    title: 'Kuliah Jurusan Ini, Nanti Kerjanya Jadi Apa Ya?',
    desc: 'Eksplorasi prospek kerja dan jenjang karier dari berbagai program studi populer.',
    Icon: Compass,
    bg: 'from-amber-600 via-rose-500 to-purple-600',
    link: 'https://www.instagram.com/p/Dei9WvokTdR/?dlrf=ODdyaGRvaTJ5MmR3',
    type: 'image',
  },
  {
    id: 'karir-8',
    bidang: 'karir',
    platform: 'instagram',
    title: 'Jurusan Kuliah Sesuai Kepribadianmu!',
    desc: 'Menghubungkan tipe kepribadian dan gaya kerja dengan lingkungan program studi yang pas.',
    Icon: Brain,
    bg: 'from-purple-600 via-pink-500 to-amber-500',
    link: 'https://www.instagram.com/p/DMkoi9XSN2t/?exln=MTZ4MHVrdmpoenNzZg==',
    type: 'image',
  },

  /* ── BIDANG SOSIAL (7) ── */
  {
    id: 'sosial-1',
    bidang: 'sosial',
    platform: 'tiktok',
    title: 'Menghadapi Teman Toxic',
    desc: 'Cara menjaga kesehatan mental dan bersikap tegas saat menghadapi lingkungan pertemanan tidak sehat.',
    Icon: ShieldCheck,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgEEx128/',
    type: 'video',
  },
  {
    id: 'sosial-2',
    bidang: 'sosial',
    platform: 'tiktok',
    title: 'Batasan dalam Berteman (Boundaries)',
    desc: 'Mengapa batasan pribadi sangat penting agar hubungan pertemanan tetap awet, sehat, dan nyaman.',
    Icon: Shield,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgorHJGv/',
    type: 'video',
  },
  {
    id: 'sosial-3',
    bidang: 'sosial',
    platform: 'tiktok',
    title: 'Bullying dan Bercanda: Di Mana Batasnya?',
    desc: 'Membedakan candaan yang sehat dan saling menghibur dengan perilaku perundungan yang menyakiti.',
    Icon: AlertTriangle,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgorncCr/',
    type: 'video',
  },
  {
    id: 'sosial-4',
    bidang: 'sosial',
    platform: 'youtube',
    title: 'Cara Adaptasi dengan Lingkungan Baru',
    desc: 'Tips menyesuaikan diri di sekolah atau circle pertemanan baru tanpa kehilangan jati diri.',
    Icon: Compass,
    bg: 'from-emerald-600 to-teal-800',
    link: 'https://youtube.com/shorts/8P9eP7wmJLk?si=gnDAxQGxAhXNJJY1',
    type: 'video',
  },
  {
    id: 'sosial-5',
    bidang: 'sosial',
    platform: 'tiktok',
    title: 'Cara Bersosialisasi di Tengah Orang Banyak',
    desc: 'Trik mengatasi rasa canggung (social anxiety) saat berada di keramaian atau acara sekolah.',
    Icon: Users,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgohhph3/',
    type: 'video',
  },
  {
    id: 'sosial-6',
    bidang: 'sosial',
    platform: 'instagram',
    title: 'Bahaya Bullying bagi Korban dan Pelaku',
    desc: 'Dampak psikologis jangka panjang dari perundungan dan pentingnya peran upstander di sekolah.',
    Icon: ShieldCheck,
    bg: 'from-rose-600 via-pink-500 to-purple-600',
    link: 'https://www.instagram.com/p/DIgTRrUvqp8/?xtok=MWwwa3hvN3oydTBuYg==',
    type: 'image',
  },
  {
    id: 'sosial-7',
    bidang: 'sosial',
    platform: 'instagram',
    title: 'Langkah Penting Orang Tua Mencegah ABK Menjadi Korban Perundungan',
    desc: 'Edukasi inklusif mengenai perlindungan anak berkebutuhan khusus dari tindakan diskriminasi dan perundungan.',
    Icon: HeartPulse,
    bg: 'from-purple-600 via-rose-500 to-amber-500',
    link: 'https://www.instagram.com/p/DVaTjJkj89z/?vrfl=M2Nha3Zmb3Zrb3F0',
    type: 'image',
  },

  /* ── BIDANG BELAJAR (7) ── */
  {
    id: 'belajar-1',
    bidang: 'belajar',
    platform: 'tiktok',
    title: 'Cara Fokus Saat Belajar',
    desc: 'Strategi mengatasi godaan distraksi smartphone dan menjaga konsentrasi saat belajar.',
    Icon: Target,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgoh5aSw/',
    type: 'video',
  },
  {
    id: 'belajar-2',
    bidang: 'belajar',
    platform: 'tiktok',
    title: 'Cara Menjadi Konsisten',
    desc: 'Membangun kebiasaan belajar harian yang bertahan lama tanpa bergantung pada motivasi sesaat.',
    Icon: Clock,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgohAgR5/',
    type: 'video',
  },
  {
    id: 'belajar-3',
    bidang: 'belajar',
    platform: 'youtube',
    title: 'Cara Belajar Produktif',
    desc: 'Teknik menyerap materi pelajaran lebih cepat dengan hasil pemahaman yang optimal.',
    Icon: BookOpen,
    bg: 'from-amber-600 to-orange-800',
    link: 'https://youtube.com/shorts/JlfM7AN-fDw?si=WllVFbIT35xG9Bnu',
    type: 'video',
  },
  {
    id: 'belajar-4',
    bidang: 'belajar',
    platform: 'youtube',
    title: 'Tips Menghadapi Stres Saat Ujian',
    desc: 'Manajemen kecemasan sebelum ujian, teknik pernapasan, dan menjaga ketenangan pikiran.',
    Icon: HeartPulse,
    bg: 'from-teal-600 to-cyan-800',
    link: 'https://youtu.be/qwXCf91JDaI?si=9ng8Ma9SSdwuxLXe',
    type: 'video',
  },
  {
    id: 'belajar-5',
    bidang: 'belajar',
    platform: 'youtube',
    title: 'Academic Planner untuk Achieve Target',
    desc: 'Menyusun jadwal belajar terstruktur dan target mingguan yang terukur untuk mencapai prestasi.',
    Icon: Clock,
    bg: 'from-purple-600 to-indigo-800',
    link: 'https://youtube.com/shorts/DpXBV7huGuI?si=-olZ599Vr5zP72YD',
    type: 'video',
  },
  {
    id: 'belajar-6',
    bidang: 'belajar',
    platform: 'youtube',
    title: 'Academic Burnout dan Cara Mengatasinya',
    desc: 'Mengenali tanda kelelahan belajar kronis dan cara memulihkan kembali energi mental.',
    Icon: Brain,
    bg: 'from-rose-600 to-pink-800',
    link: 'https://youtu.be/kS3bKCjXzgY?si=H_qexWCdH-IXAOwp',
    type: 'video',
  },
  {
    id: 'belajar-7',
    bidang: 'belajar',
    platform: 'tiktok',
    title: 'Membangun Motivasi Belajar',
    desc: 'Menemukan kembali alasan dan tujuan kuat di balik setiap usaha belajar yang kamu lakukan.',
    Icon: Sparkles,
    bg: 'from-slate-800 to-slate-900',
    link: 'https://vt.tiktok.com/ZSgoh76Xr/',
    type: 'video',
  },
]

const platformBadge = {
  instagram: { label: 'Instagram', color: 'bg-gradient-to-r from-purple-600 via-rose-500 to-amber-400' },
  tiktok: { label: 'TikTok', color: 'bg-[#1E1B2E]' },
  youtube: { label: 'YouTube', color: 'bg-red-600' },
}

const bidangBadge = {
  belajar: { label: 'Belajar', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  karir: { label: 'Karier', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  pribadi: { label: 'Pribadi', color: 'bg-pink-50 text-pink-800 border-pink-200' },
  sosial: { label: 'Sosial', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
}

const bidangFilters = [
  { id: 'semua', label: 'Semua Bidang' },
  { id: 'belajar', label: 'Belajar (7)' },
  { id: 'karir', label: 'Karier (8)' },
  { id: 'pribadi', label: 'Pribadi (8)' },
  { id: 'sosial', label: 'Sosial (7)' },
]

export default function Galeri() {
  const [activeBidang, setActiveBidang] = useState('semua')
  const [selectedItem, setSelectedItem] = useState(null)
  const dialogRef = useRef(null)

  const filtered = activeBidang === 'semua'
    ? galeriData
    : galeriData.filter((item) => item.bidang === activeBidang)

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

  // Light-dismiss fallback
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

  const selectedYoutubeId = selectedItem ? getYoutubeId(selectedItem.link) : null

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-purple-600 text-xs font-bold tracking-widest uppercase mb-1.5 block">Media & Konten Edukatif</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-2">
          Galeri <span className="gradient-text">Edukasi Kreatif</span>
        </h1>
        <p className="text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed">
          Kumpulan video YouTube, TikTok, dan infografis Instagram seputar Belajar, Karier, Pribadi, dan Sosial.
        </p>
      </motion.div>

      {/* Highlight Videos */}
      <FeaturedMedia />

      {/* Filter Bidang */}
      <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter berdasarkan bidang">
        {bidangFilters.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBidang(b.id)}
            aria-pressed={activeBidang === b.id}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all
              ${activeBidang === b.id
                ? 'bg-[#1E1B2E] text-white shadow-md'
                : 'bg-white/80 text-slate-600 border border-purple-100 shadow-sm hover:text-purple-700 hover:bg-white'
              }`}
          >
            {b.label}
          </button>
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
            {filtered.map((item) => {
              const youtubeId = getYoutubeId(item.link)
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 border border-purple-100/70 rounded-3xl shadow-sm hover:shadow-md overflow-hidden cursor-pointer group transition-all flex flex-col justify-between"
                  role="listitem"
                  tabIndex={0}
                  onClick={() => openModal(item)}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
                  aria-label={`Buka konten: ${item.title}`}
                >
                  {/* Thumbnail */}
                  <div className={`relative aspect-video bg-gradient-to-br ${item.bg} overflow-hidden`}>
                    {youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/50 group-hover:scale-110 transition-transform duration-500">
                        <item.Icon size={46} />
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center text-slate-900 shadow-md">
                        {item.type === 'video' ? <Play size={18} fill="currentColor" /> : <ExternalLink size={16} />}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className={`text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full ${platformBadge[item.platform].color} shadow-sm`}>
                        {platformBadge[item.platform].label}
                      </span>
                    </div>

                    <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-white/95 shadow-sm capitalize ${bidangBadge[item.bidang]?.color || ''}`}>
                      {bidangBadge[item.bidang]?.label || item.bidang}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-purple-50 flex items-center justify-between text-xs text-purple-600 font-bold group-hover:text-purple-800">
                      <span>Lihat Konten</span>
                      <ExternalLink size={13} />
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Modal / Lightbox — Native <dialog> */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-label="Pratinjau konten media"
        aria-modal="true"
        className="bg-transparent border-none p-0 max-w-full max-h-full w-full h-full backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        style={{ background: 'transparent' }}
      >
        {selectedItem && (
          <div className="flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white border border-purple-100 rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl"
            >
              {/* Media area */}
              {selectedYoutubeId ? (
                <div className="aspect-video bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedYoutubeId}?autoplay=1&rel=0`}
                    title={selectedItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className={`aspect-video bg-gradient-to-br ${selectedItem.bg} flex flex-col items-center justify-center text-white/80 p-6 text-center`}>
                  <selectedItem.Icon size={56} className="mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    Konten {platformBadge[selectedItem.platform].label}
                  </span>
                </div>
              )}

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full ${platformBadge[selectedItem.platform].color}`}>
                    {platformBadge[selectedItem.platform].label}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${bidangBadge[selectedItem.bidang]?.color || ''}`}>
                    Bidang {bidangBadge[selectedItem.bidang]?.label}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedItem.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLink size={15} /> Buka di {platformBadge[selectedItem.platform].label}
                  </a>
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center gap-2 text-slate-600 text-sm font-bold px-4 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-all"
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
