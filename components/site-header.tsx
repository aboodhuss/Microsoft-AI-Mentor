"use client";

import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/mentor', label: 'Mentor' },
  { href: '/student', label: 'Student' },
  { href: '/teacher', label: 'Teacher' },
  { href: '/parent', label: 'Parent' },
  { href: '/responsible-ai', label: 'Responsible AI' },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-white">
          <div className="grid h-11 w-11 grid-cols-2 gap-1 rounded-2xl bg-slate-900/90 p-1 shadow-soft ring-1 ring-white/10">
            <span className="block rounded-sm" style={{ backgroundColor: '#f25022' }} />
            <span className="block rounded-sm" style={{ backgroundColor: '#7fba00' }} />
            <span className="block rounded-sm" style={{ backgroundColor: '#00a4ef' }} />
            <span className="block rounded-sm" style={{ backgroundColor: '#ffb900' }} />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-tight text-white">Microsoft Elevate Youth</p>
            <p className="text-xs text-slate-400">Empowering the next generation through Responsible AI mentoring.</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as any}
              className="rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-slate-900 hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
