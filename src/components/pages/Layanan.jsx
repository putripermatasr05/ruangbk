import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Briefcase, ChevronDown, Heart, RotateCcw, Users } from 'lucide-react'
import QuizEngine from '../ui/QuizEngine'

/* ─── DATA ─── */
const tabs = [
  { id: 'belajar', label: 'Belajar', icon: '📚', Icon: BookOpen },
  { id: 'karir', label: 'Karir', icon: '🎯', Icon: Briefcase },
  { id: 'pribadi', label: 'Pribadi', icon: '🌱', Icon: Heart },
  { id: 'sosial', label: 'Sosial', icon: '🤝', Icon: Users },
]

/* Quiz Data: Belajar - KUIS 1 */
const quizBelajar1 = {
  title: 'KUIS 1 — FIND YOUR LEARNING STYLE',
  subtitle: 'Kenali Kecenderungan Gaya Belajarmu!',
  description: 'Setiap orang memiliki cara yang berbeda dalam memahami informasi. Ada yang lebih menyukai gambar, mendengarkan penjelasan, atau melakukan praktik secara langsung. Yuk, jawab pertanyaan berikut untuk mengenali kecenderungan cara belajar yang kamu sukai!',
  instructions: 'Terdapat 10 pertanyaan. Pilih satu jawaban yang paling menggambarkan dirimu. Tidak ada jawaban benar atau salah. Jawablah sesuai kebiasaanmu sehari-hari.',
  questions: [
    {
      id: 'kb1_q1', type: 'radio',
      text: '1. Ketika mempelajari materi baru, kamu lebih suka ...',
      options: [
        { label: 'A', value: 'visual', text: 'Melihat gambar, diagram, atau ilustrasi materi.' },
        { label: 'B', value: 'auditori', text: 'Mendengarkan penjelasan dari guru atau teman.' },
        { label: 'C', value: 'kinestetik', text: 'Mencoba langsung kegiatan yang berkaitan dengan materi.' },
      ],
    },
    {
      id: 'kb1_q2', type: 'radio',
      text: '2. Ketika guru menjelaskan materi di kelas, kamu biasanya ...',
      options: [
        { label: 'A', value: 'visual', text: 'Memperhatikan tulisan dan gambar di papan tulis.' },
        { label: 'B', value: 'auditori', text: 'Mendengarkan penjelasan guru dengan saksama.' },
        { label: 'C', value: 'kinestetik', text: 'Lebih memahami materi ketika ada praktik atau demonstrasi.' },
      ],
    },
    {
      id: 'kb1_q3', type: 'radio',
      text: '3. Ketika menghafalkan materi untuk ujian, kamu lebih suka ...',
      options: [
        { label: 'A', value: 'visual', text: 'Membuat rangkuman dengan warna dan simbol.' },
        { label: 'B', value: 'auditori', text: 'Membaca materi dengan suara keras atau mendengarkannya.' },
        { label: 'C', value: 'kinestetik', text: 'Menulis ulang materi atau mempraktikkannya.' },
      ],
    },
    {
      id: 'kb1_q4', type: 'radio',
      text: '4. Ketika mencari informasi dari internet, kamu lebih tertarik membuka ...',
      options: [
        { label: 'A', value: 'visual', text: 'Infografis, gambar, dan video animasi.' },
        { label: 'B', value: 'auditori', text: 'Podcast atau video yang berisi penjelasan lisan.' },
        { label: 'C', value: 'kinestetik', text: 'Video tutorial atau demonstrasi langsung.' },
      ],
    },
    {
      id: 'kb1_q5', type: 'radio',
      text: '5. Ketika belajar bersama teman, kamu lebih suka ...',
      options: [
        { label: 'A', value: 'visual', text: 'Membuat catatan atau peta konsep bersama.' },
        { label: 'B', value: 'auditori', text: 'Berdiskusi dan saling menjelaskan materi.' },
        { label: 'C', value: 'kinestetik', text: 'Melakukan latihan atau praktik bersama.' },
      ],
    },
    {
      id: 'kb1_q6', type: 'radio',
      text: '6. Ketika mencoba memahami suatu konsep yang sulit, kamu biasanya ...',
      options: [
        { label: 'A', value: 'visual', text: 'Mencari gambar atau ilustrasi yang menjelaskan konsep tersebut.' },
        { label: 'B', value: 'auditori', text: 'Meminta seseorang menjelaskan konsep tersebut kepadamu.' },
        { label: 'C', value: 'kinestetik', text: 'Mencoba melakukan simulasi atau praktik sederhana.' },
      ],
    },
    {
      id: 'kb1_q7', type: 'radio',
      text: '7. Ketika mengingat arah menuju suatu tempat, kamu lebih mudah mengingat melalui ...',
      options: [
        { label: 'A', value: 'visual', text: 'Peta atau petunjuk visual.' },
        { label: 'B', value: 'auditori', text: 'Penjelasan lisan mengenai arah perjalanan.' },
        { label: 'C', value: 'kinestetik', text: 'Mengunjungi tempat tersebut secara langsung.' },
      ],
    },
    {
      id: 'kb1_q8', type: 'radio',
      text: '8. Aktivitas pembelajaran yang paling menarik bagimu adalah ...',
      options: [
        { label: 'A', value: 'visual', text: 'Membuat poster, mind map, atau presentasi visual.' },
        { label: 'B', value: 'auditori', text: 'Presentasi, diskusi, dan tanya jawab.' },
        { label: 'C', value: 'kinestetik', text: 'Eksperimen, permainan edukatif, dan simulasi.' },
      ],
    },
    {
      id: 'kb1_q9', type: 'radio',
      text: '9. Ketika mengingat kembali materi yang sudah dipelajari, kamu cenderung mengingat ...',
      options: [
        { label: 'A', value: 'visual', text: 'Bentuk tulisan, gambar, atau susunan catatan.' },
        { label: 'B', value: 'auditori', text: 'Penjelasan atau percakapan yang pernah didengar.' },
        { label: 'C', value: 'kinestetik', text: 'Pengalaman atau kegiatan yang pernah dilakukan.' },
      ],
    },
    {
      id: 'kb1_q10', type: 'radio',
      text: '10. Jika diberikan tugas untuk memahami materi baru, kamu akan memilih ...',
      options: [
        { label: 'A', value: 'visual', text: 'Membaca buku dan melihat video atau gambar pendukung.' },
        { label: 'B', value: 'auditori', text: 'Mendengarkan penjelasan atau berdiskusi dengan teman.' },
        { label: 'C', value: 'kinestetik', text: 'Mencoba langsung melalui latihan atau praktik.' },
      ],
    },
  ],
  getResult: (answers) => {
    const counts = { visual: 0, auditori: 0, kinestetik: 0 }
    Object.values(answers).forEach((v) => {
      if (counts[v] !== undefined) counts[v]++
    })

    const maxVal = Math.max(counts.visual, counts.auditori, counts.kinestetik)
    const winners = Object.keys(counts).filter((k) => counts[k] === maxVal)

    const styleInfo = {
      visual: {
        icon: '🌷',
        name: 'Visual',
        title: 'HASIL 1 — VISUAL 🌷',
        tagline: 'Kamu memiliki kecenderungan belajar Visual!',
        desc: 'Kamu cenderung menyukai informasi yang disajikan melalui gambar, tulisan, warna, dan ilustrasi.',
        rekomendasi: [
          'Gunakan mind map untuk merangkum materi.',
          'Buat catatan dengan warna berbeda.',
          'Manfaatkan diagram dan infografis.',
          'Tonton video pembelajaran yang dilengkapi ilustrasi.',
        ],
        pesan: 'Jadikan kreativitas visual sebagai salah satu cara untuk mendukung kegiatan belajarmu!',
      },
      auditori: {
        icon: '🎧',
        name: 'Auditori',
        title: 'HASIL 2 — AUDITORI 🎧',
        tagline: 'Kamu memiliki kecenderungan belajar Auditori!',
        desc: 'Kamu cenderung menyukai kegiatan belajar yang melibatkan suara, percakapan, dan penjelasan secara lisan.',
        rekomendasi: [
          'Coba belajar melalui diskusi kelompok.',
          'Dengarkan podcast pendidikan.',
          'Rekam penjelasan materi menggunakan suaramu sendiri.',
          'Biasakan menjelaskan kembali materi yang sudah dipelajari.',
        ],
        pesan: 'Manfaatkan kemampuanmu dalam menyimak dan berdiskusi untuk memperkaya pemahaman!',
      },
      kinestetik: {
        icon: '🏃',
        name: 'Kinestetik',
        title: 'HASIL 3 — KINESTETIK 🏃',
        tagline: 'Kamu memiliki kecenderungan belajar Kinestetik!',
        desc: 'Kamu cenderung menyukai kegiatan belajar yang melibatkan praktik, pengalaman langsung, dan aktivitas fisik.',
        rekomendasi: [
          'Gunakan alat peraga ketika belajar.',
          'Coba eksperimen sederhana.',
          'Praktikkan materi yang sedang dipelajari.',
          'Ikuti simulasi atau permainan edukatif.',
        ],
        pesan: 'Belajar melalui pengalaman bisa menjadi salah satu cara menarik untuk mengembangkan pemahamanmu!',
      },
    }

    const isCombination = winners.length > 1
    const primary = styleInfo[winners[0]]

    return {
      render: ({ reset }) => (
        <div className="space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="text-6xl mb-4"
              aria-hidden="true"
            >
              {isCombination ? '✨' : primary.icon}
            </motion.div>
            <h3 className="font-display font-bold text-2xl lg:text-3xl mb-2 text-white">
              {isCombination
                ? `HASIL KOMBINASI — ${winners.map((w) => styleInfo[w].name).join(' & ')} ${winners.map((w) => styleInfo[w].icon).join(' ')}`
                : primary.title}
            </h3>
            <p className="text-primary-light font-semibold text-base mb-2">
              {isCombination
                ? `Kamu memiliki kombinasi kecenderungan belajar ${winners.map((w) => styleInfo[w].name).join(' & ')}!`
                : primary.tagline}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto">
              {isCombination
                ? 'Skor kecenderunganmu seimbang di lebih dari satu kategori. Kamu dapat menggabungkan indera visual, pendengaran, dan praktik secara fleksibel sesuai mata pelajaran yang kamu pelajari.'
                : primary.desc}
            </p>
          </div>

          {/* Breakdown Skor */}
          <div className="bg-surface-2/70 border border-white/[0.08] rounded-2xl p-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 text-center">
              Distribusi Skor Pilihanmu (Total 10 Soal)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Visual 🌷', val: counts.visual, color: 'text-pink-400', bg: 'bg-pink-500' },
                { label: 'Auditori 🎧', val: counts.auditori, color: 'text-sky-400', bg: 'bg-sky-500' },
                { label: 'Kinestetik 🏃', val: counts.kinestetik, color: 'text-emerald-400', bg: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.label} className="bg-surface p-3 rounded-xl border border-white/[0.05] text-center">
                  <p className="text-xs font-semibold text-slate-300 mb-1">{item.label}</p>
                  <p className={`font-display font-bold text-xl lg:text-2xl ${item.color}`}>
                    {item.val} <span className="text-xs text-slate-500 font-normal">poin</span>
                  </p>
                  <div className="h-1.5 bg-surface-3 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full ${item.bg} rounded-full`}
                      style={{ width: `${(item.val / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rekomendasi */}
          <div className="glass-card p-5 border border-white/[0.08]">
            <h4 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
              <span>🎯</span> Rekomendasi untukmu:
            </h4>
            <ul className="space-y-2 text-xs lg:text-sm text-slate-300">
              {(isCombination
                ? winners.flatMap((w) => styleInfo[w].rekomendasi.slice(0, 2))
                : primary.rekomendasi
              ).map((rek, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary-light flex-shrink-0 mt-0.5">•</span>
                  <span>{rek}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pesan TemanBK */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4.5 text-xs lg:text-sm text-slate-200">
            <p className="font-bold text-primary-light mb-1 flex items-center gap-2">
              <span>💌</span> Pesan TemanBK:
            </p>
            <p className="leading-relaxed text-slate-300">
              {isCombination
                ? 'Jadikan perpaduan gaya belajarmu sebagai kekuatan unik. Sesuaikan cara belajarmu dengan karakteristik materi yang sedang kamu hadapi!'
                : primary.pesan}
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-2 border border-white/10 text-sm font-bold text-slate-300 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all"
            >
              <RotateCcw size={15} /> Ulangi Kuis
            </button>
          </div>
        </div>
      ),
    }
  },
}

/* Opsi Kebiasaan Kuis 2 */
const habitOptions = [
  { label: 'A', value: 3, text: 'Selalu' },
  { label: 'B', value: 2, text: 'Sering' },
  { label: 'C', value: 1, text: 'Kadang-kadang' },
  { label: 'D', value: 0, text: 'Tidak Pernah' },
]

/* Quiz Data: Belajar - KUIS 2 */
const quizBelajar2 = {
  title: 'KUIS 2 — HOW EFFECTIVE IS YOUR STUDY HABIT?',
  subtitle: 'Seberapa Efektif Kebiasaan Belajarmu?',
  description: 'Sudah mengenali kecenderungan cara belajarmu? Sekarang, saatnya mengenali kebiasaan belajarmu! Kuis ini akan membantumu merefleksikan bagaimana kamu mengatur waktu, memahami materi, dan mengingat informasi. Jawablah sesuai kebiasaan yang benar-benar kamu lakukan, bukan berdasarkan jawaban yang menurutmu paling baik.',
  instructions: 'Pilih jawaban yang paling menggambarkan kebiasaanmu: Selalu (3), Sering (2), Kadang-kadang (1), Tidak Pernah (0).',
  questions: [
    {
      id: 'kb2_q1', type: 'radio',
      text: '1. Ketika mengerjakan tugas atau belajar, saya membagi waktu belajar menjadi beberapa sesi agar tetap fokus.',
      hint: 'Mengukur kebiasaan pengelolaan waktu (Pomodoro)',
      options: habitOptions,
    },
    {
      id: 'kb2_q2', type: 'radio',
      text: '2. Saya memberikan waktu istirahat singkat setelah belajar atau mengerjakan tugas dalam waktu tertentu.',
      hint: 'Mengukur kebiasaan pengelolaan waktu (Pomodoro)',
      options: habitOptions,
    },
    {
      id: 'kb2_q3', type: 'radio',
      text: '3. Setelah membaca materi, saya mencoba menjelaskan kembali isinya menggunakan bahasa sendiri.',
      hint: 'Mengukur kebiasaan memahami materi (Feynman)',
      options: habitOptions,
    },
    {
      id: 'kb2_q4', type: 'radio',
      text: '4. Ketika ada materi yang belum saya pahami, saya mencoba menjelaskannya kembali sampai menemukan bagian yang masih membingungkan.',
      hint: 'Mengukur kebiasaan memahami materi (Feynman)',
      options: habitOptions,
    },
    {
      id: 'kb2_q5', type: 'radio',
      text: '5. Saya mengulang materi yang sudah dipelajari pada hari-hari berikutnya agar tidak mudah lupa.',
      hint: 'Mengukur kebiasaan pengulangan materi (Spaced Repetition)',
      options: habitOptions,
    },
    {
      id: 'kb2_q6', type: 'radio',
      text: '6. Saya memiliki jadwal untuk mempelajari kembali materi yang pernah diajarkan di sekolah.',
      hint: 'Mengukur kebiasaan pengulangan materi (Spaced Repetition)',
      options: habitOptions,
    },
    {
      id: 'kb2_q7', type: 'radio',
      text: '7. Setelah membaca materi, saya mencoba mengingat kembali isinya tanpa melihat buku atau catatan.',
      hint: 'Mengukur kebiasaan mengingat kembali informasi (Active Recall)',
      options: habitOptions,
    },
    {
      id: 'kb2_q8', type: 'radio',
      text: '8. Saya membuat pertanyaan atau latihan soal sendiri untuk menguji pemahaman terhadap materi yang telah dipelajari.',
      hint: 'Mengukur kebiasaan mengingat kembali informasi (Active Recall)',
      options: habitOptions,
    },
  ],
  getResult: (answers) => {
    const pomodoroScore = Number(answers[0] ?? 0) + Number(answers[1] ?? 0)
    const feynmanScore = Number(answers[2] ?? 0) + Number(answers[3] ?? 0)
    const spacedScore = Number(answers[4] ?? 0) + Number(answers[5] ?? 0)
    const recallScore = Number(answers[6] ?? 0) + Number(answers[7] ?? 0)

    const getInterpretation = (score) => {
      if (score <= 2) {
        return {
          kategori: 'Perlu Dicoba',
          badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dotBg: 'bg-amber-400',
        }
      } else if (score <= 4) {
        return {
          kategori: 'Mulai Berkembang',
          badgeClass: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
          dotBg: 'bg-sky-400',
        }
      } else {
        return {
          kategori: 'Sudah Menjadi Kebiasaan',
          badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          dotBg: 'bg-emerald-400',
        }
      }
    }

    const pomodoroInfo = getInterpretation(pomodoroScore)
    const feynmanInfo = getInterpretation(feynmanScore)
    const spacedInfo = getInterpretation(spacedScore)
    const recallInfo = getInterpretation(recallScore)

    const rekomendasiMap = {
      pomodoro: {
        'Perlu Dicoba': 'Kamu dapat mulai membiasakan diri membagi waktu belajar menjadi sesi fokus dan istirahat. Cobalah menggunakan timer agar kegiatan belajar lebih teratur.',
        'Mulai Berkembang': 'Kamu sudah mulai membagi sesi belajar dan istirahat. Tingkatkan konsistensi durasi fokus (misal 25 menit) agar ritme belajarmu semakin optimal.',
        'Sudah Menjadi Kebiasaan': 'Pertahankan ritme belajarmu dengan timer dan istirahat teratur agar fokus tetap tajam tanpa burnout.',
      },
      feynman: {
        'Perlu Dicoba': 'Cobalah mulai menjelaskan konsep materi dengan kata-katamu sendiri kepada teman atau dirimu sendiri untuk menguji pemahaman.',
        'Mulai Berkembang': 'Kamu sudah mulai mencoba memahami materi, tetapi masih bisa mengembangkan kebiasaan menjelaskan kembali materi menggunakan bahasamu sendiri.',
        'Sudah Menjadi Kebiasaan': 'Luar biasa! Terus asah pemahaman mendalammu dengan rutin mengajarkan atau menyederhanakan materi sulit.',
      },
      spaced: {
        'Perlu Dicoba': 'Hindari Sistem Kebut Semalam. Buat jadwal pengulangan materi berkala (misal H+1, H+3, H+7) agar ingatan bertahan lebih lama.',
        'Mulai Berkembang': 'Kamu sesekali mengulang materi, cobalah buat jadwal atau alarm pengingat rutin di kalender ponselmu.',
        'Sudah Menjadi Kebiasaan': 'Pertahankan kebiasaan mengulang materi secara berkala. Jangan hanya mengulang materi ketika akan menghadapi ujian.',
      },
      recall: {
        'Perlu Dicoba': 'Berhenti hanya membaca ulang catatan secara pasif. Tutup buku dan latih ingatanmu dengan menuliskan apa yang masih kamu ingat.',
        'Mulai Berkembang': 'Cobalah lebih sering menguji ingatan tanpa melihat catatan. Kamu bisa menggunakan flashcard atau membuat pertanyaan sendiri.',
        'Sudah Menjadi Kebiasaan': 'Hebat! Kebiasaan aktif menguji ingatan ini melatih memori jangka panjangmu bekerja dengan sangat efektif.',
      },
    }

    const techniquesResult = [
      {
        id: 'pomodoro',
        icon: '🍅',
        name: 'Pomodoro',
        subtitle: 'Pengelolaan Waktu',
        borderLeft: 'border-l-accent',
        score: pomodoroScore,
        ...pomodoroInfo,
        rekomendasi: rekomendasiMap.pomodoro[pomodoroInfo.kategori],
      },
      {
        id: 'feynman',
        icon: '🗣️',
        name: 'Feynman',
        subtitle: 'Pemahaman Materi',
        borderLeft: 'border-l-royal',
        score: feynmanScore,
        ...feynmanInfo,
        rekomendasi: rekomendasiMap.feynman[feynmanInfo.kategori],
      },
      {
        id: 'spaced',
        icon: '🔄',
        name: 'Spaced Repetition',
        subtitle: 'Pengulangan Berkala',
        borderLeft: 'border-l-emerald-500',
        score: spacedScore,
        ...spacedInfo,
        rekomendasi: rekomendasiMap.spaced[spacedInfo.kategori],
      },
      {
        id: 'recall',
        icon: '📝',
        name: 'Active Recall',
        subtitle: 'Mengingat Aktif',
        borderLeft: 'border-l-rose-500',
        score: recallScore,
        ...recallInfo,
        rekomendasi: rekomendasiMap.recall[recallInfo.kategori],
      },
    ]

    return {
      render: ({ reset }) => (
        <div className="space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="text-5xl mb-3"
              aria-hidden="true"
            >
              💗
            </motion.div>
            <h3 className="font-display font-bold text-2xl lg:text-3xl mb-2 text-white">
              Hasil Refleksi Kebiasaan Belajarmu! 💗
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto">
              Kamu sudah mulai membangun kebiasaan belajar yang baik. Namun, masih ada beberapa strategi yang bisa dikembangkan agar kegiatan belajarmu lebih terarah.
            </p>
          </div>

          {/* Grid Skor Teknik */}
          <div className="bg-surface-2/70 border border-white/[0.08] rounded-2xl p-4 lg:p-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 text-center">
              Ringkasan Skor per Teknik Belajar (Maks 6 poin tiap teknik)
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {techniquesResult.map((t) => (
                <div key={t.id} className="bg-surface p-3.5 rounded-xl border border-white/[0.05] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{t.icon}</span>
                      <span className="font-bold text-sm text-slate-200">{t.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">{t.subtitle}</p>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xs text-slate-400">Skor:</span>
                      <span className="font-display font-bold text-base text-white">{t.score} / 6</span>
                    </div>
                    <div className="h-1.5 bg-surface-3 rounded-full mb-2 overflow-hidden">
                      <div
                        className={`h-full ${t.dotBg} rounded-full`}
                        style={{ width: `${(t.score / 6) * 100}%` }}
                      />
                    </div>
                    <span className={`inline-block w-full text-center text-[11px] font-semibold px-2 py-0.5 rounded-md border ${t.badgeClass}`}>
                      {t.kategori}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rekomendasi Berdasarkan Hasilmu */}
          <div>
            <h4 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
              <span>📋</span> Rekomendasi Berdasarkan Hasilmu:
            </h4>
            <div className="grid lg:grid-cols-2 gap-3">
              {techniquesResult.map((t) => (
                <div key={t.id} className={`glass-card p-4 border-l-4 ${t.borderLeft} border border-white/[0.06] flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h5 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                        <span>{t.icon}</span> {t.name}
                      </h5>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${t.badgeClass}`}>
                        {t.kategori}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-1">
                      {t.rekomendasi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pesan TemanBK */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4.5 text-xs lg:text-sm text-slate-200">
            <p className="font-bold text-primary-light mb-1 flex items-center gap-2">
              <span>💌</span> Pesan TemanBK:
            </p>
            <p className="leading-relaxed text-slate-300">
              Tidak harus langsung menguasai semua teknik belajar. Mulailah dari satu kebiasaan kecil, lakukan secara konsisten, dan evaluasi perkembanganmu!
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-2 border border-white/10 text-sm font-bold text-slate-300 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all"
            >
              <RotateCcw size={15} /> Ulangi Kuis
            </button>
          </div>
        </div>
      ),
    }
  },
}

/* Komponen Switcher Kuis Tab Belajar */
function QuizBelajarSection() {
  const [activeQuiz, setActiveQuiz] = useState('kuis1')

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => setActiveQuiz('kuis1')}
          className={`flex-1 p-4 rounded-2xl border text-left transition-all ${
            activeQuiz === 'kuis1'
              ? 'bg-grad-primary/10 border-primary text-white shadow-glow-primary'
              : 'bg-surface-2 border-white/[0.07] text-slate-400 hover:text-slate-200 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm lg:text-base text-slate-100 flex items-center gap-2">
              <span>🌷</span> Kuis 1: Find Your Learning Style
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">
              10 Soal
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Kenali kecenderungan gaya belajarmu: Visual, Auditori, atau Kinestetik.
          </p>
        </button>

        <button
          onClick={() => setActiveQuiz('kuis2')}
          className={`flex-1 p-4 rounded-2xl border text-left transition-all ${
            activeQuiz === 'kuis2'
              ? 'bg-grad-primary/10 border-primary text-white shadow-glow-primary'
              : 'bg-surface-2 border-white/[0.07] text-slate-400 hover:text-slate-200 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm lg:text-base text-slate-100 flex items-center gap-2">
              <span>⏱️</span> Kuis 2: How Effective Is Your Study Habit?
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">
              8 Soal
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Refleksikan kebiasaan belajarmu dalam menerapkan 4 teknik belajar saintifik.
          </p>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuiz}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeQuiz === 'kuis1' ? (
            <QuizEngine id="belajar-1" {...quizBelajar1} />
          ) : (
            <QuizEngine id="belajar-2" {...quizBelajar2} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* Quiz Data: Karir */
const quizKarir = {
  title: '🎯 Asesmen Minat Karir (RIASEC Lengkap)',
  subtitle: 'Nilai setiap pernyataan dari skala 1–5 (1: Sangat Tidak Setuju, 5: Sangat Setuju).',
  questions: [
    { id: 'qk1', type: 'scale', text: '1. Aku suka merakit mesin, memperbaiki peralatan, atau bekerja di luar ruangan dengan alat.', key: 'R' },
    { id: 'qk2', type: 'scale', text: '2. Aku suka menganalisis data, melakukan eksperimen, atau memecahkan soal matematika/sains.', key: 'I' },
    { id: 'qk3', type: 'scale', text: '3. Aku tertarik menciptakan sesuatu yang original melalui seni, desain, musik, atau tulisan.', key: 'A' },
    { id: 'qk4', type: 'scale', text: '4. Aku menikmati mengajar, merawat, atau memberikan dukungan emosional kepada orang lain.', key: 'S' },
    { id: 'qk5', type: 'scale', text: '5. Aku suka memimpin tim, meyakinkan orang lain, atau mengambil risiko dalam proyek/bisnis.', key: 'E' },
    { id: 'qk6', type: 'scale', text: '6. Aku nyaman bekerja dengan data yang terorganisir, menyusun jadwal, dan mengikuti instruksi/SOP.', key: 'C' },
  ],
  getResult: (answers) => {
    // 0:R, 1:I, 2:A, 3:S, 4:E, 5:C
    const scores = {
      realistik: Number(answers[0] || 0),
      investigatif: Number(answers[1] || 0),
      artistik: Number(answers[2] || 0),
      sosial: Number(answers[3] || 0),
      enterprising: Number(answers[4] || 0),
      konvensional: Number(answers[5] || 0),
    }
    
    // Kelompokkan menjadi rumpun dominan
    const rumpun = {
      teknis_sains: scores.realistik + scores.investigatif,
      seni_kreatif: scores.artistik,
      sosial_edukasi: scores.sosial,
      bisnis_manajemen: scores.enterprising + scores.konvensional,
    }
    
    const winner = Object.entries(rumpun).sort((a, b) => b[1] - a[1])[0][0]
    const map = {
      teknis_sains: { icon: '🔬', title: 'Tipe Pemikir & Praktisi (R/I)', desc: 'Kamu logis, analitis, dan suka hal yang pasti. Kamu unggul memecahkan masalah teknis atau ilmiah. Bidang STEM sangat menjanjikan untukmu.', tags: ['Teknik', 'Kedokteran', 'MIPA', 'IT / Programmer'] },
      seni_kreatif: { icon: '🎨', title: 'Tipe Kreator (Artistik)', desc: 'Jiwa senimu tak terbendung! Kamu out-of-the-box dan ekspresif. Dunia membutuhkan inovasi dan sentuhan keindahan dari karyamu.', tags: ['DKV', 'Arsitektur', 'Ilmu Komunikasi', 'Seni Musik/Rupa'] },
      sosial_edukasi: { icon: '🤝', title: 'Tipe Pembimbing (Sosial)', desc: 'Empatimu tinggi. Kamu senang interaksi manusia, mendengarkan, dan membantu orang berkembang. Lingkungan edukasi dan kesehatan masyarakat menantimu.', tags: ['Psikologi', 'Pendidikan', 'Keperawatan', 'Sosiologi'] },
      bisnis_manajemen: { icon: '📊', title: 'Tipe Penggerak (E/C)', desc: 'Kamu memiliki jiwa kepemimpinan, suka mengorganisir, dan berorientasi pada target. Kamu sangat cocok memimpin proyek, menata administrasi, atau membangun usaha.', tags: ['Manajemen Bisnis', 'Akuntansi', 'Ilmu Hukum', 'Hubungan Internasional'] },
    }
    return map[winner]
  },
}

/* Quiz Data: Pribadi */
const quizPribadi = {
  title: '🌱 Evaluasi Kesejahteraan Emosional (Pribadi)',
  subtitle: 'Pilih respons yang paling mencerminkan kondisi personalmu saat ini.',
  questions: [
    {
      id: 'qp1', type: 'radio',
      text: '1. Saat menghadapi tekanan tugas sekolah yang menumpuk, apa yang biasa kamu lakukan?',
      options: [
        { label: 'A', value: 'sehat', text: 'Membuat jadwal prioritas, mencicilnya, dan minta bantuan jika kewalahan.' },
        { label: 'B', value: 'sedang', text: 'Memaksakan diri begadang mengejar target sampai kelelahan total.' },
        { label: 'C', value: 'kritis', text: 'Menghindar sepenuhnya (procrastination), bermain medsos, atau pasrah.' },
      ],
    },
    {
      id: 'qp2', type: 'radio',
      text: '2. Berapa sering kamu merasa "kosong" atau kehilangan minat pada hobi yang dulu kamu sukai?',
      options: [
        { label: 'A', value: 'sehat', text: 'Jarang. Sesekali bosan, tapi segera kembali antusias.' },
        { label: 'B', value: 'sedang', text: 'Kadang-kadang, terutama saat sedang banyak pikiran.' },
        { label: 'C', value: 'kritis', text: 'Sangat sering atau hampir setiap hari belakangan ini.' },
      ],
    },
    {
      id: 'qp3', type: 'radio',
      text: '3. Bagaimana kamu menghadapi kegagalan atau nilai yang buruk?',
      options: [
        { label: 'A', value: 'sehat', text: 'Mengevaluasi kesalahan dan menjadikannya pelajaran tanpa menyalahkan diri.' },
        { label: 'B', value: 'sedang', text: 'Kecewa berhari-hari, lalu mencoba bangkit perlahan.' },
        { label: 'C', value: 'kritis', text: 'Menghukum diri sendiri dan merasa sangat tidak berguna.' },
      ],
    },
    {
      id: 'qp4', type: 'radio',
      text: '4. Bagaimana kualitas tidurmu dalam 1-2 minggu terakhir?',
      options: [
        { label: 'A', value: 'sehat', text: 'Cukup dan nyenyak, bangun pagi merasa segar.' },
        { label: 'B', value: 'sedang', text: 'Kadang susah tidur kalau lagi banyak pikiran, tapi masih bisa diatasi.' },
        { label: 'C', value: 'kritis', text: 'Sangat buruk. Terlalu banyak tidur (oversleeping) atau insomnia parah setiap hari.' },
      ],
    },
    {
      id: 'qp5', type: 'radio',
      text: '5. Saat kamu membuat kesalahan kecil, apa yang biasanya terlintas di pikiranmu?',
      options: [
        { label: 'A', value: 'sehat', text: '"Tidak apa-apa, namanya juga proses belajar. Aku akan perbaiki ke depannya."' },
        { label: 'B', value: 'sedang', text: '"Ah, harusnya aku bisa lebih teliti dari ini." (sedikit menyalahkan diri sendiri).' },
        { label: 'C', value: 'kritis', text: '"Aku memang selalu mengacaukan segalanya dan tidak pernah bisa melakukan apapun dengan benar."' },
      ],
    },
    {
      id: 'qp6', type: 'radio',
      text: '6. Ketika sedang sangat sedih atau kewalahan, seberapa sering kamu mengalihkan perhatian ke hal-hal yang merusak diri?',
      options: [
        { label: 'A', value: 'sehat', text: 'Sangat jarang/tidak pernah. Aku lebih suka mencari solusi, jurnaling, atau beristirahat.' },
        { label: 'B', value: 'sedang', text: 'Kadang-kadang, seperti doom-scrolling medsos seharian penuh untuk melarikan diri dari kenyataan.' },
        { label: 'C', value: 'kritis', text: 'Sering. Mengisolasi diri secara ekstrem, melukai diri, atau tindakan impulsif lainnya.' },
      ],
    },
  ],
  getResult: (answers) => {
    const vals = Object.values(answers)
    const countKritis = vals.filter(v => v === 'kritis').length
    const countSedang = vals.filter(v => v === 'sedang').length
    
    if (countKritis >= 3) {
      return { icon: '🆘', title: 'Waktunya Meminta Bantuan', desc: 'Sepertinya kamu sedang membawa beban pikiran yang sangat berat sendirian. Tolong jangan sungkan mencari dukungan profesional atau jadwalkan sesi cerita dengan konselor BK kita. Kami di sini untukmu.', tags: ['Perlu Konseling', 'Darurat Self-Care', 'Jangan Sendirian'] }
    } else if (countKritis >= 1 || countSedang >= 3) {
      return { icon: '💛', title: 'Beri Waktu untuk Dirimu', desc: 'Kamu sudah berjuang keras, tapi stres dan kelelahan mental mulai menumpuk. Coba kurangi ekspektasi perfeksionis dan mulailah lebih memperhatikan kebutuhan emosionalmu sendiri.', tags: ['Manajemen Stres', 'Mindfulness', 'Take a Break'] }
    } else {
      return { icon: '🌟', title: 'Kondisimu Sangat Stabil', desc: 'Luar biasa! Kamu memiliki kemampuan menghadapi masalah (coping mechanism) yang sehat dan tangguh. Pertahankan energi positif ini untuk menghadapi tantangan ke depan.', tags: ['Resiliensi Tinggi', 'Sehat Mental', 'Positive Vibes'] }
    }
  },
}

/* Quiz Data: Sosial */
const quizSosial = {
  title: '🤝 Evaluasi Dinamika Sosial',
  subtitle: 'Pilih respons yang paling menggambarkan interaksimu dengan lingkungan sekitar.',
  questions: [
    {
      id: 'qs1', type: 'radio',
      text: '1. Dalam lingkungan pertemanan/sekolah, apakah kamu merasa punya tempat bercerita?',
      options: [
        { label: 'A', value: 'sehat', text: 'Ya, aku punya circle yang sangat mendukung dan dapat dipercaya.' },
        { label: 'B', value: 'sedang', text: 'Ada, tapi aku masih sering menyembunyikan perasaan asliku dari mereka.' },
        { label: 'C', value: 'kritis', text: 'Tidak ada. Aku merasa sangat sendirian dan terisolasi.' },
      ],
    },
    {
      id: 'qs2', type: 'radio',
      text: '2. Saat seseorang memberikan kritik tajam, bagaimana reaksimu?',
      options: [
        { label: 'A', value: 'sehat', text: 'Mendengarkan dengan asertif, lalu merevisi jika memang masuk akal.' },
        { label: 'B', value: 'sedang', text: 'Diam menerima, tapi diam-diam merasa insecure atau memendam kekesalan.' },
        { label: 'C', value: 'kritis', text: 'Langsung tersinggung, defensif agresif, atau balik menyalahkan.' },
      ],
    },
    {
      id: 'qs3', type: 'radio',
      text: '3. Jika kamu melihat teman sedang diasingkan atau mengalami bullying ringan di kelas?',
      options: [
        { label: 'A', value: 'sehat', text: 'Mendekati, menemani, atau berusaha melaporkan ke guru BK (Upstander).' },
        { label: 'B', value: 'sedang', text: 'Kasihan, tapi takut ikut campur agar tidak ikut dijadikan target.' },
        { label: 'C', value: 'kritis', text: 'Ikut menjauh atau bahkan merasa itu bukan urusanku sama sekali.' },
      ],
    },
    {
      id: 'qs4', type: 'radio',
      text: '4. Apakah kamu sering merasa harus berpura-pura menjadi orang lain agar diterima di suatu sirkel pertemanan?',
      options: [
        { label: 'A', value: 'sehat', text: 'Tidak. Teman-temanku yang sesungguhnya menerima aku apa adanya.' },
        { label: 'B', value: 'sedang', text: 'Terkadang iya, agar tidak dicap "aneh", FOMO, atau tertinggal pergaulan.' },
        { label: 'C', value: 'kritis', text: 'Ya, hampir selalu. Aku merasa lelah harus memakai topeng setiap hari di sekolah.' },
      ],
    },
    {
      id: 'qs5', type: 'radio',
      text: '5. Ketika temanmu meminta bantuan tapi kamu sedang sangat lelah atau sibuk, apa yang kamu lakukan?',
      options: [
        { label: 'A', value: 'sehat', text: 'Menolak dengan sopan dan menjelaskan situasinya (menjaga boundaries).' },
        { label: 'B', value: 'sedang', text: 'Mengiyakan dengan terpaksa, lalu mengeluh diam-diam di belakang.' },
        { label: 'C', value: 'kritis', text: 'Selalu mengiyakan apapun kondisinya karena takut dijauhi (people pleaser sejati).' },
      ],
    },
    {
      id: 'qs6', type: 'radio',
      text: '6. Bagaimana sikapmu terhadap gosip atau drama pertemanan di sekolah?',
      options: [
        { label: 'A', value: 'sehat', text: 'Menghindarinya sebisa mungkin. Aku tidak suka ikut campur urusan orang lain.' },
        { label: 'B', value: 'sedang', text: 'Kadang ikut menyimak sekadar agar tahu info, tapi tidak ikut menyebarkannya.' },
        { label: 'C', value: 'kritis', text: 'Sering terlibat aktif, menyebarkannya, atau bahkan menjadikannya hiburan.' },
      ],
    },
  ],
  getResult: (answers) => {
    const vals = Object.values(answers)
    const countKritis = vals.filter(v => v === 'kritis').length
    const countSedang = vals.filter(v => v === 'sedang').length
    
    if (countKritis >= 3) {
      return { icon: '🆘', title: 'Lingkungan Sosialmu Sedang Rawan', desc: 'Ada hambatan besar dalam interaksimu, entah karena terjebak dalam lingkungan pertemanan yang toxic, menjadi people pleaser ekstrem, atau kendala komunikasi. Pertimbangkan untuk berdiskusi dengan konselor.', tags: ['Konflik Sosial', 'Isolasi', 'Konseling'] }
    } else if (countKritis >= 1 || countSedang >= 3) {
      return { icon: '💛', title: 'Perlu Penguatan Relasi', desc: 'Hubungan sosialmu kadang membuatmu kelelahan. Coba asah lagi teknik komunikasi asertif, beranikan diri untuk berkata "tidak", dan jangan ragu untuk menetapkan batasan personal (boundaries) yang sehat.', tags: ['Boundaries', 'Komunikasi Asertif', 'People Pleaser'] }
    } else {
      return { icon: '🌟', title: 'Sosialmu Sangat Cerdas!', desc: 'Hebat! Kamu memiliki kecerdasan sosial dan empati yang sangat baik. Kamu mampu menavigasi dinamika pertemanan dengan asertif, sehat, dan menjadi pengaruh positif bagi sekitarmu.', tags: ['Empati Tinggi', 'Sahabat Baik', 'Upstander'] }
    }
  },
}

/* Data Teknik Belajar Anti Lupa */
const teknikBelajarList = [
  {
    id: 'pomodoro',
    icon: '🍅',
    letter: 'A',
    name: 'Teknik Pomodoro',
    subtitle: 'Belajar dengan Mengatur Waktu',
    desc: 'Teknik Pomodoro merupakan metode belajar dengan membagi waktu menjadi sesi fokus dan istirahat singkat.',
    borderLeft: 'border-l-accent',
    accentText: 'text-accent',
    accentBg: 'bg-accent/10',
    dotBg: 'bg-accent',
    cara: [
      { text: 'Pilih tugas yang ingin kamu selesaikan.' },
      { text: 'Atur timer selama 25 menit.' },
      { text: 'Fokus belajar tanpa gangguan.' },
      { text: 'Istirahat selama 5 menit setelah timer berbunyi.' },
      { text: 'Ulangi hingga empat sesi, kemudian ambil istirahat lebih panjang sekitar 15–20 menit.' },
    ],
    isNumbered: true,
    contoh: 'Gunakan 25 menit untuk mengerjakan tugas Matematika, lalu istirahat selama 5 menit sebelum melanjutkan.',
    tips: 'Sesuaikan durasi belajar dengan kebutuhan dan kemampuan konsentrasimu.',
  },
  {
    id: 'feynman',
    icon: '🗣️',
    letter: 'B',
    name: 'Teknik Feynman',
    subtitle: 'Belajar dengan Mengajarkan Kembali',
    desc: 'Teknik Feynman merupakan cara belajar dengan menjelaskan kembali materi menggunakan bahasa sendiri sesederhana mungkin.',
    borderLeft: 'border-l-royal',
    accentText: 'text-royal-light',
    accentBg: 'bg-royal/10',
    dotBg: 'bg-royal',
    cara: [
      { text: 'Pilih materi yang ingin dipahami.' },
      { text: 'Pelajari materi tersebut.' },
      { text: 'Coba jelaskan kembali seolah-olah kamu sedang mengajari teman.' },
      { text: 'Temukan bagian yang masih sulit dijelaskan.' },
      { text: 'Pelajari kembali bagian tersebut dan ulangi penjelasan.' },
    ],
    isNumbered: true,
    contoh: 'Setelah mempelajari sistem pencernaan, coba jelaskan proses pencernaan makanan kepada temanmu menggunakan bahasa sederhana.',
    tips: 'Kamu bisa mencoba menjelaskannya di depan cermin atau merekam suaramu sendiri.',
  },
  {
    id: 'spaced-repetition',
    icon: '🔄',
    letter: 'C',
    name: 'Spaced Repetition',
    subtitle: 'Mengulang Materi Secara Berkala',
    desc: 'Spaced Repetition merupakan teknik belajar dengan mengulang materi dalam rentang waktu tertentu agar informasi lebih mudah diingat dalam jangka panjang.',
    borderLeft: 'border-l-emerald-500',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    dotBg: 'bg-emerald-500',
    cara: [
      { label: 'Hari ke-1', text: 'Pelajari materi baru.' },
      { label: 'Hari ke-2', text: 'Ulangi materi.' },
      { label: 'Hari ke-4', text: 'Pelajari kembali bagian penting.' },
      { label: 'Hari ke-7', text: 'Lakukan pengulangan.' },
      { label: 'Hari ke-30', text: 'Periksa kembali pemahamanmu.' },
    ],
    isNumbered: false,
    contoh: 'Setelah mempelajari materi Biologi hari Senin, luangkan waktu pada hari berikutnya untuk mengingat kembali materi tersebut.',
    tips: 'Gunakan kalender atau pengingat di ponsel agar jadwal pengulanganmu lebih teratur.',
  },
  {
    id: 'active-recall',
    icon: '📝',
    letter: 'D',
    name: 'Active Recall',
    subtitle: 'Melatih Ingatan Tanpa Melihat Catatan',
    desc: 'Active Recall merupakan teknik belajar dengan mencoba mengingat kembali informasi yang telah dipelajari tanpa langsung membuka buku atau catatan.',
    borderLeft: 'border-l-rose-500',
    accentText: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    dotBg: 'bg-rose-500',
    cara: [
      { text: 'Pelajari materi seperti biasa.' },
      { text: 'Tutup buku atau catatanmu.' },
      { text: 'Tuliskan informasi yang masih kamu ingat.' },
      { text: 'Buat pertanyaan berdasarkan materi.' },
      { text: 'Jawab pertanyaan tanpa melihat catatan.' },
      { text: 'Periksa kembali jawabanmu.' },
    ],
    isNumbered: true,
    contoh: 'Setelah belajar Sejarah, tutup bukumu dan coba jawab pertanyaan tentang tokoh, tanggal, serta peristiwa penting yang sudah dipelajari.',
    tips: 'Gunakan flashcard, latihan soal, atau kuis mandiri untuk menguji ingatanmu.',
  },
]

function TeknikBelajarCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`glass-card p-6 border-l-4 ${item.borderLeft} transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer select-none`}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsOpen(!isOpen)
        }
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h4 className="font-bold text-base flex items-center gap-2 text-slate-100">
            <span>{item.icon}</span> {item.letter}. {item.name}
          </h4>
          <p className="text-xs font-medium text-slate-400 italic mt-0.5">
            {item.subtitle}
          </p>
        </div>
        <div
          className={`w-7 h-7 rounded-lg bg-surface-2 border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-white' : 'text-slate-400'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-3">
        {item.desc}
      </p>

      <div className="flex items-center justify-between text-xs font-semibold pt-2.5 border-t border-white/[0.06]">
        <span className={item.accentText}>
          {isOpen ? 'Tutup Detail' : 'Klik untuk lihat detail'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${item.accentText} ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden select-text cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-4 mt-3 border-t border-white/10 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.dotBg}`}></span>
                  Cara melakukannya:
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  {item.cara.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 leading-relaxed bg-surface-2/40 rounded-lg p-2.5 border border-white/[0.04]"
                    >
                      {item.isNumbered ? (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.08] text-slate-300 flex items-center justify-center font-bold text-[11px]">
                          {idx + 1}
                        </span>
                      ) : (
                        <span className="flex-shrink-0 font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px]">
                          {step.label}
                        </span>
                      )}
                      <span className="pt-0.5">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-2/80 rounded-xl p-3.5 border border-white/[0.08]">
                <p className="text-xs text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                  <span>💡</span> Contoh:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.contoh}
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-3.5 text-xs text-primary-light">
                <p className="font-bold mb-1 flex items-center gap-1.5 text-primary-light">
                  <span>✨</span> Tips:
                </p>
                <p className="leading-relaxed text-slate-300">
                  {item.tips}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Materi Content */
const MateriContent = {
  belajar: () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-5 bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-3xl p-6 lg:p-8 mb-8 shadow-glow-primary">
        <span className="text-6xl flex-shrink-0" aria-hidden="true">🧠</span>
        <div>
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">Seni Belajar Efektif (Learn How to Learn)</h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Belajar bukan tentang begadang 12 jam membaca buku, tapi tentang seberapa pintar otakmu menyandikan informasi. 
            Mengenali gaya belajar hanyalah langkah pertama. Langkah kedua adalah menerapkan teknik belajar saintifik!
          </p>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-4 text-primary-light">1. Tiga Gaya Belajar Utama</h3>
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: '👁️', title: 'Visual', tip: 'Gunakan mind-map, diagram, dan video.', desc: 'Otak visual memproses informasi bagaikan kamera. Warnai catatanmu, buat infografis, dan bayangkan konsep layaknya film di kepalamu.' },
          { icon: '👂', title: 'Auditori', tip: 'Rekam penjelasan, diskusi, dengarkan podcast.', desc: 'Otak auditori memproses informasi melalui gelombang suara. Bacakan catatanmu keras-keras atau rekam suaramu sendiri untuk diulang.' },
          { icon: '🤸', title: 'Kinestetik', tip: 'Praktek langsung, gerakan, role play.', desc: 'Tubuh adalah gurumu. Kamu gampang bosan duduk. Berjalanlah mondar-mandir saat menghafal rumus, atau gunakan benda nyata sebagai peraga.' },
        ].map(({ icon, title, tip, desc }) => (
          <motion.div key={title} whileHover={{ y: -4 }} className="glass-card p-6 border-t-4 border-t-primary/50 hover:border-primary/50 transition-all">
            <span className="text-4xl mb-4 block" aria-hidden="true">{icon}</span>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
            <div className="text-xs text-primary-light bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
              <strong>Super-Tip:</strong> {tip}
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="font-bold text-lg mb-4 text-accent">2. Teknik Belajar Anti Lupa (Wajib Coba!)</h3>
      <div className="grid lg:grid-cols-2 gap-4 items-start mb-4">
        {teknikBelajarList.map((item) => (
          <TeknikBelajarCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  ),

  karir: () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Banner */}
      <div className="flex gap-5 bg-gradient-to-r from-emerald-500/10 to-accent/5 border border-emerald-500/20 rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <span className="text-6xl flex-shrink-0" aria-hidden="true">🚀</span>
        <div>
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">Perencanaan Karier & Kampus Impian</h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Kenali berbagai bidang ilmu, pahami potensi diri, dan rencanakan masa depanmu! Memilih jurusan kuliah dan karier bukan sekadar mengikuti pilihan teman, tetapi perlu mempertimbangkan minat, kemampuan, nilai-nilai pribadi, serta peluang yang tersedia.
          </p>
        </div>
      </div>

      {/* 1. Mengenal Rumpun dan Bidang Ilmu Pengetahuan */}
      <div className="mb-10">
        <div className="mb-4">
          <h3 className="font-bold text-xl text-emerald-400 mb-1">
            1. Mengenal Rumpun dan Bidang Ilmu Pengetahuan
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Setiap program studi memiliki karakteristik dan bidang keilmuan yang berbeda. Mengenali berbagai bidang ilmu dapat membantumu menemukan jurusan yang sesuai dengan minat dan potensi diri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[
            {
              icon: '🔬',
              title: 'SAINS DAN TEKNOLOGI',
              badge: 'SAINTEK',
              border: 'border-t-emerald-500',
              badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
              desc: 'Bidang ini mempelajari ilmu pengetahuan alam, matematika, teknologi, serta penerapannya dalam kehidupan. Cocok bagi siswa yang tertarik pada penelitian, pemecahan masalah, perhitungan, dan pengembangan teknologi.',
              prodi: ['Kedokteran', 'Ilmu Komputer', 'Teknik Industri', 'Statistika', 'Farmasi', 'Biologi'],
            },
            {
              icon: '📖',
              title: 'SOSIAL DAN HUMANIORA',
              badge: 'SOSHUM',
              border: 'border-t-accent',
              badgeBg: 'bg-accent/10 text-accent border-accent/20',
              desc: 'Bidang ini mempelajari manusia, masyarakat, budaya, ekonomi, hukum, serta hubungan antarmanusia. Cocok bagi siswa yang tertarik pada fenomena sosial, komunikasi, interaksi masyarakat, dan analisis permasalahan sosial.',
              prodi: ['Psikologi', 'Manajemen', 'Ilmu Hukum', 'Hubungan Internasional', 'Ilmu Komunikasi', 'Sastra'],
            },
            {
              icon: '🎓',
              title: 'PENDIDIKAN DAN KEGURUAN',
              badge: 'PENDIDIKAN',
              border: 'border-t-amber-500',
              badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              desc: 'Bidang ini berfokus pada proses pendidikan, pembelajaran, perkembangan peserta didik, serta pendampingan individu dalam lingkungan pendidikan.',
              prodi: ['Pendidikan Guru Sekolah Dasar (PGSD)', 'Pendidikan Anak Usia Dini (PAUD)', 'Bimbingan dan Konseling', 'Pendidikan Bahasa Indonesia', 'Pendidikan Matematika'],
            },
            {
              icon: '🎨',
              title: 'SENI DAN INDUSTRI KREATIF',
              badge: 'KREATIF',
              border: 'border-t-purple-500',
              badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
              desc: 'Bidang ini berkaitan dengan kreativitas, ekspresi, desain, serta pengembangan karya yang memiliki nilai estetika dan fungsi.',
              prodi: ['Desain Komunikasi Visual (DKV)', 'Desain Interior', 'Seni Musik', 'Film dan Televisi', 'Animasi'],
            },
            {
              icon: '🛠️',
              title: 'PENDIDIKAN VOKASI (TERAPAN)',
              badge: 'VOKASI',
              border: 'border-t-royal',
              badgeBg: 'bg-royal/10 text-royal-light border-royal/20',
              desc: 'Pendidikan vokasi berorientasi pada pengembangan keterampilan praktis dan keahlian terapan yang dibutuhkan dalam dunia kerja. Pembelajarannya menggabungkan teori, praktik, dan pengalaman lapangan sesuai karakteristik program studi.',
              prodi: ['D3 Perhotelan', 'D4 Animasi', 'D4 Keselamatan dan Kesehatan Kerja (K3)', 'D3 Akuntansi', 'D4 Manajemen Informatika'],
            },
          ].map(({ icon, title, badge, border, badgeBg, desc, prodi }) => (
            <motion.div
              key={title}
              whileHover={{ y: -4 }}
              className={`glass-card p-6 border-t-4 ${border} hover:bg-white/[0.02] transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl" aria-hidden="true">{icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                    {badge}
                  </span>
                </div>
                <h4 className="font-bold text-base tracking-wide text-slate-100 mb-2">{title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{desc}</p>
              </div>
              <div className="bg-surface-2 p-3.5 rounded-xl border border-white/[0.05]">
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-2">
                  Contoh Program Studi
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {prodi.map((p) => (
                    <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.05]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-xs text-slate-400 bg-surface-2/60 p-3.5 rounded-xl border border-white/5 flex items-start gap-2 leading-relaxed">
          <span className="text-sm">📌</span>
          <span>
            <strong>Catatan:</strong> Pengelompokan bidang ilmu di atas hanya membantu mengenali karakteristik jurusan. Satu program studi dapat memiliki keterkaitan dengan beberapa bidang ilmu sekaligus.
          </span>
        </div>
      </div>

      {/* 2. Mengenal Diri Melalui Kerangka Refleksi IKIGAI */}
      <div className="mb-10">
        <h3 className="font-bold text-xl text-amber-400 mb-2">
          2. Mengenal Diri Melalui Kerangka Refleksi IKIGAI
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-5">
          Sebelum menentukan jurusan dan pekerjaan impian, penting untuk mengenali hal-hal yang bermakna bagi dirimu. Salah satu kerangka refleksi yang dapat digunakan adalah <strong>IKIGAI</strong>. Dalam pengembangan karier, kerangka empat pilar ini dapat membantumu mengeksplorasi beberapa pertanyaan berikut:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            {
              icon: '❤️',
              pilar: 'Passion',
              pertanyaan: 'Apa yang kamu CINTAI',
              desc: 'Kegiatan, bidang, atau hal apa yang membuatmu tertarik dan bersemangat?',
              border: 'border-t-rose-500',
              color: 'text-rose-400',
            },
            {
              icon: '⭐',
              pilar: 'Profession',
              pertanyaan: 'Apa yang menjadi KEAHLIANMU',
              desc: 'Kemampuan dan keterampilan apa yang kamu miliki atau ingin kembangkan?',
              border: 'border-t-amber-500',
              color: 'text-amber-400',
            },
            {
              icon: '🌍',
              pilar: 'Mission',
              pertanyaan: 'Apa yang DIBUTUHKAN LINGKUNGAN',
              desc: 'Permasalahan apa yang ingin kamu bantu selesaikan melalui kemampuanmu?',
              border: 'border-t-emerald-500',
              color: 'text-emerald-400',
            },
            {
              icon: '💼',
              pilar: 'Vocation',
              pertanyaan: 'Apa yang MEMILIKI PELUANG PENGHASILAN',
              desc: 'Bidang pekerjaan apa yang memiliki peluang untuk memberikan penghasilan?',
              border: 'border-t-sky-500',
              color: 'text-sky-400',
            },
          ].map((item) => (
            <div key={item.pilar} className={`glass-card p-5 border-t-4 ${item.border} flex flex-col justify-between`}>
              <div>
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <span className={`text-[11px] font-bold uppercase tracking-wider block ${item.color}`}>
                  {item.pilar}
                </span>
                <h4 className="font-bold text-sm text-slate-100 mt-1 mb-2">
                  {item.pertanyaan}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4.5 text-xs lg:text-sm text-slate-200">
          <p className="font-bold text-amber-300 mb-1 flex items-center gap-2">
            <span>💡</span> Tips:
          </p>
          <p className="leading-relaxed text-slate-300">
            Jangan memilih jurusan hanya karena gengsi atau mengikuti pilihan orang lain. Pertimbangkan kesesuaian antara minat, kemampuan, nilai pribadi, kondisi, dan peluang karier. Ingat, pilihan karier dapat berkembang seiring pengalaman dan proses belajar.
          </p>
        </div>
      </div>

      {/* 3. Mitos vs Fakta Seputar Perkuliahan dan Dunia Kerja */}
      <div className="mb-10">
        <h3 className="font-bold text-xl text-primary-light mb-4 flex items-center gap-2">
          <span>⚖️</span> 3. Mitos vs Fakta Seputar Perkuliahan dan Dunia Kerja
        </h3>
        <div className="grid lg:grid-cols-2 gap-4">
          {[
            {
              no: 'MITOS 1',
              mitos: 'Lulusan kampus ternama pasti langsung mendapatkan pekerjaan.',
              fakta: 'Nama perguruan tinggi dapat memberikan keuntungan dalam membangun jaringan dan memperoleh kesempatan tertentu. Namun, mendapatkan pekerjaan juga dipengaruhi oleh kompetensi, pengalaman, keterampilan, portofolio, serta kebutuhan perusahaan.',
            },
            {
              no: 'MITOS 2',
              mitos: 'Salah memilih jurusan berarti masa depan sudah berakhir.',
              fakta: 'Pilihan jurusan memang perlu dipertimbangkan dengan matang, tetapi perjalanan karier tidak selalu harus berjalan lurus sesuai jurusan kuliah. Seseorang dapat mengembangkan keterampilan baru, mengikuti pelatihan, dan mengeksplorasi bidang pekerjaan yang berbeda.',
            },
            {
              no: 'MITOS 3',
              mitos: 'Lulusan bidang sosial dan humaniora tidak bisa bekerja di perusahaan teknologi.',
              fakta: 'Perusahaan teknologi membutuhkan berbagai latar belakang pendidikan. Selain tenaga teknis, terdapat pekerjaan yang berkaitan dengan komunikasi, bisnis, pengelolaan sumber daya manusia, pemasaran digital, dan penelitian pengalaman pengguna (UX Research).',
            },
            {
              no: 'MITOS 4',
              mitos: 'IPK tinggi adalah satu-satunya penentu kesuksesan karier.',
              fakta: 'IPK dapat menjadi salah satu pertimbangan dalam proses seleksi kerja, terutama untuk posisi tertentu atau pekerjaan pertama. Namun, perusahaan juga dapat mempertimbangkan kemampuan komunikasi, kerja sama, pemecahan masalah, pengalaman, dan keterampilan sesuai bidang pekerjaan.',
            },
          ].map(({ no, mitos, fakta }) => (
            <div key={no} className="glass-card p-5 text-xs lg:text-sm flex flex-col gap-3.5 border border-white/[0.07]">
              <div>
                <span className="inline-block text-[10px] font-black px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 mb-1.5 border border-rose-500/30">
                  {no}
                </span>
                <p className="text-slate-300 italic font-medium leading-snug">"{mitos}"</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06]">
                <span className="inline-block text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mb-1.5 border border-emerald-500/30">
                  FAKTA
                </span>
                <p className="text-slate-300 leading-relaxed">{fakta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tips Memilih Kampus dan Program Studi */}
      <div className="mb-4">
        <h3 className="font-bold text-xl text-accent mb-2 flex items-center gap-2">
          <span>🎯</span> 4. Tips Memilih Kampus dan Program Studi
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Sebelum menentukan kampus impian, coba pertimbangkan beberapa hal berikut:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {[
            {
              num: 1,
              title: 'Kenali minat dan kemampuan diri',
              desc: 'Pilih bidang yang sesuai dengan ketertarikan dan kemampuan yang ingin kamu kembangkan.',
              icon: '🧭',
            },
            {
              num: 2,
              title: 'Pelajari kurikulum program studi',
              desc: 'Cari tahu mata kuliah, kegiatan praktik, dan kompetensi yang akan dipelajari.',
              icon: '📚',
            },
            {
              num: 3,
              title: 'Periksa akreditasi dan kualitas program studi',
              desc: 'Cari informasi melalui sumber resmi perguruan tinggi dan lembaga terkait.',
              icon: '🏛️',
            },
            {
              num: 4,
              title: 'Pertimbangkan biaya pendidikan',
              desc: 'Sesuaikan pilihan dengan kondisi finansial dan cari informasi mengenai beasiswa.',
              icon: '💰',
            },
            {
              num: 5,
              title: 'Cari tahu peluang karier lulusan',
              desc: 'Pelajari bidang pekerjaan yang dapat dimasuki setelah menyelesaikan pendidikan.',
              icon: '📈',
            },
            {
              num: 6,
              title: 'Perhatikan lokasi dan lingkungan kampus',
              desc: 'Pertimbangkan akses, fasilitas, serta lingkungan belajar yang mendukung.',
              icon: '📍',
            },
          ].map((item) => (
            <motion.div
              key={item.num}
              whileHover={{ y: -3 }}
              className="glass-card p-5 border border-white/[0.06] hover:border-accent/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-sm flex items-center justify-center">
                  {item.num}
                </span>
                <span className="text-xl">{item.icon}</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100 mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 rounded-2xl p-5 flex items-start gap-3.5">
          <span className="text-2xl flex-shrink-0">🌱</span>
          <div>
            <h4 className="font-bold text-emerald-300 text-sm mb-1">Ingat!</h4>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
              Kampus impian bukan hanya tentang nama besar perguruan tinggi, tetapi juga tentang tempat yang dapat mendukung perkembangan kemampuan, pengetahuan, dan tujuan kariermu.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  pribadi: () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-5 bg-gradient-to-r from-royal/10 to-primary/5 border border-royal/20 rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <span className="text-6xl flex-shrink-0" aria-hidden="true">🌱</span>
        <div>
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">Kesehatan Mental & Self-Care</h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Kamu tidak akan bisa meraih prestasi luar biasa jika "tangki emosionalmu" kosong. Mari belajar mengenali diri sendiri, mengelola stres, dan merawat kewarasan psikologis.
          </p>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-4 text-royal-light">Toolkit P3K Psikologis (Pertolongan Pertama)</h3>
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {[
          { icon: '🌬️', title: 'Grounding 5-4-3-2-1', desc: 'Saat panik (anxiety): Cari 5 benda dilihat, 4 diraba, 3 didengar, 2 dicium, 1 dicecap. Ini mengembalikan otakmu dari mode panik ke masa kini.' },
          { icon: '📱', title: 'Digital Detox', desc: 'Doom-scrolling TikTok/IG rentan memicu Insecurity. Batasi screen-time medsos maksimal 1 jam/hari, sadari bahwa yang diposting hanyalah "highlight reel".' },
          { icon: '✍️', title: 'Brain Dump Journal', desc: 'Susah tidur karena overthinking? Ambil kertas, tuliskan secara acak semua yang di pikiranmu tanpa memikirkan tata bahasa. Pindahkan beban dari kepala ke kertas.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="glass-card p-5 border-t-2 border-t-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform scale-150 rotate-12">{icon}</div>
            <h4 className="font-bold text-base mb-2 text-slate-100 flex items-center gap-2">{icon} {title}</h4>
            <p className="text-slate-400 text-xs leading-relaxed relative z-10">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 rounded-2xl p-6 mt-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="text-5xl">❤️‍🩹</div>
        <div>
          <h4 className="font-bold text-lg text-rose-300 mb-2">Red Flags: Kapan Harus ke Konselor?</h4>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Datang ke profesional bukan tanda kelemahan! Segera cari bantuan jika: <br/>
            <strong>Tidur/makan berubah ekstrem, kehilangan minat pada hobi berlarut-larut, 
            mengurung diri total, atau ada pikiran menyakiti diri sendiri.</strong>
          </p>
          <p className="text-sm font-semibold text-white">Jangan ragu, Konselor TemanBK siap mendengarkan tanpa menghakimi!</p>
        </div>
      </div>
    </div>
  ),

  sosial: () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-5 bg-gradient-to-r from-sky-500/10 to-teal-500/5 border border-sky-500/20 rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
        <span className="text-6xl flex-shrink-0" aria-hidden="true">🤝</span>
        <div>
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">Dinamika Sosial & Pertemanan</h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Masa SMA diwarnai dengan pembentukan identitas sosial, konflik teman sebaya, hingga urusan perundungan. Bangun relasi yang sehat dan asah kemampuan komunikasi asertifmu.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div whileHover={{ y: -4 }} className="glass-card p-6 border-l-4 border-l-rose-400 hover:shadow-[0_8px_30px_rgba(251,113,133,0.1)] transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-400/20 flex items-center justify-center text-xl">🛡️</div>
            <h3 className="font-bold text-lg">Anti-Bullying & Cyberbullying</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Perundungan bukan sekadar "bercanda". Kata-kata anonim di media sosial bisa sangat menyakitkan. Apa yang harus dilakukan?
          </p>
          <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
            <li><strong>Speak Up:</strong> Laporkan diam-diam ke guru BK atau orang tua.</li>
            <li><strong>Block & Report:</strong> Jangan umpan troll. Screenshot bukti, lalu langsung blokir akun pelaku.</li>
            <li><strong>Jadi Upstander:</strong> Tawarkan bantuan moral jika temanmu jadi korban, jangan diam menonton.</li>
          </ul>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="glass-card p-6 border-l-4 border-l-sky-400 hover:shadow-[0_8px_30px_rgba(56,189,248,0.1)] transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-sky-400/20 flex items-center justify-center text-xl">🗣️</div>
            <h3 className="font-bold text-lg">Komunikasi Asertif (I-Message)</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Jangan selalu menjadi "People Pleaser" (selalu mengiyakan) atau sebaliknya menjadi agresif. Asertif adalah mengutarakan kemauan tanpa menyakiti orang lain.
          </p>
          <div className="bg-surface-2 p-4 rounded-xl border border-white/[0.05]">
            <p className="text-sm font-semibold text-white mb-2">Gunakan Rumus "I-Message":</p>
            <p className="text-xs text-sky-300 italic">"Aku merasa <strong>(perasaan)</strong> saat kamu <strong>(kejadian spesifik)</strong>. Tolong ke depannya <strong>(harapanmu)</strong>."</p>
          </div>
        </motion.div>
      </div>
    </div>
  ),
}

const quizData = { karir: quizKarir, pribadi: quizPribadi, sosial: quizSosial }

const tabPanelVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function Layanan() {
  const [activeTab, setActiveTab] = useState('belajar')
  const [mode, setMode] = useState({ belajar: 'materi', karir: 'materi', pribadi: 'materi', sosial: 'materi' })

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
        className="flex gap-1.5 p-1.5 bg-surface rounded-2xl border border-white/[0.07] w-fit max-w-full overflow-x-auto custom-scroll mb-7"
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-shrink-0
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
                : activeTab === 'belajar'
                  ? <QuizBelajarSection />
                  : <QuizEngine id={activeTab} {...quizData[activeTab]} />
              }
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
