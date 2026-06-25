export type UserRole = 'mentor' | 'learner' | 'teacher' | 'parent' | 'admin' | 'pending';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  approved: boolean;
  mentorCertified: boolean;
  schoolId: string | null;
  assignedTeacher: string | null;
  createdAt: any;
  updatedAt: any;
}
