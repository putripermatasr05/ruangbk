import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw, Lightbulb } from 'lucide-react'

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir < 0 ? 40 : -40, transition: { duration: 0.2 } }),
}

export default function QuizEngine({ id, title, subtitle, description, instructions, questions, getResult }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1)
  const [result, setResult] = useState(null)

  const total = questions.length
  const progress = Math.round(((currentQ) / total) * 100)
  const q = questions[currentQ]
  const selected = answers[currentQ]
  const isLast = currentQ === total - 1

  const handleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }))
  }

  const goNext = () => {
    if (isLast) {
      const r = getResult(answers)
      setResult(r)
    } else {
      setDirection(1)
      setCurrentQ((p) => p + 1)
    }
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentQ((p) => p - 1)
  }

  const reset = () => {
    setCurrentQ(0)
    setAnswers({})
    setDirection(1)
    setResult(null)
  }

  if (result) {
    if (result.render) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 lg:p-8"
        >
          {result.render({ reset })}
        </motion.div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-5 flex justify-center text-primary-light"
          aria-hidden="true"
        >
          {result.Icon ? (
            <result.Icon size={56} />
          ) : typeof result.icon === 'string' ? (
            <span className="text-5xl">{result.icon}</span>
          ) : (
            result.icon
          )}
        </motion.div>
        <h3 className="font-display font-bold text-2xl mb-3">{result.title}</h3>
        <p className="text-slate-400 leading-relaxed max-w-md mx-auto mb-5">{result.desc}</p>

        {result.tags && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {result.tags.map((tag) => (
              <span key={tag} className="text-sm font-semibold px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light">
                {tag}
              </span>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-2 border border-white/10 text-sm font-bold hover:border-primary/30 hover:text-primary-light transition-all"
        >
          <RotateCcw size={15} /> Ulangi Kuis
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="glass-card p-7">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-xl mb-1">{title}</h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      {/* Description / Instructions */}
      {(description || instructions) && (
        <div className="mb-6 p-4 rounded-xl bg-surface-2/60 border border-white/5 text-xs text-slate-300 leading-relaxed space-y-2">
          {description && <p>{description}</p>}
          {instructions && (
            <p className="text-slate-400 text-[11px] pt-2 border-t border-white/5">
              <strong className="text-primary-light">Petunjuk:</strong> {instructions}
            </p>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="mb-6" role="progressbar" aria-valuenow={currentQ} aria-valuemin={0} aria-valuemax={total} aria-label="Progres kuis">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400 font-semibold">Pertanyaan {currentQ + 1} dari {total}</span>
          <span className="text-xs text-slate-500">{progress}%</span>
        </div>
        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-grad-primary rounded-full"
            animate={{ width: `${((currentQ + (selected !== undefined ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQ}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <p className="text-xs font-bold text-primary-light uppercase tracking-wider mb-2">
            Pertanyaan {currentQ + 1}
          </p>
          <p className="font-semibold text-base lg:text-lg leading-snug mb-2">{q.text}</p>
          {q.hint && (
            <p className="text-xs text-slate-400 italic mb-4 flex items-center gap-1.5">
              <Lightbulb size={13} className="text-amber-400 flex-shrink-0" />
              <span>{q.hint}</span>
            </p>
          )}

          {/* Radio options */}
          {q.type === 'radio' && (
            <div className="flex flex-col gap-2.5" role="radiogroup" aria-label={q.text}>
              {q.options.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`${id}-q${currentQ}-${opt.value}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                    ${selected === opt.value
                      ? 'border-primary bg-primary/10 text-white'
                      : 'border-white/[0.07] bg-surface-2 text-slate-300 hover:border-primary/40 hover:bg-primary/5'
                    }`}
                >
                  <input
                    type="radio"
                    id={`${id}-q${currentQ}-${opt.value}`}
                    name={`${id}-q${currentQ}`}
                    value={opt.value}
                    checked={selected === opt.value}
                    onChange={() => handleSelect(opt.value)}
                    className="sr-only"
                  />
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                      ${selected === opt.value ? 'bg-grad-primary text-white' : 'bg-surface-3 text-slate-400'}`}
                    aria-hidden="true"
                  >
                    {opt.label}
                  </span>
                  <span className="text-sm leading-snug">{opt.text}</span>
                </label>
              ))}
            </div>
          )}

          {/* Scale options */}
          {q.type === 'scale' && (
            <div>
              <div className="flex items-center gap-2 flex-wrap" role="radiogroup" aria-label={q.text}>
                <span className="text-xs text-slate-500 mr-1 whitespace-nowrap">Tidak Suka</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <label key={n} htmlFor={`${id}-q${currentQ}-${n}`}>
                    <input
                      type="radio"
                      id={`${id}-q${currentQ}-${n}`}
                      name={`${id}-q${currentQ}`}
                      value={String(n)}
                      checked={selected === String(n)}
                      onChange={() => handleSelect(String(n))}
                      className="sr-only"
                    />
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all
                        ${selected === String(n)
                          ? 'bg-grad-primary text-white shadow-glow-primary'
                          : 'bg-surface-2 border border-white/[0.07] text-slate-400 hover:border-primary/40'
                        }`}
                    >
                      {n}
                    </motion.span>
                  </label>
                ))}
                <span className="text-xs text-slate-500 ml-1 whitespace-nowrap">Sangat Suka</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">(1 = Tidak suka sama sekali, 5 = Sangat suka)</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-7">
        {currentQ > 0 && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={goPrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-2 border border-white/10 text-sm font-bold text-slate-400 hover:text-white transition-all"
          >
            <ChevronLeft size={16} /> Sebelumnya
          </motion.button>
        )}
        <motion.button
          whileHover={selected !== undefined ? { scale: 1.04, y: -1 } : {}}
          whileTap={selected !== undefined ? { scale: 0.96 } : {}}
          onClick={goNext}
          disabled={selected === undefined}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all
            ${selected !== undefined
              ? isLast
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)]'
                : 'bg-grad-primary text-white shadow-glow-primary hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)]'
              : 'bg-surface-2 text-slate-600 border border-white/5 cursor-not-allowed'
            }`}
        >
          {isLast ? (
            <><Sparkles size={15} /> Lihat Hasilku</>
          ) : (
            <>Selanjutnya <ChevronRight size={16} /></>
          )}
        </motion.button>
      </div>
    </div>
  )
}
