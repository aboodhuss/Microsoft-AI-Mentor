"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, CalendarDays, Users, ShieldCheck, BarChart3, Star, ClipboardList, Clock } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useUserProfile } from '../../lib/useUserProfile';

const overview = [
  { title: 'Volunteer Hours', value: '18.2', icon: Clock, tone: 'brand' },
  { title: 'Active students', value: '6', icon: Users, tone: 'accent' },
  { title: 'Certifications', value: '3', icon: ShieldCheck, tone: 'success' },
];

const sessions = [
  { student: 'Amelia R.', date: 'Jun 28 • 4:00 PM', topic: 'AI Ethics & Chatbots', status: 'Confirmed' },
  { student: 'Noah T.', date: 'Jun 30 • 2:15 PM', topic: 'Responsible AI Lab', status: 'Pending' },
  { student: 'Mia K.', date: 'Jul 1 • 10:00 AM', topic: 'Safety in AI tools', status: 'Confirmed' },
];

const students = [
  { name: 'Amelia R.', progress: 72, grade: 'Year 6' },
  { name: 'Noah T.', progress: 56, grade: 'Year 5' },
  { name: 'Mia K.', progress: 84, grade: 'Year 6' },
];

export default function MentorDashboard() {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!profile) {
      router.push('/login');
      return;
    }

    if (profile.role !== 'mentor') {
      if (profile.role === 'pending') {
        router.push('/pending');
      } else if (profile.role === 'teacher') {
        router.push('/teacher');
      } else if (profile.role === 'learner') {
        router.push('/student');
      } else if (profile.role === 'parent') {
        router.push('/parent');
      } else if (profile.role === 'admin') {
        router.push('/admin');
      }
    }
  }, [loading, profile, router]);

  if (loading || !profile) {
    return null;
  }

  if (!profile.mentorCertified) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Mentor access locked</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Complete Responsible AI Foundations to begin mentoring.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Mentor accounts must finish the Responsible AI Foundations course before they can access mentoring tools, session booking, or volunteer hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/responsible-ai" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Open Responsible AI Foundations
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Mentor dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Welcome back, Priya</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Your mentorship program is on track — review sessions, student progress, and Responsible AI certification status in one place.</p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-950/80 px-5 py-3 ring-1 ring-white/10">
              <Bell className="h-5 w-5 text-brand-300" />
              <span className="text-sm text-slate-200">2 sessions pending approval</span>
            </div>
            <Link href="/student" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              View student dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {overview.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.title}</p>
                  <div className="rounded-2xl bg-slate-950/80 p-3 text-brand-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-4xl font-semibold text-white">{item.value}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Upcoming sessions</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Next mentoring meetings</h2>
              </div>
              <Badge tone="accent">Live</Badge>
            </div>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.student} className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-white">{session.student}</p>
                      <p className="text-sm text-slate-400">{session.topic}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-slate-300">{session.date}</p>
                      <Badge tone={session.status === 'Confirmed' ? 'success' : 'brand'}>{session.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Student progress</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Recent learning updates</h2>
              </div>
              <Badge tone="success">On track</Badge>
            </div>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.name} className="space-y-2 rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-sm text-slate-400">{student.grade}</p>
                    </div>
                    <p className="text-sm text-slate-200">{student.progress}% complete</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${student.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Guided coaching</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Mentor support toolkit</h2>
              </div>
              <BarChart3 className="h-6 w-6 text-brand-200" />
            </div>
            <p className="text-sm leading-6 text-slate-400">
              Use prompts, knowledge checks, and AI literacy exercises to keep sessions active and student-centered.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">Review prompts</button>
              <button className="rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-200 transition hover:border-white/20">Create session</button>
            </div>
          </Card>
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Certification progress</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Responsible AI readiness</h2>
              </div>
              <Star className="h-6 w-6 text-brand-200" />
            </div>
            <p className="text-sm leading-6 text-slate-400">Your latest cohort finished their training path with strong ratings for safety, inclusion, and collaboration.</p>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Learning path complete</span>
                <span>82%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '82%' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
