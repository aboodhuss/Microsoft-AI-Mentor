"use client";

import Link from 'next/link';
import { BookOpen, Users, ShieldCheck, Sparkles } from 'lucide-react';

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-white">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-slate-950 shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Microsoft AI Mentor</p>
            <p className="text-xs text-slate-400">Education platform</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as any} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:text-white">
            Sign in
          </Link>
          <Link href="/signup" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
