
import { DepartmentHeadClient } from "../interfaces/departmentHeadClient";
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";
import { mockTheses } from "./data/theses";
import { mockUsersList } from "./data/users";
import { toast } from "sonner";

export class MockDepartmentHeadClient implements DepartmentHeadClient {
  private navigateFunction: any = null;
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  setNavigate(navigate: any): void {
    this.navigateFunction = navigate;
  }
  
  async getAllTheses(): Promise<Thesis[]> {
    await this.delay();
    // Return all theses
    return [...mockTheses];
  }
  
  async getSupervisors(): Promise<User[]> {
    await this.delay();
    // Return only supervisor users
    return mockUsersList.filter(user => 
      user.authorities.includes("ROLE_SUPERVISOR")
    );
  }
  
  async approveSupervisor(supervisorId: string): Promise<User> {
    await this.delay();
    
    const supervisor = mockUsersList.find(u => u.id === supervisorId);
    if (!supervisor) {
      throw new Error("Викладача не знайдено");
    }
    
    // In a real app, we would update the supervisor's status
    toast.success(`Викладача ${supervisor.name} схвалено!`);
    return supervisor;
  }
  
  async rejectSupervisor(supervisorId: string): Promise<void> {
    await this.delay();
    
    const supervisor = mockUsersList.find(u => u.id === supervisorId);
    if (!supervisor) {
      throw new Error("Викладача не знайдено");
    }
    
    // In a real app, we would update the supervisor's status
    toast.success(`Викладача ${supervisor.name} відхилено!`);
  }
}

export default MockDepartmentHeadClient;
