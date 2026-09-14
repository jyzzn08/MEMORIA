import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  UserPlus,
  Sparkles,
  Camera,
  Heart,
  Briefcase,
  Layers,
  Trash2,
  Check,
  Plus,
} from 'lucide-react';
import { Student, BentoSpanType } from '../types';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveStudent: (
    studentData: Omit<Student, 'id' | 'isCustom'> & { id?: number | string }
  ) => void;
  onDeleteStudent?: (studentId: number | string) => void;
  editingStudent?: Student | null;
}

// Preset avatar foto siswa SMA untuk kemudahan memilih foto estetik jika tidak upload
const PRESET_AVATARS = [
  {
    label: 'Potret 1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  },
  {
    label: 'Potret 2',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
  },
  {
    label: 'Potret 3',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
  },
  {
    label: 'Potret 4',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    label: 'Potret 5',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
  },
  {
    label: 'Potret 6',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  },
];

const SUGGESTED_HOBBIES = [
  'Fotografi',
  'Basket',
  'Koding',
  'Musik',
  'Membaca',
  'Menulis',
  'Seni Lukis',
  'Desain Grafis',
  'Gaming',
  'Jalan Santai',
];

const SUGGESTED_EKSCUL = [
  'OSIS',
  'Robotik',
  'Paskibra',
  'PMR',
  'Teater',
  'Futsal',
  'Jurnalistik',
  'Paduan Suara',
  'KIR',
  'Pramuka',
];

const SUGGESTED_CLASSES = [
  'XII MIPA 1',
  'XII MIPA 2',
  'XII MIPA 3',
  'XII IPS 1',
  'XII IPS 2',
  'XII BAHASA',
];

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSaveStudent,
  onDeleteStudent,
  editingStudent,
}) => {
  // Form States
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [studentClass, setStudentClass] = useState('XII MIPA 1');
  const [bio, setBio] = useState('');
  const [quote, setQuote] = useState('');
  const [dreamCareer, setDreamCareer] = useState('');
  const [photo, setPhoto] = useState('');
  const [bentoSpan, setBentoSpan] = useState<BentoSpanType>('normal');

  // Multi-tags for Hobbies & Extracurriculars
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [hobbyInput, setHobbyInput] = useState('');

  const [extracurriculars, setExtracurriculars] = useState<string[]>([]);
  const [eksculInput, setEksculInput] = useState('');

  // Validation & Error Handling
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Populate when editingStudent changes or reset on open
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name || '');
      setNickname(editingStudent.nickname || '');
      setStudentClass(editingStudent.class || 'XII MIPA 1');
      setBio(editingStudent.bio || '');
      setQuote(editingStudent.quote || '');
      setDreamCareer(editingStudent.dreamCareer || '');
      setPhoto(editingStudent.photo || '');
      setBentoSpan(editingStudent.bentoSpan || 'normal');
      setHobbies(editingStudent.hobbies ? [...editingStudent.hobbies] : []);
      setExtracurriculars(
        editingStudent.extracurriculars ? [...editingStudent.extracurriculars] : []
      );
    } else {
      // Reset form
      setName('');
      setNickname('');
      setStudentClass('XII MIPA 1');
      setBio('');
      setQuote('');
      setDreamCareer('');
      setPhoto(PRESET_AVATARS[0].url);
      setBentoSpan('normal');
      setHobbies(['Fotografi', 'Musik']);
      setExtracurriculars(['OSIS']);
    }
    setErrors({});
  }, [editingStudent, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Add hobby
  const handleAddHobby = (hobbyToAdd: string) => {
    const trimmed = hobbyToAdd.trim();
    if (!trimmed) return;
    if (!hobbies.includes(trimmed)) {
      setHobbies((prev) => [...prev, trimmed]);
    }
    setHobbyInput('');
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    setHobbies((prev) => prev.filter((h) => h !== hobbyToRemove));
  };

  // Add extracurricular
  const handleAddEkscul = (eksculToAdd: string) => {
    const trimmed = eksculToAdd.trim();
    if (!trimmed) return;
    if (!extracurriculars.includes(trimmed)) {
      setExtracurriculars((prev) => [...prev, trimmed]);
    }
    setEksculInput('');
  };

  const handleRemoveEkscul = (eksculToRemove: string) => {
    setExtracurriculars((prev) => prev.filter((e) => e !== eksculToRemove));
  };

  // Handle image upload from computer/phone
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (< 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Ukuran foto maksimal 4MB.',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.photo;
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validasi nama dan kelas wajib diisi
    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    }

    if (!studentClass.trim()) {
      newErrors.studentClass = 'Kelas wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const finalNickname = nickname.trim()
      ? nickname.trim()
      : name.trim().split(' ')[0];

    const finalQuote = quote.trim()
      ? quote.trim()
      : 'Melangkah pasti menggapai masa depan dengan bekal kenangan indah.';

    const finalBio = bio.trim()
      ? bio.trim()
      : `Siswa aktif kelas ${studentClass} yang gemar ${
          hobbies.length > 0 ? hobbies.join(', ') : 'belajar dan berkarya'
        }.`;

    const finalPhoto =
      photo.trim() ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';

    onSaveStudent({
      name: name.trim(),
      nickname: finalNickname,
      class: studentClass.trim(),
      bio: finalBio,
      quote: finalQuote,
      dreamCareer: dreamCareer.trim() || undefined,
      hobbies: hobbies.length > 0 ? hobbies : ['Membaca', 'Musik'],
      extracurriculars:
        extracurriculars.length > 0 ? extracurriculars : ['OSIS'],
      photo: finalPhoto,
      bentoSpan: bentoSpan || 'normal',
    });

    setIsSubmitting(false);
  };

  return (
    <div
      id="student-form-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
    >
      <div
        id="student-form-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 bg-white/70 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>{editingStudent ? 'Edit Profil Siswa' : 'Tambahkan Dirimu'}</span>
            </div>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {editingStudent
                ? `Perbarui Data ${editingStudent.nickname}`
                : 'Abadikan Jejakmu di Angkatan XII'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {editingStudent
                ? 'Perubahan akan otomatis diperbarui di bento-grid dan disimpan ke memori browser.'
                : 'Profilmu akan langsung tampil di Bento Grid dan dapat dikirimi pesan oleh teman-teman.'}
            </p>
          </div>

          <button
            id="btn-close-student-form"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Tutup form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          <form id="add-edit-student-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Foto & Avatar Selection */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Foto Profil / Avatar
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Preview Circle */}
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-stone-200 shadow-xs bg-stone-100">
                    <img
                      src={
                        photo ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
                      }
                      alt="Pratinjau Foto"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 p-2 bg-stone-900 text-white rounded-xl shadow-md hover:bg-amber-600 transition-colors cursor-pointer"
                    title="Unggah Foto dari Perangkat"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Upload & Presets */}
                <div className="flex-1 w-full space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Foto Sendiri</span>
                    </button>
                    <span className="text-[11px] text-stone-400">
                      (PNG/JPG, maks 4MB)
                    </span>
                  </div>

                  {/* Preset quick selection */}
                  <div>
                    <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
                      Atau pilih potret siap pakai:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {PRESET_AVATARS.map((preset, index) => {
                        const isCurrent = photo === preset.url;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setPhoto(preset.url)}
                            className={`w-10 h-10 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              isCurrent
                                ? 'border-amber-500 scale-105 shadow-xs'
                                : 'border-stone-200 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nama Lengkap, Nama Panggilan & Kelas */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6">
                <label
                  htmlFor="input-student-name"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-student-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => {
                        const upd = { ...prev };
                        delete upd.name;
                        return upd;
                      });
                    }
                  }}
                  placeholder="Contoh: Raden Bima Arya Perkasa"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40 ${
                    errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="input-student-nickname"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Nama Panggilan
                </label>
                <input
                  id="input-student-nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Contoh: Bima"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="input-student-class"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Kelas <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="input-student-class"
                    type="text"
                    list="class-suggestions"
                    value={studentClass}
                    onChange={(e) => {
                      setStudentClass(e.target.value);
                      if (errors.studentClass) {
                        setErrors((prev) => {
                          const upd = { ...prev };
                          delete upd.studentClass;
                          return upd;
                        });
                      }
                    }}
                    placeholder="Contoh: XII MIPA 1"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40 ${
                      errors.studentClass
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-stone-300'
                    }`}
                  />
                  <datalist id="class-suggestions">
                    {SUGGESTED_CLASSES.map((cls) => (
                      <option key={cls} value={cls} />
                    ))}
                  </datalist>
                </div>
                {errors.studentClass && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">
                    {errors.studentClass}
                  </p>
                )}
              </div>
            </div>

            {/* Bio & Cita-cita */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="input-student-bio"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Bio Singkat
                </label>
                <textarea
                  id="input-student-bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ceritakan sedikit tentang dirimu, karaktermu, atau hal yang paling berkesan..."
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40 resize-none"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="input-student-quote"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    Kutipan / Motto Hidup
                  </label>
                  <textarea
                    id="input-student-quote"
                    rows={2}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Contoh: Terus melangkah walau perlahan, jangan pernah berhenti bermimpi."
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40 resize-none font-serif italic"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-student-career"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    Cita-cita / Impian
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-student-career"
                      type="text"
                      value={dreamCareer}
                      onChange={(e) => setDreamCareer(e.target.value)}
                      placeholder="Contoh: Software Engineer, Dokter, Arsitek..."
                      className="w-full pl-9 pr-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hobi Tags Input */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Hobi & Minat
                </label>
                <span className="text-[11px] text-stone-400">
                  {hobbies.length} hobi dipilih
                </span>
              </div>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 min-h-[34px] p-2 rounded-xl bg-stone-50 border border-stone-200">
                {hobbies.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200/80"
                  >
                    <span>{h}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHobby(h)}
                      className="text-amber-700 hover:text-amber-950 p-0.5 rounded cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {hobbies.length === 0 && (
                  <span className="text-xs text-stone-400 italic py-1">
                    Belum ada hobi. Tambahkan dari saran di bawah atau ketik sendiri.
                  </span>
                )}
              </div>

              {/* Add Custom Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddHobby(hobbyInput);
                    }
                  }}
                  placeholder="Ketik hobi baru lalu tekan Enter..."
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-400/40"
                />
                <button
                  type="button"
                  onClick={() => handleAddHobby(hobbyInput)}
                  className="px-3.5 py-2 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions */}
              <div>
                <span className="text-[11px] text-stone-500 font-medium block mb-1.5">
                  Saran Hobi Populer:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_HOBBIES.map((item) => {
                    const isSelected = hobbies.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          isSelected
                            ? handleRemoveHobby(item)
                            : handleAddHobby(item)
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-700 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ekstrakurikuler Tags Input */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Ekstrakurikuler & Organisasi
                </label>
                <span className="text-[11px] text-stone-400">
                  {extracurriculars.length} ekskul dipilih
                </span>
              </div>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 min-h-[34px] p-2 rounded-xl bg-stone-50 border border-stone-200">
                {extracurriculars.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 text-xs font-semibold border border-indigo-200/80"
                  >
                    <span>{e}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEkscul(e)}
                      className="text-indigo-700 hover:text-indigo-950 p-0.5 rounded cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {extracurriculars.length === 0 && (
                  <span className="text-xs text-stone-400 italic py-1">
                    Belum ada ekskul. Tambahkan dari saran di bawah atau ketik sendiri.
                  </span>
                )}
              </div>

              {/* Add Custom Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={eksculInput}
                  onChange={(e) => setEksculInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEkscul(eksculInput);
                    }
                  }}
                  placeholder="Ketik ekstrakurikuler baru lalu tekan Enter..."
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-400/40"
                />
                <button
                  type="button"
                  onClick={() => handleAddEkscul(eksculInput)}
                  className="px-3.5 py-2 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions */}
              <div>
                <span className="text-[11px] text-stone-500 font-medium block mb-1.5">
                  Saran Ekstrakurikuler:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_EKSCUL.map((item) => {
                    const isSelected = extracurriculars.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          isSelected
                            ? handleRemoveEkscul(item)
                            : handleAddEkscul(item)
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-700 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bento Grid Style Selection */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Gaya Tampilan Kartu di Bento-Grid
                </label>
                <span className="text-[11px] text-stone-400">
                  Pilih ukuran ubin favoritmu
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    type: 'normal' as BentoSpanType,
                    label: 'Standar (1×1)',
                    desc: 'Ubin ringkas & rapi',
                  },
                  {
                    type: 'tall' as BentoSpanType,
                    label: 'Tinggi (1×2)',
                    desc: 'Fokus foto vertikal',
                  },
                  {
                    type: 'wide' as BentoSpanType,
                    label: 'Lebar (2×1)',
                    desc: 'Horisontal lapang',
                  },
                  {
                    type: 'featured' as BentoSpanType,
                    label: 'Unggulan (2×2)',
                    desc: 'Sorotan besar gelap',
                  },
                ].map((option) => {
                  const isSelected = bentoSpan === option.type;
                  return (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() => setBentoSpan(option.type)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          {option.label}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-amber-700" />
                        )}
                      </div>
                      <p className="text-[10px] text-stone-500">{option.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200/80 bg-white/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            {editingStudent && onDeleteStudent && (
              <button
                type="button"
                id="btn-delete-student"
                onClick={() => {
                  if (
                    window.confirm(
                      `Hapus profil "${editingStudent.name}" dari buku kenangan? Tindakan ini tidak dapat dibatalkan.`
                    )
                  ) {
                    onDeleteStudent(editingStudent.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Profil</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              id="btn-cancel-student-form"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-edit-student-form"
              id="btn-submit-student"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {editingStudent ? (
                <>
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Simpan Perubahan</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-amber-300" />
                  <span>Tambahkan Profil Saya</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
