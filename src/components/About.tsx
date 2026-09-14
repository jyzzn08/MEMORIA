import React from 'react';
import { LayoutGrid, PenTool, Database, HardDrive, Sparkles, BookOpen, Code2, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  const techCards = [
    {
      title: 'CSS Grid',
      subtitle: 'Untuk layout bento-grid dinamis',
      description:
        'Mengimplementasikan grid-template dinamis dengan variasi col-span dan row-span sehingga kartu siswa tampil bervariasi secara proporsional dan responsif di desktop maupun mobile.',
      icon: LayoutGrid,
      color: 'bg-blue-50 text-blue-700 border-blue-200/80',
    },
    {
      title: 'Canvas API',
      subtitle: 'Untuk membuat tanda tangan digital',
      description:
        'Memanfaatkan native HTML5 Canvas context 2D dengan event pointer/touch untuk menangkap goresan tinta digital secara realtime dan mengonversinya menjadi Data URL (toDataURL).',
      icon: PenTool,
      color: 'bg-amber-50 text-amber-800 border-amber-200/80',
    },
    {
      title: 'Array of Objects',
      subtitle: 'Untuk menyimpan data siswa dan pesan',
      description:
        'Struktur data JavaScript murni yang memodelkan relasi antara entitas Student dan Message melalui foreign key sederhana (studentId) tanpa ketergantungan database eksternal.',
      icon: Database,
      color: 'bg-purple-50 text-purple-700 border-purple-200/80',
    },
    {
      title: 'LocalStorage',
      subtitle: 'Untuk menyimpan pesan secara lokal',
      description:
        'Web Storage API yang menjaga persistensi data pesan dan tanda tangan pengguna di browser secara aman, sehingga pesan tetap utuh bahkan setelah halaman di-refresh.',
      icon: HardDrive,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
  ];

  return (
    <section id="tentang" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Overview Block */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/70 text-stone-800 text-xs font-semibold uppercase tracking-wider mb-4">
          <GraduationCap className="w-3.5 h-3.5 text-stone-600" />
          <span>Proyek Informatika Sekolah</span>
        </div>

        <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-5">
          Tentang MEMORIA
        </h2>

        <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal bg-white/60 p-6 rounded-2xl border border-stone-200 shadow-2xs">
          "Memoria adalah buku tahunan digital yang dibuat untuk menyimpan profil,
          cerita, tanda tangan, dan pesan kelulusan dalam satu ruang digital yang
          dapat terus diperbarui."
        </p>
      </div>

      {/* Konsep Teknologi Section */}
      <div className="mt-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            <Code2 className="w-4 h-4 text-amber-700" />
            <span>Arsitektur & Prinsip Pembelajaran</span>
          </div>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
            Konsep Teknologi
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto mt-1">
            Empat pilar utama pemrograman web modern yang diimplementasikan secara interaktif
            pada aplikasi ini.
          </p>
        </div>

        {/* 4 Tech Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                id={`tech-card-${index + 1}`}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${card.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-title text-lg font-bold text-stone-900 mb-1">
                    {card.title}
                  </h4>
                  <p className="text-xs font-semibold text-stone-500 mb-3">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Modul #{index + 1}</span>
                  <span className="text-emerald-700 font-semibold">✓ Teruji</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
