import React, { useState } from 'react';
import { Student } from '../types';
import { Eye, Heart, Sparkles, User, GraduationCap, Quote, Edit3 } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onSelect: (student: Student) => void;
  onLeaveMessage: (student: Student) => void;
  onEdit?: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onSelect,
  onLeaveMessage,
  onEdit,
}) => {
  const [imageError, setImageError] = useState(false);

  // Normalisasi span ke 4 variasi bento: normal, wide, tall, featured
  const variant: 'normal' | 'wide' | 'tall' | 'featured' = (() => {
    if (student.bentoSpan === 'featured' || student.bentoSpan === 'large') return 'featured';
    if (student.bentoSpan === 'wide' || student.bentoSpan === 'landscape') return 'wide';
    if (student.bentoSpan === 'tall' || student.bentoSpan === 'portrait') return 'tall';
    return 'normal';
  })();

  // CSS Grid Spans untuk responsivitas optimal:
  // Mobile (< 640px): 1 kolom reguler (mencegah overflow/distorsi)
  // Tablet (sm: & md:): 2 kolom dengan variasi span
  // Desktop (xl:): 4 kolom interlocking dengan [grid-auto-flow:dense]
  const getGridSpanClasses = () => {
    switch (variant) {
      case 'featured':
        return 'col-span-1 sm:col-span-2 sm:row-span-2';
      case 'wide':
        return 'col-span-1 sm:col-span-2 row-span-1';
      case 'tall':
        return 'col-span-1 sm:col-span-1 sm:row-span-2';
      case 'normal':
      default:
        return 'col-span-1 row-span-1';
    }
  };

  // -------------------------------------------------------------
  // 1. FEATURED CARD (2x2): Layout Editorial Pusat Kenangan
  // -------------------------------------------------------------
  if (variant === 'featured') {
    return (
      <div
        id={`student-card-${student.id}`}
        onClick={() => onSelect(student)}
        className={`group relative bg-stone-900 rounded-3xl border border-stone-800/80 shadow-md hover:shadow-2xl hover:border-amber-400/40 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full cursor-pointer ${getGridSpanClasses()}`}
      >
        {/* Full visual background with gradient overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {!imageError ? (
            <img
              src={student.photo}
              alt={student.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top opacity-55 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-stone-900 to-stone-800 flex items-center justify-center text-stone-600">
              <User className="w-20 h-20 opacity-30" />
            </div>
          )}
          {/* Subtle editorial vignette & scrim */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/70 to-stone-950/30" />
          <div className="absolute inset-0 bg-radial from-transparent via-stone-950/20 to-stone-950/80" />
        </div>

        {/* Top Header: Featured Ribbon & Tags */}
        <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {student.isCustom ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-sm tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Profil Kamu ✨</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-sm tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Profil Pilihan</span>
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20">
              {student.class}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
            "{student.nickname}"
          </span>
        </div>

        {/* Bottom Content: Headline, Quote, Bio, and Action controls */}
        <div className="relative z-10 p-5 sm:p-7 pt-12 flex flex-col justify-end">
          <div className="mb-4">
            <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2 drop-shadow-sm group-hover:text-amber-100 transition-colors">
              {student.name}
            </h3>

            {student.dreamCareer && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-300/95 mb-3">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Cita-cita: {student.dreamCareer}</span>
              </div>
            )}

            <div className="relative pl-4 border-l-2 border-amber-400/70 my-3">
              <p className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed line-clamp-3">
                "{student.quote}"
              </p>
            </div>

            {/* Tags preview */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
              {student.hobbies.map((h) => (
                <span
                  key={h}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/10 text-stone-200 border border-white/10 backdrop-blur-xs"
                >
                  {h}
                </span>
              ))}
              {student.extracurriculars.map((e) => (
                <span
                  key={e}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-amber-400/15 text-amber-200 border border-amber-400/20 backdrop-blur-xs"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-white/15 flex items-center gap-3">
            <button
              id={`btn-view-profile-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(student);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-stone-950 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer active:scale-98"
            >
              <Eye className="w-4 h-4" />
              <span>Buka Profil Lengkap</span>
            </button>
            <button
              id={`btn-quick-message-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onLeaveMessage(student);
              }}
              title={`Tinggalkan pesan kenangan untuk ${student.nickname}`}
              className="p-2.5 rounded-xl text-amber-300 bg-white/10 hover:bg-amber-400 hover:text-stone-950 border border-white/20 transition-all cursor-pointer active:scale-95"
              aria-label={`Kirim pesan untuk ${student.nickname}`}
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. WIDE CARD (2x1): Format Horizontal Split yang Elegan
  // -------------------------------------------------------------
  if (variant === 'wide') {
    return (
      <div
        id={`student-card-${student.id}`}
        onClick={() => onSelect(student)}
        className={`group relative bg-white rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300/80 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-full cursor-pointer ${getGridSpanClasses()}`}
      >
        {/* Left Side: Photo with Badge Overlay */}
        <div className="relative sm:w-5/12 h-48 sm:h-auto shrink-0 overflow-hidden bg-stone-100">
          {!imageError ? (
            <img
              src={student.photo}
              alt={student.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600 ease-out"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-stone-200 to-stone-300 flex items-center justify-center text-stone-500">
              <User className="w-12 h-12 opacity-50" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent sm:bg-linear-to-r sm:from-transparent sm:to-stone-950/20" />

          {/* Floating Badges on Photo */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
            {student.isCustom ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 shadow-2xs backdrop-blur-sm">
                Profil Kamu ✨
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-stone-900 shadow-2xs backdrop-blur-sm">
                {student.class}
              </span>
            )}
            {student.isCustom && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-stone-900 shadow-2xs backdrop-blur-sm">
                {student.class}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 pointer-events-none sm:hidden">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-900/80 text-amber-200 backdrop-blur-sm">
              "{student.nickname}"
            </span>
          </div>
        </div>

        {/* Right Side: Editorial Information & Actions */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100/70 text-amber-900 border border-amber-200/60">
                "{student.nickname}"
              </span>
              {student.dreamCareer && (
                <span className="text-[11px] font-medium text-stone-500 line-clamp-1">
                  🎯 {student.dreamCareer}
                </span>
              )}
            </div>

            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug group-hover:text-amber-800 transition-colors">
              {student.name}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-stone-600 italic font-serif line-clamp-2 leading-relaxed">
              "{student.quote}"
            </p>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {student.hobbies.slice(0, 2).map((h) => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200/70"
                >
                  {h}
                </span>
              ))}
              {student.extracurriculars.slice(0, 2).map((e) => (
                <span
                  key={e}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/60"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 mt-3 border-t border-stone-100 flex items-center gap-2">
            <button
              id={`btn-view-profile-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(student);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-2xs active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail Profil</span>
            </button>
            {student.isCustom && onEdit && (
              <button
                id={`btn-edit-profile-${student.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(student);
                }}
                title={`Edit profil ${student.nickname}`}
                className="p-2 rounded-xl text-stone-950 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 transition-colors active:scale-95 cursor-pointer flex items-center gap-1"
                aria-label={`Edit profil ${student.nickname}`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs font-semibold">Edit</span>
              </button>
            )}
            <button
              id={`btn-quick-message-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onLeaveMessage(student);
              }}
              title={`Kirim pesan untuk ${student.nickname}`}
              className="p-2 rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors active:scale-95 cursor-pointer"
              aria-label={`Kirim pesan untuk ${student.nickname}`}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. TALL CARD (1x2): Format Portrait Magazine Cover
  // -------------------------------------------------------------
  if (variant === 'tall') {
    return (
      <div
        id={`student-card-${student.id}`}
        onClick={() => onSelect(student)}
        className={`group relative bg-white rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300/80 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full cursor-pointer ${getGridSpanClasses()}`}
      >
        {/* Tall Photo Section */}
        <div className="relative w-full h-64 sm:h-72 shrink-0 overflow-hidden bg-stone-100">
          {!imageError ? (
            <img
              src={student.photo}
              alt={student.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600 ease-out"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-stone-200 to-stone-300 flex items-center justify-center text-stone-500">
              <User className="w-12 h-12 opacity-50" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5">
              {student.isCustom && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 shadow-2xs backdrop-blur-sm">
                  Profil Kamu ✨
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-stone-900 shadow-2xs backdrop-blur-sm">
                {student.class}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-900/85 text-amber-200 border border-white/20 backdrop-blur-sm">
              "{student.nickname}"
            </span>
          </div>

          {/* Bottom Floating Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold tracking-tight drop-shadow-xs">
              {student.name}
            </h3>
            {student.dreamCareer && (
              <p className="text-xs text-amber-200/90 font-light flex items-center gap-1 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="line-clamp-1">{student.dreamCareer}</span>
              </p>
            )}
          </div>
        </div>

        {/* Lower Body Content */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div className="relative mb-3 bg-amber-50/50 p-3 rounded-2xl border border-amber-100/80">
              <Quote className="w-4 h-4 text-amber-500 mb-1 opacity-70" />
              <p className="text-xs sm:text-sm text-stone-700 italic font-serif leading-relaxed line-clamp-3">
                "{student.quote}"
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {student.hobbies.map((h) => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/60"
                >
                  {h}
                </span>
              ))}
              {student.extracurriculars.map((e) => (
                <span
                  key={e}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200/60"
                >
                  {e}
                </span>
              ))}
            </div>

            {student.favoriteMemory && (
              <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed pt-1">
                <strong className="text-stone-700 font-semibold">Momen: </strong>
                {student.favoriteMemory}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3.5 border-t border-stone-100 flex items-center gap-2 mt-3">
            <button
              id={`btn-view-profile-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(student);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-2xs active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Profil</span>
            </button>
            {student.isCustom && onEdit && (
              <button
                id={`btn-edit-profile-${student.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(student);
                }}
                title={`Edit profil ${student.nickname}`}
                className="p-2 rounded-xl text-stone-950 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 transition-colors active:scale-95 cursor-pointer flex items-center gap-1"
                aria-label={`Edit profil ${student.nickname}`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs font-semibold">Edit</span>
              </button>
            )}
            <button
              id={`btn-quick-message-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onLeaveMessage(student);
              }}
              title={`Kirim pesan untuk ${student.nickname}`}
              className="p-2 rounded-xl text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 transition-colors active:scale-95 cursor-pointer"
              aria-label={`Kirim pesan untuk ${student.nickname}`}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. NORMAL CARD (1x1): Ubin Bento Standar Kompak & Bersih
  // -------------------------------------------------------------
  return (
    <div
      id={`student-card-${student.id}`}
      onClick={() => onSelect(student)}
      className={`group relative bg-white rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300/80 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full cursor-pointer ${getGridSpanClasses()}`}
    >
      {/* Top Banner & Photo */}
      <div className="relative w-full h-44 shrink-0 overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={student.photo}
            alt={student.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-stone-200 to-stone-300 flex items-center justify-center text-stone-500">
            <User className="w-10 h-10 opacity-50" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-stone-950/75 via-stone-950/15 to-transparent" />

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            {student.isCustom && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 shadow-2xs backdrop-blur-sm">
                Profil Kamu ✨
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-stone-900 shadow-2xs backdrop-blur-sm">
              {student.class}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-900/80 text-amber-200 border border-white/20 backdrop-blur-sm">
            "{student.nickname}"
          </span>
        </div>

        {/* Floating Name */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
          <h3 className="font-serif-title text-lg font-bold tracking-tight truncate drop-shadow-xs">
            {student.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <p className="text-xs text-stone-600 italic font-serif line-clamp-2 leading-relaxed mb-3">
            "{student.quote}"
          </p>

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {student.hobbies.slice(0, 1).map((h) => (
              <span
                key={h}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/60"
              >
                {h}
              </span>
            ))}
            {student.extracurriculars.slice(0, 1).map((e) => (
              <span
                key={e}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-700 border border-stone-200/60"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            id={`btn-view-profile-${student.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(student);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-2xs active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Profil</span>
          </button>
          {student.isCustom && onEdit && (
            <button
              id={`btn-edit-profile-${student.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(student);
              }}
              title={`Edit profil ${student.nickname}`}
              className="p-2 rounded-xl text-stone-950 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 transition-colors active:scale-95 cursor-pointer flex items-center gap-1"
              aria-label={`Edit profil ${student.nickname}`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs font-semibold">Edit</span>
            </button>
          )}
          <button
            id={`btn-quick-message-${student.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onLeaveMessage(student);
            }}
            title={`Kirim pesan untuk ${student.nickname}`}
            className="p-2 rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors active:scale-95 cursor-pointer"
            aria-label={`Kirim pesan untuk ${student.nickname}`}
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
