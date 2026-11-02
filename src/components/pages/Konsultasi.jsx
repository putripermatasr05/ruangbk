import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lock, Bot, User } from 'lucide-react'
import avatarGendis from '../../assets/tim/gendis.jpg'
import avatarGina from '../../assets/tim/gina.jpg'
import avatarNasywa from '../../assets/tim/nasywa.jpeg'
import avatarPutri from '../../assets/tim/putri.jpeg'
import avatarSyifa from '../../assets/tim/syifa.jpg'
import avatarZourika from '../../assets/tim/zourika.jpeg'

/* ─── Bot Response Logic ─── */
const getBotResponse = (msgCount) => {
  const responses = [
    "Terima kasih sudah berani berbagi. Kebingungan itu sangat wajar dialami. Apakah kamu sudah mencoba **Kuis Minat Karir** di menu Layanan Edukasi kami?",
    "Kami mengerti kondisimu. Untuk diskusi lebih dalam dan personal, mari jadwalkan sesi tatap muka atau pertemuan dengan konselor. Silakan tinggalkan **nama dan kelasmu** ya.",
    "Terima kasih sudah mau terbuka. Ingat, setiap langkah kecil menuju pemahaman dirimu adalah langkah yang berani. Kami selalu siap mendampingimu.",
    "Itu pertanyaan yang sangat bagus! Konselor kami siap membantu kamu mengeksplorasi lebih dalam. Apakah ada hal lain yang ingin kamu ceritakan?",
    "Kamu tidak sendirian menghadapi ini. Banyak siswa merasakan hal yang sama. Bersama TemanBK, kita hadapi satu langkah demi satu langkah.",
  ]
  return responses[Math.min(msgCount, responses.length - 1)]
}

const formatTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const renderText = (text) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>
      : part
  )
}

export default function Konsultasi({ navigate }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userMsgCount, setUserMsgCount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const initialized = useRef(false)

  // Initial bot greeting
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const timer = setTimeout(() => {
      setMessages([{
        id: 'init',
        type: 'bot',
        text: 'Halo! Selamat datang di ruang konsultasi. Ada yang mengganjal di pikiranmu atau ingin berdiskusi tentang studi dan karir? Ketik pesanmu di bawah ya.',
        time: formatTime(),
      }])
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

  const handleSend = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isSending) return

    const userMsg = { id: Date.now(), type: 'user', text, time: formatTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsSending(true)

    // Show typing
    setIsTyping(true)
    const count = userMsgCount
    setUserMsgCount((c) => c + 1)

    setTimeout(() => {
      setIsTyping(false)
      const botReply = {
        id: Date.now() + 1,
        type: 'bot',
        text: getBotResponse(count),
        time: formatTime(),
      }
      setMessages((prev) => [...prev, botReply])
      setIsSending(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[290px_1fr] gap-5 lg:h-[calc(100vh-8.5rem)] lg:max-h-[700px]">

      {/* ── Left Info Panel ── */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-0">
        {/* Status + Title */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" aria-hidden="true" />
            <span className="text-xs font-bold">Konselor Online</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
            Ruang <span className="gradient-text">Konsultasi Privat</span>
          </h1>
        </motion.div>

        {/* Disclaimer / Kerahasiaan in Pastel Yellow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-pastel-yellow p-4"
          role="note"
        >
          <div className="flex items-start gap-2.5">
            <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 text-xs mb-1">Kerahasiaan Terjamin 100%</p>
              <p className="text-slate-600 text-xs leading-relaxed">
                Ceritamu aman dan privat.{' '}
                <em className="text-slate-500 block mt-1">Catatan UAS: Simulasi konselor respons otomatis.</em>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Konselor mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2 lg:max-h-[300px] overflow-y-auto custom-scroll pr-1"
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Konselor Pendamping
          </p>
          {[
            { avatar: avatarGendis, name: 'Gendis Retno W. M.', role: 'Konselor BK', alt: 'Gendis' },
            { avatar: avatarGina, name: 'Gina Naila Rahmatika', role: 'Konselor BK', alt: 'Gina' },
            { avatar: avatarNasywa, name: 'Nasywa Siti Rahima', role: 'Konselor BK', alt: 'Ima' },
            { avatar: avatarPutri, name: 'Putri Permata Sari', role: 'Konselor BK', alt: 'Putri' },
            { avatar: avatarSyifa, name: 'Syifa Aulia', role: 'Konselor BK', alt: 'Lia' },
            { avatar: avatarZourika, name: 'Zourika Nahda M.', role: 'Konselor BK', alt: 'Nada' },
          ].map(({ avatar, name, role, alt }) => (
            <div key={name} className="bg-white/90 border border-purple-100/80 shadow-sm rounded-2xl flex items-center gap-3 px-3.5 py-2.5 hover:border-purple-300 transition-colors">
              <img src={avatar} alt={alt} width={38} height={38} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-purple-200" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-slate-900 truncate">{name}</p>
                <p className="text-[11px] text-slate-500 truncate">{role}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" aria-label="Online" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Chat Area ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card flex flex-col overflow-hidden h-[540px] lg:h-auto border border-white/80 shadow-[0_12px_40px_rgba(139,92,246,0.08)]"
      >
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4 custom-scroll bg-gradient-to-b from-white/40 to-white/70"
          role="log"
          aria-live="polite"
          aria-label="Riwayat percakapan"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                {/* Avatar */}
                {msg.type === 'bot' ? (
                  <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center flex-shrink-0 self-end shadow-sm" aria-hidden="true">
                    <Bot size={16} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1E1B2E] text-white flex items-center justify-center flex-shrink-0 self-end shadow-sm" aria-hidden="true">
                    <User size={16} />
                  </div>
                )}

                <div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${msg.type === 'bot'
                        ? 'bg-white border border-purple-100 rounded-bl-sm text-slate-800'
                        : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white rounded-br-sm shadow-[0_4px_16px_rgba(139,92,246,0.25)]'
                      }`}
                  >
                    {renderText(msg.text)}
                  </div>
                  <p className={`text-[10px] text-slate-400 mt-1 px-1 ${msg.type === 'user' ? 'text-right' : ''}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 self-start"
                role="status"
                aria-label="Konselor sedang mengetik"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shadow-sm" aria-hidden="true">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-purple-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-typing-1" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-typing-2" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-typing-3" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} aria-hidden="true" />
        </div>

        {/* Input */}
        <div className="border-t border-purple-100/60 p-4 bg-white/80 backdrop-blur-md">
          {/* Quick topic pills */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 custom-scroll">
            {[
              "Aku bingung pilih jurusan kuliah",
              "Bagaimana cara mengatasi overthinking?",
              "Teknik belajar apa yang paling cocok buatku?",
            ].map((quickText) => (
              <button
                key={quickText}
                type="button"
                onClick={() => setInput(quickText)}
                className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/60 transition-colors"
              >
                {quickText}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-3 items-end" aria-label="Kirim pesan konsultasi">
            <textarea
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                }
              }}
              placeholder="Tulis pesan atau ceritamu di sini... (Enter untuk kirim)"
              rows={1}
              maxLength={500}
              aria-label="Tulis pesan konsultasi"
              className="flex-1 bg-white border border-purple-200/70 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed max-h-32 shadow-sm"
              style={{ overflowY: 'auto' }}
            />
            <motion.button
              type="submit"
              whileHover={input.trim() ? { scale: 1.08 } : {}}
              whileTap={input.trim() ? { scale: 0.93 } : {}}
              disabled={!input.trim() || isSending}
              aria-label="Kirim pesan"
              className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                ${input.trim() && !isSending
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)]'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
              <Send size={17} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
