"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import type { UserProfile } from './types';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(firestore, 'users', user.uid);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setProfile(snapshot.data() as UserProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { profile, loading };
}

export async function signOutUser() {
  await signOut(auth);
}
