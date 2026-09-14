import React from 'react';
import { Student } from '../types';
import { StudentCard } from './StudentCard';
import { FilterBar } from './FilterBar';
import { Users, Frown, Sparkles, UserPlus } from 'lucide-react';

interface StudentGalleryProps {
  students: Student[];
  filteredStudents: Student[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedHobby: string;
  onHobbySelect: (hobby: string) => void;
  selectedExtracurricular: string;
  onExtracurricularSelect: (ekskul: string) => void;
  activeFilterType: 'all' | 'hobby' | 'extracurricular';
  onFilterTypeChange: (type: 'all' | 'hobby' | 'extracurricular') => void;
  onResetFilters: () => void;
  onSelectStudent: (student: Student) => void;
  onLeaveMessageForStudent: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  onOpenAddStudentModal?: () => void;
}

export const StudentGallery: React.FC<StudentGalleryProps> = ({
  students,
  filteredStudents,
  searchTerm,
  onSearchChange,
  selectedHobby,
  onHobbySelect,
  selectedExtracurricular,
  onExtracurricularSelect,
  activeFilterType,
  onFilterTypeChange,
  onResetFilters,
  onSelectStudent,
  onLeaveMessageForStudent,
  onEditStudent,
  onOpenAddStudentModal,
}) => {
  return (
    <section id="angkatan" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
            <Users className="w-3.5 h-3.5 text-stone-600" />
            <span>Direktori Siswa</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-3">
            Kenangan Satu Angkatan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Setiap wajah memiliki cerita, mimpi, dan jejak langkah yang mengukir sejarah
            kebersamaan kita selama tiga tahun penuh arti.
          </p>
        </div>

        {onOpenAddStudentModal && (
          <div className="shrink-0">
            <button
              id="btn-gallery-add-student"
              onClick={onOpenAddStudentModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 text-amber-200 hover:bg-stone-800 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>+ Tambahkan Dirimu</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedHobby={selectedHobby}
        onHobbySelect={onHobbySelect}
        selectedExtracurricular={selectedExtracurricular}
        onExtracurricularSelect={onExtracurricularSelect}
        activeFilterType={activeFilterType}
        onFilterTypeChange={onFilterTypeChange}
        onResetFilters={onResetFilters}
        totalFiltered={filteredStudents.length}
        totalStudents={students.length}
      />

      {/* Bento Grid Layout Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Bento Grid Angkatan:</span>
          <span className="hidden sm:inline-flex items-center gap-2 text-stone-400">
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold border border-stone-200">Featured 2×2</span>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold border border-stone-200">Wide 2×1</span>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold border border-stone-200">Tall 1×2</span>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold border border-stone-200">Normal 1×1</span>
          </span>
        </div>
        <p className="text-xs text-stone-500 font-medium">
          Menampilkan <strong className="text-stone-900">{filteredStudents.length}</strong> dari {students.length} siswa
        </p>
      </div>

      {/* Bento Grid Container */}
      {filteredStudents.length > 0 ? (
        <div
          id="student-bento-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense gap-5 sm:gap-6 auto-rows-auto sm:auto-rows-[minmax(280px,auto)] xl:auto-rows-[minmax(300px,auto)]"
        >
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onSelect={onSelectStudent}
              onLeaveMessage={onLeaveMessageForStudent}
              onEdit={onEditStudent}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="empty-student-state"
          className="text-center py-16 px-6 bg-white border border-dashed border-stone-300 rounded-3xl max-w-md mx-auto"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
            <Frown className="w-7 h-7" />
          </div>
          <h3 className="font-serif-title text-xl font-bold text-stone-900 mb-2">
            Tidak ada siswa ditemukan
          </h3>
          <p className="text-sm text-stone-500 mb-6">
            Pencarian untuk "{searchTerm || selectedHobby || selectedExtracurricular}" tidak cocok
            dengan data siswa manapun.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tampilkan Semua Siswa</span>
          </button>
        </div>
      )}
    </section>
  );
};
