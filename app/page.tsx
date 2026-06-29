"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, Users, Trophy, Zap, Heart, Brain } from 'lucide-react';

type RoleCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  emoji: string;
};

const roles: RoleCard[] = [
  {
    title: 'Are you a student?',
    description: 'Learn about AI, get matched with a mentor and grow your skills.',
    icon: BookOpen,
    href: '/signup?role=student',
    color: 'brand',
    emoji: '📚',
  },
  {
    title: 'Are you a mentor?',
    description: 'Help younger students understand AI and make a real difference!',
    icon: Heart,
    href: '/signup?role=mentor',
    color: 'accent',
    emoji: '🌟',
  },
  {
    title: 'Are you a teacher?',
    description: 'Monitor mentors, track student progress, and keep everyone safe.',
    icon: Users,
    href: '/signup?role=teacher',
    color: 'success',
    emoji: '👨‍🏫',
  },
];

const benefits = [
  {
    icon: Brain,
    title: 'Learn AI with structured guidance',
    description: 'Interactive content and mentor support help learners build confidence with AI concepts.',
  },
  {
    icon: Trophy,
    title: 'Earn recognized achievements',
    description: 'Complete lessons and earn certificates that reflect your progress.',
  },
  {
    icon: Zap,
    title: 'Safe and supervised learning',
    description: 'Teachers and parents can stay informed and engaged throughout the learning journey.',
  },
];

const steps = [
  {
    number: '1️⃣',
    title: 'Create an account',
    description: 'Select your role as a student, mentor, or teacher.',
  },
  {
    number: '2️⃣',
    title: 'Build skills',
    description: 'Complete interactive lessons that explain how AI works.',
  },
  {
    number: '3️⃣',
    title: 'Start mentoring',
    description: 'Students connect with mentors and begin guided mentoring sessions.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center"
        >
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              <span className="text-[rgb(242,80,34)]">Learn</span>{' '}
              <span className="text-[rgb(127,186,0)]">AI</span>{' '}
              <span className="text-white">with</span> <br />
              <span className="text-[rgb(0,164,239)]">real</span>{' '}
              <span className="text-[rgb(255,185,0)]">mentors</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-300">
              Connect with certified AI mentors who provide structured guidance, practical learning experiences and support every step of your AI journey.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-brand-400 shadow-lg"
            >
              Get started for free
            </Link>
            <Link
              href="/responsible-ai"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-500 px-8 py-4 text-lg font-semibold text-brand-300 transition hover:bg-brand-500/10"
            >
              Learn about AI safety
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Role Selection */}
      <section className="border-t border-white/10 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white">Pick your path</h2>
            <p className="mt-4 text-slate-400">Choose the path that aligns with your role and goals.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Student Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Link href="/student">
                <div className="rounded-3xl border-2 border-white/10 bg-slate-900/80 p-8 transition hover:border-brand-500/50 hover:bg-slate-900 cursor-pointer">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-400">Are you a student?</h3>
                  <p className="mt-3 text-slate-300">Learn about AI, connect with a mentor and advance your skills steadily.</p>
                  <div className="mt-6 inline-flex items-center text-brand-400 font-semibold group-hover:gap-2 transition-all">
                    Get started
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Mentor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Link href="/mentor">
                <div className="rounded-3xl border-2 border-white/10 bg-slate-900/80 p-8 transition hover:border-brand-500/50 hover:bg-slate-900 cursor-pointer">
                  <div className="text-5xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-400">Are you a mentor?</h3>
                  <p className="mt-3 text-slate-300">Support students as they develop AI literacy and confidence.</p>
                  <div className="mt-6 inline-flex items-center text-brand-400 font-semibold group-hover:gap-2 transition-all">
                    Get started
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Teacher Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Link href="/teacher">
                <div className="rounded-3xl border-2 border-white/10 bg-slate-900/80 p-8 transition hover:border-brand-500/50 hover:bg-slate-900 cursor-pointer">
                  <div className="text-5xl mb-4">👨‍🏫</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-400">Are you a teacher?</h3>
                  <p className="mt-3 text-slate-300">Monitor mentors, track student progress, and keep everyone safe.</p>
                  <div className="mt-6 inline-flex items-center text-brand-400 font-semibold group-hover:gap-2 transition-all">
                    Get started
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white">Why join us?</h2>
            <p className="mt-4 text-slate-400">Here's what you get</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10"
                >
                  <Icon className="h-12 w-12 text-brand-400" />
                  <h3 className="mt-4 text-xl font-bold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-slate-300">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Simple Steps */}
      <section className="border-t border-white/10 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white">How it works</h2>
            <p className="mt-4 text-slate-400">Get started in minutes</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 mb-6">Ready to start learning?</p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-brand-400 shadow-lg"
            >
              Join now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ-style section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white">Quick questions?</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10">
              <h3 className="text-lg font-bold text-brand-400">Is it free?</h3>
              <p className="mt-2 text-slate-300">The platform is free to join and use.</p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10">
              <h3 className="text-lg font-bold text-brand-400">Is it safe?</h3>
              <p className="mt-2 text-slate-300">Teachers and parents can stay informed and engaged throughout the learning process.</p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10">
              <h3 className="text-lg font-bold text-brand-400">Do I need experience?</h3>
              <p className="mt-2 text-slate-300">No prior experience is required; learning begins from the fundamentals.</p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10">
              <h3 className="text-lg font-bold text-brand-400">How much time?</h3>
              <p className="mt-2 text-slate-300">You decide! Learn at your own pace whenever you want.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
