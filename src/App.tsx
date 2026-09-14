import React, { useState, useEffect, useMemo } from 'react';
import { Student, YearbookMessage } from './types';
import { INITIAL_STUDENTS, INITIAL_MESSAGES } from './data/sampleData';

// Import Modular Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudentGallery } from './components/StudentGallery';
import { StudentModal } from './components/StudentModal';
import { MessageBoard } from './components/MessageBoard';
import { MessageForm } from './components/MessageForm';
import { About } from './components/About';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_KEY = 'memoria_messages';

export default function App() {
  // 1. STATE DATA UTAMA (Array of Objects)
  const [students] = useState<Student[]>(INITIAL_STUDENTS);

  // Inisialisasi pesan: ambil dari localStorage jika tersedia, atau gunakan sample messages
  const [messages, setMessages] = useState<YearbookMessage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Gagal membaca data dari localStorage:', error);
    }
    return INITIAL_MESSAGES;
  });

  // 2. STATE PENCARIAN & FILTERING
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHobby, setSelectedHobby] = useState('');
  const [selectedExtracurricular, setSelectedExtracurricular] = useState('');
  const [activeFilterType, setActiveFilterType] = useState<'all' | 'hobby' | 'extracurricular'>('all');

  // 3. STATE MODAL & DETAIL INTERAKTIF
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [messageTargetStudent, setMessageTargetStudent] = useState<Student | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // 4. EFEK PERSISTENSI KE LOCALSTORAGE
  // Setiap kali state messages bertambah atau berubah, simpan otomatis ke browser
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Gagal menyimpan pesan ke localStorage:', error);
    }
  }, [messages]);

  // 5. DERIVED STATE: FILTERING & SEARCHING PADA ARRAY STUDENTS
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Validasi search query terhadap nama, nama panggilan, hobi, ekstrakurikuler, atau kelas
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        student.name.toLowerCase().includes(query) ||
        student.nickname.toLowerCase().includes(query) ||
        student.class.toLowerCase().includes(query) ||
        student.hobbies.some((h) => h.toLowerCase().includes(query)) ||
        student.extracurriculars.some((e) => e.toLowerCase().includes(query));

      // Validasi filter hobi
      const matchesHobby =
        selectedHobby === '' || student.hobbies.includes(selectedHobby);

      // Validasi filter ekstrakurikuler
      const matchesEkskul =
        selectedExtracurricular === '' ||
        student.extracurriculars.includes(selectedExtracurricular);

      return matchesSearch && matchesHobby && matchesEkskul;
    });
  }, [students, searchTerm, selectedHobby, selectedExtracurricular]);

  // 6. DERIVED STATS: Statistik dinamis
  const totalDistinctExtracurriculars = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => s.extracurriculars.forEach((e) => set.add(e)));
    return set.size;
  }, [students]);

  // 7. HANDLER OPERASI
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedHobby('');
    setSelectedExtracurricular('');
    setActiveFilterType('all');
  };

  const handleOpenStudentProfile = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleOpenMessageModal = (targetStudent: Student | null = null) => {
    setMessageTargetStudent(targetStudent);
    setIsMessageModalOpen(true);
  };

  const handleAddMessage = (newMessageData: Omit<YearbookMessage, 'id' | 'createdAt'>) => {
    const newMessage: YearbookMessage = {
      ...newMessageData,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };

    // Update state tanpa reload halaman
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      {/* 1. Header & Navigation */}
      <Navbar onOpenMessageModal={() => handleOpenMessageModal(null)} />

      {/* 2. Hero Section dengan Statistik Dinamis */}
      <main className="flex-1">
        <Hero
          totalStudents={students.length}
          totalMessages={messages.length}
          totalExtracurriculars={totalDistinctExtracurriculars}
          onOpenMessageModal={() => handleOpenMessageModal(null)}
        />

        {/* 3. Yearbook / Student Gallery Bento Grid + Filter & Search */}
        <StudentGallery
          students={students}
          filteredStudents={filteredStudents}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedHobby={selectedHobby}
          onHobbySelect={setSelectedHobby}
          selectedExtracurricular={selectedExtracurricular}
          onExtracurricularSelect={setSelectedExtracurricular}
          activeFilterType={activeFilterType}
          onFilterTypeChange={setActiveFilterType}
          onResetFilters={handleResetFilters}
          onSelectStudent={handleOpenStudentProfile}
          onLeaveMessageForStudent={(s) => handleOpenMessageModal(s)}
        />

        {/* 4. Digital Message Board (Papan Pesan Kelulusan & Tanda Tangan) */}
        <MessageBoard
          messages={messages}
          students={students}
          onOpenMessageModal={() => handleOpenMessageModal(null)}
        />

        {/* 5. About Section & Konsep Teknologi Pembelajaran Informatika */}
        <About />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Modal Profil Siswa Lengkap */}
      <StudentModal
        student={selectedStudent}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onLeaveMessage={(s) => handleOpenMessageModal(s)}
        messages={messages}
      />

      {/* 8. Form Pesan dengan Native HTML5 Canvas Signature Pad */}
      <MessageForm
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        students={students}
        initialStudent={messageTargetStudent}
        onAddMessage={handleAddMessage}
      />
    </div>
  );
}

