
import { User } from "@/types/auth";

export interface AdminClient {
  getUsers(): Promise<User[]>;
  updateUser(userId: string, user: Partial<User>): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  createUser(user: Partial<User>): Promise<User>;
  getSystemSettings(): Promise<Record<string, any>>;
  updateSystemSettings(settings: Record<string, any>): Promise<Record<string, any>>;
  setNavigate?(navigate: any): void;
}
