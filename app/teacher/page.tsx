"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Award, Users, ClipboardList, ShieldCheck, BarChart3 } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useUserProfile } from '../../lib/useUserProfile';

const mentors = [
  { name: 'Priya S.', status: 'Approved', level: 'Senior' },
  { name: 'Liam W.', status: 'Pending', level: 'Mentor' },
  { name: 'Sofia L.', status: 'Approved', level: 'Mentor' },
];

export default function TeacherDashboard() {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!profile) {
      router.push('/login');
      return;
    }

    if (profile.role !== 'teacher') {
      if (profile.role === 'pending') {
        router.push('/pending');
      } else if (profile.role === 'mentor') {
        router.push('/mentor');
      } else if (profile.role === 'learner') {
        router.push('/student');
      } else if (profile.role === 'parent') {
        router.push('/parent');
      } else {
        router.push('/login');
      }
    }
  }, [loading, profile, router]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Teacher dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Approve mentors, group learners, and track progress.</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Your dashboard shows mentor readiness, student groups, and analytics so each classroom collaboration stays safe and effective.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/teacher/pending-students" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
                Review pending students
              </a>
              <a href="/teacher/setup" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-white/20">
                Set up school workspace
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Mentor approvals</p>
              <Badge tone="success">74%</Badge>
            </div>
            <p className="text-4xl font-semibold text-white">8 pending</p>
            <p className="text-sm text-slate-400">Review mentor applications and approve those ready for student sessions.</p>
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Student groups</p>
              <Badge tone="brand">4</Badge>
            </div>
            <p className="text-4xl font-semibold text-white">Year 5–6</p>
            <p className="text-sm text-slate-400">Manage learning groups with mentor assignments and progress summaries.</p>
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Reports ready</p>
              <Badge tone="accent">Live</Badge>
            </div>
            <p className="text-4xl font-semibold text-white">12</p>
            <p className="text-sm text-slate-400">Ready-to-share progress reports for parents and administrators.</p>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Mentor review</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Approve new mentor profiles</h2>
              </div>
              <Badge tone="brand">Real time</Badge>
            </div>
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <div key={mentor.name} className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{mentor.name}</p>
                      <p className="text-sm text-slate-400">{mentor.level} mentor candidate</p>
                    </div>
                    <Badge tone={mentor.status === 'Approved' ? 'success' : 'brand'}>{mentor.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Analytics</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Trend summary</h2>
              </div>
              <BarChart3 className="h-6 w-6 text-brand-200" />
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Mentor session completion is up 18% this month.</p>
              <p>Student satisfaction ratings have improved with guided reflection activities.</p>
            </div>
          </Card>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Classroom support</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Group assignments and outcomes</h2>
            </div>
            <Award className="h-6 w-6 text-brand-200" />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">Group A</p>
              <p className="mt-3 text-sm text-slate-400">5 mentors, 18 students — focus on ethics and safety.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">Group B</p>
              <p className="mt-3 text-sm text-slate-400">3 mentors, 14 students — focus on creative AI projects.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">Group C</p>
              <p className="mt-3 text-sm text-slate-400">4 mentors, 16 students — focus on collaboration and review.</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
