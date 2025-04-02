
import { AuthResponse, LoginCredentials, User } from "@/types/auth";

export interface ApiService {
  // Auth methods
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  
  // These can be extended for actual thesis functionality later
  // getTheses(): Promise<Thesis[]>;
  // createThesis(data: ThesisData): Promise<Thesis>;
  // etc.
}
