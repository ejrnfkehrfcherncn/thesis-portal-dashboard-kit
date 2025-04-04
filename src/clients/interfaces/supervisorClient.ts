
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";

export interface SupervisorClient {
  getTheses(): Promise<Thesis[]>;
  getStudents(): Promise<User[]>;
  createThesis(thesis: Partial<Thesis>): Promise<Thesis>;
  updateThesis(thesisId: string, thesis: Partial<Thesis>): Promise<Thesis>;
  deleteThesis(thesisId: string): Promise<void>;
  setNavigate?(navigate: any): void;
}
