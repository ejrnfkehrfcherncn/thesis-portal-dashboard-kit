
export type UserRole = "Student" | "Supervisor" | "DepartmentHead" | "Admin";

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
