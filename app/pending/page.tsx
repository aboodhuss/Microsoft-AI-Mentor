"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '../../lib/useUserProfile';

export default function PendingPage() {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!profile) {
      router.push('/login');
      return;
    }

    if (profile.role !== 'pending' || profile.approved) {
      const destination = profile.role === 'teacher'
        ? profile.schoolId ? '/teacher' : '/teacher/setup'
        : profile.role === 'mentor'
        ? '/mentor'
        : profile.role === 'learner'
        ? '/student'
        : profile.role === 'parent'
        ? '/parent'
        : profile.role === 'admin'
        ? '/admin'
        : '/login';
      router.push(destination);
    }
  }, [profile, loading, router]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Awaiting approval</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Your account is waiting for teacher approval.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">
          Your student account has been created, but you cannot access dashboards until your teacher approves you. Return after your teacher accepts your invite and assigns you as a learner or mentor.
        </p>
      </div>
    </main>
  );
}
