import React, { useState, useEffect, useMemo } from 'react';
import { Student, YearbookMessage } from './types';
import { INITIAL_STUDENTS, INITIAL_MESSAGES } from './data/sampleData';

// Import Modular Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudentGallery } from './components/StudentGallery';
import { StudentModal } from './components/StudentModal';
import { StudentFormModal } from './components/StudentFormModal';
import { MessageBoard } from './components/MessageBoard';
import { MessageForm } from './components/MessageForm';
import { About } from './components/About';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_KEY = 'memoria_messages';
const CUSTOM_STUDENTS_STORAGE_KEY = 'memoria_custom_students';

export default function App() {
  // 1. STATE DATA UTAMA (Array of Objects)
  const [students] = useState<Student[]>(INITIAL_STUDENTS);

  // Inisialisasi customStudents dari localStorage dengan key 'memoria_custom_students'
  const [customStudents, setCustomStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_STUDENTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Gagal membaca custom students dari localStorage:', error);
    }
    return [];
  });

  // Gabungkan dengan data utama melalui allStudents = [...students, ...customStudents]
  const allStudents = useMemo(() => {
    return [...students, ...customStudents];
  }, [students, customStudents]);

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

  // State Modal "Tambahkan Dirimu" & "Edit Profil"
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // 4. EFEK PERSISTENSI KE LOCALSTORAGE
  // Simpan customStudents ke localStorage setiap kali ada penambahan atau perubahan
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_STUDENTS_STORAGE_KEY, JSON.stringify(customStudents));
    } catch (error) {
      console.error('Gagal menyimpan custom students ke localStorage:', error);
    }
  }, [customStudents]);

  // Setiap kali state messages bertambah atau berubah, simpan otomatis ke browser
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Gagal menyimpan pesan ke localStorage:', error);
    }
  }, [messages]);

  // 5. DERIVED STATE: FILTERING & SEARCHING PADA ALL STUDENTS
  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
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
  }, [allStudents, searchTerm, selectedHobby, selectedExtracurricular]);

  // 6. DERIVED STATS: Statistik dinamis
  const totalDistinctExtracurriculars = useMemo(() => {
    const set = new Set<string>();
    allStudents.forEach((s) => s.extracurriculars.forEach((e) => set.add(e)));
    return set.size;
  }, [allStudents]);

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

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  };

  const handleSaveStudent = (
    studentData: Omit<Student, 'id' | 'isCustom'> & { id?: number | string }
  ) => {
    if (editingStudent) {
      // Perbarui profil yang sedang diedit
      const updatedStudent: Student = {
        ...editingStudent,
        ...studentData,
        id: editingStudent.id,
        isCustom: true,
      };

      setCustomStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? updatedStudent : s))
      );

      // Sinkronkan modal profil jika profil yang diedit sedang dibuka
      if (selectedStudent && selectedStudent.id === editingStudent.id) {
        setSelectedStudent(updatedStudent);
      }
    } else {
      // Buat profil baru dengan ID unik
      const uniqueId = `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newStudent: Student = {
        ...studentData,
        id: uniqueId,
        isCustom: true,
      };

      // Tambahkan ke customStudents (langsung muncul di bento grid tanpa reload)
      setCustomStudents((prev) => [newStudent, ...prev]);
    }

    setIsFormModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId: number | string) => {
    setCustomStudents((prev) => prev.filter((s) => s.id !== studentId));
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent(null);
      setIsProfileModalOpen(false);
    }
    setIsFormModalOpen(false);
    setEditingStudent(null);
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
      <Navbar
        onOpenMessageModal={() => handleOpenMessageModal(null)}
        onOpenAddStudentModal={handleOpenAddStudent}
      />

      {/* 2. Hero Section dengan Statistik Dinamis */}
      <main className="flex-1">
        <Hero
          totalStudents={allStudents.length}
          totalMessages={messages.length}
          totalExtracurriculars={totalDistinctExtracurriculars}
          onOpenMessageModal={() => handleOpenMessageModal(null)}
          onOpenAddStudentModal={handleOpenAddStudent}
        />

        {/* 3. Yearbook / Student Gallery Bento Grid + Filter & Search */}
        <StudentGallery
          students={allStudents}
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
          onEditStudent={handleOpenEditStudent}
          onOpenAddStudentModal={handleOpenAddStudent}
        />

        {/* 4. Digital Message Board (Papan Pesan Kelulusan & Tanda Tangan) */}
        <MessageBoard
          messages={messages}
          students={allStudents}
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
        onEditStudent={handleOpenEditStudent}
        messages={messages}
      />

      {/* 8. Modal Form "Tambahkan Dirimu" & "Edit Profil" */}
      <StudentFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingStudent(null);
        }}
        onSaveStudent={handleSaveStudent}
        onDeleteStudent={handleDeleteStudent}
        editingStudent={editingStudent}
      />

      {/* 9. Form Pesan dengan Native HTML5 Canvas Signature Pad */}
      <MessageForm
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        students={allStudents}
        initialStudent={messageTargetStudent}
        onAddMessage={handleAddMessage}
      />
    </div>
  );
}

