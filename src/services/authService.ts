
import { AuthResponse, LoginCredentials, User } from "@/types/auth";
import { createAuthClient } from "@/clients/clientFactory";
import { toast } from "sonner";

export class AuthService {
  private authClient = createAuthClient();

  setNavigate(navigate: any) {
    this.authClient.setNavigate && this.authClient.setNavigate(navigate);
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await this.authClient.login(credentials);
      toast.success("Ласкаво просимо!");
      return response.user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка входу. Перевірте ваші дані.";
      toast.error(errorMessage);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authClient.logout();
      toast.success("Ви успішно вийшли з системи");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Помилка при виході з системи";
      toast.error(errorMessage);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return await this.authClient.getCurrentUser();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }
}

// Create singleton instance
export const authService = new AuthService();
export default authService;
