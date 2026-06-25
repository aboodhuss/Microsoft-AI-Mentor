"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, Eye, Lock, Globe, Users, BookOpen, Shield } from 'lucide-react';
import { completeResponsibleAIAssessment } from '../../lib/auth';
import { useUserProfile } from '../../lib/useUserProfile';

const principles = [
  { name: 'Fairness', description: 'Balanced learning paths for every student, regardless of experience or background.', icon: Globe },
  { name: 'Reliability', description: 'Clear progress tracking and dependable session scheduling for mentors and learners.', icon: ShieldCheck },
  { name: 'Safety', description: 'Supervised activities and AI literacy content grounded in digital wellbeing.', icon: Shield },
  { name: 'Privacy', description: 'Minimal personal data collection and secure session records for education settings.', icon: Lock },
  { name: 'Security', description: 'Role-based access and identity-safe authentication for schools and families.', icon: Eye },
  { name: 'Inclusiveness', description: 'Accessible content, friendly language, and positive learning support for everyone.', icon: Users },
  { name: 'Transparency', description: 'Clear guidance on how mentors support learning instead of providing answers.', icon: BookOpen },
  { name: 'Accountability', description: 'Teacher and parent oversight combined with robust learner progress reports.', icon: Sparkles },
];

export default function ResponsibleAIPage() {
  const { profile } = useUserProfile();
  const [certified, setCertified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setCertified(profile.mentorCertified);
    }
  }, [profile]);

  async function handleComplete() {
    if (!profile) return;
    setLoading(true);
    setMessage(null);

    try {
      await completeResponsibleAIAssessment(profile.uid);
      setCertified(true);
      setMessage('You are now certified to begin mentoring.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to complete assessment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Responsible AI</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Built for trusted AI learning in classrooms and communities.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Microsoft AI Mentor is designed around the education principles that make AI mentoring safe, transparent, and empowering for students, mentors, teachers, and families.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/mentor" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Explore Mentor experience
            </Link>
            <Link href="/student" className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-white/20">
              Explore Student experience
            </Link>
          </div>
          {profile?.role === 'mentor' && !certified ? (
            <div className="mt-8 rounded-3xl border border-brand-500/20 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Mentor certification</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Complete Responsible AI Foundations</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">Mentor access is locked until you pass the foundation course and assessment.</p>
              {message ? <p className="mt-4 text-sm text-brand-300">{message}</p> : null}
              <button
                type="button"
                onClick={handleComplete}
                disabled={loading}
                className="mt-6 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Completing...' : 'Complete assessment'}
              </button>
            </div>
          ) : null}
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <div key={principle.name} className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{principle.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.description}</p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
