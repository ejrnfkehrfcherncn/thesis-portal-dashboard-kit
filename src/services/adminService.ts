
import { createAdminClient } from "@/clients/clientFactory";
import { User } from "@/types/auth";
import { toast } from "sonner";

export class AdminService {
  private adminClient = createAdminClient();

  setNavigate(navigate: any) {
    this.adminClient.setNavigate && this.adminClient.setNavigate(navigate);
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.adminClient.getUsers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні списку користувачів";
      toast.error(errorMessage);
      throw error;
    }
  }

  async updateUser(userId: string, user: Partial<User>): Promise<User> {
    try {
      const result = await this.adminClient.updateUser(userId, user);
      toast.success("Користувача успішно оновлено!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при оновленні користувача";
      toast.error(errorMessage);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.adminClient.deleteUser(userId);
      toast.success("Користувача успішно видалено!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при видаленні користувача";
      toast.error(errorMessage);
      throw error;
    }
  }

  async createUser(user: Partial<User>): Promise<User> {
    try {
      const result = await this.adminClient.createUser(user);
      toast.success("Користувача успішно створено!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при створенні користувача";
      toast.error(errorMessage);
      throw error;
    }
  }

  async getSystemSettings(): Promise<Record<string, any>> {
    try {
      return await this.adminClient.getSystemSettings();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при отриманні налаштувань системи";
      toast.error(errorMessage);
      throw error;
    }
  }

  async updateSystemSettings(settings: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await this.adminClient.updateSystemSettings(settings);
      toast.success("Налаштування успішно оновлено!");
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при оновленні налаштувань системи";
      toast.error(errorMessage);
      throw error;
    }
  }
}

// Create singleton instance
export const adminService = new AdminService();
export default adminService;
