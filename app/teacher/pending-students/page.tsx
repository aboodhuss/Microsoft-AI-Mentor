"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '../../../lib/useUserProfile';
import { approvePendingStudent, getTeacherPendingStudents, rejectPendingStudent } from '../../../lib/auth';

interface PendingStudentCard {
  id: string;
  studentId: string;
  schoolId: string;
  studentName: string;
  email: string;
  requestedAt: any;
  status: string;
}

export default function PendingStudentsPage() {
  const { profile, loading } = useUserProfile();
  const [students, setStudents] = useState<PendingStudentCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (loading || !profile) {
      return;
    }

    if (profile.role !== 'teacher') {
      router.push('/login');
      return;
    }

    if (!profile.schoolId) {
      router.push('/teacher/setup');
      return;
    }

    getTeacherPendingStudents(profile.schoolId)
      .then(setStudents)
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load students.'));
  }, [loading, profile, router]);

  async function handleApprove(studentId: string, assignedRole: 'mentor' | 'learner') {
    setLoadingAction(studentId);
    setError(null);

    try {
      await approvePendingStudent(studentId, assignedRole, profile!.uid);
      setStudents((current) => current.filter((student) => student.studentId !== studentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not approve student.');
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleReject(studentId: string) {
    setLoadingAction(studentId);
    setError(null);

    try {
      await rejectPendingStudent(studentId, profile!.uid);
      setStudents((current) => current.filter((student) => student.studentId !== studentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reject student.');
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Teacher dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Pending Students</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Review student signups for your school, then assign each learner or mentor access.</p>
        </div>

        {error ? <p className="rounded-3xl bg-rose-950/70 p-4 text-sm text-rose-300">{error}</p> : null}

        <div className="grid gap-6">
          {students.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-slate-300">No pending students at this time.</div>
          ) : (
            students.map((student) => (
              <div key={student.studentId} className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Student</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{student.studentName}</h2>
                    <p className="mt-2 text-sm text-slate-400">{student.email}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Registered {new Date(student.requestedAt?.toMillis?.() ?? student.requestedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleApprove(student.studentId, 'mentor')}
                      disabled={loadingAction === student.studentId}
                      className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Approve as Mentor
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(student.studentId, 'learner')}
                      disabled={loadingAction === student.studentId}
                      className="rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Approve as Learner
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(student.studentId)}
                      disabled={loadingAction === student.studentId}
                      className="rounded-2xl border border-rose-500 bg-transparent px-4 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
