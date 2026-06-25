"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogleAuth, signUpWithEmailAuth } from '../../lib/auth';
import type { UserRole } from '../../lib/types';

const roles: Array<{ value: UserRole; label: string }> = [
  { value: 'mentor', label: 'Mentor' },
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
];

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEmailSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const redirectPath = await signUpWithEmailAuth(email, password, role);
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setError(null);
    setLoading(true);

    try {
      const redirectPath = await signInWithGoogleAuth();
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-up failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="mt-3 text-sm text-slate-400">Sign up with Google or email and choose your initial role.</p>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-sm text-slate-500">
          <span className="h-px flex-1 bg-slate-700" />
          <span>or</span>
          <span className="h-px flex-1 bg-slate-700" />
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <label className="block text-sm font-medium text-slate-200">
            Email
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
          <label className="block text-sm font-medium text-slate-200">
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-brand-500/10 focus:border-brand-400 focus:ring-2"
            >
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account? <a href="/login" className="font-semibold text-brand-300 underline">Sign in</a>.
        </p>
      </section>
    </main>
  );
}
