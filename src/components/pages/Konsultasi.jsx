import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Lock,
  User,
  KeyRound,
  LogOut,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  ChevronDown,
  Info,
  ShieldCheck,
  Users
} from 'lucide-react'
import {
  supabase,
  getActiveStudent,
  setActiveStudent,
  loginOrRegisterStudent,
  getOrCreateThread,
  getThreadMessages,
  sendMessage,
  generateAnonCode,
  onSync
} from '../../lib/supabase'

import avatarGendis from '../../assets/tim/gendis.jpg'
import avatarGina from '../../assets/tim/gina.jpg'
import avatarNasywa from '../../assets/tim/nasywa.jpeg'
import avatarPutri from '../../assets/tim/putri.jpeg'
import avatarSyifa from '../../assets/tim/syifa.jpg'
import avatarZourika from '../../assets/tim/zourika.jpeg'

/* ─── Daftar 6 Konselor Pendamping ─── */
const COUNSELORS = [
  {
    id: 'putri',
    name: 'Putri Permata Sari',
    role: 'Konselor BK',
    avatar: avatarPutri,
    specialty: 'Perencanaan Karir & Studi',
    shortRole: 'Karir & Studi',
    online: true,
  },
  {
    id: 'gendis',
    name: 'Gendis Retno W. M.',
    role: 'Konselor BK',
    avatar: avatarGendis,
    specialty: 'Manajemen Stres & Regulasi Emosi',
    shortRole: 'Stres & Emosi',
    online: true,
  },
  {
    id: 'gina',
    name: 'Gina Naila Rahmatika',
    role: 'Konselor BK',
    avatar: avatarGina,
    specialty: 'Dinamika Pertemanan & Sosial',
    shortRole: 'Pertemanan',
    online: true,
  },
  {
    id: 'nasywa',
    name: 'Nasywa Siti Rahima',
    role: 'Konselor BK',
    avatar: avatarNasywa,
    specialty: 'Eksplorasi Minat & Bakat',
    shortRole: 'Minat & Bakat',
    online: true,
  },
  {
    id: 'syifa',
    name: 'Syifa Aulia',
    role: 'Konselor BK',
    avatar: avatarSyifa,
    specialty: 'Self-Care & Mindfulness',
    shortRole: 'Self-Care',
    online: true,
  },
  {
    id: 'zourika',
    name: 'Zourika Nahda M.',
    role: 'Konselor BK',
    avatar: avatarZourika,
    specialty: 'Strategi & Gaya Belajar',
    shortRole: 'Gaya Belajar',
    online: true,
  },
]

