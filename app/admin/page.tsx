"use client";

import { motion } from 'framer-motion';
import { Layers, Users, Bell, ShieldCheck, ChartPie } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Admin dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Monitor platform health across users, schools, and sessions.</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Get executive insight into adoption, role distribution, and platform safeguards from one admin console.</p>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active users</p>
              <Users className="h-5 w-5 text-brand-200" />
            </div>
            <p className="text-4xl font-semibold text-white">1,280</p>
            <p className="text-sm text-slate-400">Mentors, students, teachers, and parents are all engaged this week.</p>
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Schools onboarded</p>
              <Layers className="h-5 w-5 text-brand-200" />
            </div>
            <p className="text-4xl font-semibold text-white">42</p>
            <p className="text-sm text-slate-400">School districts using mentor-led AI literacy programs.</p>
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">System alerts</p>
              <Bell className="h-5 w-5 text-brand-200" />
            </div>
            <p className="text-4xl font-semibold text-white">4</p>
            <p className="text-sm text-slate-400">Security and privacy checks currently under review.</p>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Platform insights</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Role distribution</h2>
              </div>
              <Badge tone="brand">Live</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Mentors</p>
                <p className="mt-3 text-2xl font-semibold text-white">260</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Students</p>
                <p className="mt-3 text-2xl font-semibold text-white">780</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Teachers</p>
                <p className="mt-3 text-2xl font-semibold text-white">130</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Parents</p>
                <p className="mt-3 text-2xl font-semibold text-white">110</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Secure review</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Policy dashboard</h2>
              </div>
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-sm leading-6 text-slate-400">Audit user roles, school approvals, and data protection settings to keep the platform aligned with best practices.</p>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 text-sm text-slate-300">
              <p>2 new privacy requests</p>
              <p className="mt-2">Platform compliance reviewed for the latest education policy updates.</p>
            </div>
          </Card>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Executive summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Daily platform pulse</h2>
            </div>
            <ChartPie className="h-6 w-6 text-brand-200" />
          </div>
          <p className="text-sm text-slate-400">User adoption is rising with consistent session growth across schools, and no critical issues reported in the last 24 hours.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Sessions today</p>
              <p className="mt-3 text-2xl font-semibold text-white">48</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">New registrations</p>
              <p className="mt-3 text-2xl font-semibold text-white">34</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Alerts cleared</p>
              <p className="mt-3 text-2xl font-semibold text-white">12</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
