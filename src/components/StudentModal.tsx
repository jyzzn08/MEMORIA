import React, { useEffect, useState } from 'react';
import { Student, YearbookMessage } from '../types';
import { X, Heart, Sparkles, BookOpen, Quote, Trophy, Tag, MessageSquareHeart, User, Edit3 } from 'lucide-react';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onLeaveMessage: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  messages: YearbookMessage[];
}

export const StudentModal: React.FC<StudentModalProps> = ({
  student,
  isOpen,
  onClose,
  onLeaveMessage,
  onEditStudent,
  messages,
}) => {
  const [imageError, setImageError] = useState(false);

  // Reset image error state whenever selected student changes
  useEffect(() => {
    setImageError(false);
  }, [student?.id]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
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

  if (!isOpen || !student) return null;

  // Filter messages linked to this student (studentId === student.id)
  const studentMessages = messages.filter((m) => String(m.studentId) === String(student.id));

  return (
    <div
      id="student-profile-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
    >
      {/* Modal Container */}
      <div
        id="student-profile-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Close Button X */}
        <button
          id="btn-close-student-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-0">
          {/* Header Banner & Photo */}
          <div className="relative h-56 sm:h-64 bg-stone-900 overflow-hidden">
            {!imageError ? (
              <img
                src={student.photo}
                alt={student.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top opacity-90"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-400">
                <User className="w-16 h-16" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#FAF8F5] via-[#FAF8F5]/30 to-transparent" />

            {/* Badges on Banner */}
            <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
              {student.isCustom && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Profil Kamu ✨</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900 text-amber-200 shadow-sm">
                {student.class}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-stone-800 backdrop-blur-md shadow-2xs">
                Panggilan: "{student.nickname}"
              </span>
            </div>
          </div>

          {/* Main Info */}
          <div className="px-6 sm:px-8 pt-2 pb-6 space-y-6">
            <div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                {student.name}
              </h2>
              {student.socialHandle && (
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  {student.socialHandle}
                </p>
              )}
            </div>

            {/* Quote Card */}
            <div className="relative p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950">
              <Quote className="w-5 h-5 text-amber-500/80 mb-1" />
              <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                "{student.quote}"
              </p>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Tentang Siswa
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                {student.bio}
              </p>
            </div>

            {/* Hobbies and Extracurriculars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Hobi Utama</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {student.hobbies.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-50 text-amber-900 border border-amber-200/70"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2">
                  <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Ekstrakurikuler</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {student.extracurriculars.map((e) => (
                    <span
                      key={e}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200/70"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional details: Dream & Memory */}
            {(student.dreamCareer || student.favoriteMemory) && (
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                {student.dreamCareer && (
                  <div className="text-xs text-stone-600">
                    <strong className="text-stone-900">Cita-cita / Impian: </strong>
                    {student.dreamCareer}
                  </div>
                )}
                {student.favoriteMemory && (
                  <div className="text-xs text-stone-600">
                    <strong className="text-stone-900">Momen Paling Berkesan: </strong>
                    {student.favoriteMemory}
                  </div>
                )}
              </div>
            )}

            {/* Messages for this student */}
            <div className="pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <MessageSquareHeart className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Pesan Masuk ({studentMessages.length})
                  </h4>
                </div>
                <span className="text-[11px] text-stone-400">
                  Relasi studentId #{student.id}
                </span>
              </div>

              {studentMessages.length > 0 ? (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {studentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-stone-500">
                        <span className="font-semibold text-stone-900">
                          {msg.sender}
                        </span>
                        <span>
                          {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-stone-700 italic">"{msg.message}"</p>
                      {msg.signature && (
                        <div className="flex justify-end pt-1">
                          <img
                            src={msg.signature}
                            alt="Tanda tangan"
                            className="h-7 max-w-[120px] object-contain opacity-85"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-white/60 rounded-xl border border-stone-200/60 text-xs text-stone-500">
                  Belum ada pesan untuk {student.nickname}. Jadilah yang pertama meninggalkan pesan!
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                {student.isCustom && onEditStudent && (
                  <button
                    type="button"
                    id="btn-modal-edit-profile"
                    onClick={() => {
                      onClose();
                      onEditStudent(student);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                    <span>Edit Profil</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  id="btn-modal-cancel"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  id="btn-modal-leave-message"
                  onClick={() => {
                    onClose();
                    onLeaveMessage(student);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tinggalkan Pesan untuk {student.nickname}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
