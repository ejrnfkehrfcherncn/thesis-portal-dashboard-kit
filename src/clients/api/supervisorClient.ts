
import { SupervisorClient } from "../interfaces/supervisorClient";
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";
import BaseHttpClient from "../baseHttpClient";

export class ApiSupervisorClient implements SupervisorClient {
  private http: BaseHttpClient;
  
  constructor(baseUrl: string) {
    this.http = new BaseHttpClient(`${baseUrl}/supervisor`);
  }
  
  setNavigate(navigate: any): void {
    this.http.setNavigate(navigate);
  }
  
  async getTheses(): Promise<Thesis[]> {
    return this.http.get<Thesis[]>("/theses");
  }
  
  async getStudents(): Promise<User[]> {
    return this.http.get<User[]>("/students");
  }
  
  async createThesis(thesis: Partial<Thesis>): Promise<Thesis> {
    return this.http.post<Thesis>("/theses", thesis);
  }
  
  async updateThesis(thesisId: string, thesis: Partial<Thesis>): Promise<Thesis> {
    return this.http.put<Thesis>(`/theses/${thesisId}`, thesis);
  }
  
  async deleteThesis(thesisId: string): Promise<void> {
    return this.http.delete(`/theses/${thesisId}`);
  }
}

export default ApiSupervisorClient;
