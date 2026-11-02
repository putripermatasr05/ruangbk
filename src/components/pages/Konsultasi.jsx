import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Lock,
  User,
  Shield,
  KeyRound,
  LogOut,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  EyeOff,
  Database,
  Copy,
  Check,
  RefreshCw,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Users
} from 'lucide-react'
import {
  supabase,
  getActiveStudent,
  setActiveStudent,
  loginOrRegisterStudent,
  verifyAdminPin,
  getOrCreateThread,
  getStudentThreads,
  getAllThreads,
  getThreadMessages,
  sendMessage,
  generateAnonCode,
  checkSupabaseTables,
  SUPABASE_SQL_SETUP,
  onSync
} from '../../lib/supabase'

import avatarGendis from '../../assets/tim/gendis.jpg'
import avatarGina from '../../assets/tim/gina.jpg'
import avatarNasywa from '../../assets/tim/nasywa.jpeg'
import avatarPutri from '../../assets/tim/putri.jpeg'
import avatarSyifa from '../../assets/tim/syifa.jpg'
import avatarZourika from '../../assets/tim/zourika.jpeg'

/* ─── Daftar Konselor Pendamping ─── */
const COUNSELORS = [
  {
    id: 'putri',
    name: 'Putri Permata Sari',
    role: 'Konselor BK',
    avatar: avatarPutri,
    specialty: 'Perencanaan Karir & Studi Lanjut',
    online: true,
  },
  {
    id: 'gendis',
    name: 'Gendis Retno W. M.',
    role: 'Konselor BK',
    avatar: avatarGendis,
    specialty: 'Manajemen Stres & Regulasi Emosi',
    online: true,
  },
  {
    id: 'gina',
    name: 'Gina Naila Rahmatika',
    role: 'Konselor BK',
    avatar: avatarGina,
    specialty: 'Dinamika Pertemanan & Relasi Sosial',
    online: true,
  },
  {
    id: 'nasywa',
    name: 'Nasywa Siti Rahima',
    role: 'Konselor BK',
    avatar: avatarNasywa,
    specialty: 'Eksplorasi Minat & Bakat',
    online: true,
  },
  {
    id: 'syifa',
    name: 'Syifa Aulia',
    role: 'Konselor BK',
    avatar: avatarSyifa,
    specialty: 'Self-Care, Overthinking & Mindfulness',
    online: true,
  },
  {
    id: 'zourika',
    name: 'Zourika Nahda M.',
    role: 'Konselor BK',
    avatar: avatarZourika,
    specialty: 'Strategi Belajar & Motivasi Akademik',
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

const formatDateShort = (isoString) => {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  } catch {
    return ''
  }
}

export default function Konsultasi() {
  // Mode View: 'student' | 'admin'
  const [viewMode, setViewMode] = useState('student')

  // Auth Siswa State
  const [student, setStudent] = useState(getActiveStudent())
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState('login') // 'login' | 'register'
  const [authId, setAuthId] = useState('')
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
  const [studentThreadsList, setStudentThreadsList] = useState([])

  // Mode Admin / Konselor State
  const [isAdminAuthed, setIsAdminAuthed] = useState(false)
  const [adminPinInput, setAdminPinInput] = useState('')
  const [adminPinError, setAdminPinError] = useState('')
  const [adminThreads, setAdminThreads] = useState([])
  const [selectedAdminThread, setSelectedAdminThread] = useState(null)
  const [adminMessages, setAdminMessages] = useState([])
  const [adminReplyInput, setAdminReplyInput] = useState('')
  const [adminFilter, setAdminFilter] = useState('all') // 'all' | 'pending'
  const [isAdminSending, setIsAdminSending] = useState(false)

  // Supabase Setup & Health
  const [isSupabaseReady, setIsSupabaseReady] = useState(false)
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  const messagesEndRef = useRef(null)
  const adminMessagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Check Supabase health on load
  const checkStatus = useCallback(async () => {
    const ready = await checkSupabaseTables()
    setIsSupabaseReady(ready)
  }, [])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  // Cross-tab synchronization
  useEffect(() => {
    const unbind = onSync(async (data) => {
      if (data.type === 'NEW_MESSAGE') {
        const msg = data.message
        // If current student thread matches
        if (currentThread && msg.thread_id === currentThread.id) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev
            return [...prev, msg]
          })
        }
        // If admin viewing this thread
        if (selectedAdminThread && msg.thread_id === selectedAdminThread.id) {
          setAdminMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev
            return [...prev, msg]
          })
        }
        // Refresh admin threads list
        if (viewMode === 'admin') {
          const all = await getAllThreads()
          setAdminThreads(all)
        }
      } else if (data.type === 'NEW_THREAD') {
        if (viewMode === 'admin') {
          const all = await getAllThreads()
          setAdminThreads(all)
        }
      }
    })
    return () => unbind()
  }, [currentThread, selectedAdminThread, viewMode])

  // Load / initialize student active thread
  const loadStudentThread = useCallback(async (currStudent, counselor, anonStatus) => {
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
    // Load all threads for this student
    const history = await getStudentThreads(currStudent.student_id)
    setStudentThreadsList(history)
  }, [])

  useEffect(() => {
    if (student && viewMode === 'student') {
      loadStudentThread(student, selectedCounselor, isAnonymous)
    }
  }, [student, selectedCounselor, isAnonymous, viewMode, loadStudentThread])

  // Realtime Supabase Subscription for student thread
  useEffect(() => {
    if (!currentThread) return

    const channel = supabase
      .channel(`rt-student-${currentThread.id}`)
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

  useEffect(() => {
    adminMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [adminMessages])

  // Auto resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [inputMessage])

  // Handle Student Auth Submit (Login / Register)
  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      const res = await loginOrRegisterStudent({
        studentId: authId,
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
    setStudentThreadsList([])
  }

  // Handle Send Message from Student
  const handleStudentSend = async (e) => {
    if (e) e.preventDefault()
    const text = inputMessage.trim()
    if (!text || isSending) return

    if (!student) {
      setIsAuthModalOpen(true)
      return
    }

    if (!currentThread) {
      await loadStudentThread(student, selectedCounselor, isAnonymous)
    }

    setIsSending(true)
    const senderDisplayName = isAnonymous
      ? currentThread?.anonymous_code || generateAnonCode(student.student_id)
      : student.name

    try {
      const sent = await sendMessage({
        threadId: currentThread.id,
        studentId: student.student_id,
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

  // Handle Admin PIN Check
  const handleAdminPinSubmit = (e) => {
    e.preventDefault()
    if (verifyAdminPin(adminPinInput.trim())) {
      setIsAdminAuthed(true)
      setAdminPinError('')
      loadAdminData()
    } else {
      setAdminPinError('PIN Konselor salah. Coba gunakan: 1234')
    }
  }

  const loadAdminData = async () => {
    const threads = await getAllThreads()
    setAdminThreads(threads)
    if (threads.length > 0 && !selectedAdminThread) {
      setSelectedAdminThread(threads[0])
      const msgs = await getThreadMessages(threads[0].id)
      setAdminMessages(msgs)
    }
  }

  // Select Thread in Admin Mode
  const handleSelectAdminThread = async (thread) => {
    setSelectedAdminThread(thread)
    const msgs = await getThreadMessages(thread.id)
    setAdminMessages(msgs)
  }

  // Realtime Supabase Subscription for Admin
  useEffect(() => {
    if (!isAdminAuthed || !selectedAdminThread) return

    const channel = supabase
      .channel(`rt-admin-${selectedAdminThread.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultation_messages',
          filter: `thread_id=eq.${selectedAdminThread.id}`,
        },
        (payload) => {
          if (payload.new) {
            setAdminMessages((prev) => {
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
  }, [isAdminAuthed, selectedAdminThread])

  // Handle Send Reply from Admin / Counselor
  const handleAdminSendReply = async (e) => {
    if (e) e.preventDefault()
    const text = adminReplyInput.trim()
    if (!text || isAdminSending || !selectedAdminThread) return

    setIsAdminSending(true)
    try {
      const sent = await sendMessage({
        threadId: selectedAdminThread.id,
        studentId: selectedAdminThread.student_id,
        senderType: 'counselor',
        senderName: selectedAdminThread.counselor_name || 'Konselor BK',
        text,
      })
      if (sent) {
        setAdminMessages((prev) => {
          if (prev.some((m) => m.id === sent.id)) return prev
          return [...prev, sent]
        })
        setAdminReplyInput('')
        // Refresh thread preview
        const threads = await getAllThreads()
        setAdminThreads(threads)
      }
    } catch (err) {
      console.error('Admin send error:', err)
    } finally {
      setIsAdminSending(false)
    }
  }

  // Copy SQL script
  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  const quickPills = [
    'Aku bingung memilih jurusan kuliah yang sesuai minat.',
    'Bagaimana cara mengatasi overthinking dan cemas saat belajar?',
    'Aku merasa kesulitan membagi waktu antara tugas dan istirahat.',
    'Bagaimana cara membangun rasa percaya diri di lingkungan kelas?',
  ]

  const adminCanned = [
    'Halo! Terima kasih sudah bercerita. Apa yang kamu rasakan ini sangat wajar, mari kita bahas pelan-pelan.',
    'Bisa ceritakan lebih banyak mengenai hal yang paling membebani pikiranmu saat ini?',
    'Langkah awal yang sangat baik! Apakah kamu sudah mencoba Kuis Minat & Gaya Belajar di menu Layanan?',
    'Tenang ya, kamu tidak sendirian. Kita bisa cari jalan keluarnya bersama-sama.',
  ]

  return (
    <div className="space-y-6">
      {/* ── Header: Judul, Status & Mode Switcher ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Konsultasi Realtime
            </span>

            {/* Supabase status badge */}
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                isSupabaseReady
                  ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Database size={13} className={isSupabaseReady ? 'text-purple-600' : 'text-amber-600'} />
              <span>{isSupabaseReady ? 'Supabase Terhubung' : 'Setup Database Cloud'}</span>
            </button>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
            Ruang <span className="gradient-text">Konsultasi BK</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Konsultasi langsung dengan Guru BK. Aman, privat, dan riwayat pesan tersimpan.
          </p>
        </div>

        {/* Switcher Mode: Siswa vs Konselor (Admin) */}
        <div className="flex items-center gap-2 p-1 bg-white border border-purple-100 rounded-2xl shadow-sm self-start md:self-auto">
          <button
            onClick={() => setViewMode('student')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'student'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <User size={14} />
            <span>Ruang Siswa</span>
          </button>
          <button
            onClick={() => {
              setViewMode('admin')
              if (isAdminAuthed) loadAdminData()
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'admin'
                ? 'bg-[#1E1B2E] text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Shield size={14} />
            <span>Portal Konselor (Admin)</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          MODE SISWA
      ───────────────────────────────────────────────────────────────── */}
      {viewMode === 'student' && (
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-6">
          {/* ── Panel Kiri: Profil Siswa + Daftar Konselor ── */}
          <div className="flex flex-col gap-5">
            {/* Kartu Status Login Siswa */}
            <div className="bg-white/95 border border-purple-100/90 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Akun Konsultasi
                </span>
                {student && (
                  <button
                    onClick={handleLogout}
                    title="Keluar / Ganti Akun"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-700 hover:underline"
                  >
                    <LogOut size={13} />
                    <span>Ganti Akun</span>
                  </button>
                )}
              </div>

              {student ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md flex-shrink-0">
                      {student.name ? student.name[0].toUpperCase() : 'S'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-900 truncate">{student.name}</p>
                      <p className="text-xs text-slate-500 truncate">
                        Kelas: <span className="font-semibold text-purple-700">{student.class_name}</span> • NIS: {student.student_id}
                      </p>
                    </div>
                  </div>

                  {/* Mode Privasi Kirim */}
                  <div className="pt-3 border-t border-purple-50">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2">
                      Privasi Pengiriman Pesan:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAnonymous(true)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isAnonymous
                            ? 'bg-purple-50/90 border-purple-300 ring-2 ring-purple-400/20 text-purple-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-bold text-xs">
                          <EyeOff size={13} className="text-purple-600" />
                          <span>Anonim</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Nama & kelas dirahasiakan dari konselor
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsAnonymous(false)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          !isAnonymous
                            ? 'bg-purple-50/90 border-purple-300 ring-2 ring-purple-400/20 text-purple-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-bold text-xs">
                          <Eye size={13} className="text-purple-600" />
                          <span>Bagi Identitas</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Konselor melihat nama & kelasmu
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-2">
                    <KeyRound size={20} />
                  </div>
                  <p className="font-bold text-sm text-slate-900 mb-1">Belum Masuk dengan PIN</p>
                  <p className="text-xs text-slate-500 mb-3">
                    Masuk atau buat PIN 4-digit agar riwayat percakapan konsultasimu tersimpan aman.
                  </p>
                  <button
                    onClick={() => {
                      setAuthTab('login')
                      setIsAuthModalOpen(true)
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1E1B2E] text-white hover:bg-black shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <KeyRound size={14} />
                    <span>Masuk / Buat PIN Siswa</span>
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer Kerahasiaan */}
            <div className="card-pastel-yellow p-4">
              <div className="flex items-start gap-2.5">
                <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900 text-xs mb-1">Kerahasiaan Terjamin 100%</p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Setiap sesi konsultasi dilindungi kode etik bimbingan & konseling. Pilihlah mode anonim bila kamu ingin lebih leluasa bercerita.
                  </p>
                </div>
              </div>
            </div>

            {/* Daftar Konselor Pendamping (Tetap Ada & Dapat Dipilih) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pilih Konselor Pendamping
                </p>
                <span className="text-[10px] text-purple-600 font-semibold">Klik untuk pilih</span>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto custom-scroll pr-1">
                {COUNSELORS.map((c) => {
                  const isSelected = selectedCounselor.id === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCounselor(c)}
                      className={`w-full text-left rounded-2xl p-3 border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300/40'
                          : 'bg-white/90 border-purple-100/80 text-slate-800 hover:border-purple-300 hover:bg-white shadow-sm'
                      }`}
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className={`w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 ${
                          isSelected ? 'border-white' : 'border-purple-200'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {c.name}
                          </p>
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              isSelected ? 'bg-emerald-300' : 'bg-emerald-500'
                            }`}
                            title="Online"
                          />
                        </div>
                        <p className={`text-[11px] truncate ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                          {c.specialty}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Panel Kanan: Area Chat Siswa ── */}
          <div className="bg-white/95 border border-purple-100/90 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[620px] lg:h-[680px]">
            {/* Chat Top Header */}
            <div className="p-4 border-b border-purple-100 bg-white/70 backdrop-blur-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={selectedCounselor.avatar}
                  alt={selectedCounselor.name}
                  className="w-10 h-10 rounded-full object-cover border border-purple-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-sm text-slate-900 truncate">
                      {selectedCounselor.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Aktif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Fokus: {selectedCounselor.specialty}
                  </p>
                </div>
              </div>

              {/* Status Identitas Saat Ini */}
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ${
                    isAnonymous
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {isAnonymous ? <EyeOff size={12} /> : <Eye size={12} />}
                  <span>{isAnonymous ? 'Mode Anonim' : 'Identitas Terbuka'}</span>
                </span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 custom-scroll bg-[#FAF9FF]/60">
              {/* Sambutan Awal dari Konselor */}
              <div className="flex gap-3 max-w-[85%] self-start">
                <img
                  src={selectedCounselor.avatar}
                  alt={selectedCounselor.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-purple-200 self-end shadow-sm"
                />
                <div>
                  <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-sm p-4 text-xs sm:text-sm text-slate-800 shadow-sm leading-relaxed">
                    Halo {student ? (isAnonymous ? 'teman siswa' : student.name) : 'kamu'}! Saya{' '}
                    <strong className="text-purple-700 font-bold">{selectedCounselor.name}</strong> siap mendengarkan ceritamu.
                    Ruang ini aman dan rahasia. Apa yang sedang kamu rasakan atau ingin kamu tanyakan seputar studi, karir, pertemanan, atau masalah pribadi?
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block px-1">Konselor BK</span>
                </div>
              </div>

              {/* Daftar Pesan Riwayat */}
              {messages.map((m) => {
                const isStudentSender = m.sender_type === 'student'
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 max-w-[85%] ${
                      isStudentSender ? 'self-end flex-row-reverse' : 'self-start'
                    }`}
                  >
                    {isStudentSender ? (
                      <div className="w-8 h-8 rounded-full bg-[#1E1B2E] text-white flex items-center justify-center flex-shrink-0 self-end text-xs font-bold shadow-sm">
                        <User size={15} />
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

            {/* Quick Topic Prompts */}
            <div className="px-4 pt-3 pb-1 bg-white/90 border-t border-purple-100/60 overflow-x-auto flex gap-2 custom-scroll">
              {quickPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setInputMessage(pill)}
                  className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-purple-50/80 hover:bg-purple-100 text-purple-700 border border-purple-200/60 transition-colors flex-shrink-0"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white/90 border-t border-purple-100">
              {!student ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/70 border border-purple-200">
                  <div className="flex items-center gap-2">
                    <KeyRound size={16} className="text-purple-600" />
                    <span className="text-xs font-semibold text-purple-900">
                      Silakan login dengan PIN terlebih dahulu untuk mulai mengirim pesan konsultasi.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setAuthTab('login')
                      setIsAuthModalOpen(true)
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-sm transition-all"
                  >
                    Masuk Sekarang
                  </button>
                </div>
              ) : (
                <form onSubmit={handleStudentSend} className="flex gap-2.5 items-end">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleStudentSend(e)
                      }
                    }}
                    placeholder={`Ketik pesan untuk Konselor ${selectedCounselor.name}... (Enter untuk kirim)`}
                    className="flex-1 bg-purple-50/40 border border-purple-200/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed max-h-32 shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSending}
                    aria-label="Kirim pesan"
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                      inputMessage.trim() && !isSending
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)] hover:scale-105 active:scale-95'
                        : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          MODE PORTAL KONSELOR / ADMIN
      ───────────────────────────────────────────────────────────────── */}
      {viewMode === 'admin' && (
        <div>
          {!isAdminAuthed ? (
            /* Form PIN Admin */
            <div className="max-w-md mx-auto py-12">
              <div className="bg-white/95 border border-purple-100 rounded-3xl p-8 shadow-md text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center mb-4">
                  <Shield size={26} />
                </div>
                <h2 className="font-display font-extrabold text-xl text-slate-900 mb-1">
                  Portal Guru BK / Admin
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Masukkan PIN Konselor untuk mengakses dan membalas semua pesan konsultasi siswa.
                </p>

                <form onSubmit={handleAdminPinSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      maxLength={10}
                      value={adminPinInput}
                      onChange={(e) => setAdminPinInput(e.target.value)}
                      placeholder="Masukkan PIN Konselor"
                      autoFocus
                      className="w-full text-center tracking-widest text-lg font-bold py-3 px-4 rounded-xl border border-purple-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                    />
                    {adminPinError && (
                      <p className="text-xs text-red-500 mt-2 font-medium">{adminPinError}</p>
                    )}
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl text-xs text-purple-800 border border-purple-200 text-left">
                    <p className="font-bold mb-0.5">Petunjuk Uji Coba (Demo):</p>
                    <p>PIN default Konselor adalah: <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-purple-300">1234</span></p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1E1B2E] text-white font-bold text-sm hover:bg-black shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <KeyRound size={16} />
                    <span>Buka Portal Konselor</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Dashboard Balas Konselor */
            <div className="flex flex-col lg:grid lg:grid-cols-[340px_1fr] gap-6">
              {/* Kolom Kiri: Inbox Sesi Konsultasi Siswa */}
              <div className="bg-white/95 border border-purple-100 rounded-3xl p-5 shadow-sm flex flex-col h-[650px]">
                <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                  <div>
                    <h2 className="font-bold text-sm text-slate-900">Inbox Konsultasi Masuk</h2>
                    <p className="text-[11px] text-slate-500">
                      Total: {adminThreads.length} Sesi Percakapan
                    </p>
                  </div>
                  <button
                    onClick={loadAdminData}
                    title="Segarkan data"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>

                {/* Filter tab */}
                <div className="flex gap-2 my-3">
                  <button
                    onClick={() => setAdminFilter('all')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      adminFilter === 'all'
                        ? 'bg-purple-100 text-purple-800'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Semua ({adminThreads.length})
                  </button>
                  <button
                    onClick={() => setAdminFilter('pending')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      adminFilter === 'pending'
                        ? 'bg-purple-100 text-purple-800'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Menunggu Balasan
                  </button>
                </div>

                {/* List Percakapan */}
                <div className="flex-1 overflow-y-auto custom-scroll space-y-2 pr-1">
                  {adminThreads.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Belum ada sesi konsultasi yang masuk.
                    </div>
                  ) : (
                    adminThreads.map((t) => {
                      const isSelected = selectedAdminThread?.id === t.id
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleSelectAdminThread(t)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                            isSelected
                              ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-300/30'
                              : 'bg-white border-purple-100/70 hover:border-purple-300 hover:bg-purple-50/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {t.is_anonymous ? t.anonymous_code || 'Siswa Anonim' : t.student_name}
                            </span>
                            <span className="text-[10px] text-slate-400 flex-shrink-0">
                              {formatDateShort(t.last_message_at)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1.5">
                            <span
                              className={`px-1.5 py-0.5 rounded ${
                                t.is_anonymous ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {t.is_anonymous ? 'Anonim' : t.student_class || 'Siswa'}
                            </span>
                            <span>•</span>
                            <span className="truncate">Tujuan: {t.counselor_name}</span>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-1 italic">
                            "{t.last_message || 'Percakapan baru'}"
                          </p>
                        </button>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Kolom Kanan: Area Balasan Konselor */}
              <div className="bg-white/95 border border-purple-100 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[650px]">
                {selectedAdminThread ? (
                  <>
                    {/* Header Percakapan */}
                    <div className="p-4 border-b border-purple-100 bg-purple-50/40 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900">
                            {selectedAdminThread.is_anonymous
                              ? selectedAdminThread.anonymous_code || 'Siswa Anonim'
                              : `${selectedAdminThread.student_name} (${selectedAdminThread.student_class})`}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              selectedAdminThread.is_anonymous
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {selectedAdminThread.is_anonymous ? 'Identitas Dirahasiakan' : 'Identitas Terbuka'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Konselor Dituju: <span className="font-semibold text-purple-700">{selectedAdminThread.counselor_name}</span>
                        </p>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 custom-scroll bg-[#FAF9FF]/40">
                      {adminMessages.map((m) => {
                        const isStudent = m.sender_type === 'student'
                        return (
                          <div
                            key={m.id}
                            className={`flex gap-3 max-w-[85%] ${
                              !isStudent ? 'self-end flex-row-reverse' : 'self-start'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end text-xs font-bold shadow-sm ${
                                isStudent ? 'bg-purple-100 text-purple-700' : 'bg-[#1E1B2E] text-white'
                              }`}
                            >
                              {isStudent ? <User size={15} /> : <Shield size={15} />}
                            </div>

                            <div>
                              <div
                                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                                  !isStudent
                                    ? 'bg-[#1E1B2E] text-white rounded-br-sm'
                                    : 'bg-white border border-purple-100 text-slate-800 rounded-bl-sm'
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{m.text}</p>
                              </div>
                              <div
                                className={`flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 px-1 ${
                                  !isStudent ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <span className="font-medium">{m.sender_name}</span>
                                <span>•</span>
                                <span>{formatTime(m.created_at)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={adminMessagesEndRef} />
                    </div>

                    {/* Canned Responses Template */}
                    <div className="px-4 py-2 border-t border-purple-100/60 bg-white flex gap-2 overflow-x-auto custom-scroll">
                      {adminCanned.map((canned, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAdminReplyInput(canned)}
                          className="text-[10px] whitespace-nowrap px-3 py-1 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 border border-slate-200 transition-colors flex-shrink-0"
                        >
                          Template {idx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Form Balasan Konselor */}
                    <form onSubmit={handleAdminSendReply} className="p-4 bg-white border-t border-purple-100 flex gap-2.5 items-end">
                      <textarea
                        rows={2}
                        value={adminReplyInput}
                        onChange={(e) => setAdminReplyInput(e.target.value)}
                        placeholder={`Ketik balasan sebagai ${selectedAdminThread.counselor_name}...`}
                        className="flex-1 bg-purple-50/40 border border-purple-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all max-h-32"
                      />
                      <button
                        type="submit"
                        disabled={!adminReplyInput.trim() || isAdminSending}
                        className={`h-11 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          adminReplyInput.trim() && !isAdminSending
                            ? 'bg-[#1E1B2E] text-white hover:bg-black shadow-md'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                      >
                        <Send size={15} />
                        <span>Kirim Balasan</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                    Pilih salah satu sesi konsultasi dari inbox sebelah kiri.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          MODAL: LOGIN / DAFTAR SISWA DENGAN PIN
      ───────────────────────────────────────────────────────────────── */}
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
                    <p className="text-xs text-slate-500">Gunakan ID Siswa & PIN 4-digit</p>
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
                  Daftar Siswa Baru
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nomor Identitas / NIS Siswa:
                  </label>
                  <input
                    type="text"
                    required
                    value={authId}
                    onChange={(e) => setAuthId(e.target.value)}
                    placeholder="Contoh: 2401 atau No. Absen"
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                {authTab === 'register' && (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Nama Lengkap:
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
                  </>
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
                    PIN ini berguna untuk membuka kembali riwayat konsultasimu di perangkat lain.
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
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all"
                  >
                    {authLoading ? 'Memproses...' : authTab === 'login' ? 'Masuk ke Konsultasi' : 'Daftar & Mulai Konsultasi'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────────
          MODAL: PANDUAN SETUP SUPABASE (1-CLICK SQL RUN)
      ───────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSqlModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl border border-purple-100 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Setup Database Supabase</h3>
                    <p className="text-xs text-slate-500">
                      Status: {isSupabaseReady ? '✅ Tabel Aktif & Terhubung' : '⚠️ Menunggu Pembuatan Tabel di Supabase'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSqlModalOpen(false)}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3 overflow-y-auto custom-scroll text-xs text-slate-700">
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                  <p className="font-bold text-purple-900 mb-1">Langkah 1 Menit:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    <li>Buka dashboard Supabase project Anda: <code className="bg-white px-1.5 py-0.5 rounded text-purple-800">kjjwcehdxhahvmjbysxx</code></li>
                    <li>Buka menu <strong>SQL Editor</strong> di sebelah kiri</li>
                    <li>Klik tombol <strong>Salin Query SQL</strong> di bawah ini, lalu paste ke SQL Editor</li>
                    <li>Klik tombol <strong>Run</strong> di Supabase. Selesai!</li>
                  </ol>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">
                      Query SQL (Tabel Siswa, Thread, & Pesan Konsultasi):
                    </span>
                    <button
                      onClick={handleCopySql}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-all shadow-sm"
                    >
                      {copiedSql ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedSql ? 'Berhasil Disalin!' : 'Salin Query SQL'}</span>
                    </button>
                  </div>

                  <pre className="bg-[#1E1B2E] text-purple-100 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto max-h-56 custom-scroll leading-relaxed">
                    {SUPABASE_SQL_SETUP}
                  </pre>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800">
                  <p className="font-bold mb-0.5">Catatan Fallback:</p>
                  <p className="text-[11px]">
                    Sebelum Anda menjalankan SQL di atas, sistem sudah dilengkapi dengan penyimpanan lokal real-time dan sinkronisasi otomatis antar-tab, sehingga Anda dan penguji sudah dapat langsung mencoba fitur chat & balas pesan sekarang juga!
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-100 flex justify-end">
                <button
                  onClick={() => setIsSqlModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1E1B2E] text-white font-bold text-xs hover:bg-black transition-all"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
