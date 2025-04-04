
import { AuthResponse, LoginCredentials, User } from "@/types/auth";

export interface AuthClient {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  setNavigate?(navigate: any): void;
}
