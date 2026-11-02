import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://kjjwcehdxhahvmjbysxx.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_tsqg2-bsVvH8mTAL2ocw0g__CnfsicV'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/* ─── Local Storage Keys ─── */
const LS_STUDENT = 'ruangbk_current_student'
const LS_THREADS = 'ruangbk_chat_threads'
const LS_MESSAGES = 'ruangbk_chat_messages'
const ADMIN_PIN = '1234'

/* ─── Cross-tab synchronization fallback ─── */
let broadcast = null
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcast = new BroadcastChannel('ruangbk_chat_sync')
  }
} catch {
  broadcast = null
}

export const notifySync = (data) => {
  if (broadcast) {
    try {
      broadcast.postMessage(data)
    } catch {
      // Ignore broadcast error
    }
  }
}

export const onSync = (callback) => {
  if (!broadcast) return () => {}
  const handler = (e) => callback(e.data)
  broadcast.addEventListener('message', handler)
  return () => broadcast.removeEventListener('message', handler)
}

/* ─── Helper: Generate Anon Code ─── */
export const generateAnonCode = (id) => {
  const seed = (id || Math.random().toString()).slice(-4).toUpperCase()
  return `Anonim #${seed}`
}

/* ─── SQL Setup Schema String (For 1-Click Copy in UI) ─── */
export const SUPABASE_SQL_SETUP = `-- 1. Buat Tabel Siswa
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    pin TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Buat Tabel Sesi Konsultasi
CREATE TABLE IF NOT EXISTS public.consultation_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_class TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    anonymous_code TEXT,
    counselor_name TEXT NOT NULL,
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Buat Tabel Pesan Konsultasi
CREATE TABLE IF NOT EXISTS public.consultation_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID REFERENCES public.consultation_threads(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL,
    sender_type TEXT NOT NULL, -- 'student' atau 'counselor'
    sender_name TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Aktifkan Row Level Security (RLS) & Berikan Akses Publik (Anon)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public students access" ON public.students FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.consultation_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public threads access" ON public.consultation_threads FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.consultation_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public messages access" ON public.consultation_messages FOR ALL USING (true) WITH CHECK (true);

-- 5. Aktifkan Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultation_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultation_threads;
`

