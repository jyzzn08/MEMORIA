import React, { useState, useEffect } from 'react';
import { Student, YearbookMessage } from '../types';
import { SignatureCanvas } from './SignatureCanvas';
import { X, Send, AlertCircle, CheckCircle2, HeartHandshake, User } from 'lucide-react';

interface MessageFormProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  initialStudent: Student | null;
  onAddMessage: (newMessage: Omit<YearbookMessage, 'id' | 'createdAt'>) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({
  isOpen,
  onClose,
  students,
  initialStudent,
  onAddMessage,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderRole, setSenderRole] = useState('Teman Sekelas');
  const [messageText, setMessageText] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    initialStudent ? initialStudent.id : null
  );
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  // Sync initialStudent when changed or modal opened
  useEffect(() => {
    if (initialStudent) {
      setSelectedStudentId(initialStudent.id);
    } else {
      setSelectedStudentId(null);
    }
  }, [initialStudent, isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation checks
    if (!senderName.trim()) {
      setErrorMessage('Nama pengirim wajib diisi.');
      return;
    }

    if (!messageText.trim()) {
      setErrorMessage('Isi pesan kelulusan wajib diisi.');
      return;
    }

    if (messageText.trim().length < 5) {
      setErrorMessage('Pesan terlalu pendek, ceritakan minimal satu kalimat berkesan.');
      return;
    }

    if (!signatureData) {
      setErrorMessage('Tanda tangan digital wajib dibuat di kotak canvas sebelum mengirim pesan.');
      return;
    }

    // Add message
    onAddMessage({
      sender: senderName.trim(),
      senderRole: senderRole || 'Teman',
      message: messageText.trim(),
      studentId: selectedStudentId,
      signature: signatureData,
    });

    setSuccessMessage(true);

    // Auto reset & close modal after 1.4s
    setTimeout(() => {
      setSuccessMessage(false);
      setSenderName('');
      setMessageText('');
      setSignatureData(null);
      setErrorMessage(null);
      onClose();
    }, 1400);
  };

  return (
    <div
      id="message-form-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
    >
      <div
        id="message-form-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-stone-200/90 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden"
      >
        {/* Close Button X */}
        <button
          id="btn-close-message-form"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup formulir"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Papan Pesan Kelulusan</span>
          </div>
          <h2 className="font-serif-title text-2xl font-bold text-stone-900">
            Tinggalkan Pesan Kenangan
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Goreskan kata-kata hangat dan tanda tangan digital untuk sahabatmu.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div
            id="message-success-alert"
            className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fadeIn"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs sm:text-sm font-medium">
              Pesan dan tanda tangan berhasil disimpan ke buku kenangan!
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div
            id="message-error-alert"
            className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2.5 text-xs font-medium"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Recipient Selection (Relational StudentId) */}
          <div>
            <label
              htmlFor="recipient-select"
              className="block text-xs font-semibold text-stone-700 mb-1"
            >
              Ditujukan Kepada
            </label>
            <select
              id="recipient-select"
              value={selectedStudentId === null ? '' : selectedStudentId}
              onChange={(e) =>
                setSelectedStudentId(
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40"
            >
              <option value=""> Seluruh Angkatan (Pesan Terbuka)</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.nickname} - {student.class})
                </option>
              ))}
            </select>
          </div>

          {/* Grid for Sender Name and Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="sender-name-input"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Nama Pengirim <span className="text-rose-500">*</span>
              </label>
              <input
                id="sender-name-input"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Contoh: Bima Arya"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40"
              />
            </div>

            <div>
              <label
                htmlFor="sender-role-input"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Hubungan / Status
              </label>
              <input
                id="sender-role-input"
                type="text"
                value={senderRole}
                onChange={(e) => setSenderRole(e.target.value)}
                placeholder="Contoh: Sahabat Karib / Teman Sebangku"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message-text-area"
              className="block text-xs font-semibold text-stone-700 mb-1"
            >
              Pesan Kenangan <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message-text-area"
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Tuliskan ucapan, kenangan lucu, atau doa perpisahan yang tak terlupakan..."
              className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40 resize-none"
            />
          </div>

          {/* Digital Signature Pad (Canvas API) */}
          <SignatureCanvas
            savedSignature={signatureData}
            onSaveSignature={setSignatureData}
          />

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              id="btn-cancel-message"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-submit-message"
              disabled={successMessage}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>Kirim Pesan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
