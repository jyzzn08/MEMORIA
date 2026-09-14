import React from 'react';
import { BookHeart, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-amber-300 flex items-center justify-center">
              <BookHeart className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif-title text-lg font-bold text-stone-100 tracking-wide">
                MEMORIA — Digital Yearbook
              </div>
              <p className="text-xs text-stone-400 font-serif italic flex items-center gap-1">
                <span>"Made with memories."</span>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
              </p>
            </div>
          </div>

          {/* Quick nav & dynamic year */}
          <div className="flex items-center gap-6 text-xs text-stone-400">
            <span>&copy; {currentYear} Angkatan XII. All memories preserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Kembali ke atas"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
