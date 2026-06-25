import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, firestore } from './firebase';
import type { UserProfile, UserRole } from './types';

function createSchoolId(schoolName: string) {
  const normalized = schoolName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${normalized}-${new Date().getFullYear()}`;
}

function getRoleRedirect(profile: UserProfile | undefined) {
  if (!profile) {
    return '/login';
  }

  if (profile.role === 'pending' || !profile.approved) {
    return '/pending';
  }

  if (profile.role === 'teacher') {
    return profile.schoolId ? '/teacher' : '/teacher/setup';
  }

  if (profile.role === 'mentor') {
    return '/mentor';
  }

  if (profile.role === 'learner') {
    return '/student';
  }

  if (profile.role === 'parent') {
    return '/parent';
  }

  if (profile.role === 'admin') {
    return '/admin';
  }

  return '/login';
}

async function createUserDocument(user: FirebaseUser, profile: Partial<UserProfile>) {
  const userRef = doc(firestore, 'users', user.uid);
  const existing = await getDoc(userRef);
  if (existing.exists()) {
    return;
  }

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email ?? null,
    displayName: profile.displayName ?? null,
    role: profile.role ?? 'pending',
    approved: profile.approved ?? false,
    mentorCertified: profile.mentorCertified ?? false,
    schoolId: profile.schoolId ?? null,
    assignedTeacher: profile.assignedTeacher ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function registerTeacher(
  fullName: string,
  schoolName: string,
  email: string,
  password: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument(credential.user, {
    displayName: fullName,
    role: 'teacher',
    approved: true,
    mentorCertified: false,
    schoolId: null,
    assignedTeacher: null,
  });

  return getRoleRedirect({
    uid: credential.user.uid,
    email: credential.user.email ?? null,
    displayName: fullName,
    role: 'teacher',
    approved: true,
    mentorCertified: false,
    schoolId: null,
    assignedTeacher: null,
    createdAt: null,
    updatedAt: null,
  });
}

export async function setupSchoolWorkspace(teacherUid: string, schoolName: string) {
  const teacherRef = doc(firestore, 'users', teacherUid);
  const teacherSnapshot = await getDoc(teacherRef);
  if (!teacherSnapshot.exists()) {
    throw new Error('Teacher account not found.');
  }

  const teacher = teacherSnapshot.data() as UserProfile;
  if (teacher.role !== 'teacher') {
    throw new Error('Only teachers can create a school workspace.');
  }

  const schoolId = createSchoolId(schoolName);
  const schoolRef = doc(firestore, 'schools', schoolId);
  const existingSchool = await getDoc(schoolRef);
  if (existingSchool.exists()) {
    throw new Error('A school with this name already exists. Try a slightly different name.');
  }

  const inviteCode = schoolId;
  await setDoc(schoolRef, {
    schoolId,
    name: schoolName,
    ownerId: teacherUid,
    inviteCode,
    createdAt: serverTimestamp(),
  });

  await updateDoc(teacherRef, {
    schoolId,
    updatedAt: serverTimestamp(),
  });

  return { schoolId, inviteCode };
}

export async function registerStudent(
  fullName: string,
  email: string,
  password: string,
  inviteCode: string
) {
  const schoolQuery = query(
    collection(firestore, 'schools'),
    where('inviteCode', '==', inviteCode.trim().toUpperCase())
  );
  const schoolSnapshot = await getDocs(schoolQuery);
  if (schoolSnapshot.empty) {
    throw new Error('Invalid school invite code.');
  }

  const schoolDoc = schoolSnapshot.docs[0];
  const schoolData = schoolDoc.data();
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await createUserDocument(credential.user, {
    displayName: fullName,
    role: 'pending',
    approved: false,
    mentorCertified: false,
    schoolId: schoolData.schoolId,
    assignedTeacher: null,
  });

  await setDoc(doc(firestore, 'pendingStudents', credential.user.uid), {
    studentId: credential.user.uid,
    schoolId: schoolData.schoolId,
    studentName: fullName,
    email,
    requestedAt: serverTimestamp(),
    status: 'pending',
  });

  return '/pending';
}

export async function completeResponsibleAIAssessment(uid: string) {
  const certificateRef = doc(firestore, 'certificates', uid);
  await setDoc(certificateRef, {
    uid,
    courseId: 'responsible-ai',
    certified: true,
    issuedAt: serverTimestamp(),
  });

  const userRef = doc(firestore, 'users', uid);
  await updateDoc(userRef, {
    mentorCertified: true,
    updatedAt: serverTimestamp(),
  });
}

export async function signInWithGoogleAuth() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  if (!result.user) {
    throw new Error('Unable to sign in with Google.');
  }

  const profile = await getUserProfile(result.user.uid);
  if (!profile) {
    throw new Error('Google sign-in is only available for existing approved accounts. Please sign up with email.');
  }

  return getRoleRedirect(profile);
}

export async function signInWithEmailAuth(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const profile = await getUserProfile(credential.user.uid);
  return getRoleRedirect(profile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | undefined> {
  const docRef = doc(firestore, 'users', uid);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return undefined;
  }
  return snapshot.data() as UserProfile;
}

export async function getTeacherPendingStudents(schoolId: string) {
  const q = query(collection(firestore, 'pendingStudents'), where('schoolId', '==', schoolId), where('status', '==', 'pending'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...(docSnapshot.data() as any) }));
}

export async function approvePendingStudent(studentUid: string, assignedRole: 'mentor' | 'learner', teacherUid: string) {
  const studentRef = doc(firestore, 'users', studentUid);
  const studentSnapshot = await getDoc(studentRef);
  if (!studentSnapshot.exists()) {
    throw new Error('Student not found.');
  }

  const student = studentSnapshot.data() as UserProfile;
  const teacherProfile = await getUserProfile(teacherUid);
  if (!teacherProfile || teacherProfile.role !== 'teacher' || teacherProfile.schoolId !== student.schoolId) {
    throw new Error('You can only approve students from your own school.');
  }

  await updateDoc(studentRef, {
    approved: true,
    role: assignedRole,
    assignedTeacher: teacherUid,
    updatedAt: serverTimestamp(),
  });
  await updateDoc(doc(firestore, 'pendingStudents', studentUid), {
    status: 'approved',
    assignedRole,
    processedAt: serverTimestamp(),
  });
}

export async function rejectPendingStudent(studentUid: string, teacherUid: string) {
  const studentRef = doc(firestore, 'users', studentUid);
  const studentSnapshot = await getDoc(studentRef);
  if (!studentSnapshot.exists()) {
    throw new Error('Student not found.');
  }

  const student = studentSnapshot.data() as UserProfile;
  const teacherProfile = await getUserProfile(teacherUid);
  if (!teacherProfile || teacherProfile.role !== 'teacher' || teacherProfile.schoolId !== student.schoolId) {
    throw new Error('You can only reject students from your own school.');
  }

  await updateDoc(doc(firestore, 'pendingStudents', studentUid), {
    status: 'rejected',
    processedAt: serverTimestamp(),
  });
}
