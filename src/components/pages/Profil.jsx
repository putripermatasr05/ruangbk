import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Zap, CheckCircle2, ChevronDown } from 'lucide-react'
import avatarGendis from '../../assets/tim/gendis.jpg'
import avatarGina from '../../assets/tim/gina.jpg'
import avatarNasywa from '../../assets/tim/nasywa.jpeg'
import avatarPutri from '../../assets/tim/putri.jpeg'
import avatarSyifa from '../../assets/tim/syifa.jpg'
import avatarZourika from '../../assets/tim/zourika.jpeg'

const misiList = [
  'Memberikan informasi karir, belajar, dan sosial yang up-to-date.',
  'Menyediakan ruang konsultasi yang aman dan nyaman.',
  'Membantu siswa mengenali minat dan bakat secara mandiri.',
]

const materiBK = [
  {
    title: 'Definisi Bimbingan dan Konseling',
    content: `<div class="space-y-3 text-slate-600 leading-relaxed">
      <p>
        Bimbingan dan konseling merupakan dua kegiatan yang saling berkaitan dan melengkapi. Bimbingan membantu individu memahami serta mengembangkan potensi dirinya, sedangkan konseling membantu individu mengatasi masalah dan menemukan solusi yang tepat. Melalui kegiatan ini, siswa dapat lebih mengenal dirinya, memahami kemampuan yang dimiliki, mengatasi kesulitan, serta mengembangkan diri agar menjadi pribadi yang lebih baik.
      </p>
      <div class="mt-3 text-xs text-purple-700 font-semibold bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-200">
        Sumber: Wibowo & Pranoto (2023)
      </div>
    </div>`
  },
  {
    title: 'Tujuan Bimbingan dan Konseling',
    content: `<div class="space-y-3 text-slate-600 leading-relaxed">
      <p>
        Bimbingan dan konseling bertujuan membantu siswa memahami dirinya sendiri, mengenali minat dan kemampuan, mengembangkan potensi, serta mengatasi berbagai masalah yang dihadapi. Masalah tersebut dapat berkaitan dengan kehidupan pribadi, hubungan sosial, belajar, maupun karier. Selain itu, BK membantu siswa mengembangkan kepercayaan diri, mengelola emosi, menyesuaikan diri dengan lingkungan, dan mengambil keputusan secara mandiri agar dapat mencapai perkembangan diri yang optimal.
      </p>
      <div class="mt-3 text-xs text-purple-700 font-semibold bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-200">
        Sumber: Wibowo & Pranoto (2023)
      </div>
    </div>`
  },
  {
    title: 'Fungsi Bimbingan dan Konseling',
    content: `<div class="space-y-3 text-slate-600 leading-relaxed">
      <p>Bimbingan dan konseling memiliki beberapa fungsi yang membantu siswa dalam menjalani kehidupan dan mengembangkan dirinya, yaitu:</p>
      <div class="space-y-2.5 pl-1">
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">1. Fungsi Pencegahan</strong>
          Membantu siswa mengenali dan menghindari hal-hal yang dapat menimbulkan masalah melalui pemberian informasi, pemahaman, dan keterampilan untuk menghadapi berbagai kesulitan.
        </div>
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">2. Fungsi Pengembangan</strong>
          Membantu siswa mengembangkan potensi, minat, bakat, kemampuan, serta keterampilan agar dapat tumbuh menjadi pribadi yang lebih baik.
        </div>
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">3. Fungsi Penyaluran</strong>
          Membantu siswa menentukan pilihan pendidikan, kegiatan, maupun karier sesuai dengan minat, bakat, kemampuan, dan kepribadiannya.
        </div>
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">4. Fungsi Perbaikan</strong>
          Membantu siswa mengatasi dan memperbaiki sikap, perasaan, pikiran, maupun perilaku yang kurang tepat agar dapat berkembang dan menjalani kehidupan dengan lebih baik.
        </div>
      </div>
      <div class="mt-3 text-xs text-purple-700 font-semibold bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-200">
        Sumber: Wibowo & Pranoto (2023)
      </div>
    </div>`
  },
  {
    title: 'Bidang-Bidang Layanan Bimbingan dan Konseling',
    content: `<div class="space-y-3 text-slate-600 leading-relaxed">
      <p>
        Bimbingan dan konseling memiliki beberapa bidang layanan yang membantu siswa dalam mengembangkan diri dan menghadapi berbagai permasalahan. Bidang layanan BK meliputi pribadi, sosial, belajar, dan karier:
      </p>
      <div class="grid sm:grid-cols-2 gap-3 mt-2">
        <div class="p-3.5 bg-pink-50/60 rounded-2xl border border-pink-100">
          <strong class="text-pink-900 font-bold text-sm block mb-1">
            • Bimbingan Pribadi
          </strong>
          <p class="text-xs leading-relaxed text-slate-700">
            Layanan yang membantu siswa memahami dirinya sendiri, mulai dari kelebihan, kekurangan, minat, bakat, hingga potensi yang dimiliki. Layanan ini juga membantu siswa meningkatkan kepercayaan diri, mengelola emosi, menghadapi stres, serta mengatasi masalah pribadi sehingga mampu menerima diri sendiri, mengambil keputusan secara mandiri, dan mengembangkan sikap positif dalam kehidupan sehari-hari.
          </p>
        </div>
        <div class="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100">
          <strong class="text-blue-900 font-bold text-sm block mb-1">
            • Bimbingan Sosial
          </strong>
          <p class="text-xs leading-relaxed text-slate-700">
            Layanan yang membantu siswa mengembangkan kemampuan dalam berinteraksi dan menjalin hubungan baik dengan orang lain. Mengajarkan siswa untuk memiliki sikap empati, toleransi, saling menghargai, bekerja sama, dan menghormati perbedaan, serta mengatasi masalah dalam hubungan sosial dengan teman, orang tua, guru, maupun masyarakat sehingga mampu menyesuaikan diri dengan lingkungan.
          </p>
        </div>
        <div class="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
          <strong class="text-emerald-900 font-bold text-sm block mb-1">
            • Bimbingan Belajar (Akademik)
          </strong>
          <p class="text-xs leading-relaxed text-slate-700">
            Layanan yang membantu siswa mengatasi kesulitan dalam proses pembelajaran dan meningkatkan prestasi akademik. Mencakup bantuan dalam mengatur waktu belajar, memahami materi pelajaran, meningkatkan konsentrasi, serta menerapkan cara belajar yang efektif agar siswa menjadi lebih mandiri, termotivasi, dan mampu mencapai hasil belajar yang optimal.
          </p>
        </div>
        <div class="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-100">
          <strong class="text-amber-900 font-bold text-sm block mb-1">
            • Bimbingan Karier
          </strong>
          <p class="text-xs leading-relaxed text-slate-700">
            Layanan yang membantu siswa mengenali minat, bakat, kemampuan, dan potensi diri sebagai dasar dalam merencanakan masa depan. Memberikan pemahaman mengenai dunia kerja, pilihan pendidikan lanjutan, serta peluang karier agar siswa dapat menentukan pilihan pendidikan dan pekerjaan yang sesuai dengan kemampuan serta minatnya.
          </p>
        </div>
      </div>
      <div class="mt-3 text-xs text-purple-700 font-semibold bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-200">
        Sumber: Wibowo & Pranoto (2023)
      </div>
    </div>`
  },
  {
    title: 'Komponen Layanan Bimbingan dan Konseling',
    content: `<div class="space-y-3 text-slate-600 leading-relaxed">
      <p>Program bimbingan dan konseling memiliki empat komponen utama, yaitu:</p>
      <div class="space-y-2.5 pl-1">
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">1. Layanan Dasar</strong>
          Layanan yang diberikan kepada seluruh siswa untuk membantu mengembangkan kemampuan, sikap, dan keterampilan hidup yang sesuai dengan tugas perkembangannya.
        </div>
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">2. Layanan Responsif</strong>
          Layanan yang diberikan untuk membantu siswa mengatasi kebutuhan atau permasalahan yang sedang dihadapi dan membutuhkan penanganan segera. Layanan ini dapat dilakukan melalui konseling individu maupun kelompok, dengan membahas masalah pribadi, sosial, belajar, karier, dan permasalahan lainnya.
        </div>
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">3. Layanan Perencanaan Individual</strong>
          Layanan yang membantu siswa merencanakan dan menentukan arah perkembangan dirinya, baik dalam bidang pendidikan, karier, sosial, maupun pribadi. Melalui layanan ini, siswa dibantu untuk mengenali potensi serta memantau perkembangan dirinya.
        </div>
        <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
          <strong class="text-slate-900 font-bold block mb-0.5">4. Dukungan Sistem</strong>
          Kegiatan yang dilakukan untuk mendukung kelancaran dan keberhasilan seluruh program BK. Kegiatan ini mencakup pengelolaan program, kerja sama dengan berbagai pihak, serta penyediaan fasilitas yang diperlukan dalam pelaksanaan layanan BK.
        </div>
      </div>
      <div class="mt-3 text-xs text-purple-700 font-semibold bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-200">
        Sumber: Wahid (2022)
      </div>
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
    avatar: avatarSyifa,
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
        className="mb-8"
      >
        <span className="text-purple-600 text-xs font-bold tracking-widest uppercase mb-1.5 block">Tentang Layanan</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-2">
          Profil <span className="gradient-text">Layanan BK</span>
        </h1>
        <p className="text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed">
          Mengenal visi, misi pilar layanan, serta tim konselor pendamping yang siap menemani langkah belajarmu.
        </p>
      </motion.div>

      {/* Visi & Misi in Pastel Cards */}
      <div className="grid lg:grid-cols-2 gap-5 mb-12">
        {/* Visi (Pastel Purple) */}
        <motion.div
          custom={0} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -4 }}
          className="card-pastel-purple p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-purple-200 flex items-center justify-center mb-5 text-purple-700 shadow-sm">
              <Eye size={22} />
            </div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-purple-800 mb-1 block">Visi</span>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 mb-3">Sahabat Siswa Mandiri</h2>
            <p className="text-slate-700 leading-relaxed italic text-sm">
              "Menjadi sahabat siswa dalam mewujudkan kemandirian, karakter positif, dan perencanaan masa depan yang matang."
            </p>
          </div>
        </motion.div>

        {/* Misi (Pastel Yellow) */}
        <motion.div
          custom={1} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -4 }}
          className="card-pastel-yellow p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-amber-300/60 flex items-center justify-center mb-5 text-amber-700 shadow-sm">
              <Zap size={22} />
            </div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-amber-800 mb-1 block">Misi</span>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 mb-3">Langkah Nyata Pendampingan</h2>
            <ul className="flex flex-col gap-2.5">
              {misiList.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Materi BK (Accordion) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-14"
      >
        <span className="text-purple-600 text-xs font-bold tracking-widest uppercase mb-1 block">Pilar Keilmuan</span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-5">
          Apa itu <span className="gradient-text">Bimbingan & Konseling?</span>
        </h2>
        
        <div className="flex flex-col gap-3">
          {materiBK.map((item, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div key={idx} className="bg-white/85 border border-purple-100/80 shadow-sm overflow-hidden rounded-2xl transition-all">
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-purple-50/40 transition-colors"
                >
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">{item.title}</h3>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} className="text-purple-600" />
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
                        className="px-5 pb-5 text-sm leading-relaxed border-t border-purple-100/50 pt-3"
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
        <span className="text-purple-600 text-xs font-bold tracking-widest uppercase mb-1 block">Konselor Pendamping</span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
          Tim <span className="gradient-text">Pengembang TemanBK</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
        {timKami.map(({ avatar, name, role, color }, i) => (
          <motion.div
            key={name}
            custom={i + 2} variants={cardVariants} initial="hidden" animate="visible"
            whileHover={{ y: -5 }}
            className="bg-white/90 border border-purple-100/80 shadow-sm hover:shadow-md p-5 lg:p-7 rounded-3xl flex flex-col items-center text-center relative overflow-hidden transition-all"
          >
            {/* Top pastel accent strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-14 ${color === 'primary' ? 'bg-purple-100/60' : 'bg-amber-100/60'} pointer-events-none`}
              aria-hidden="true"
            />

            {/* Avatar */}
            <div className="relative z-10 mb-3.5 mt-2">
              <img
                src={avatar}
                alt={`Foto ${name}`}
                width={96}
                height={96}
                className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-white shadow-[0_6px_20px_rgba(139,92,246,0.15)]`}
              />
            </div>

            {/* NIM in soft pill badge */}
            <span className={`text-[10px] lg:text-xs font-bold tracking-wider px-3 py-1 rounded-full border mb-2.5
              ${color === 'primary'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {role}
            </span>

            <h3 className="font-display font-bold text-sm lg:text-base text-slate-900 leading-snug">{name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
