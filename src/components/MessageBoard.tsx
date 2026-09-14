import React, { useState, useMemo } from 'react';
import { YearbookMessage, Student } from '../types';
import { MessageCard } from './MessageCard';
import { MessageSquareText, PenLine, Filter, Sparkles, Heart } from 'lucide-react';

interface MessageBoardProps {
  messages: YearbookMessage[];
  students: Student[];
  onOpenMessageModal: () => void;
}

export const MessageBoard: React.FC<MessageBoardProps> = ({
  messages,
  students,
  onOpenMessageModal,
}) => {
  const [filterRecipient, setFilterRecipient] = useState<string>('all');

  // Map students by ID for quick O(1) lookup
  const studentMap = useMemo(() => {
    const map = new Map<number, Student>();
    students.forEach((s) => map.set(s.id, s));
    return map;
  }, [students]);

  // Filter messages based on dropdown
  const filteredMessages = useMemo(() => {
    if (filterRecipient === 'all') return messages;
    if (filterRecipient === 'general') return messages.filter((m) => m.studentId === null);
    const targetId = Number(filterRecipient);
    return messages.filter((m) => m.studentId === targetId);
  }, [messages, filterRecipient]);

  return (
    <section id="pesan" className="py-16 md:py-24 bg-stone-100/60 border-y border-stone-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-3">
              <MessageSquareText className="w-3.5 h-3.5 text-amber-800" />
              <span>Papan Pesan Kelulusan</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Pesan yang Akan Selalu Diingat
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
              Kumpulan ungkapan hati, doa, serta tanda tangan abadi dari teman sekelas,
              guru, dan sahabat yang mewarnai masa sekolah kita.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-board-leave-message"
              onClick={onOpenMessageModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 text-amber-200 hover:bg-stone-800 text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <PenLine className="w-4 h-4 text-amber-300" />
              <span>Tulis Pesan Baru</span>
            </button>
          </div>
        </div>

        {/* Filter Bar for Messages */}
        <div className="bg-white border border-stone-200 rounded-2xl p-3.5 sm:p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
            <Filter className="w-4 h-4 text-stone-400" />
            <span>Filter Pesan Berdasarkan Penerima:</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              id="select-message-filter"
              value={filterRecipient}
              onChange={(e) => setFilterRecipient(e.target.value)}
              className="px-3.5 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400/40 cursor-pointer"
            >
              <option value="all">Semua Pesan ({messages.length})</option>
              <option value="general">Pesan Terbuka Seluruh Angkatan</option>
              <optgroup label="Pesan Khusus Siswa">
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    Pesan untuk: {s.name} ({s.nickname})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Messages Grid */}
        {filteredMessages.length > 0 ? (
          <div
            id="messages-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredMessages.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                recipientStudent={
                  msg.studentId ? studentMap.get(msg.studentId) : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-white border border-dashed border-stone-300 rounded-3xl max-w-md mx-auto">
            <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm text-stone-600 font-medium">
              Belum ada pesan pada kategori ini.
            </p>
            <p className="text-xs text-stone-400 mt-1 mb-4">
              Jadilah orang pertama yang menuliskan pesan manis ini!
            </p>
            <button
              onClick={onOpenMessageModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5 text-amber-300" />
              <span>Tulis Pesan Sekarang</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
