
import { StudentClient } from "../interfaces/studentClient";
import { Thesis } from "@/types/api";
import BaseHttpClient from "../baseHttpClient";

export class ApiStudentClient implements StudentClient {
  private http: BaseHttpClient;
  
  constructor(baseUrl: string) {
    this.http = new BaseHttpClient(`${baseUrl}/student`);
  }
  
  setNavigate(navigate: any): void {
    this.http.setNavigate(navigate);
  }
  
  async getTheses(): Promise<Thesis[]> {
    return this.http.get<Thesis[]>("/theses");
  }
  
  async selectThesis(thesisId: string): Promise<Thesis> {
    return this.http.post<Thesis>(`/theses/${thesisId}/select`);
  }
}

export default ApiStudentClient;
