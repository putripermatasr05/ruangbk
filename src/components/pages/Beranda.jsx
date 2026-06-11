import { motion } from 'framer-motion'
import { Play, ArrowRight, Lock, Wifi, Lightbulb, GraduationCap } from 'lucide-react'

const floatVariants = {
  animate: { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
}
const floatVariants2 = {
  animate: { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } }
}
const floatVariants3 = {
  animate: { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 3 } }
}

const featureItems = [
  { icon: Lock, emoji: '🔒', title: 'Kerahasiaan', desc: 'Setiap sesi konsultasi dijamin kerahasiaannya sepenuhnya.' },
  { icon: Wifi, emoji: '📡', title: 'Etika Digital', desc: 'Konten kami bebas dari SARA, kekerasan, dan hoaks.' },
  { icon: Lightbulb, emoji: '💡', title: 'Inovatif', desc: 'Pendekatan modern berbasis teknologi untuk generasi Z.' },
  { icon: GraduationCap, emoji: '🎓', title: 'Interaktif', desc: 'Kuis, materi, dan konsultasi real-time untuk pengalaman terbaik.' },
]

export default function Beranda({ navigate }) {
  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] pb-10 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none -z-0" aria-hidden="true">
          <div className="orb orb-1 absolute w-96 h-96 bg-primary/20 -top-24 -left-24" />
          <div className="orb orb-2 absolute w-80 h-80 bg-accent/15 top-1/3 -right-20" />
          <div className="orb orb-3 absolute w-64 h-64 bg-royal/15 -bottom-10 left-1/3" />
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary-light text-xs font-bold tracking-wide px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
            Bimbingan & Konseling Digital
          </div>

          <h1 className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-5">
            Kenali Dirimu,{' '}
            <span className="gradient-text block">Tentukan Arah<br className="hidden lg:block" /> Tujuanmu.</span>
          </h1>

          <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-md mb-8">
            Layanan Bimbingan dan Konseling digital yang adaptif, aman, dan interaktif untuk siswa SMA. Kami hadir untuk membantu kamu memahami potensi diri dan merencanakan masa depan.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('layanan')}
              className="flex items-center gap-2 bg-grad-primary text-white font-bold px-6 py-3.5 rounded-full shadow-glow-primary transition-shadow hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
            >
              <Play size={17} fill="white" /> Mulai Kuis Interaktif
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('profil')}
              className="flex items-center gap-2 text-slate-400 font-semibold px-5 py-3.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-surface hover:text-slate-200 transition-all"
            >
              Kenali Tim Kami <ArrowRight size={15} />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6" role="list">
            <div role="listitem">
              <div className="font-display font-bold text-2xl gradient-text">500+</div>
              <div className="text-xs text-slate-500 font-medium">Siswa Terlayani</div>
            </div>
            <div className="w-px h-9 bg-white/10" aria-hidden="true" />
            <div role="listitem">
              <div className="font-display font-bold text-2xl gradient-text">3</div>
              <div className="text-xs text-slate-500 font-medium">Bidang Layanan</div>
            </div>
            <div className="w-px h-9 bg-white/10" aria-hidden="true" />
            <div role="listitem">
              <div className="font-display font-bold text-2xl gradient-text">2</div>
              <div className="text-xs text-slate-500 font-medium">Konselor Profesional</div>
            </div>
          </div>
        </motion.div>

        {/* Hero visual — floating cards */}
        <motion.div
          className="hidden lg:flex relative items-center justify-center h-[420px]"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          {/* Central orb */}
          <div className="w-44 h-44 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center animate-[centralPulse_3s_ease-in-out_infinite]">
            <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-grad-primary flex items-center justify-center shadow-glow-primary">
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                  <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="14" cy="19" r="2.5" fill="#fff"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Float card 1 */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="absolute top-10 left-2 glass-card px-4 py-3 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-bold text-sm">Temukan Bakat</p>
                <p className="text-xs text-slate-400">Gali potensimu</p>
              </div>
            </div>
          </motion.div>

          {/* Float card 2 */}
          <motion.div
            variants={floatVariants2}
            animate="animate"
            className="absolute top-10 right-2 glass-card px-4 py-3 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-bold text-sm">Rencanakan Karir</p>
                <p className="text-xs text-slate-400">Masa depan cerah</p>
              </div>
            </div>
          </motion.div>

          {/* Float card 3 */}
          <motion.div
            variants={floatVariants3}
            animate="animate"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 glass-card px-4 py-3 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-bold text-sm">Konsultasi Aman</p>
                <p className="text-xs text-slate-400">Rahasia terjaga</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Mengapa TemanBK ── */}
      <section className="border-t border-white/[0.07] pt-12 pb-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Tentang Kami</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-10">
            Mengapa <span className="gradient-text">TemanBK</span> Hadir?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 leading-relaxed text-base"
          >
            TemanBK dikembangkan sebagai wadah inovatif untuk memberikan layanan informasi Bimbingan dan Konseling yang relevan dengan kebutuhan siswa SMA. Kami menjunjung tinggi asas{' '}
            <strong className="text-slate-200">kerahasiaan</strong>,{' '}
            <strong className="text-slate-200">etika digital</strong>, serta{' '}
            <strong className="text-slate-200">kebebasan berekspresi yang positif</strong>, tanpa unsur SARA, kekerasan, maupun hoaks.
          </motion.p>

          <div className="grid grid-cols-2 gap-3">
            {featureItems.map(({ emoji, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass-card p-4 hover:border-white/[0.14] transition-colors"
              >
                <span className="text-2xl mb-3 block" aria-hidden="true">{emoji}</span>
                <h3 className="font-bold text-sm mb-1">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
