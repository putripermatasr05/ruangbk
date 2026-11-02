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
        className="glass-card p-8 sm:p-10 text-center border border-white/80 shadow-[0_12px_40px_rgba(139,92,246,0.08)] rounded-3xl"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-5 flex justify-center text-purple-600"
          aria-hidden="true"
        >
          {result.Icon ? (
            <div className="w-20 h-20 rounded-3xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shadow-sm">
              <result.Icon size={44} />
            </div>
          ) : typeof result.icon === 'string' ? (
            <span className="text-5xl">{result.icon}</span>
          ) : (
            result.icon
          )}
        </motion.div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-3">{result.title}</h3>
        <p className="text-slate-600 leading-relaxed max-w-md mx-auto mb-6 text-sm sm:text-base">{result.desc}</p>

        {result.tags && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {result.tags.map((tag) => (
              <span key={tag} className="text-xs font-bold px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-purple-200/80 text-sm font-bold text-slate-700 hover:text-purple-700 hover:border-purple-300 shadow-sm transition-all"
        >
          <RotateCcw size={15} /> Ulangi Kuis
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="glass-card p-6 sm:p-8 border border-white/80 shadow-[0_12px_40px_rgba(139,92,246,0.08)] rounded-3xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-2xl text-slate-900 mb-1">{title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed">{subtitle}</p>
      </div>

      {/* Description / Instructions */}
      {(description || instructions) && (
        <div className="mb-6 p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-slate-600 leading-relaxed space-y-2">
          {description && <p>{description}</p>}
          {instructions && (
            <p className="text-slate-500 text-[11px] pt-2 border-t border-purple-100">
              <strong className="text-purple-700">Petunjuk:</strong> {instructions}
            </p>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="mb-6" role="progressbar" aria-valuenow={currentQ} aria-valuemin={0} aria-valuemax={total} aria-label="Progres kuis">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-purple-700 font-bold">Pertanyaan {currentQ + 1} dari {total}</span>
          <span className="text-xs text-slate-400 font-semibold">{progress}%</span>
        </div>
        <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 rounded-full"
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
          <span className="inline-block text-xs font-extrabold text-purple-600 uppercase tracking-wider px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 mb-2.5">
            Pertanyaan {currentQ + 1}
          </span>
          <p className="font-display font-bold text-base lg:text-lg text-slate-900 leading-snug mb-3">{q.text}</p>
          {q.hint && (
            <p className="text-xs text-slate-500 italic mb-4 flex items-center gap-1.5">
              <Lightbulb size={13} className="text-amber-500 flex-shrink-0" />
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
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all shadow-sm
                    ${selected === opt.value
                      ? 'border-2 border-purple-500 bg-purple-50/90 text-purple-950 font-medium'
                      : 'border-purple-100/90 bg-white/80 text-slate-700 hover:border-purple-300 hover:bg-purple-50/40'
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                      ${selected === opt.value ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-sm' : 'bg-purple-100 text-purple-800'}`}
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
            <div className="bg-white/80 p-5 rounded-2xl border border-purple-100/80 shadow-sm">
              <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3 flex-wrap" role="radiogroup" aria-label={q.text}>
                <span className="text-xs text-slate-500 font-semibold mr-1 whitespace-nowrap">
                  {q.minLabel || 'Tidak Sesuai'}
                </span>
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
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold cursor-pointer transition-all
                        ${selected === String(n)
                          ? 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 text-white shadow-[0_4px_14px_rgba(139,92,246,0.4)]'
                          : 'bg-purple-50/70 border border-purple-100 text-slate-700 hover:border-purple-300 hover:bg-purple-100'
                        }`}
                    >
                      {n}
                    </motion.span>
                  </label>
                ))}
                <span className="text-xs text-slate-500 font-semibold ml-1 whitespace-nowrap">
                  {q.maxLabel || 'Sangat Sesuai'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-3 font-medium">
                {q.scaleHint || '(1 = Sangat Tidak Sesuai, 5 = Sangat Sesuai)'}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-8 pt-5 border-t border-purple-100/60">
        {currentQ > 0 && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={goPrev}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-purple-200 text-sm font-bold text-slate-700 hover:border-purple-300 hover:text-slate-900 shadow-sm transition-all"
          >
            <ChevronLeft size={16} /> Sebelumnya
          </motion.button>
        )}
        <motion.button
          whileHover={selected !== undefined ? { scale: 1.03, y: -1 } : {}}
          whileTap={selected !== undefined ? { scale: 0.97 } : {}}
          onClick={goNext}
          disabled={selected === undefined}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all
            ${selected !== undefined
              ? isLast
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-[0_6px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.45)]'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)]'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
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