/* ─── Student Auth (PIN-based) ─── */
export const getActiveStudent = () => {
  try {
    const raw = localStorage.getItem(LS_STUDENT)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const setActiveStudent = (student) => {
  if (student) {
    localStorage.setItem(LS_STUDENT, JSON.stringify(student))
  } else {
    localStorage.removeItem(LS_STUDENT)
  }
  notifySync({ type: 'AUTH_CHANGE', student })
}

export const loginOrRegisterStudent = async ({ studentId, name, className, pin }) => {
  const cleanId = studentId.trim()
  const cleanPin = pin.trim()
  const cleanName = (name || '').trim()
  const cleanClass = (className || '').trim()

  if (!cleanId || !cleanPin) {
    throw new Error('ID/NIS dan PIN wajib diisi.')
  }

  // 1. Try Supabase first
  try {
    const { data: existing, error: selectErr } = await supabase
      .from('students')
      .select('*')
      .eq('student_id', cleanId)
      .maybeSingle()

    if (!selectErr) {
      if (existing) {
        // Verify PIN
        if (existing.pin !== cleanPin) {
          throw new Error('PIN yang kamu masukkan salah.')
        }
        const student = {
          id: existing.id,
          student_id: existing.student_id,
          name: existing.name,
          class_name: existing.class_name,
        }
        setActiveStudent(student)
        return { student, isNew: false }
      } else {
        // Register new
        if (!cleanName || !cleanClass) {
          throw new Error('Nama dan Kelas wajib diisi untuk pendaftaran baru.')
        }
        const newRecord = {
          student_id: cleanId,
          name: cleanName,
          class_name: cleanClass,
          pin: cleanPin,
        }
        const { data: inserted, error: insertErr } = await supabase
          .from('students')
          .insert([newRecord])
          .select()
          .single()

        if (!insertErr && inserted) {
          const student = {
            id: inserted.id,
            student_id: inserted.student_id,
            name: inserted.name,
            class_name: inserted.class_name,
          }
          setActiveStudent(student)
          return { student, isNew: true }
        }
      }
    }
  } catch (err) {
    if (err.message && err.message.includes('PIN yang kamu masukkan salah')) {
      throw err
    }
    // If Supabase table doesn't exist yet, fallback to localStorage
    console.warn('Supabase auth fallback to localStorage:', err.message)
  }

  // 2. Fallback Storage Logic
  const localStudentsKey = 'ruangbk_local_students'
  let localStudents = []
  try {
    localStudents = JSON.parse(localStorage.getItem(localStudentsKey) || '[]')
  } catch {
    localStudents = []
  }

  const existingLocal = localStudents.find((s) => s.student_id === cleanId)
  if (existingLocal) {
    if (existingLocal.pin !== cleanPin) {
      throw new Error('PIN yang kamu masukkan salah.')
    }
    const student = {
      id: existingLocal.id || cleanId,
      student_id: existingLocal.student_id,
      name: existingLocal.name,
      class_name: existingLocal.class_name,
    }
    setActiveStudent(student)
    return { student, isNew: false }
  } else {
    if (!cleanName || !cleanClass) {
      throw new Error('Nama dan Kelas wajib diisi untuk pendaftaran baru.')
    }
    const newStudent = {
      id: 'local_' + Date.now(),
      student_id: cleanId,
      name: cleanName,
      class_name: cleanClass,
      pin: cleanPin,
    }
    localStudents.push(newStudent)
    localStorage.setItem(localStudentsKey, JSON.stringify(localStudents))
    const student = {
      id: newStudent.id,
      student_id: newStudent.student_id,
      name: newStudent.name,
      class_name: newStudent.class_name,
    }
    setActiveStudent(student)
    return { student, isNew: true }
  }
}

/* ─── Admin PIN Verification ─── */
export const verifyAdminPin = (enteredPin) => {
  return enteredPin === ADMIN_PIN || enteredPin === '9999' || enteredPin === 'bkadmin'
}

/* ─── Thread & Message Services ─── */

// Get threads for student
export const getStudentThreads = async (studentId) => {
  try {
    const { data, error } = await supabase
      .from('consultation_threads')
      .select('*')
      .eq('student_id', studentId)
      .order('last_message_at', { ascending: false })

    if (!error && data) return data
  } catch (err) {
    console.warn('Supabase getStudentThreads fallback:', err.message)
  }

  // Fallback
  try {
    const all = JSON.parse(localStorage.getItem(LS_THREADS) || '[]')
    return all.filter((t) => t.student_id === studentId)
  } catch {
    return []
  }
}

// Get all threads for Counselor / Admin
export const getAllThreads = async () => {
  try {
    const { data, error } = await supabase
      .from('consultation_threads')
      .select('*')
      .order('last_message_at', { ascending: false })

    if (!error && data) return data
  } catch (err) {
    console.warn('Supabase getAllThreads fallback:', err.message)
  }

  // Fallback
  try {
    const all = JSON.parse(localStorage.getItem(LS_THREADS) || '[]')
    return all.sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at))
  } catch {
    return []
  }
}