const formatTime = (isoString) => {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function Konsultasi() {
  // Auth Siswa (Nama + PIN, Tanpa NIS)
  const [student, setStudent] = useState(getActiveStudent())
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState('login') // 'login' | 'register'
  const [authName, setAuthName] = useState('')
  const [authClass, setAuthClass] = useState('')
  const [authPin, setAuthPin] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Konselor & Thread Siswa
  const [selectedCounselor, setSelectedCounselor] = useState(COUNSELORS[0])
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [currentThread, setCurrentThread] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Cross-tab synchronization
  useEffect(() => {
    const unbind = onSync(async (data) => {
      if (data.type === 'NEW_MESSAGE') {
        const msg = data.message
        if (currentThread && msg.thread_id === currentThread.id) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev
            return [...prev, msg]
          })
        }
      }
    })
    return () => unbind()
  }, [currentThread])

  // Muat Thread & Pesan
  const loadThread = useCallback(async (currStudent, counselor, anonStatus) => {
    if (!currStudent) return
    const thread = await getOrCreateThread({
      student: currStudent,
      counselorName: counselor.name,
      isAnonymous: anonStatus,
    })
    setCurrentThread(thread)
    if (thread) {
      const msgs = await getThreadMessages(thread.id)
      setMessages(msgs)
    }
  }, [])

  useEffect(() => {
    if (student) {
      loadThread(student, selectedCounselor, isAnonymous)
    }
  }, [student, selectedCounselor, isAnonymous, loadThread])

  // Supabase Realtime Subscription
  useEffect(() => {
    if (!currentThread) return

    const channel = supabase
      .channel(`rt-student-chat-${currentThread.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultation_messages',
          filter: `thread_id=eq.${currentThread.id}`,
        },
        (payload) => {
          if (payload.new) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === payload.new.id)) return prev
              return [...prev, payload.new]
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentThread])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 110)}px`
  }, [inputMessage])

  // Submit Login / Register (Nama + PIN)
  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      const res = await loginOrRegisterStudent({
        name: authName,
        className: authClass,
        pin: authPin,
      })
      setStudent(res.student)
      setIsAuthModalOpen(false)
      setAuthPin('')
      setAuthError('')
    } catch (err) {
      setAuthError(err.message || 'Gagal masuk. Silakan coba lagi.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    setActiveStudent(null)
    setStudent(null)
    setCurrentThread(null)
    setMessages([])
  }

  // Kirim Pesan
  const handleSend = async (e) => {
    if (e) e.preventDefault()
    const text = inputMessage.trim()
    if (!text || isSending) return

    if (!student) {
      setIsAuthModalOpen(true)
      return
    }

    if (!currentThread) {
      await loadThread(student, selectedCounselor, isAnonymous)
    }

    setIsSending(true)
    const senderDisplayName = isAnonymous
      ? currentThread?.anonymous_code || generateAnonCode(student.name)
      : student.name

    try {
      const sent = await sendMessage({
        threadId: currentThread.id,
        studentId: student.student_id || student.id || student.name,
        senderType: 'student',
        senderName: senderDisplayName,
        text,
      })
      if (sent) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === sent.id)) return prev
          return [...prev, sent]
        })
        setInputMessage('')
      }
    } catch (err) {
      console.error('Send message error:', err)
    } finally {
      setIsSending(false)
    }
  }

  const quickPills = [
    'Aku bingung memilih jurusan kuliah yang sesuai minat.',
    'Bagaimana cara mengatasi overthinking dan cemas?',
    'Cara membagi waktu belajar dan kegiatan ekskul?',
    'Tips percaya diri saat presentasi di depan kelas.',
  ]

  return (
    <div className="w-full flex flex-col h-[calc(100dvh-5rem)] sm:h-[640px] lg:h-[720px] bg-white sm:rounded-3xl sm:border border-purple-100 overflow-hidden shadow-lg relative">
      {/* ── TOP HEADER ROOM CHAT ── */}
      <header className="px-4 py-3 bg-white/95 backdrop-blur-md border-b border-purple-100 flex items-center justify-between gap-3 z-10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={selectedCounselor.avatar}
              alt={selectedCounselor.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-purple-200"
            />
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"
              title="Online"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-base text-slate-900 truncate">
                {selectedCounselor.name}
              </h1>
              <span className="hidden sm:inline-flex text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              {selectedCounselor.specialty}
            </p>
          </div>
        </div>

        {/* Akun Siswa & Mode Privasi */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {student ? (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 truncate max-w-[130px]">{student.name}</p>
                <p className="text-[10px] text-purple-700 font-semibold">{student.class_name}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Ganti Akun Siswa"
                className="w-8 h-8 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center transition-colors"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthTab('login')
                setIsAuthModalOpen(true)
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1E1B2E] text-white hover:bg-black shadow-sm transition-all flex items-center gap-1.5"
            >
              <KeyRound size={13} />
              <span>Masuk PIN</span>
            </button>
          )}
        </div>
      </header>

      {/* ── SCROLLABLE ROOM CHAT AREA (Full di Mobile) ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:p-6 flex flex-col gap-4 custom-scroll bg-gradient-to-b from-[#FAF8FF] via-white to-[#FAF8FF]">
        {/* ── CARD WELCOME & PENGATURAN DI DALAM ROOM CHAT ── */}
        <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-purple-100/80 shadow-sm space-y-4 max-w-2xl mx-auto w-full">
          {/* Info Kerahasiaan */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-900">
            <Lock size={16} className="text-amber-700 flex-shrink-0" />
            <p className="text-xs leading-relaxed">
              <strong>Kerahasiaan Terjamin 100%:</strong> Ceritamu aman dan dilindungi kode etik BK.
            </p>
          </div>

          {/* 1. Pilih Konselor (Horizontal Scroll Langsung di Dalam Chat) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Pilih Konselor Pendamping:
              </span>
              <span className="text-[10px] text-purple-600 font-semibold">Geser & tap foto</span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1.5 custom-scroll">
              {COUNSELORS.map((c) => {
                const isSelected = selectedCounselor.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCounselor(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all flex-shrink-0 text-left ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300/40'
                        : 'bg-slate-50/80 hover:bg-purple-50 text-slate-700 border-purple-100/80 hover:border-purple-300'
                    }`}
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className={`w-8 h-8 rounded-full object-cover flex-shrink-0 border ${
                        isSelected ? 'border-white' : 'border-purple-200'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate max-w-[120px] ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
                      </p>
                      <p className={`text-[10px] truncate max-w-[120px] ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                        {c.shortRole}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Toggle Mode Anonim vs Bagi Identitas */}
          <div className="pt-2 border-t border-purple-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-[11px] font-bold text-slate-600">
              Kirim Pesan Sebagai:
            </span>
            <div className="inline-flex p-1 bg-purple-50/80 rounded-2xl border border-purple-100/80 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isAnonymous
                    ? 'bg-white text-purple-900 shadow-sm'
                    : 'text-slate-500 hover:text-purple-700'
                }`}
              >
                <EyeOff size={13} className="text-purple-600" />
                <span>Anonim (Rahasia)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !isAnonymous
                    ? 'bg-white text-purple-900 shadow-sm'
                    : 'text-slate-500 hover:text-purple-700'
                }`}
              >
                <Eye size={13} className="text-purple-600" />
                <span>Bagi Identitas</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Sambutan Hangat dari Konselor ── */}
        <div className="flex gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-[80%] self-start mt-2">
          <img
            src={selectedCounselor.avatar}
            alt={selectedCounselor.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-purple-200 self-end shadow-sm"
          />
          <div>
            <div className="bg-white border border-purple-100/90 rounded-2xl rounded-bl-sm p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 shadow-sm leading-relaxed">
              Halo {student ? (isAnonymous ? 'teman siswa' : student.name) : 'kamu'}! Saya{' '}
              <strong className="text-purple-700 font-bold">{selectedCounselor.name}</strong> siap mendengarkan ceritamu.
              Ceritakan apa yang sedang kamu rasakan atau tanyakan seputar studi, karir, dan hal lainnya di sini.
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block px-1">
              Konselor BK • {selectedCounselor.shortRole}
            </span>
          </div>
        </div>

        {/* ── Daftar Pesan Chat ── */}
        {messages.map((m) => {
          const isStudentSender = m.sender_type === 'student'
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${
                isStudentSender ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {isStudentSender ? (
                <div className="w-8 h-8 rounded-full bg-[#1E1B2E] text-white flex items-center justify-center flex-shrink-0 self-end text-xs font-bold shadow-sm">
                  <User size={14} />
                </div>
              ) : (
                <img
                  src={selectedCounselor.avatar}
                  alt={selectedCounselor.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-purple-200 self-end shadow-sm"
                />
              )}

              <div>
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isStudentSender
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white rounded-br-sm shadow-[0_4px_16px_rgba(139,92,246,0.25)]'
                      : 'bg-white border border-purple-100 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                <div
                  className={`flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 px-1 ${
                    isStudentSender ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{m.sender_name}</span>
                  <span>•</span>
                  <span>{formatTime(m.created_at)}</span>
                </div>
              </div>
            </motion.div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* ── TOPIC SUGGESTION PILLS ── */}
      <div className="px-3 py-2 bg-white/95 border-t border-purple-100/70 overflow-x-auto flex gap-2 custom-scroll flex-shrink-0">
        {quickPills.map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => setInputMessage(pill)}
            className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-purple-50/70 hover:bg-purple-100 text-purple-700 border border-purple-200/60 transition-colors flex-shrink-0"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* ── BOTTOM INPUT BAR ── */}
      <footer className="p-3 sm:p-4 bg-white border-t border-purple-100 flex-shrink-0">
        {!student ? (
          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-purple-50 border border-purple-200 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <KeyRound size={16} className="text-purple-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-purple-900 truncate">
                Masuk dengan Nama & PIN untuk mengirim pesan konsultasi.
              </span>
            </div>
            <button
              onClick={() => {
                setAuthTab('login')
                setIsAuthModalOpen(true)
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#1E1B2E] text-white hover:bg-black shadow-sm transition-all flex-shrink-0"
            >
              Masuk Sekarang
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                }
              }}
              placeholder={`Ketik pesan untuk Konselor ${selectedCounselor.name}...`}
              className="flex-1 bg-purple-50/40 border border-purple-200/80 rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed max-h-28 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              aria-label="Kirim pesan"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                inputMessage.trim() && !isSending
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)] hover:scale-105 active:scale-95'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={15} />
            </button>
          </form>
        )}
      </footer>

      {/* ── MODAL: LOGIN / DAFTAR SISWA (HANYA NAMA + PIN, TANPA NIS) ── */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-purple-100 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <KeyRound size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Akses Konsultasi Siswa</h3>
                    <p className="text-xs text-slate-500">Cukup gunakan Nama & PIN 4-digit</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Tabs: Masuk vs Daftar Baru */}
              <div className="grid grid-cols-2 p-1 bg-purple-50/70 rounded-2xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('login')
                    setAuthError('')
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    authTab === 'login'
                      ? 'bg-white text-purple-800 shadow-sm'
                      : 'text-slate-600 hover:text-purple-700'
                  }`}
                >
                  Masuk (Sudah Ada PIN)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('register')
                    setAuthError('')
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    authTab === 'register'
                      ? 'bg-white text-purple-800 shadow-sm'
                      : 'text-slate-600 hover:text-purple-700'
                  }`}
                >
                  Daftar Akun Baru
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nama Lengkap / Panggilan:
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Contoh: Ahmad Rizki"
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                {authTab === 'register' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Kelas:
                    </label>
                    <input
                      type="text"
                      required
                      value={authClass}
                      onChange={(e) => setAuthClass(e.target.value)}
                      placeholder="Contoh: XII MIPA 2"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    PIN Keamanan (4-6 digit angka):
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    value={authPin}
                    onChange={(e) => setAuthPin(e.target.value)}
                    placeholder="Contoh: 1234"
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-purple-200 tracking-widest font-bold focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    PIN ini untuk menjaga privasi agar hanya kamu yang bisa membuka riwayat chat ini.
                  </p>
                </div>

                {authError && (
                  <p className="text-xs text-red-500 font-medium p-2 bg-red-50 rounded-lg">
                    {authError}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 rounded-xl bg-[#1E1B2E] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-black transition-all"
                  >
                    {authLoading ? 'Memproses...' : authTab === 'login' ? 'Masuk ke Konsultasi' : 'Daftar & Mulai Konsultasi'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
