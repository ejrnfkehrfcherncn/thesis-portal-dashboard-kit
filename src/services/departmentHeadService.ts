
import { createDepartmentHeadClient } from "@/clients/clientFactory";
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";
import { toast } from "sonner";

export class DepartmentHeadService {
  private departmentHeadClient = createDepartmentHeadClient();

  setNavigate(navigate: any) {
    this.departmentHeadClient.setNavigate && this.departmentHeadClient.setNavigate(navigate);
  }

  async getAllTheses(): Promise<Thesis[]> {
    try {
      return await this.departmentHeadClient.getAllTheses();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні списку тем";
      toast.error(errorMessage);
      throw error;
    }
  }

  async getSupervisors(): Promise<User[]> {
    try {
      return await this.departmentHeadClient.getSupervisors();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні списку викладачів";
      toast.error(errorMessage);
      throw error;
    }
  }

  async approveSupervisor(supervisorId: string): Promise<User> {
    try {
      const result = await this.departmentHeadClient.approveSupervisor(supervisorId);
      toast.success("Викладача успішно схвалено!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при схваленні викладача";
      toast.error(errorMessage);
      throw error;
    }
  }

  async rejectSupervisor(supervisorId: string): Promise<void> {
    try {
      await this.departmentHeadClient.rejectSupervisor(supervisorId);
      toast.success("Викладача відхилено!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при відхиленні викладача";
      toast.error(errorMessage);
      throw error;
    }
  }
}

// Create singleton instance
export const departmentHeadService = new DepartmentHeadService();
export default departmentHeadService;
