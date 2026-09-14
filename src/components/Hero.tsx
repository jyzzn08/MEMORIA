import React from 'react';
import { ArrowDown, Users, MessageSquareText, Trophy, Sparkles, HeartHandshake } from 'lucide-react';

interface HeroProps {
  totalStudents: number;
  totalMessages: number;
  totalExtracurriculars: number;
  onOpenMessageModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalStudents,
  totalMessages,
  totalExtracurriculars,
  onOpenMessageModal,
}) => {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >
      {/* Subtle warm background glow/gradients (anti-slop, subtle & warm) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-36 right-10 w-72 h-72 bg-rose-100/30 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-100 text-xs font-medium tracking-wide shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Angkatan 2026 — Buku Kenangan Digital</span>
          </div>

          {/* Main Titles */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 leading-[1.08] mb-4">
            <span className="font-serif-title block text-stone-900 tracking-wide">
              MEMORIA
            </span>
            <span className="text-2xl sm:text-4xl md:text-5xl font-light text-stone-600 block mt-1">
              Digital Yearbook
            </span>
          </h1>

          {/* Subheadline requested */}
          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto mb-9">
            Tempat menyimpan cerita, tawa, dan kenangan yang tidak ingin dilupakan.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
            <a
              href="#angkatan"
              id="hero-btn-explore"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium rounded-xl bg-stone-900 text-stone-50 hover:bg-stone-800 transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <span>Lihat Angkatan</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <button
              id="hero-btn-leave-message"
              onClick={onOpenMessageModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-xl bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300/80 transition-all shadow-2xs active:scale-98 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-amber-800" />
              <span>Tinggalkan Pesan</span>
            </button>
          </div>

          {/* Dynamic Statistics Bar (Calculated dynamically, not hardcoded) */}
          <div
            id="hero-stats"
            className="grid grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-3 bg-white/80 backdrop-blur-sm border border-stone-200/90 rounded-2xl shadow-xs max-w-xl mx-auto"
          >
            <div className="py-3 px-2 sm:px-4 text-center rounded-xl bg-stone-50/70 border border-stone-100">
              <div className="flex items-center justify-center gap-1.5 text-stone-500 mb-1">
                <Users className="w-4 h-4 text-stone-600" />
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Siswa
                </span>
              </div>
              <div className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
                {totalStudents}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Tercatat</div>
            </div>

            <div className="py-3 px-2 sm:px-4 text-center rounded-xl bg-stone-50/70 border border-stone-100">
              <div className="flex items-center justify-center gap-1.5 text-stone-500 mb-1">
                <MessageSquareText className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Pesan
                </span>
              </div>
              <div className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
                {totalMessages}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Kenangan</div>
            </div>

            <div className="py-3 px-2 sm:px-4 text-center rounded-xl bg-stone-50/70 border border-stone-100">
              <div className="flex items-center justify-center gap-1.5 text-stone-500 mb-1">
                <Trophy className="w-4 h-4 text-indigo-700" />
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Ekskul
                </span>
              </div>
              <div className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
                {totalExtracurriculars}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Organisasi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
