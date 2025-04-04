
import { DepartmentHeadClient } from "../interfaces/departmentHeadClient";
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";
import BaseHttpClient from "../baseHttpClient";

export class ApiDepartmentHeadClient implements DepartmentHeadClient {
  private http: BaseHttpClient;
  
  constructor(baseUrl: string) {
    this.http = new BaseHttpClient(`${baseUrl}/department`);
  }
  
  setNavigate(navigate: any): void {
    this.http.setNavigate(navigate);
  }
  
  async getAllTheses(): Promise<Thesis[]> {
    return this.http.get<Thesis[]>("/theses");
  }
  
  async getSupervisors(): Promise<User[]> {
    return this.http.get<User[]>("/supervisors");
  }
  
  async approveSupervisor(supervisorId: string): Promise<User> {
    return this.http.post<User>(`/supervisors/${supervisorId}/approve`);
  }
  
  async rejectSupervisor(supervisorId: string): Promise<void> {
    return this.http.post<void>(`/supervisors/${supervisorId}/reject`);
  }
}

export default ApiDepartmentHeadClient;
