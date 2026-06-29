import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-300">Microsoft Elevate Youth</p>
          <p className="mt-2 text-xs text-slate-500">Empowering the next generation through Responsible AI mentoring.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/mentor" className="transition hover:text-white">
            Mentor Dashboard
          </Link>
          <Link href="/student" className="transition hover:text-white">
            Student Dashboard
          </Link>
          <Link href="/responsible-ai" className="transition hover:text-white">
            Responsible AI
          </Link>
        </div>
      </div>
    </footer>
  );
}
