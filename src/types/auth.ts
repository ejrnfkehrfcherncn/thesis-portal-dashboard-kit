
export type UserRole = "ROLE_STUDENT" | "ROLE_SUPERVISOR" | "ROLE_DEPARTMENTHEAD" | "ROLE_ADMIN";

export interface User {
  id: string;
  name: string;
  username: string;
  authorities: UserRole[];
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
