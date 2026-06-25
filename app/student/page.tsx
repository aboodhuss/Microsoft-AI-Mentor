"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, BookOpen, Clock, Trophy, ShieldCheck, MessageCircle } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const lessons = [
  { title: 'AI safety basics', progress: 95 },
  { title: 'Responsible chatbots', progress: 72 },
  { title: 'Data privacy and trust', progress: 56 },
];

const sessions = [
  { topic: 'AI storytelling', date: 'Jul 2 • 11:00 AM', status: 'Confirmed' },
  { topic: 'Think Together coaching', date: 'Jul 4 • 1:30 PM', status: 'Open' },
];

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Student dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Keep learning with supportive mentor guidance.</h1>
              <p className="mt-3 max-w-2xl text-slate-400">Track your progress, book sessions, and use Think Together coaching to explore AI in a safe way.</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-950/80 px-5 py-3 ring-1 ring-white/10">
              <Sparkles className="h-5 w-5 text-brand-200" />
              <span className="text-sm text-slate-200">3-day learning streak</span>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Lesson progress</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">78%</h2>
              </div>
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">You are ahead of the weekly pace and on track to complete the AI literacy path.</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active path</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">AI Explorer</h2>
              </div>
              <Badge tone="accent">Level 4</Badge>
            </div>
            <div className="mt-5 rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Lessons done</span>
                <span>6 of 8</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-brand-500" style={{ width: '75%' }} />
              </div>
            </div>
          </Card>
          <Card>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Next session</p>
            <p className="mt-3 text-2xl font-semibold text-white">AI safety check-in</p>
            <p className="mt-2 text-sm text-slate-400">Jul 2 at 11:00 AM with Mentor Priya.</p>
            <button className="mt-6 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Join session
            </button>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Learning plan</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Continue your next lessons</h2>
              </div>
              <Badge tone="brand">In progress</Badge>
            </div>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div key={lesson.title} className="space-y-3 rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{lesson.title}</p>
                      <p className="text-sm text-slate-400">Continue the guided module with mentor support.</p>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{lesson.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${lesson.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">AI support</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Think Together</h2>
              </div>
              <MessageCircle className="h-6 w-6 text-brand-200" />
            </div>
            <p className="text-sm leading-6 text-slate-400">The Think Together coach asks guiding questions instead of giving answers, helping you reflect on your work.</p>
            <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
              Start coaching
            </button>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Safety checklist</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                <span>Use respectful language during mentor sessions.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                <span>Ask questions if anything feels unclear or unsafe.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                <span>Follow the learning coach and share your ideas.</span>
              </li>
            </ul>
          </Card>
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Certificates</p>
              <Badge tone="success">Earned</Badge>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="font-semibold text-white">AI Foundations Badge</p>
              <p className="mt-2 text-sm text-slate-400">Completed on Jun 22.</p>
            </div>
            <Link href="/mentor" className="block rounded-2xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Explore mentor tips
            </Link>
          </Card>
        </div>
      </div>
    </main>
  );
}