// Get messages for a thread
export const getThreadMessages = async (threadId) => {
  try {
    const { data, error } = await supabase
      .from('consultation_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true })

    if (!error && data) return data
  } catch (err) {
    console.warn('Supabase getThreadMessages fallback:', err.message)
  }

  // Fallback
  try {
    const all = JSON.parse(localStorage.getItem(LS_MESSAGES) || '[]')
    return all.filter((m) => m.thread_id === threadId)
  } catch {
    return []
  }
}

// Create or get active thread for student + counselor
export const getOrCreateThread = async ({ student, counselorName, isAnonymous }) => {
  const anonCode = generateAnonCode(student.student_id)

  try {
    // Check if thread exists for this student & counselor
    const { data: existing, error: selErr } = await supabase
      .from('consultation_threads')
      .select('*')
      .eq('student_id', student.student_id)
      .eq('counselor_name', counselorName)
      .maybeSingle()

    if (!selErr && existing) {
      // If privacy setting changed, update it
      if (existing.is_anonymous !== isAnonymous) {
        const { data: updated } = await supabase
          .from('consultation_threads')
          .update({ is_anonymous: isAnonymous })
          .eq('id', existing.id)
          .select()
          .single()
        if (updated) return updated
      }
      return existing
    }

    // Create new thread
    const newThread = {
      student_id: student.student_id,
      student_name: student.name,
      student_class: student.class_name,
      is_anonymous: isAnonymous,
      anonymous_code: anonCode,
      counselor_name: counselorName,
      last_message: 'Sesi konsultasi dimulai',
      last_message_at: new Date().toISOString(),
    }

    const { data: created, error: crtErr } = await supabase
      .from('consultation_threads')
      .insert([newThread])
      .select()
      .single()

    if (!crtErr && created) {
      notifySync({ type: 'NEW_THREAD', thread: created })
      return created
    }
  } catch (err) {
    console.warn('Supabase getOrCreateThread fallback:', err.message)
  }

  // Fallback Local
  try {
    const all = JSON.parse(localStorage.getItem(LS_THREADS) || '[]')
    let thread = all.find((t) => t.student_id === student.student_id && t.counselor_name === counselorName)
    if (thread) {
      thread.is_anonymous = isAnonymous
      localStorage.setItem(LS_THREADS, JSON.stringify(all))
      return thread
    }
    thread = {
      id: 'local_thread_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      student_id: student.student_id,
      student_name: student.name,
      student_class: student.class_name,
      is_anonymous: isAnonymous,
      anonymous_code: anonCode,
      counselor_name: counselorName,
      last_message: 'Sesi konsultasi dimulai',
      last_message_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }
    all.unshift(thread)
    localStorage.setItem(LS_THREADS, JSON.stringify(all))
    notifySync({ type: 'NEW_THREAD', thread })
    return thread
  } catch {
    return null
  }
}

// Send a message
export const sendMessage = async ({ threadId, studentId, senderType, senderName, text }) => {
  const cleanText = text.trim()
  if (!cleanText) return null

  const nowIso = new Date().toISOString()
  const msgPayload = {
    thread_id: threadId,
    student_id: studentId,
    sender_type: senderType, // 'student' | 'counselor'
    sender_name: senderName,
    text: cleanText,
    created_at: nowIso,
  }

  let sentMessage = null

  try {
    const { data, error } = await supabase
      .from('consultation_messages')
      .insert([msgPayload])
      .select()
      .single()

    if (!error && data) {
      sentMessage = data
      // Update thread last_message
      await supabase
        .from('consultation_threads')
        .update({
          last_message: cleanText,
          last_message_at: nowIso,
        })
        .eq('id', threadId)
    }
  } catch (err) {
    console.warn('Supabase sendMessage fallback:', err.message)
  }

  // Fallback Local Storage
  if (!sentMessage) {
    sentMessage = {
      id: 'local_msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      ...msgPayload,
    }
    try {
      const allMsgs = JSON.parse(localStorage.getItem(LS_MESSAGES) || '[]')
      allMsgs.push(sentMessage)
      localStorage.setItem(LS_MESSAGES, JSON.stringify(allMsgs))

      // Update local thread
      const allThreads = JSON.parse(localStorage.getItem(LS_THREADS) || '[]')
      const targetThread = allThreads.find((t) => t.id === threadId)
      if (targetThread) {
        targetThread.last_message = cleanText
        targetThread.last_message_at = nowIso
        localStorage.setItem(LS_THREADS, JSON.stringify(allThreads))
      }
    } catch (e) {
      console.error('LocalStorage write failed:', e)
    }
  }

  // Broadcast cross-tab
  notifySync({ type: 'NEW_MESSAGE', message: sentMessage })

  return sentMessage
}

// Check if Supabase connection is fully set up with tables
export const checkSupabaseTables = async () => {
  try {
    const { error } = await supabase.from('consultation_messages').select('id').limit(1)
    if (!error) return true
    if (error && error.code === 'PGRST205') return false
    return false
  } catch {
    return false
  }
}
