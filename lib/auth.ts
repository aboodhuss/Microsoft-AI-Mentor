import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import type { UserRole } from './types';

const defaultRole: UserRole = 'student';

function getRoleRedirect(role: UserRole | undefined) {
  switch (role) {
    case 'mentor':
      return '/mentor';
    case 'teacher':
      return '/teacher';
    case 'parent':
      return '/parent';
    case 'admin':
      return '/admin';
    default:
      return '/student';
  }
}

async function createUserDocument(user: FirebaseUser, role: UserRole = defaultRole) {
  const userRef = doc(firestore, 'users', user.uid);
  const existing = await getDoc(userRef);
  if (existing.exists()) {
    return;
  }

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    role,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function signInWithGoogleAuth() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  if (!result.user) {
    throw new Error('Unable to sign in with Google.');
  }

  await createUserDocument(result.user, defaultRole);
  const role = await getUserRole(result.user.uid);
  return getRoleRedirect(role);
}

export async function signInWithEmailAuth(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const role = await getUserRole(credential.user.uid);
  return getRoleRedirect(role);
}

export async function signUpWithEmailAuth(email: string, password: string, role: UserRole) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument(credential.user, role);
  return getRoleRedirect(role);
}

export async function getUserRole(uid: string): Promise<UserRole | undefined> {
  const docRef = doc(firestore, 'users', uid);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return undefined;
  }
  const data = snapshot.data() as { role?: UserRole };
  return data?.role;
}
