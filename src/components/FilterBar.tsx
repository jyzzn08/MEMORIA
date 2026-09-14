import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ALL_HOBBIES, ALL_EXTRACURRICULARS } from '../data/sampleData';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedHobby: string;
  onHobbySelect: (hobby: string) => void;
  selectedExtracurricular: string;
  onExtracurricularSelect: (ekskul: string) => void;
  activeFilterType: 'all' | 'hobby' | 'extracurricular';
  onFilterTypeChange: (type: 'all' | 'hobby' | 'extracurricular') => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalStudents: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedHobby,
  onHobbySelect,
  selectedExtracurricular,
  onExtracurricularSelect,
  activeFilterType,
  onFilterTypeChange,
  onResetFilters,
  totalFiltered,
  totalStudents,
}) => {
  const isFiltering =
    searchTerm.trim() !== '' ||
    selectedHobby !== '' ||
    selectedExtracurricular !== '' ||
    activeFilterType !== 'all';

  return (
    <div className="w-full bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs mb-8">
      {/* Top row: Search input & quick stats */}
      <div className="flex flex-col md:flex-row md:items-center gap-3.5 justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama teman, panggilan, hobi, atau ekskul..."
            className="w-full pl-10 pr-9 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 placeholder-stone-400 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400/40 focus:border-stone-400 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Type Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/60 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            id="filter-tab-all"
            onClick={() => {
              onFilterTypeChange('all');
              onHobbySelect('');
              onExtracurricularSelect('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilterType === 'all' && selectedHobby === '' && selectedExtracurricular === ''
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Semua
          </button>
          <button
            id="filter-tab-hobby"
            onClick={() => onFilterTypeChange('hobby')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilterType === 'hobby'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Hobi
          </button>
          <button
            id="filter-tab-ekskul"
            onClick={() => onFilterTypeChange('extracurricular')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilterType === 'extracurricular'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Ekstrakurikuler
          </button>
        </div>
      </div>

      {/* Secondary Row: Specific filter pills based on mode */}
      {activeFilterType === 'hobby' && (
        <div className="mt-4 pt-3.5 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Pilih Hobi:
            </span>
            {selectedHobby && (
              <span className="text-xs text-amber-800 font-medium">
                (Aktif: {selectedHobby})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onHobbySelect('')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                selectedHobby === ''
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Semua Hobi
            </button>
            {ALL_HOBBIES.map((hobby) => {
              const isSelected = selectedHobby === hobby;
              return (
                <button
                  key={hobby}
                  onClick={() => onHobbySelect(isSelected ? '' : hobby)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-800 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                  }`}
                >
                  {hobby}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeFilterType === 'extracurricular' && (
        <div className="mt-4 pt-3.5 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Pilih Ekstrakurikuler:
            </span>
            {selectedExtracurricular && (
              <span className="text-xs text-indigo-800 font-medium">
                (Aktif: {selectedExtracurricular})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onExtracurricularSelect('')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                selectedExtracurricular === ''
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Semua Ekskul
            </button>
            {ALL_EXTRACURRICULARS.map((ekskul) => {
              const isSelected = selectedExtracurricular === ekskul;
              return (
                <button
                  key={ekskul}
                  onClick={() => onExtracurricularSelect(isSelected ? '' : ekskul)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-900 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                  }`}
                >
                  {ekskul}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Info footer row: active filters count & reset button */}
      <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>
            Menampilkan <strong className="text-stone-800 font-semibold">{totalFiltered}</strong> dari{' '}
            {totalStudents} siswa
          </span>
        </div>

        {isFiltering && (
          <button
            id="btn-reset-filters"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 underline decoration-rose-300 hover:decoration-rose-600 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>
    </div>
  );
};
