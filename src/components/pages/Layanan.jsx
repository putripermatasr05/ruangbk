import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Briefcase, Heart } from 'lucide-react'
import QuizEngine from '../ui/QuizEngine'

/* ─── DATA ─── */
const tabs = [
  { id: 'belajar', label: 'Belajar', icon: '📚', Icon: BookOpen },
  { id: 'karir', label: 'Karir', icon: '🎯', Icon: Briefcase },
  { id: 'pribadi', label: 'Pribadi-Sosial', icon: '🌱', Icon: Heart },
]

/* Quiz Data: Belajar */
const quizBelajar = {
  title: '🧩 Temukan Gaya Belajar Dominanmu',
  subtitle: 'Jawab pertanyaan berikut dengan jujur untuk menemukan cara belajar terbaikmu.',
  questions: [
    {
      id: 'q1', type: 'radio',
      text: 'Saat merakit barang baru (misal: rak buku), apa yang kamu lakukan?',
      options: [
        { label: 'A', value: 'visual', text: 'Melihat buku panduan bergambar.' },
        { label: 'B', value: 'auditori', text: 'Meminta bantuan orang lain membacakan instruksinya.' },
        { label: 'C', value: 'kinestetik', text: 'Langsung mencoba menggabungkan bagian-bagiannya.' },
      ],
    },
    {
      id: 'q2', type: 'radio',
      text: 'Jika harus menghafal nomor telepon baru, bagaimana caramu?',
      options: [
        { label: 'A', value: 'visual', text: 'Membayangkan urutan angkanya di kepala.' },
        { label: 'B', value: 'auditori', text: 'Mengucapkan angkanya berulang-ulang bersuara.' },
        { label: 'C', value: 'kinestetik', text: 'Menuliskan angkanya di kertas atau di udara.' },
      ],
    },
  ],
  getResult: (answers) => {
    const counts = { visual: 0, auditori: 0, kinestetik: 0 }
    Object.values(answers).forEach((v) => { if (counts[v] !== undefined) counts[v]++ })
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    const map = {
      visual: { icon: '👁️', title: 'Gaya Belajarmu: Visual!', desc: 'Gunakan mind-map, stabilo warna-warni, atau tonton video ilustrasi untuk mempercepat pemahamanmu.', tags: ['Mind-Map', 'Video Edukasi', 'Diagram Warna'] },
      auditori: { icon: '👂', title: 'Gaya Belajarmu: Auditori!', desc: 'Coba rekam suara gurumu, belajar sambil diskusi, atau buat lagu dari materi hafalan.', tags: ['Rekam Penjelasan', 'Diskusi Kelompok', 'Podcast Belajar'] },
      kinestetik: { icon: '🤸', title: 'Gaya Belajarmu: Kinestetik!', desc: 'Kamu butuh praktik langsung. Sering-seringlah bergerak saat menghafal, atau lakukan eksperimen mini.', tags: ['Praktik Langsung', 'Eksperimen', 'Role Play'] },
    }
    return map[winner]
  },
}

