"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerTeacher, registerStudent } from '../../lib/auth';

const FAIRFIELD_HIGH_CODE = 'FAIRFIELD-HIGH-SCHOOL-2026';
const FAIRFIELD_PRIMARY_CODE = 'FAIRFIELD-PRIMARY-SCHOOL-2026';

type SignupRole = 'teacher' | 'student' | 'mentor';

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<SignupRole>('teacher');
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
      const redirectPath =
        selectedRole === 'teacher'
          ? await registerTeacher(fullName, schoolName, email, password)
          : await registerStudent(fullName, email, password, inviteCode);
      router.push(redirectPath as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  }

  function selectRole(role: SignupRole) {
    setSelectedRole(role);
    if (role === 'mentor') {
      setInviteCode(FAIRFIELD_HIGH_CODE);
    } else if (role === 'student') {
      setInviteCode(FAIRFIELD_PRIMARY_CODE);
    } else {
      setInviteCode('');
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <div className="flex gap-2 mb-8 rounded-3xl bg-slate-950/80 p-2">
          <button
            type="button"
            onClick={() => selectRole('teacher')}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              selectedRole === 'teacher' ? 'bg-brand-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => selectRole('student')}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              selectedRole === 'student' ? 'bg-brand-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => selectRole('mentor')}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              selectedRole === 'mentor' ? 'bg-brand-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Mentor
          </button>
        </div>

        <div className="mb-6 space-y-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
          <p className="font-semibold text-slate-100">Test accounts</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                selectRole('teacher');
                setFullName('Fairfield HS Teacher');
                setSchoolName('Fairfield High School');
                setEmail('highschool.teacher@example.com');
                setPassword('Test1234!');
                setConfirmPassword('Test1234!');
              }}
              className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
            >
              Prefill High School Teacher
            </button>
            <button
              type="button"
              onClick={() => {
                selectRole('teacher');
                setFullName('Fairfield Primary Teacher');
                setSchoolName('Fairfield Primary School');
                setEmail('primary.teacher@example.com');
                setPassword('Test1234!');
                setConfirmPassword('Test1234!');
              }}
              className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
            >
              Prefill Primary School Teacher
            </button>
            <button
              type="button"
              onClick={() => {
                selectRole('student');
                setFullName('Primary Student');
                setEmail('primary.student@example.com');
                setPassword('Test1234!');
                setConfirmPassword('Test1234!');
              }}
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20"
            >
              Prefill Student
            </button>
            <button
              type="button"
              onClick={() => {
                selectRole('mentor');
                setFullName('High School Mentor');
                setEmail('highschool.mentor@example.com');
                setPassword('Test1234!');
                setConfirmPassword('Test1234!');
              }}
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20"
            >
              Prefill Mentor
            </button>
          </div>
          <div className="space-y-1 text-slate-400">
            <p>Mentors sign up for <span className="font-semibold text-slate-100">Fairfield High School</span>.</p>
            <p>Students sign up for <span className="font-semibold text-slate-100">Fairfield Primary School</span>.</p>
            <p>Teachers can register for either school, depending on their classroom.</p>
          </div>
        </div>

        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="mt-3 text-sm text-slate-400">
          {selectedRole === 'teacher' && 'Teachers register first to create a school workspace and invite learners.'}
          {selectedRole === 'student' && 'Students sign up with a primary school invite code and wait for approval.'}
          {selectedRole === 'mentor' && 'Mentors sign up for Fairfield High School and wait for teacher approval.'}
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

          {selectedRole === 'teacher' ? (
            <label className="block text-sm font-medium text-slate-200">
              School name
              <input
                type="text"
                value={schoolName}
                onChange={(event) => setSchoolName(event.target.value)}
                required
                placeholder="Example: Fairfield High School or Fairfield Primary School"
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
                readOnly={selectedRole === 'mentor'}
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
            {selectedRole === 'teacher' ? 'Register as Teacher' : selectedRole === 'mentor' ? 'Apply as Mentor' : 'Register as Student'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account? <a href="/login" className="font-semibold text-brand-300 underline">Sign in</a>.
        </p>
      </section>
    </main>
  );
}
