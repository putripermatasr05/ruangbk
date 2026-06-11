import { motion } from 'framer-motion'
import { Eye, Zap, CheckCircle2 } from 'lucide-react'
import avatarBudi from '../../assets/avatar_budi.png'
import avatarSiti from '../../assets/avatar_siti.png'

const misiList = [
  'Memberikan informasi karir, belajar, dan sosial yang up-to-date.',
  'Menyediakan ruang konsultasi yang aman dan nyaman.',
  'Membantu siswa mengenali minat dan bakat secara mandiri.',
]

const konselors = [
  {
    avatar: avatarBudi,
    name: 'Bpk. Budi Santoso, S.Pd., M.Pd.',
    role: 'Konselor Karir',
    tags: ['📊 Perencanaan Karir', '📚 Strategi Belajar'],
    desc: 'Berpengalaman 10 tahun dalam membimbing siswa menemukan jalur karir yang sesuai dengan minat dan kemampuan akademis.',
    color: 'primary',
    alt: 'Foto ilustrasi Bpk. Budi Santoso',
  },
  {
    avatar: avatarSiti,
    name: 'Ibu Siti Aminah, S.Psi.',
    role: 'Konselor Pribadi',
    tags: ['🧠 Bimbingan Pribadi', '🤝 Dinamika Sosial'],
    desc: 'Psikolog dengan keahlian khusus dalam kesehatan mental remaja dan pengelolaan dinamika sosial di lingkungan sekolah.',
    color: 'royal',
    alt: 'Foto ilustrasi Ibu Siti Aminah',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Profil({ navigate }) {
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

      {/* Tim Konselor */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mb-6"
      >
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Tim Kami</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl">
          Konselor <span className="gradient-text">Profesional</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5">
        {konselors.map(({ avatar, name, role, tags, desc, color, alt }, i) => (
          <motion.div
            key={name}
            custom={i + 2} variants={cardVariants} initial="hidden" animate="visible"
            whileHover={{ y: -6 }}
            className="glass-card p-7 flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Top gradient bg strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-20 ${color === 'primary' ? 'bg-primary/8' : 'bg-royal/8'} pointer-events-none`}
              aria-hidden="true"
            />

            {/* Avatar */}
            <div className="relative z-10 mb-5">
              <img
                src={avatar}
                alt={alt}
                width={120}
                height={120}
                className={`w-28 h-28 rounded-full object-cover border-2 ${color === 'primary' ? 'border-primary/40 shadow-[0_8px_24px_rgba(99,102,241,0.2)]' : 'border-royal/40 shadow-[0_8px_24px_rgba(168,85,247,0.2)]'}`}
              />
              <div className={`absolute bottom-1 right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-bg-2
                ${color === 'primary' ? 'bg-primary' : 'bg-royal'}`}>
                <CheckCircle2 size={13} className="text-white" />
              </div>
            </div>

            {/* Badge */}
            <span className={`text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full border mb-3
              ${color === 'primary'
                ? 'bg-primary/10 text-primary-light border-primary/20'
                : 'bg-royal/10 text-royal-light border-royal/20'
              }`}
            >
              {role}
            </span>

            <h3 className="font-display font-bold text-lg leading-snug mb-3">{name}</h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border
                    ${color === 'primary'
                      ? 'bg-primary/10 border-primary/20 text-slate-300'
                      : 'bg-royal/10 border-royal/20 text-slate-300'
                    }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">{desc}</p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('konsultasi')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold text-white transition-shadow
                ${color === 'primary'
                  ? 'bg-grad-primary shadow-glow-primary hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)]'
                  : 'bg-grad-purple shadow-[0_4px_15px_rgba(168,85,247,0.2)] hover:shadow-[0_8px_24px_rgba(168,85,247,0.4)]'
                }`}
            >
              Konsultasi Sekarang
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