/* Quiz Data: Karir */
const quizKarir = {
  title: '🎯 Tipe Kepribadian Pekerja (RIASEC Mini)',
  subtitle: 'Nilai setiap pernyataan dari skala 1–5 sesuai dirimu yang sebenarnya.',
  questions: [
    {
      id: 'qk1', type: 'scale',
      text: 'Aku suka merancang, membangun, atau memperbaiki sesuatu secara teknis (mesin, program, konstruksi).',
      key: 'teknis',
    },
    {
      id: 'qk2', type: 'scale',
      text: 'Aku menikmati membantu orang lain, mengajar, atau memberikan bimbingan dan dukungan.',
      key: 'sosial',
    },
    {
      id: 'qk3', type: 'scale',
      text: 'Aku tertarik dengan seni, kreasi konten, desain, musik, atau ekspresi kreatif lainnya.',
      key: 'kreatif',
    },
  ],
  getResult: (answers) => {
    const scores = { teknis: Number(answers[0] || 0), sosial: Number(answers[1] || 0), kreatif: Number(answers[2] || 0) }
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
    const map = {
      teknis: { icon: '⚙️', title: 'Tipe Realistik–Investigatif', desc: 'Kamu berbakat di bidang teknis dan analitis. Jurusan Saintek sangat cocok untuk mengembangkan potensimu.', tags: ['Teknik Informatika', 'Teknik Mesin', 'MIPA', 'Kedokteran'] },
      sosial: { icon: '🤝', title: 'Tipe Sosial–Enterprising', desc: 'Kamu senang berinteraksi dan membantu. Bidang sosial, pendidikan, atau manajemen sangat sesuai denganmu.', tags: ['Psikologi', 'Pendidikan', 'Komunikasi', 'Manajemen'] },
      kreatif: { icon: '🎨', title: 'Tipe Artistik–Kreatif', desc: 'Jiwa senimu kuat! Eksplorasi jurusan yang menggabungkan kreativitas dengan teknologi modern.', tags: ['Desain Komunikasi Visual', 'Arsitektur', 'Seni Rupa', 'Multimedia'] },
    }
    return map[winner]
  },
}

/* Quiz Data: Pribadi-Sosial */
const quizPribadi = {
  title: '🌱 Seberapa Sehat Kehidupan Sosialmu?',
  subtitle: 'Jawab pertanyaan singkat ini untuk mengetahui gambaran dinamika sosialmu.',
  questions: [
    {
      id: 'qp1', type: 'radio',
      text: 'Saat ada masalah berat, apa yang biasanya kamu lakukan?',
      options: [
        { label: 'A', value: 'terbuka', text: 'Bercerita ke teman atau orang tua yang dipercaya.' },
        { label: 'B', value: 'mandiri', text: 'Mencari solusi sendiri dengan refleksi dan jurnal.' },
        { label: 'C', value: 'tertutup', text: 'Memendam sendiri dan menghindari pembicaraan.' },
      ],
    },
    {
      id: 'qp2', type: 'radio',
      text: 'Bagaimana kamu biasanya merespons kritik dari teman?',
      options: [
        { label: 'A', value: 'terbuka', text: 'Menerima dan mempertimbangkan sebagai masukan.' },
        { label: 'B', value: 'mandiri', text: 'Refleksi dulu sebelum merespons.' },
        { label: 'C', value: 'tertutup', text: 'Merasa tersinggung dan menarik diri.' },
      ],
    },
  ],
  getResult: (answers) => {
    const vals = Object.values(answers)
    const hasTertutup = vals.includes('tertutup')
    const allTerbuka = vals.every((v) => v === 'terbuka')
    if (allTerbuka) return { icon: '🌟', title: 'Sosialmu Sangat Sehat!', desc: 'Kamu memiliki kemampuan komunikasi yang luar biasa. Terus jaga keterbukaan dan empatimu — itu aset besar!', tags: ['Terbuka', 'Empatik', 'Komunikatif'] }
    if (hasTertutup) return { icon: '💛', title: 'Ada Ruang untuk Bertumbuh', desc: 'Tidak apa-apa merasa tertutup kadang-kadang. Coba mulai dengan bercerita ke satu orang yang paling kamu percaya. TemanBK selalu siap mendengar.', tags: ['Konsultasi BK', 'Bangun Kepercayaan', 'Self-Care'] }
    return { icon: '✨', title: 'Sosialmu Cukup Sehat!', desc: 'Kamu reflektif dan mandiri. Terus asah kemampuan komunikasimu dan jangan ragu untuk meminta dukungan saat dibutuhkan.', tags: ['Reflektif', 'Mandiri', 'Terus Berkembang'] }
  },
}

