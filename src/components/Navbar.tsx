import React, { useState, useEffect } from 'react';
import { BookHeart, Menu, X, PenLine, Sparkles, UserPlus } from 'lucide-react';

interface NavbarProps {
  onOpenMessageModal: () => void;
  onOpenAddStudentModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMessageModal, onOpenAddStudentModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Angkatan', href: '#angkatan' },
    { label: 'Pesan Kenangan', href: '#pesan' },
    { label: 'Tentang', href: '#tentang' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs border-b border-stone-200/70 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            id="nav-logo"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <BookHeart className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-title font-bold text-xl tracking-wider text-stone-900">
                  MEMORIA
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-200 text-stone-700 tracking-wide">
                  XII
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                Digital Yearbook
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-stone-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-stone-900 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenAddStudentModal && (
              <button
                id="nav-btn-add-student"
                onClick={onOpenAddStudentModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-900 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-stone-950" />
                <span>+ Tambahkan Dirimu</span>
              </button>
            )}
            <button
              id="nav-btn-message"
              onClick={onOpenMessageModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300/80 rounded-xl shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <PenLine className="w-4 h-4 text-stone-700" />
              <span>Tinggalkan Pesan</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenAddStudentModal && (
              <button
                id="nav-btn-add-student-mobile-icon"
                onClick={onOpenAddStudentModal}
                className="p-2 text-stone-950 bg-amber-300 border border-amber-400/80 rounded-lg active:scale-95"
                title="Tambahkan Dirimu"
                aria-label="Tambahkan Dirimu"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            )}
            <button
              id="nav-btn-message-mobile-icon"
              onClick={onOpenMessageModal}
              className="p-2 text-stone-800 bg-amber-100 border border-amber-300/80 rounded-lg active:scale-95"
              aria-label="Tinggalkan Pesan"
            >
              <PenLine className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/70 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-5 pt-3 pb-6 shadow-lg space-y-3"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 space-y-2">
            {onOpenAddStudentModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddStudentModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-stone-950 bg-amber-300 hover:bg-amber-400 rounded-xl shadow-xs transition-all active:scale-98"
              >
                <UserPlus className="w-4 h-4 text-stone-950" />
                <span>+ Tambahkan Dirimu</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMessageModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <PenLine className="w-4 h-4 text-stone-700" />
              <span>Tinggalkan Pesan Kelulusan</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
