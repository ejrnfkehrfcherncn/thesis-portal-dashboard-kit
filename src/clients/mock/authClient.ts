
import { AuthClient } from "../interfaces/authClient";
import { AuthResponse, LoginCredentials, User } from "@/types/auth";
import { getItem, setItem, removeItem, LOCAL_STORAGE_KEYS } from '@/services/localStorage';
import { mockUsers, mockPasswords } from "./data/users";

export class MockAuthClient implements AuthClient {
  private navigateFunction: any = null;
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setNavigate(navigate: any): void {
    this.navigateFunction = navigate;
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay();
    
    const user = mockUsers[credentials.username];
    const correctPassword = mockPasswords[credentials.username];
    
    if (!user || credentials.password !== correctPassword) {
      throw new Error("Неправильний username або пароль");
    }
    
    // Save the user in localStorage to persist login state
    setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, user);
    
    return { user };
  }
  
  async logout(): Promise<void> {
    await this.delay();
    removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  }
  
  async getCurrentUser(): Promise<User | null> {
    await this.delay();
    
    // Try to get the user from localStorage
    const storedUser = getItem<User>(LOCAL_STORAGE_KEYS.CURRENT_USER);
    return storedUser;
  }
}

export default MockAuthClient;
