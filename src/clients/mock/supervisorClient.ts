
import { SupervisorClient } from "../interfaces/supervisorClient";
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";
import { mockTheses } from "./data/theses";
import { mockUsersList } from "./data/users";
import { toast } from "sonner";

export class MockSupervisorClient implements SupervisorClient {
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
    // In a real app, we would filter by current supervisor's ID
    return mockTheses;
  }
  
  async getStudents(): Promise<User[]> {
    await this.delay();
    // Return only student users
    return mockUsersList.filter(user => 
      user.authorities.includes("ROLE_STUDENT")
    );
  }
  
  async createThesis(thesis: Partial<Thesis>): Promise<Thesis> {
    await this.delay();
    
    // Create a new thesis
    const newThesis: Thesis = {
      id: `${mockTheses.length + 1}`,
      title: thesis.title || "Нова тема",
      description: thesis.description || "",
      supervisor: thesis.supervisor || {
        id: "2",
        name: "Петро Викладач",
        username: "xsupervisor",
        authorities: ["ROLE_SUPERVISOR"]
      },
      status: "AVAILABLE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, we would add this to the database
    mockTheses.push(newThesis);
    toast.success("Тему успішно створено!");
    
    return newThesis;
  }
  
  async updateThesis(thesisId: string, thesisData: Partial<Thesis>): Promise<Thesis> {
    await this.delay();
    
    const thesis = mockTheses.find(t => t.id === thesisId);
    if (!thesis) {
      throw new Error("Тему не знайдено");
    }
    
    // Update thesis properties
    if (thesisData.title) thesis.title = thesisData.title;
    if (thesisData.description) thesis.description = thesisData.description;
    if (thesisData.status) thesis.status = thesisData.status;
    
    thesis.updatedAt = new Date().toISOString();
    
    toast.success("Тему успішно оновлено!");
    return thesis;
  }
  
  async deleteThesis(thesisId: string): Promise<void> {
    await this.delay();
    
    const index = mockTheses.findIndex(t => t.id === thesisId);
    if (index === -1) {
      throw new Error("Тему не знайдено");
    }
    
    // In a real app, we would remove from database
    mockTheses.splice(index, 1);
    toast.success("Тему успішно видалено!");
  }
}

export default MockSupervisorClient;