/* Materi Content */
const MateriContent = {
  belajar: () => (
    <div>
      <div className="flex gap-5 bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-6 mb-6">
        <span className="text-5xl flex-shrink-0" aria-hidden="true">🧠</span>
        <div>
          <h2 className="font-display font-bold text-xl mb-2">Gaya Belajar: Kenali Caramu Menyerap Ilmu</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Belajar bukan tentang seberapa lama kamu membaca buku, tapi seberapa paham kamu dengan caramu sendiri. Setiap orang memiliki gaya belajar unik.
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { icon: '👁️', title: 'Visual', tip: 'Gunakan mind-map, diagram, dan video ilustrasi.', desc: 'Belajar melalui gambar, diagram, dan warna. Kamu mudah memahami informasi visual.' },
          { icon: '👂', title: 'Auditori', tip: 'Rekam penjelasan guru, belajar sambil diskusi.', desc: 'Belajar melalui suara dan percakapan. Informasi lebih mudah diingat bila diucapkan.' },
          { icon: '🤸', title: 'Kinestetik', tip: 'Praktek langsung, eksperimen mini, belajar sambil gerak.', desc: 'Belajar melalui gerakan dan pengalaman langsung. Kamu butuh terlibat secara fisik.' },
        ].map(({ icon, title, tip, desc }) => (
          <motion.div key={title} whileHover={{ y: -3 }} className="glass-card p-5 hover:border-primary/30 transition-colors">
            <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
            <h3 className="font-bold text-base mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">{desc}</p>
            <div className="text-xs text-accent bg-accent/8 border border-accent/20 rounded-lg px-3 py-2">
              <strong>Tips:</strong> {tip}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  ),

  karir: () => (
    <div>
      <div className="flex gap-5 bg-gradient-to-r from-emerald-500/10 to-accent/5 border border-emerald-500/20 rounded-2xl p-6 mb-6">
        <span className="text-5xl flex-shrink-0" aria-hidden="true">🎯</span>
        <div>
          <h2 className="font-display font-bold text-xl mb-2">Karir & Masa Depan: Saintek vs Soshum</h2>
          <p className="text-slate-400 text-sm leading-relaxed">Memilih jurusan adalah langkah besar. Kenali dulu rumpun ilmu dan mitos-mitos seputar dunia perkuliahan.</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {[
          { icon: '🔬', title: 'Saintek', color: 'emerald', border: 'border-l-emerald-500', bg: 'bg-emerald-500/5', contoh: 'Teknik, Kedokteran, MIPA, Informatika', desc: 'Sains, Teknologi, Rekayasa, Matematika. Cocok untuk kamu yang suka angka, eksperimen, dan inovasi.' },
          { icon: '📖', title: 'Soshum', color: 'accent', border: 'border-l-accent', bg: 'bg-accent/5', contoh: 'Hukum, Ekonomi, Komunikasi, Psikologi', desc: 'Sosial, Humaniora, Ekonomi, Hukum. Cocok untuk kamu yang suka komunikasi dan analisis sosial.' },
        ].map(({ icon, title, border, bg, contoh, desc }) => (
          <motion.div key={title} whileHover={{ y: -3 }} className={`glass-card p-5 border-l-4 ${border} ${bg}`}>
            <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
            <h3 className="font-bold text-base mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">{desc}</p>
            <p className="text-xs text-slate-500"><strong className="text-slate-400">Contoh:</strong> {contoh}</p>
          </motion.div>
        ))}
      </div>
      <h3 className="font-bold text-base mb-3">💡 Mitos vs Fakta Perkuliahan</h3>
      <div className="grid lg:grid-cols-2 gap-3">
        {[
          { mitos: '"Saintek lebih bergengsi dari Soshum."', fakta: 'Kedua rumpun memiliki peluang karir setara — tergantung kompetensi dan passion-mu.' },
          { mitos: '"IPK tinggi = sukses karir."', fakta: 'Soft skill, networking, dan pengalaman sama pentingnya dengan IPK di dunia kerja.' },
        ].map(({ mitos, fakta }) => (
          <div key={mitos} className="glass-card p-4 text-sm">
            <span className="inline-block text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 mb-2">MITOS</span>
            <p className="text-slate-400 mb-3">{mitos}</p>
            <span className="inline-block text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">FAKTA</span>
            <p className="text-slate-200">{fakta}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  pribadi: () => (
    <div>
      <div className="flex gap-5 bg-gradient-to-r from-royal/10 to-primary/5 border border-royal/20 rounded-2xl p-6 mb-6">
        <span className="text-5xl flex-shrink-0" aria-hidden="true">🌱</span>
        <div>
          <h2 className="font-display font-bold text-xl mb-2">Pengembangan Pribadi & Sosial</h2>
          <p className="text-slate-400 text-sm leading-relaxed">Memahami diri sendiri adalah langkah pertama menuju hubungan sosial yang sehat dan kehidupan yang bermakna.</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {[
          { icon: '💪', title: 'Manajemen Stres', desc: 'Pelajari teknik pernapasan, mindfulness, dan journaling untuk mengelola tekanan akademis dan sosial.' },
          { icon: '🗣️', title: 'Komunikasi Efektif', desc: 'Sampaikan perasaan dan kebutuhanmu dengan asertif. Aktif mendengar adalah kunci hubungan yang sehat.' },
          { icon: '🛡️', title: 'Anti Bullying', desc: 'Kenali bentuk-bentuk perundungan, cara merespons, dan bagaimana menciptakan lingkungan sekolah yang aman.' },
          { icon: '❤️', title: 'Kesehatan Mental', desc: 'Tidak ada yang salah dengan meminta bantuan. Jaga kesehatan mentalmu sama seperti kesehatan fisikmu.' },
        ].map(({ icon, title, desc }) => (
          <motion.div key={title} whileHover={{ y: -3 }} className="glass-card p-5 hover:border-royal/30 transition-colors">
            <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
            <h3 className="font-bold text-base mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  ),
}

const quizData = { belajar: quizBelajar, karir: quizKarir, pribadi: quizPribadi }

const tabPanelVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function Layanan() {
  const [activeTab, setActiveTab] = useState('belajar')
  const [mode, setMode] = useState({ belajar: 'materi', karir: 'materi', pribadi: 'materi' })

  const setTabMode = (tab, m) => setMode((prev) => ({ ...prev, [tab]: m }))

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Edukasi & Kuis</p>
        <h1 className="font-display font-bold text-4xl lg:text-5xl mb-3">
          Layanan <span className="gradient-text">Informasi BK</span>
        </h1>
        <p className="text-slate-400 max-w-xl leading-relaxed">
          Pilih bidang yang ingin kamu eksplorasi, lalu baca materi atau ikuti kuis interaktif.
        </p>
      </motion.div>

      {/* Tab Nav */}
      <div
        className="flex gap-1.5 p-1.5 bg-surface rounded-2xl border border-white/[0.07] w-fit mb-7"
        role="tablist"
        aria-label="Bidang layanan BK"
      >
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`tabpanel-${id}`}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all
              ${activeTab === id
                ? 'bg-grad-primary text-white shadow-glow-primary'
                : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <span aria-hidden="true">{icon}</span> {label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          variants={tabPanelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Mode switcher */}
          <div className="flex gap-2 mb-6" role="group" aria-label="Pilih mode">
            {['materi', 'kuis'].map((m) => (
              <button
                key={m}
                onClick={() => setTabMode(activeTab, m)}
                aria-pressed={mode[activeTab] === m}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all
                  ${mode[activeTab] === m
                    ? 'bg-surface-2 text-slate-200 border-white/15'
                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-white/10'
                  }`}
              >
                {m === 'materi' ? '📖 Baca Materi' : '🧩 Ikuti Kuis'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${mode[activeTab]}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {mode[activeTab] === 'materi'
                ? MateriContent[activeTab]()
                : <QuizEngine id={activeTab} {...quizData[activeTab]} />
              }
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
