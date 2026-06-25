export type UserRole = 'mentor' | 'student' | 'teacher' | 'parent' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt: Date | null;
  updatedAt: Date | null;
}
