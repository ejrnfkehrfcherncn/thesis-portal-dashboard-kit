
import { AdminClient } from "../interfaces/adminClient";
import { User } from "@/types/auth";
import { mockUsersList } from "./data/users";
import { toast } from "sonner";

export class MockAdminClient implements AdminClient {
  private navigateFunction: any = null;
  private mockSettings: Record<string, any> = {
    allowStudentRegistration: true,
    thesisSelectionDeadline: "2023-12-31",
    maxThesesPerSupervisor: 10,
    emailNotifications: true,
    systemName: "Система управління бакалаврськими темами"
  };
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  setNavigate(navigate: any): void {
    this.navigateFunction = navigate;
  }
  
  async getUsers(): Promise<User[]> {
    await this.delay();
    return [...mockUsersList];
  }
  
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    await this.delay();
    
    const user = mockUsersList.find(u => u.id === userId);
    if (!user) {
      throw new Error("Користувача не знайдено");
    }
    
    // Update user properties
    if (userData.name) user.name = userData.name;
    if (userData.username) user.username = userData.username;
    if (userData.authorities) user.authorities = userData.authorities;
    if (userData.avatar) user.avatar = userData.avatar;
    
    toast.success("Користувача успішно оновлено!");
    return user;
  }
  
  async deleteUser(userId: string): Promise<void> {
    await this.delay();
    
    const index = mockUsersList.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new Error("Користувача не знайдено");
    }
    
    // In a real app, we would remove from database
    mockUsersList.splice(index, 1);
    toast.success("Користувача успішно видалено!");
  }
  
  async createUser(userData: Partial<User>): Promise<User> {
    await this.delay();
    
    if (!userData.name || !userData.username || !userData.authorities) {
      throw new Error("Не всі обов'язкові поля заповнені");
    }
    
    // Create a new user
    const newUser: User = {
      id: `${mockUsersList.length + 1}`,
      name: userData.name,
      username: userData.username,
      authorities: userData.authorities,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
    };
    
    // In a real app, we would add this to the database
    mockUsersList.push(newUser);
    toast.success("Користувача успішно створено!");
    
    return newUser;
  }
  
  async getSystemSettings(): Promise<Record<string, any>> {
    await this.delay();
    return { ...this.mockSettings };
  }
  
  async updateSystemSettings(settings: Record<string, any>): Promise<Record<string, any>> {
    await this.delay();
    
    // Update settings
    this.mockSettings = { ...this.mockSettings, ...settings };
    toast.success("Налаштування успішно оновлено!");
    
    return { ...this.mockSettings };
  }
}

export default MockAdminClient;
