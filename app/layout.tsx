import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';

export const metadata: Metadata = {
  title: 'Microsoft Elevate Youth',
  description: 'Empowering the next generation through Responsible AI mentoring for students, mentors, and educators.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        <SiteHeader />
        <div className="pt-28">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
