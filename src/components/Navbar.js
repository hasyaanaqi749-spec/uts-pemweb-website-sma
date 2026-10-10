'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo dan Nama Sekolah */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-yellow-400 flex items-center justify-center overflow-hidden">
            <img
              src="/images/logo sma n 2 mranggen.jpeg"
              alt="Logo SMA Negeri 2 Mranggen"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <span className="block font-extrabold text-sm md:text-base text-blue-950 leading-tight group-hover:text-blue-700 transition">
              SMA NEGERI 2 MRANGGEN
            </span>
            <span className="block text-[10px] md:text-xs text-yellow-600 font-bold tracking-wider">
              KABUPATEN DEMAK
            </span>
          </div>
        </Link>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-700 transition">
            About
          </Link>
          <Link href="/berita" className="hover:text-blue-700 transition">
            Berita
          </Link>
          <Link
            href="/berita/1"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
          >
            Info SPMB
          </Link>
        </nav>

        {/* Tombol Hamburger Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Navigasi Mobile */}
      {isOpen && (
        <nav className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 text-sm font-semibold text-slate-700">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded hover:bg-slate-100"
          >
            About
          </Link>
          <Link
            href="/berita"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded hover:bg-slate-100"
          >
            Berita
          </Link>
        </nav>
      )}
    </header>
  );
}