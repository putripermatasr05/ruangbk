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
  ChevronUp,
  Shield,
  HelpCircle
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
    firstName: 'Putri',
    role: 'Konselor BK',
    avatar: avatarPutri,
    specialty: 'Perencanaan Karir & Kampus',
    tag: 'Karir & Kampus',
    online: true,
  },
  {
    id: 'gendis',
    name: 'Gendis Retno W. M.',
    firstName: 'Gendis',
    role: 'Konselor BK',
    avatar: avatarGendis,
    specialty: 'Manajemen Stres & Regulasi Emosi',
    tag: 'Stres & Emosi',
    online: true,
  },
  {
    id: 'gina',
    name: 'Gina Naila Rahmatika',
    firstName: 'Gina',
    role: 'Konselor BK',
    avatar: avatarGina,
    specialty: 'Dinamika Pertemanan & Relasi Sosial',
    tag: 'Pertemanan',
    online: true,
  },
  {
    id: 'nasywa',
    name: 'Nasywa Siti Rahima',
    firstName: 'Nasywa',
    role: 'Konselor BK',
    avatar: avatarNasywa,
    specialty: 'Eksplorasi Minat & Bakat',
    tag: 'Minat & Bakat',
    online: true,
  },
  {
    id: 'syifa',
    name: 'Syifa Aulia',
    firstName: 'Syifa',
    role: 'Konselor BK',
    avatar: avatarSyifa,
    specialty: 'Self-Care & Mindfulness',
    tag: 'Self-Care',
    online: true,
  },
  {
    id: 'zourika',
    name: 'Zourika Nahda M.',
    firstName: 'Zourika',
    role: 'Konselor BK',
    avatar: avatarZourika,
    specialty: 'Strategi Belajar & Motivasi',
    tag: 'Gaya Belajar',
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
  // Auth Siswa
  const [student, setStudent] = useState(getActiveStudent())
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState('login') // 'login' | 'register'
  const [authName, setAuthName] = useState('')
  const [authClass, setAuthClass] = useState('')
  const [authPin, setAuthPin] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Konselor & Thread
  const [selectedCounselor, setSelectedCounselor] = useState(COUNSELORS[0])
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [showCounselorBar, setShowCounselorBar] = useState(true)
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
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`
  }, [inputMessage])

  // Submit Login / Register
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
      setAuthError(err.message || 'Gagal masuk. Silakan periksa kembali.')
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
      console.error('Send error:', err)
    } finally {
      setIsSending(false)
    }
  }

  const quickPills = [
    'Aku bingung memilih jurusan kuliah yang sesuai minat.',
    'Bagaimana cara mengatasi overthinking dan cemas?',
    'Cara membagi waktu belajar dan kegiatan sekolah?',
    'Tips percaya diri saat berinteraksi di kelas.',
  ]

  return (
    /* 
      Container Full di Mobile:
      Menggunakan fixed inset-0 bottom-[4.5rem] di mobile sehingga layar chat terisi penuh 100%,
      tanpa ada rongga/gap kosong aneh di bawah input chat!
      Di desktop (lg:) kembali menjadi kartu rounded-3xl yang presisi.
    */
    <div className="fixed inset-0 bottom-[4.6rem] z-20 flex flex-col bg-[#FAF9FF] lg:static lg:h-[720px] lg:rounded-3xl lg:border lg:border-purple-100 lg:shadow-xl lg:bg-white overflow-hidden">
      {/* ── TOP HEADER (Pinned di Atas) ── */}
      <header className="px-4 py-2.5 sm:py-3 bg-white/95 backdrop-blur-md border-b border-purple-100 flex items-center justify-between gap-2 z-10 flex-shrink-0 shadow-sm">
        {/* Info Konselor Aktif */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={selectedCounselor.avatar}
              alt={selectedCounselor.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"
              title="Online"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                {selectedCounselor.name}
              </h1>
            </div>
            <p className="text-[10px] text-purple-700 font-medium truncate">
              {selectedCounselor.specialty}
            </p>
          </div>
        </div>

        {/* Action Controls: Toggle Anonim + Profil Siswa */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Toggle Privasi Cepat */}
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            title={isAnonymous ? 'Mode Anonim Aktif: Nama disamarkan. Klik untuk buka identitas.' : 'Identitas Terbuka: Nama & kelas terlihat. Klik untuk mode anonim.'}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
              isAnonymous
                ? 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isAnonymous ? <EyeOff size={12} className="text-purple-600" /> : <Eye size={12} className="text-emerald-600" />}
            <span className="hidden xs:inline">{isAnonymous ? 'Anonim' : 'Identitas'}</span>
          </button>

          {/* Toggle Bar Konselor */}
          <button
            type="button"
            onClick={() => setShowCounselorBar(!showCounselorBar)}
            className="p-1.5 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-purple-700 border border-slate-200 transition-colors"
            title={showCounselorBar ? 'Tutup daftar konselor' : 'Ganti konselor'}
          >
            {showCounselorBar ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {/* Akun Siswa */}
          {student ? (
            <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
              <span className="text-[11px] font-bold text-slate-800 max-w-[80px] truncate hidden sm:inline">
                {student.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                title={`Keluar akun (${student.name})`}
                className="w-7 h-7 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthTab('login')
                setIsAuthModalOpen(true)
              }}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1E1B2E] text-white hover:bg-black transition-all flex items-center gap-1 shadow-sm"
            >
              <KeyRound size={11} />
              <span>Masuk PIN</span>
            </button>
          )}
        </div>
      </header>

      {/* ── PILIHAN KONSELOR (Stories Style, Ramping & Elegan) ── */}
      <AnimatePresence>
        {showCounselorBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/95 border-b border-purple-100/80 px-3 py-2 overflow-hidden flex-shrink-0 z-10"
          >
            <div className="flex items-center gap-3 overflow-x-auto custom-scroll pb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 pl-1">
                Pilih Konselor:
              </span>
              {COUNSELORS.map((c) => {
                const isSelected = selectedCounselor.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCounselor(c)}
                    className="flex flex-col items-center flex-shrink-0 group transition-all"
                  >
                    <div
                      className={`relative w-10 h-10 rounded-full p-0.5 transition-all ${
                        isSelected
                          ? 'ring-2 ring-purple-600 ring-offset-1 scale-105 shadow-md'
                          : 'opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      {isSelected && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] mt-1 font-semibold truncate max-w-[64px] ${
                        isSelected ? 'text-purple-700 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {c.firstName}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CHAT MESSAGES STREAM (Scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-3 custom-scroll bg-gradient-to-b from-purple-50/20 via-white to-purple-50/20">
        {/* Banner Keamanan Ringkas */}
        <div className="self-center my-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50/80 border border-purple-100 text-purple-800 text-[10px] font-semibold">
          <Lock size={11} className="text-purple-600" />
          <span>Kerahasiaan 100% terjaga oleh kode etik BK</span>
        </div>

        {/* Bubble Sambutan dari Konselor */}
        <div className="flex gap-2 max-w-[85%] self-start mt-1">
          <img
            src={selectedCounselor.avatar}
            alt={selectedCounselor.name}
            className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-purple-200 self-end shadow-sm"
          />
          <div>
            <div className="bg-white border border-purple-100/90 rounded-2xl rounded-bl-sm p-3.5 text-xs text-slate-800 shadow-sm leading-relaxed">
              Halo {student ? (isAnonymous ? 'kamu' : student.name) : 'kamu'}! Saya{' '}
              <strong className="text-purple-700 font-bold">{selectedCounselor.name}</strong> siap mendengarkan ceritamu.
              Silakan ceritakan apa yang sedang kamu rasakan atau tanyakan seputar studi, karir, dan hal lainnya di sini.
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block px-1">
              Konselor BK • {selectedCounselor.tag}
            </span>
          </div>
        </div>

        {/* Daftar Pesan Percakapan */}
        {messages.map((m) => {
          const isStudentSender = m.sender_type === 'student'
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 max-w-[85%] ${
                isStudentSender ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {isStudentSender ? (
                <div className="w-7 h-7 rounded-full bg-[#1E1B2E] text-white flex items-center justify-center flex-shrink-0 self-end text-[11px] font-bold shadow-sm">
                  <User size={13} />
                </div>
              ) : (
                <img
                  src={selectedCounselor.avatar}
                  alt={selectedCounselor.name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-purple-200 self-end shadow-sm"
                />
              )}

              <div>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isStudentSender
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white rounded-br-sm shadow-[0_4px_16px_rgba(139,92,246,0.25)]'
                      : 'bg-white border border-purple-100 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                <div
                  className={`flex items-center gap-1.5 text-[9px] text-slate-400 mt-0.5 px-1 ${
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

      {/* ── TOPIC SUGGESTION PILLS (Di Atas Input) ── */}
      <div className="px-3 py-1.5 bg-white/95 border-t border-purple-100/70 overflow-x-auto flex gap-2 custom-scroll flex-shrink-0">
        {quickPills.map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => setInputMessage(pill)}
            className="text-[10px] whitespace-nowrap px-3 py-1 rounded-full bg-purple-50/80 hover:bg-purple-100 text-purple-700 border border-purple-200/60 transition-colors flex-shrink-0"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* ── BOTTOM INPUT BAR (Pinned di Bawah Layar) ── */}
      <footer className="p-2.5 sm:p-3 bg-white border-t border-purple-100 flex-shrink-0 shadow-sm">
        {!student ? (
          <button
            onClick={() => {
              setAuthTab('login')
              setIsAuthModalOpen(true)
            }}
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all"
          >
            <KeyRound size={14} />
            <span>Masuk dengan Nama & PIN untuk Mulai Chat</span>
          </button>
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
              placeholder={`Ketik pesan untuk ${selectedCounselor.firstName}...`}
              className="flex-1 bg-purple-50/40 border border-purple-200/80 rounded-2xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed max-h-24"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              aria-label="Kirim pesan"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                inputMessage.trim() && !isSending
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <Send size={14} />
            </button>
          </form>
        )}
      </footer>

      {/* ── MODAL AUTH (NAMA + PIN, TANPA NIS) ── */}
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
                    <h3 className="font-bold text-base text-slate-900">Akses Konsultasi Privat</h3>
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
