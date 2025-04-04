
import { Thesis } from "@/types/api";

export interface StudentClient {
  getTheses(): Promise<Thesis[]>;
  selectThesis(thesisId: string): Promise<Thesis>;
  setNavigate?(navigate: any): void;
}
