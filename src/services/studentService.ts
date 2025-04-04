
import { createStudentClient } from "@/clients/clientFactory";
import { Thesis } from "@/types/api";
import { toast } from "sonner";

export class StudentService {
  private studentClient = createStudentClient();

  setNavigate(navigate: any) {
    this.studentClient.setNavigate && this.studentClient.setNavigate(navigate);
  }

  async getTheses(): Promise<Thesis[]> {
    try {
      return await this.studentClient.getTheses();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні списку тем";
      toast.error(errorMessage);
      throw error;
    }
  }

  async selectThesis(thesisId: string): Promise<Thesis> {
    try {
      const result = await this.studentClient.selectThesis(thesisId);
      toast.success("Тему успішно обрано!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при виборі теми";
      toast.error(errorMessage);
      throw error;
    }
  }
}

// Create singleton instance
export const studentService = new StudentService();
export default studentService;
