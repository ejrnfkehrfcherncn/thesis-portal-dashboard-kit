
import { createSupervisorClient } from "@/clients/clientFactory";
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";
import { toast } from "sonner";

export class SupervisorService {
  private supervisorClient = createSupervisorClient();

  setNavigate(navigate: any) {
    this.supervisorClient.setNavigate && this.supervisorClient.setNavigate(navigate);
  }

  async getTheses(): Promise<Thesis[]> {
    try {
      return await this.supervisorClient.getTheses();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні списку тем";
      toast.error(errorMessage);
      throw error;
    }
  }

  async getStudents(): Promise<User[]> {
    try {
      return await this.supervisorClient.getStudents();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні списку студентів";
      toast.error(errorMessage);
      throw error;
    }
  }

  async createThesis(thesis: Partial<Thesis>): Promise<Thesis> {
    try {
      const result = await this.supervisorClient.createThesis(thesis);
      toast.success("Тему успішно створено!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при створенні теми";
      toast.error(errorMessage);
      throw error;
    }
  }

  async updateThesis(thesisId: string, thesis: Partial<Thesis>): Promise<Thesis> {
    try {
      const result = await this.supervisorClient.updateThesis(thesisId, thesis);
      toast.success("Тему успішно оновлено!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при оновленні теми";
      toast.error(errorMessage);
      throw error;
    }
  }

  async deleteThesis(thesisId: string): Promise<void> {
    try {
      await this.supervisorClient.deleteThesis(thesisId);
      toast.success("Тему успішно видалено!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при видаленні теми";
      toast.error(errorMessage);
      throw error;
    }
  }
}

// Create singleton instance
export const supervisorService = new SupervisorService();
export default supervisorService;
