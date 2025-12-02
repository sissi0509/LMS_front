// export type Role = "FACULTY" | "STUDENT" | "ADMIN" | "USER";
export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export interface AccountState {
  currentUser: User | null;
}
