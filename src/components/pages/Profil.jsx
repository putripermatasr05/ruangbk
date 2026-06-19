import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Zap, CheckCircle2, ChevronDown } from 'lucide-react'
import avatarGendis from '../../assets/tim/gendis.jpg'
import avatarGina from '../../assets/tim/gina.jpg'
import avatarNasywa from '../../assets/tim/nasywa.jpeg'
import avatarPutri from '../../assets/tim/putri.jpeg'
import avatarZourika from '../../assets/tim/zourika.jpeg'

const misiList = [
  'Memberikan informasi karir, belajar, dan sosial yang up-to-date.',
  'Menyediakan ruang konsultasi yang aman dan nyaman.',
  'Membantu siswa mengenali minat dan bakat secara mandiri.',
]

const materiBK = [
  {
    title: 'Pengertian Bimbingan dan Konseling',
    content: 'Bimbingan dan Konseling (BK) merupakan layanan bantuan yang diberikan kepada peserta didik untuk membantu memahami diri, mengembangkan potensi, mengatasi permasalahan, serta merencanakan masa depan secara optimal. BK bertujuan mendukung perkembangan pribadi, sosial, belajar, dan karier peserta didik agar menjadi individu yang mandiri, bertanggung jawab, dan berkarakter.'
  },
  {
    title: 'Tujuan Bimbingan dan Konseling',
    content: 'Layanan Bimbingan dan Konseling bertujuan membantu peserta didik mencapai perkembangan yang optimal, mandiri, dan bertanggung jawab dalam aspek pribadi, sosial, belajar, dan karier. Selain itu, BK membantu peserta didik memahami diri dan lingkungan, mengembangkan potensi, mengatasi permasalahan, serta merencanakan masa depan dengan baik.'
  },
  {
    title: 'Komponen Layanan BK',
    content: `<div class="space-y-3">
      <div><strong class="text-slate-200">1. Layanan Dasar</strong><br/>Layanan yang diberikan kepada seluruh peserta didik melalui kegiatan bimbingan untuk mengembangkan potensi, keterampilan hidup, serta kemampuan penyesuaian diri.</div>
      <div><strong class="text-slate-200">2. Layanan Peminatan dan Perencanaan Individual</strong><br/>Layanan yang membantu peserta didik mengenali minat, bakat, dan kemampuannya sehingga dapat merencanakan pendidikan dan karier sesuai potensi yang dimiliki.</div>
      <div><strong class="text-slate-200">3. Layanan Responsif</strong><br/>Layanan yang diberikan kepada peserta didik yang sedang menghadapi masalah dan memerlukan bantuan segera agar tidak menghambat perkembangan dirinya.</div>
      <div><strong class="text-slate-200">4. Layanan Dukungan Sistem</strong><br/>Layanan yang mendukung pelaksanaan program BK melalui kerja sama dengan guru, orang tua, sekolah, dan pihak terkait untuk menciptakan lingkungan yang mendukung perkembangan peserta didik.</div>
    </div>`
  },
  {
    title: 'Bidang Layanan BK',
    content: `<div class="space-y-3">
      <div><strong class="text-slate-200">Pribadi:</strong> Membantu peserta didik memahami dan mengembangkan diri secara positif.</div>
      <div><strong class="text-slate-200">Sosial:</strong> Membantu peserta didik membangun hubungan yang baik dengan lingkungan dan meningkatkan keterampilan sosial.</div>
      <div><strong class="text-slate-200">Belajar:</strong> Membantu peserta didik mengembangkan kebiasaan belajar yang efektif dan mencapai prestasi optimal.</div>
      <div><strong class="text-slate-200">Karier:</strong> Membantu peserta didik mengenali potensi diri, merencanakan pendidikan lanjutan, dan mempersiapkan pilihan karier di masa depan.</div>
    </div>`
  },
  {
    title: 'Fungsi Bimbingan dan Konseling',
    content: `<div class="space-y-3">
      <div><strong class="text-slate-200">1. Fungsi Pemahaman:</strong> Membantu peserta didik memahami diri, potensi, kebutuhan, permasalahan, dan lingkungan sekitar sebagai dasar pengambilan keputusan yang tepat.</div>
      <div><strong class="text-slate-200">2. Fungsi Pencegahan:</strong> Membantu peserta didik mengantisipasi dan mencegah munculnya berbagai masalah yang dapat menghambat perkembangan diri.</div>
      <div><strong class="text-slate-200">3. Fungsi Pengentasan:</strong> Membantu peserta didik menyelesaikan masalah yang sedang dihadapi agar dapat kembali berkembang secara optimal.</div>
      <div><strong class="text-slate-200">4. Fungsi Pemeliharaan:</strong> Membantu peserta didik mempertahankan kondisi dan perilaku positif yang telah dimiliki agar tetap berkembang dengan baik.</div>
      <div><strong class="text-slate-200">5. Fungsi Pengembangan:</strong> Membantu peserta didik mengembangkan potensi, bakat, minat, serta keterampilan hidup untuk mencapai keberhasilan di masa depan.</div>
    </div>`
  }
]

