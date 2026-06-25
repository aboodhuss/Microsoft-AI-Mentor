"use client";

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogleAuth, signInWithEmailAuth } from '../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const redirectPath = await signInWithEmailAuth(email, password);
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);

    try {
      const redirectPath = await signInWithGoogleAuth();
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="mt-3 text-sm text-slate-400">Sign in as a Teacher, Student, or Mentor with your school email.</p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
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

        <form onSubmit={handleEmailSignIn} className="space-y-4">
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
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign in with email
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          New to the platform? <a href="/signup" className="font-semibold text-brand-300 underline">Create an account</a>.
        </p>
      </section>
    </main>
  );
}
