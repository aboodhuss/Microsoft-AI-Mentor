"use client";

import { motion } from 'framer-motion';
import { HeartHandshake, CalendarDays, Users, ShieldCheck, MessageSquare } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const childProgress = [
  { label: 'Lessons complete', value: '6 of 8' },
  { label: 'Session progress', value: '80%' },
  { label: 'AI safety score', value: 'A' },
];

export default function ParentDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Parent dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Keep track of your child’s AI learning journey.</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Review session history, mentor details, and progress updates in a secure family-friendly view.</p>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          {childProgress.map((item) => (
            <Card key={item.label} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{item.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Today's summary</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Upcoming sessions</h2>
              </div>
              <Badge tone="brand">Confirmed</Badge>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="font-semibold text-white">AI safety check-in</p>
                <p className="mt-2 text-sm text-slate-400">Jul 2 • 11:00 AM with mentor Priya.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="font-semibold text-white">Progress review</p>
                <p className="mt-2 text-sm text-slate-400">Performance is strong across the current AI module.</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Mentor profile</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Priya Sharma</h2>
              </div>
              <HeartHandshake className="h-6 w-6 text-brand-200" />
            </div>
            <p className="text-sm leading-6 text-slate-400">Certified mentor with experience guiding younger learners through responsible AI conversations.</p>
            <div className="grid gap-3 rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Next meeting</span>
                <span>Jul 2</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Response time</span>
                <span>Under 1 hour</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Family notifications</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Recent updates</h2>
            </div>
            <MessageSquare className="h-6 w-6 text-brand-200" />
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p>Your child completed the AI Foundations Badge and is ready for the next learning module.</p>
            <p>The mentor has scheduled a follow-up session to discuss AI safety principles.</p>
            <p>Teacher notes: Student is engaging well with collaborative prompts.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
