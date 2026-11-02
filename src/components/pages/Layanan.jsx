import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Briefcase, ChevronDown, Heart, Users } from 'lucide-react'
import QuizEngine from '../ui/QuizEngine'

/* ─── DATA ─── */
const tabs = [
  { id: 'belajar', label: 'Belajar', icon: '📚', Icon: BookOpen },
  { id: 'karir', label: 'Karir', icon: '🎯', Icon: Briefcase },
  { id: 'pribadi', label: 'Pribadi', icon: '🌱', Icon: Heart },
  { id: 'sosial', label: 'Sosial', icon: '🤝', Icon: Users },
]

/* Quiz Data: Belajar */
const quizBelajar = {
  title: '🧩 Temukan Gaya Belajar Dominanmu',
  subtitle: 'Jawab 5 pertanyaan berikut dengan jujur untuk menemukan metode belajar yang paling efektif untukmu.',
  questions: [
    {
      id: 'q1', type: 'radio',
      text: '1. Saat merakit barang baru (misal: rak buku), apa yang pertama kali kamu lakukan?',
      options: [
        { label: 'A', value: 'visual', text: 'Melihat buku panduan bergambar secara detail.' },
        { label: 'B', value: 'auditori', text: 'Meminta bantuan orang lain membacakan instruksinya.' },
        { label: 'C', value: 'kinestetik', text: 'Langsung mencoba merakit bagian-bagiannya sambil jalan.' },
      ],
    },
    {
      id: 'q2', type: 'radio',
      text: '2. Jika harus menghafal materi penting, bagaimana caramu?',
      options: [
        { label: 'A', value: 'visual', text: 'Membuat mind-map, memakai stabilo warna-warni, atau membaca berulang.' },
        { label: 'B', value: 'auditori', text: 'Mengucapkan materinya keras-keras atau berdiskusi dengan teman.' },
        { label: 'C', value: 'kinestetik', text: 'Menulis ulang materi berulang kali atau belajar sambil berjalan mondar-mandir.' },
      ],
    },
    {
      id: 'q3', type: 'radio',
      text: '3. Apa hal yang paling mengganggu konsentrasimu saat sedang belajar?',
      options: [
        { label: 'A', value: 'visual', text: 'Meja belajar atau kamar yang sangat berantakan.' },
        { label: 'B', value: 'auditori', text: 'Suara bising, musik keras, atau orang ngobrol.' },
        { label: 'C', value: 'kinestetik', text: 'Harus duduk diam terlalu lama tanpa bergerak.' },
      ],
    },
    {
      id: 'q4', type: 'radio',
      text: '4. Saat membaca cerita, apa yang paling sering terjadi di kepalamu?',
      options: [
        { label: 'A', value: 'visual', text: 'Membayangkan adegan dan wajah karakter dengan sangat jelas.' },
        { label: 'B', value: 'auditori', text: 'Mendengar intonasi suara percakapan karakter di pikiran.' },
        { label: 'C', value: 'kinestetik', text: 'Ikut merasakan emosi karakter atau tanpa sadar meniru ekspresi mereka.' },
      ],
    },
    {
      id: 'q5', type: 'radio',
      text: '5. Saat tersesat di tempat baru, apa yang biasanya kamu lakukan?',
      options: [
        { label: 'A', value: 'visual', text: 'Melihat peta atau Google Maps untuk mencari rute visual.' },
        { label: 'B', value: 'auditori', text: 'Langsung bertanya arah kepada orang sekitar atau satpam.' },
        { label: 'C', value: 'kinestetik', text: 'Terus berjalan mencoba-coba mencari jalan yang benar.' },
      ],
    },
  ],
  getResult: (answers) => {
    const counts = { visual: 0, auditori: 0, kinestetik: 0 }
    Object.values(answers).forEach((v) => { if (counts[v] !== undefined) counts[v]++ })
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    const map = {
      visual: { icon: '👁️', title: 'Gaya Belajarmu: Visual!', desc: 'Kamu menangkap informasi lebih cepat melalui gambar dan visual. Manfaatkan diagram, mind-map, dan video ilustrasi. Jangan ragu menggunakan warna-warni untuk menandai catatanmu!', tags: ['Mind-Map', 'Video Edukasi', 'Catatan Berwarna'] },
      auditori: { icon: '👂', title: 'Gaya Belajarmu: Auditori!', desc: 'Telingamu adalah senjata utamamu! Kamu sangat cepat paham jika mendengar penjelasan. Coba rekam suara gurumu, belajar sambil diskusi, atau jelaskan kembali materi ke dirimu sendiri bersuara.', tags: ['Rekam Penjelasan', 'Diskusi Kelompok', 'Podcast Belajar'] },
      kinestetik: { icon: '🤸', title: 'Gaya Belajarmu: Kinestetik!', desc: 'Kamu tidak bisa hanya duduk diam! Kamu butuh praktik langsung. Sering-seringlah bergerak saat menghafal, lakukan eksperimen mini, atau gunakan benda nyata untuk simulasi.', tags: ['Praktik Langsung', 'Belajar Aktif', 'Role Play'] },
    }
    return map[winner]
  },
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
      <div className="flex gap-5 bg-gradient-to-r from-emerald-500/10 to-accent/5 border border-emerald-500/20 rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <span className="text-6xl flex-shrink-0" aria-hidden="true">🚀</span>
        <div>
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">Perencanaan Karir & Kampus Impian</h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Pahami rumpun ilmu, temukan Ikigai-mu, dan bersiap hadapi dunia pasca-sekolah! Memilih jurusan dan karir butuh strategi yang matang, bukan sekadar ikut-ikutan teman.
          </p>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-4 text-emerald-400">Peta Rumpun Ilmu Pengetahuan</h3>
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: '🔬', title: 'SAINTEK', border: 'border-t-emerald-500', contoh: 'Kedokteran, Ilmu Komputer, Teknik Industri, Statistika.', desc: 'Sains & Teknologi. Cocok untuk pemikir logis yang suka angka, logika pasti, eksperimen, dan inovasi.' },
          { icon: '📖', title: 'SOSHUM', border: 'border-t-accent', contoh: 'Psikologi, Manajemen, Hukum, Hubungan Internasional, Sastra.', desc: 'Sosial & Humaniora. Fokus pada interaksi masyarakat, dinamika ekonomi, dan hukum. Butuh keahlian analisa sosial.' },
          { icon: '🛠️', title: 'VOKASI (Terapan)', border: 'border-t-royal', contoh: 'D4 Animasi, D3 Perhotelan, D4 K3, D3 Akuntansi.', desc: '70% Praktik, 30% Teori. Pilihan terbaik jika ingin langsung siap kerja dan mahir secara teknis operasional.' },
        ].map(({ icon, title, border, contoh, desc }) => (
          <motion.div key={title} whileHover={{ y: -4 }} className={`glass-card p-6 border-t-4 ${border} hover:bg-white/[0.02] transition-colors`}>
            <span className="text-4xl mb-3 block" aria-hidden="true">{icon}</span>
            <h3 className="font-bold text-lg tracking-wider mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
            <div className="bg-surface-2 p-3 rounded-xl border border-white/[0.05]">
              <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-1">Contoh Jurusan</p>
              <p className="text-xs text-slate-300 font-medium">{contoh}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="font-bold text-lg mb-4 text-amber-400">Konsep IKIGAI: Merancang Masa Depan</h3>
      <div className="glass-card p-6 lg:p-8 mb-8 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden">
        <div className="relative z-10 text-sm leading-relaxed text-slate-300">
          <p className="mb-4">Karir impianmu idealnya terletak di irisan 4 pilar <strong>IKIGAI (Alasan untuk hidup)</strong> ala Jepang:</p>
          <ul className="space-y-3 mb-6 list-disc list-inside marker:text-amber-500">
            <li><strong>Apa yang kamu CINTAI</strong> (Passion) — Hobimu, ketertarikan utamamu.</li>
            <li><strong>Apa KEAHLIAN/Bakatmu</strong> (Profession) — Hal yang secara natural kamu kuasai.</li>
            <li><strong>Apa yang dunia BUTUHKAN</strong> (Mission) — Solusi untuk masalah di sekitarmu.</li>
            <li><strong>Bagaimana kamu bisa DIBAYAR</strong> (Vocation) — Peluang industri dan prospek kerja nyata.</li>
          </ul>
          <p className="text-amber-200 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
            <em>💡 Jangan pilih jurusan hanya karena gengsi. Pilihlah di mana passion dan peluang pasar bertemu.</em>
          </p>
        </div>
      </div>

      <h3 className="font-bold text-base mb-3 flex items-center gap-2"><span className="text-rose-500">❌</span> Mitos vs <span className="text-emerald-500">✅</span> Fakta Perkuliahan</h3>
      <div className="grid lg:grid-cols-2 gap-4">
        {[
          { mitos: '"Lulusan kampus PTN top pasti langsung dapat kerja."', fakta: 'Perusahaan modern merekrut berdasarkan Portofolio, Soft Skill, dan Pengalaman Magang. Kampus top hanya membantu screening awal.' },
          { mitos: '"Salah jurusan berarti kiamat masa depan."', fakta: 'Sangat banyak profesional sukses berkarir lintas jurusan. Kemampuan adaptasi dan belajar mandiri lebih menentukan kesuksesan.' },
          { mitos: '"Anak IPS/Soshum tidak bisa kerja di perusahaan Teknologi (Tech Company)."', fakta: 'Tech company butuh anak Soshum untuk UI/UX Researcher, Digital Marketer, HRD, dan Business Development.' },
          { mitos: '"IPK tinggi adalah kunci sukses tunggal."', fakta: 'Di dunia kerja nyata: Komunikasi, Etos kerja, dan Problem Solving adalah Rajanya. IPK penting, namun bukan satu-satunya tolok ukur.' },
        ].map(({ mitos, fakta }, idx) => (
          <div key={idx} className="glass-card p-5 text-sm flex flex-col gap-3">
            <div>
              <span className="inline-block text-xs font-black px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 mb-1">MITOS</span>
              <p className="text-slate-400 italic">"{mitos}"</p>
            </div>
            <div>
              <span className="inline-block text-xs font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mb-1">FAKTA</span>
              <p className="text-slate-200">{fakta}</p>
            </div>
          </div>
        ))}
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

const quizData = { belajar: quizBelajar, karir: quizKarir, pribadi: quizPribadi, sosial: quizSosial }

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
                : <QuizEngine id={activeTab} {...quizData[activeTab]} />
              }
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
