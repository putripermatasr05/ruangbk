import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  KeyRound,
  Send,
  User,
  Database,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  ArrowLeft,
  MessageCircle,
  EyeOff,
  Eye,
  CheckCircle2,
  Clock
} from 'lucide-react'
import {
  supabase,
  getAllThreads,
  getThreadMessages,
  sendMessage,
  verifyAdminPin,
  checkSupabaseTables,
  SUPABASE_SQL_SETUP,
  onSync
} from '../../lib/supabase'

export default function PortalKonselor({ navigate }) {
  const [isAuthed, setIsAuthed] = useState(() => {
    try {
      return sessionStorage.getItem('ruangbk_counselor_auth') === 'true'
    } catch {
      return false
    }
  })
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')
  const [threads, setThreads] = useState([])
  const [selectedThread, setSelectedThread] = useState(null)
  const [messages, setMessages] = useState([])
  const [replyText, setReplyText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [filter, setFilter] = useState('all') // 'all' | 'unreplied'
  const [searchQuery, setSearchQuery] = useState('')

  // Supabase modal & status
  const [isSupabaseReady, setIsSupabaseReady] = useState(false)
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  const messagesEndRef = useRef(null)

  const checkStatus = useCallback(async () => {
    const ready = await checkSupabaseTables()
    setIsSupabaseReady(ready)
  }, [])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  // Load threads
  const loadThreads = useCallback(async () => {
    const all = await getAllThreads()
    setThreads(all)
    if (all.length > 0 && !selectedThread) {
      setSelectedThread(all[0])
      const msgs = await getThreadMessages(all[0].id)
      setMessages(msgs)
    }
  }, [selectedThread])

  useEffect(() => {
    if (isAuthed) {
      loadThreads()
    }
  }, [isAuthed, loadThreads])

  // Cross-tab sync
  useEffect(() => {
    const unbind = onSync(async (data) => {
      if (data.type === 'NEW_MESSAGE') {
        const msg = data.message
        if (selectedThread && msg.thread_id === selectedThread.id) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev
            return [...prev, msg]
          })
        }
        if (isAuthed) {
          const all = await getAllThreads()
          setThreads(all)
        }
      } else if (data.type === 'NEW_THREAD') {
        if (isAuthed) {
          const all = await getAllThreads()
          setThreads(all)
        }
      }
    })
    return () => unbind()
  }, [selectedThread, isAuthed])

  // Realtime Supabase Subscription for active thread
  useEffect(() => {
    if (!isAuthed || !selectedThread) return

    const channel = supabase
      .channel(`rt-counselor-${selectedThread.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultation_messages',
          filter: `thread_id=eq.${selectedThread.id}`,
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
  }, [isAuthed, selectedThread])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Select Thread
  const handleSelectThread = async (thread) => {
    setSelectedThread(thread)
    const msgs = await getThreadMessages(thread.id)
    setMessages(msgs)
  }

  // Handle PIN Login
  const handlePinSubmit = (e) => {
    e.preventDefault()
    if (verifyAdminPin(pinInput.trim())) {
      setIsAuthed(true)
      try {
        sessionStorage.setItem('ruangbk_counselor_auth', 'true')
      } catch {}
      setPinError('')
      loadThreads()
    } else {
      setPinError('PIN Konselor salah. Coba gunakan: 1234')
    }
  }

  const handleLogout = () => {
    setIsAuthed(false)
    try {
      sessionStorage.removeItem('ruangbk_counselor_auth')
    } catch {}
    setSelectedThread(null)
    setMessages([])
  }

  // Handle Send Reply
  const handleSendReply = async (e) => {
    if (e) e.preventDefault()
    const text = replyText.trim()
    if (!text || isSending || !selectedThread) return

    setIsSending(true)
    try {
      const sent = await sendMessage({
        threadId: selectedThread.id,
        studentId: selectedThread.student_id,
        senderType: 'counselor',
        senderName: selectedThread.counselor_name || 'Konselor BK',
        text,
      })
      if (sent) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === sent.id)) return prev
          return [...prev, sent]
        })
        setReplyText('')
        const all = await getAllThreads()
        setThreads(all)
      }
    } catch (err) {
      console.error('Send reply error:', err)
    } finally {
      setIsSending(false)
    }
  }

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  const formatMsgTime = (isoString) => {
    if (!isoString) return ''
    try {
      const d = new Date(isoString)
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  const formatDate = (isoString) => {
    if (!isoString) return ''
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    } catch {
      return ''
    }
  }

  const cannedTemplates = [
    'Halo! Terima kasih sudah bercerita. Apa yang kamu rasakan ini sangat wajar, mari kita diskusikan bersama.',
    'Bisa ceritakan lebih banyak mengenai hal yang paling mengganjal di pikiranmu saat ini?',
    'Langkah awal yang sangat baik! Apakah kamu sudah mencoba Kuis Minat di web Ruang BK?',
    'Tenang ya, kamu tidak sendirian. Kami selalu siap mendampingi prosesmu.',
  ]

  const filteredThreads = threads.filter((t) => {
    const displayName = (t.is_anonymous ? t.anonymous_code || 'Siswa Anonim' : t.student_name || '').toLowerCase()
    const query = searchQuery.toLowerCase()
    return displayName.includes(query) || (t.last_message || '').toLowerCase().includes(query)
  })

  return (
    <div className="space-y-6">
      {/* ── Top Bar Portal Konselor ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1E1B2E] text-white flex items-center justify-center shadow-md">
            <Shield size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                Portal Guru BK & Konselor
              </h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                Khusus Admin
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Kelola dan balas pesan konsultasi siswa secara privat dan real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSupabaseReady
                ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Database size={13} className={isSupabaseReady ? 'text-purple-600' : 'text-amber-600'} />
            <span>{isSupabaseReady ? 'Supabase Terhubung' : 'Setup Database'}</span>
          </button>

          {isAuthed && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100"
            >
              <LogOut size={13} />
              <span>Keluar Portal</span>
            </button>
          )}

          <button
            onClick={() => navigate ? navigate('beranda') : (window.location.hash = '')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors border border-purple-100 shadow-sm"
          >
            <ArrowLeft size={13} />
            <span>Kembali ke Web Siswa</span>
          </button>
        </div>
      </div>

      {/* ── Konten Portal Konselor ── */}
      {!isAuthed ? (
        /* Form Login PIN */
        <div className="max-w-md mx-auto py-16">
          <div className="bg-white/95 border border-purple-100 rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 shadow-sm">
              <KeyRound size={28} />
            </div>
            <h2 className="font-display font-extrabold text-xl text-slate-900 mb-1">
              Verifikasi Guru BK
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Masukkan PIN keamanan untuk membuka akses inbox dan membalas konsultasi siswa.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ketik PIN Konselor"
                  autoFocus
                  className="w-full text-center tracking-widest text-lg font-bold py-3.5 px-4 rounded-2xl border border-purple-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                />
                {pinError && (
                  <p className="text-xs text-red-500 mt-2 font-medium">{pinError}</p>
                )}
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl text-xs text-purple-900 border border-purple-200 text-left">
                <p className="font-bold mb-0.5">Petunjuk Uji Coba Demo:</p>
                <p>PIN default Konselor adalah: <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-purple-300">1234</span></p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#1E1B2E] text-white font-bold text-sm hover:bg-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Shield size={16} />
                <span>Masuk ke Inbox Konselor</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Workspace Konselor */
        <div className="flex flex-col lg:grid lg:grid-cols-[360px_1fr] gap-6">
          {/* Kolom Kiri: Inbox Percakapan Masuk */}
          <div className="bg-white/95 border border-purple-100 rounded-3xl p-5 shadow-sm flex flex-col h-[680px]">
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div>
                <h2 className="font-bold text-sm text-slate-900">Inbox Konsultasi Masuk</h2>
                <p className="text-[11px] text-slate-500">
                  {threads.length} Sesi Percakapan Aktif
                </p>
              </div>
              <button
                onClick={loadThreads}
                title="Segarkan data"
                className="p-2 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                <RefreshCw size={15} />
              </button>
            </div>

            {/* Pencarian */}
            <div className="my-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari siswa atau pesan..."
                className="w-full text-xs px-3.5 py-2 rounded-xl bg-purple-50/50 border border-purple-100 focus:outline-none focus:border-purple-400 focus:bg-white"
              />
            </div>

            {/* List Percakapan */}
            <div className="flex-1 overflow-y-auto custom-scroll space-y-2 pr-1">
              {filteredThreads.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  {threads.length === 0 ? 'Belum ada sesi konsultasi dari siswa.' : 'Tidak ditemukan percakapan yang cocok.'}
                </div>
              ) : (
                filteredThreads.map((t) => {
                  const isSelected = selectedThread?.id === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectThread(t)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-300/30 shadow-sm'
                          : 'bg-white border-purple-100/70 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {t.is_anonymous ? t.anonymous_code || 'Siswa Anonim' : t.student_name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {formatDate(t.last_message_at)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1.5 flex-wrap">
                        <span
                          className={`px-1.5 py-0.5 rounded font-semibold ${
                            t.is_anonymous ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {t.is_anonymous ? 'Anonim' : t.student_class || 'Siswa'}
                        </span>
                        <span>•</span>
                        <span className="truncate">Tujuan: {t.counselor_name}</span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1 italic">
                        "{t.last_message || 'Sesi konsultasi baru'}"
                      </p>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* Kolom Kanan: Area Balasan Konselor */}
          <div className="bg-white/95 border border-purple-100 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[680px]">
            {selectedThread ? (
              <>
                {/* Header Thread */}
                <div className="p-4 border-b border-purple-100 bg-purple-50/40 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {selectedThread.is_anonymous
                          ? selectedThread.anonymous_code || 'Siswa Anonim'
                          : `${selectedThread.student_name} (${selectedThread.student_class || 'Siswa'})`}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          selectedThread.is_anonymous
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {selectedThread.is_anonymous ? 'Identitas Dirahasiakan' : 'Identitas Terbuka'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Konselor Dituju: <strong className="text-purple-700">{selectedThread.counselor_name}</strong>
                    </p>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 custom-scroll bg-[#FAF9FF]/40">
                  {messages.map((m) => {
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
                            <span>{formatMsgTime(m.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Template Cepat */}
                <div className="px-4 py-2 border-t border-purple-100/60 bg-white flex gap-2 overflow-x-auto custom-scroll">
                  {cannedTemplates.map((canned, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setReplyText(canned)}
                      className="text-[10px] whitespace-nowrap px-3 py-1 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 border border-slate-200 transition-colors flex-shrink-0"
                    >
                      Template {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Input Balasan */}
                <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-purple-100 flex gap-2.5 items-end">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Ketik balasan sebagai ${selectedThread.counselor_name}...`}
                    className="flex-1 bg-purple-50/40 border border-purple-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all max-h-32"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSending}
                    className={`h-11 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      replyText.trim() && !isSending
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

      {/* ── Modal Panduan Supabase ── */}
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
                    <li>Buka menu <strong>SQL Editor</strong> di bilah kiri</li>
                    <li>Klik tombol <strong>Salin Query SQL</strong> di bawah ini, lalu paste ke SQL Editor</li>
                    <li>Klik tombol <strong>Run</strong> di Supabase. Selesai!</li>
                  </ol>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">
                      Query SQL:
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

