"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { UserProfile } from './types';

const isLocalDev = process.env.NODE_ENV === 'development';

function getLocalDevProfile(pathname: string): UserProfile {
  const baseProfile = {
    uid: 'local-dev-user',
    email: 'local.dev@example.com',
    displayName: 'Local Dev',
    approved: true,
    mentorCertified: true,
    schoolId: 'LOCAL-SCHOOL-2026',
    assignedTeacher: null,
    createdAt: null,
    updatedAt: null,
  };

  if (pathname.startsWith('/teacher')) {
    return { ...baseProfile, displayName: 'Local Teacher', role: 'teacher' };
  }

  if (pathname.startsWith('/student')) {
    return { ...baseProfile, displayName: 'Local Student', role: 'learner' };
  }

  if (pathname.startsWith('/pending')) {
    return {
      ...baseProfile,
      displayName: 'Local Pending Student',
      role: 'pending',
      approved: false,
      mentorCertified: false,
    };
  }

  return { ...baseProfile, displayName: 'Local Mentor', role: 'mentor' };
}

export function useUserProfile() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLocalDev) {
      setProfile(getLocalDevProfile(pathname));
      setLoading(false);
      return;
    }

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    async function subscribeToUserProfile() {
      const [{ onAuthStateChanged }, { doc, getDoc }, { auth, firestore }] = await Promise.all([
        import('firebase/auth'),
        import('firebase/firestore'),
        import('./firebase'),
      ]);

      if (cancelled) {
        return;
      }

      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (cancelled) {
          return;
        }

        if (!user) {
          setProfile(null);
          setLoading(false);
          return;
        }

        const ref = doc(firestore, 'users', user.uid);
        const snapshot = await getDoc(ref);
        if (cancelled) {
          return;
        }

        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    }

    subscribeToUserProfile().catch(() => {
      if (!cancelled) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [pathname]);

  return { profile, loading };
}

export async function signOutUser() {
  if (isLocalDev) {
    return;
  }

  const [{ signOut }, { auth }] = await Promise.all([
    import('firebase/auth'),
    import('./firebase'),
  ]);
  await signOut(auth);
}
