
import { StudentClient } from "../interfaces/studentClient";
import { Thesis } from "@/types/api";
import { mockTheses } from "./data/theses";
import { toast } from "sonner";

export class MockStudentClient implements StudentClient {
  private navigateFunction: any = null;
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  setNavigate(navigate: any): void {
    this.navigateFunction = navigate;
  }
  
  async getTheses(): Promise<Thesis[]> {
    await this.delay();
    // Return only available theses
    return mockTheses.filter(thesis => thesis.status === "AVAILABLE");
  }
  
  async selectThesis(thesisId: string): Promise<Thesis> {
    await this.delay();
    const thesis = mockTheses.find(t => t.id === thesisId);
    
    if (!thesis) {
      throw new Error("Тему не знайдено");
    }
    
    if (thesis.status !== "AVAILABLE") {
      throw new Error("Ця тема вже зайнята");
    }
    
    // Update thesis status (would be done on server in real app)
    thesis.status = "ASSIGNED";
    thesis.updatedAt = new Date().toISOString();
    
    toast.success("Тему успішно обрано!");
    return thesis;
  }
}

export default MockStudentClient;
