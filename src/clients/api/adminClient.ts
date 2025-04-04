
import { AdminClient } from "../interfaces/adminClient";
import { User } from "@/types/auth";
import BaseHttpClient from "../baseHttpClient";

export class ApiAdminClient implements AdminClient {
  private http: BaseHttpClient;
  
  constructor(baseUrl: string) {
    this.http = new BaseHttpClient(`${baseUrl}/admin`);
  }
  
  setNavigate(navigate: any): void {
    this.http.setNavigate(navigate);
  }
  
  async getUsers(): Promise<User[]> {
    return this.http.get<User[]>("/users");
  }
  
  async updateUser(userId: string, user: Partial<User>): Promise<User> {
    return this.http.put<User>(`/users/${userId}`, user);
  }
  
  async deleteUser(userId: string): Promise<void> {
    return this.http.delete(`/users/${userId}`);
  }
  
  async createUser(user: Partial<User>): Promise<User> {
    return this.http.post<User>("/users", user);
  }
  
  async getSystemSettings(): Promise<Record<string, any>> {
    return this.http.get<Record<string, any>>("/settings");
  }
  
  async updateSystemSettings(settings: Record<string, any>): Promise<Record<string, any>> {
    return this.http.put<Record<string, any>>("/settings", settings);
  }
}

export default ApiAdminClient;
