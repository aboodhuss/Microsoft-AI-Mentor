"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '../../../lib/useUserProfile';
import { setupSchoolWorkspace } from '../../../lib/auth';

export default function TeacherSetupPage() {
  const { profile, loading } = useUserProfile();
  const [schoolName, setSchoolName] = useState('');
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading || !profile) {
      return;
    }

    if (profile.role !== 'teacher') {
      router.push('/login');
      return;
    }

    if (profile.schoolId) {
      router.push('/teacher');
    }
  }, [loading, profile, router]);

  async function handleCreateSchool(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInviteCode(null);
    setSchoolId(null);

    if (!schoolName.trim()) {
      setError('Enter your school name.');
      return;
    }

    setLoadingSubmit(true);
    try {
      const result = await setupSchoolWorkspace(profile!.uid, schoolName.trim());
      setInviteCode(result.inviteCode);
      setSchoolId(result.schoolId);
      router.push('/teacher');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create the school workspace.');
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Teacher setup</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Create your school's workspace</h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">
          After registering, create your official school workspace. This will generate a school ID and invite code for your students.
        </p>

        <form onSubmit={handleCreateSchool} className="mt-10 space-y-5">
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

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Create workspace
          </button>
        </form>

        {inviteCode ? (
          <div className="mt-10 rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Workspace ready</p>
            <p className="mt-3 text-lg text-white">School ID: {schoolId}</p>
            <p className="mt-2 text-sm text-slate-400">Invite code: {inviteCode}</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
