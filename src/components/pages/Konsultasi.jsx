import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lock } from 'lucide-react'
import avatarBudi from '../../assets/avatar_budi.png'
import avatarSiti from '../../assets/avatar_siti.png'

/* ─── Bot Response Logic ─── */
const getBotResponse = (msgCount) => {
  const responses = [
    "Terima kasih sudah berani berbagi 💙 Kebingungan itu sangat wajar dialami. Apakah kamu sudah mencoba **Kuis Minat Karir** di menu Layanan Edukasi kami?",
    "Kami mengerti kondisimu. Untuk diskusi lebih dalam dan personal, mari jadwalkan sesi tatap muka atau video call dengan konselor. Silakan tinggalkan **nama dan kelasmu** ya ✨",
    "Terima kasih sudah mau terbuka 🙏 Ingat, setiap langkah kecil menuju pemahaman dirimu adalah langkah yang berani. Kami selalu siap mendampingimu.",
    "Itu pertanyaan yang sangat bagus! Konselor kami siap membantu kamu mengeksplorasi lebih dalam. Apakah ada hal lain yang ingin kamu ceritakan? 😊",
    "Kamu tidak sendirian menghadapi ini. Banyak siswa merasakan hal yang sama. Bersama TemanBK, kita hadapi satu langkah demi satu langkah 🌟",
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
      ? <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
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
        text: 'Halo! Selamat datang di ruang konsultasi 👋 Ada yang mengganjal di pikiranmu atau ingin berdiskusi tentang karir? Ketik pesanmu di bawah ya.',
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
    <div className="grid lg:grid-cols-[280px_1fr] gap-5 h-[calc(100vh-8rem)] max-h-[680px]">

      {/* ── Left Info Panel ── */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-0">
        {/* Status + Title */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
            <span className="text-emerald-400 text-xs font-bold">Online sekarang</span>
          </div>
          <h1 className="font-display font-bold text-3xl">
            Ruang <span className="gradient-text">Konsultasi Aman</span>
          </h1>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 bg-amber-500/8 border border-amber-500/25 rounded-2xl p-4"
          role="note"
        >
          <Lock size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-400 text-xs mb-1">Kerahasiaan Terjamin</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Semua percakapan dijamin kerahasiaannya.{' '}
              <em className="text-slate-500">Catatan: Untuk keperluan UAS, fitur ini adalah simulasi respon otomatis.</em>
            </p>
          </div>
        </motion.div>

        {/* Konselor mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          {[
            { avatar: avatarBudi, name: 'Bpk. Budi', role: 'Karir & Belajar', alt: 'Bpk. Budi Santoso' },
            { avatar: avatarSiti, name: 'Ibu Siti', role: 'Pribadi & Sosial', alt: 'Ibu Siti Aminah' },
          ].map(({ avatar, name, role, alt }) => (
            <div key={name} className="glass-card flex items-center gap-3 px-4 py-3">
              <img src={avatar} alt={alt} width={38} height={38} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{name}</p>
                <p className="text-xs text-slate-500 truncate">{role}</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-bg-2 flex-shrink-0" aria-label="Online" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Chat Area ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card flex flex-col overflow-hidden"
      >
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scroll"
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
                  <div className="w-8 h-8 rounded-full bg-grad-primary flex items-center justify-center flex-shrink-0 self-end text-sm" aria-hidden="true">
                    🤖
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center flex-shrink-0 self-end text-sm" aria-hidden="true">
                    👤
                  </div>
                )}

                <div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                      ${msg.type === 'bot'
                        ? 'bg-surface-2 border border-white/[0.07] rounded-bl-sm text-slate-200'
                        : 'bg-grad-primary text-white rounded-br-sm'
                      }`}
                  >
                    {renderText(msg.text)}
                  </div>
                  <p className={`text-[10px] text-slate-600 mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>{msg.time}</p>
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
                <div className="w-8 h-8 rounded-full bg-grad-primary flex items-center justify-center text-sm" aria-hidden="true">🤖</div>
                <div className="bg-surface-2 border border-white/[0.07] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-primary-light animate-typing-1" />
                  <span className="w-2 h-2 rounded-full bg-primary-light animate-typing-2" />
                  <span className="w-2 h-2 rounded-full bg-primary-light animate-typing-3" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} aria-hidden="true" />
        </div>

        {/* Input */}
        <div className="border-t border-white/[0.07] p-4">
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
              placeholder="Ketik pesanmu di sini... (Enter untuk kirim)"
              rows={1}
              maxLength={500}
              aria-label="Tulis pesan konsultasi"
              className="flex-1 bg-surface-2 border border-white/[0.07] rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-primary/50 transition-colors leading-relaxed max-h-32"
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
                  ? 'bg-grad-primary shadow-glow-primary hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]'
                  : 'bg-surface-2 border border-white/[0.07] text-slate-600 cursor-not-allowed'
                }`}
            >
              <Send size={17} className={input.trim() ? 'text-white' : ''} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
