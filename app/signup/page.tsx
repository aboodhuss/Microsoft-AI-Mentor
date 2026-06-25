"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerTeacher, registerStudent } from '../../lib/auth';

export default function SignupPage() {
  const [isTeacherFlow, setIsTeacherFlow] = useState(true);
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const redirectPath = isTeacherFlow
        ? await registerTeacher(fullName, schoolName, email, password)
        : await registerStudent(fullName, email, password, inviteCode);
      router.push(redirectPath as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <div className="flex gap-2 mb-8 rounded-3xl bg-slate-950/80 p-2">
          <button
            type="button"
            onClick={() => setIsTeacherFlow(true)}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              isTeacherFlow ? 'bg-brand-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => setIsTeacherFlow(false)}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              !isTeacherFlow ? 'bg-brand-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Student
          </button>
        </div>

        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="mt-3 text-sm text-slate-400">
          {isTeacherFlow
            ? 'Teachers register first to create a school workspace and invite learners.'
            : 'Students sign up with a school invite code and wait for teacher approval.'}
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-200">
            Full name
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
            />
          </label>

          {isTeacherFlow ? (
            <label className="block text-sm font-medium text-slate-200">
              School name
              <input
                type="text"
                value={schoolName}
                onChange={(event) => setSchoolName(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
              />
            </label>
          ) : (
            <label className="block text-sm font-medium text-slate-200">
              School invite code
              <input
                type="text"
                value={inviteCode}
                onChange={(event) => setInviteCode(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
              />
            </label>
          )}

          <label className="block text-sm font-medium text-slate-200">
            School email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
            />
          </label>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isTeacherFlow ? 'Register as Teacher' : 'Register as Student'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account? <a href="/login" className="font-semibold text-brand-300 underline">Sign in</a>.
        </p>
      </section>
    </main>
  );
}