const timKami = [
  {
    avatar: avatarGendis,
    name: 'Gendis Retno Wulan Maulida',
    role: 'NIM: 2410123220013',
    color: 'primary',
  },
  {
    avatar: avatarGina,
    name: 'Gina Naila Rahmatika',
    role: 'NIM: 2410123120007',
    color: 'royal',
  },
  {
    avatar: avatarNasywa,
    name: 'Nasywa Siti Rahima',
    role: 'NIM: 2410123120009',
    color: 'primary',
  },
  {
    avatar: avatarPutri,
    name: 'Putri Permata Sari',
    role: 'NIM: 2410123220037',
    color: 'royal',
  },
  {
    avatar: 'https://ui-avatars.com/api/?name=Syifa+Aulia&background=6366f1&color=fff&size=200',
    name: 'Syifa Aulia',
    role: 'NIM: 2410123320018',
    color: 'primary',
  },
  {
    avatar: avatarZourika,
    name: 'Zourika Nahda Maddina',
    role: 'NIM: 2410123220015',
    color: 'royal',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Profil({ navigate }) {
  const [openAccordion, setOpenAccordion] = useState(0) // Default buka accordion pertama

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Tentang Layanan</p>
        <h1 className="font-display font-bold text-4xl lg:text-5xl mb-3">
          Profil <span className="gradient-text">Layanan BK</span>
        </h1>
        <p className="text-slate-400 max-w-xl leading-relaxed">
          Mengenal lebih dekat visi, misi, dan tim konselor profesional kami.
        </p>
      </motion.div>

      {/* Visi & Misi */}
      <div className="grid lg:grid-cols-2 gap-5 mb-14">
        {/* Visi */}
        <motion.div
          custom={0} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -5 }}
          className="glass-card p-7 relative overflow-hidden border-t-2 border-t-primary"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 text-primary-light">
            <Eye size={22} />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-light mb-1 block">Visi</span>
          <h2 className="font-display font-bold text-xl mb-4">Sahabat Siswa</h2>
          <p className="text-slate-400 leading-relaxed italic text-sm">
            "Menjadi sahabat siswa dalam mewujudkan kemandirian, karakter positif, dan perencanaan masa depan yang matang."
          </p>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 pointer-events-none" aria-hidden="true" />
        </motion.div>

        {/* Misi */}
        <motion.div
          custom={1} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -5 }}
          className="glass-card p-7 relative overflow-hidden border-t-2 border-t-accent"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-5 text-accent">
            <Zap size={22} />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-accent mb-1 block">Misi</span>
          <h2 className="font-display font-bold text-xl mb-4">Langkah Nyata</h2>
          <ul className="flex flex-col gap-3">
            {misiList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/5 pointer-events-none" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Materi BK (Accordion) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-14"
      >
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Pilar Layanan</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
          Apa itu <span className="gradient-text">Bimbingan & Konseling?</span>
        </h2>
        
        <div className="flex flex-col gap-3">
          {materiBK.map((item, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div key={idx} className="glass-card border border-white/[0.05] overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <h3 className="font-bold text-lg text-slate-200">{item.title}</h3>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div 
                        className="px-5 pb-5 text-sm text-slate-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Tim Pengembang */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mb-6"
      >
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Tim Kami</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl">
          Tim <span className="gradient-text">Pengembang</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
        {timKami.map(({ avatar, name, role, color }, i) => (
          <motion.div
            key={name}
            custom={i + 2} variants={cardVariants} initial="hidden" animate="visible"
            whileHover={{ y: -6 }}
            className="glass-card p-5 lg:p-7 flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Top gradient bg strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-16 lg:h-20 ${color === 'primary' ? 'bg-primary/8' : 'bg-royal/8'} pointer-events-none`}
              aria-hidden="true"
            />

            {/* Avatar */}
            <div className="relative z-10 mb-4 mt-2">
              <img
                src={avatar}
                alt={`Foto ${name}`}
                width={96}
                height={96}
                className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 ${color === 'primary' ? 'border-primary/40 shadow-[0_8px_24px_rgba(99,102,241,0.2)]' : 'border-royal/40 shadow-[0_8px_24px_rgba(168,85,247,0.2)]'}`}
              />
            </div>

            {/* NIM */}
            <span className={`text-[10px] lg:text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border mb-3
              ${color === 'primary'
                ? 'bg-primary/10 text-primary-light border-primary/20'
                : 'bg-royal/10 text-royal-light border-royal/20'
              }`}
            >
              {role}
            </span>

            <h3 className="font-display font-bold text-sm lg:text-base leading-snug">{name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
