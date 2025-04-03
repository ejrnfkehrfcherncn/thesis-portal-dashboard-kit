
import { ApiService } from "./interfaces/apiService";
import { AuthResponse, LoginCredentials, User, UserRole } from "@/types/auth";
import { getItem, setItem, removeItem, LOCAL_STORAGE_KEYS } from '../localStorage';

// Mock users with arrays of authorities
const mockUsers: Record<string, User> = {
  "xstudent": {
    id: "1",
    name: "Іван Студентський",
    username: "xstudent",
    authorities: ["ROLE_STUDENT"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student"
  },
  "xsupervisor": {
    id: "2",
    name: "Петро Викладач",
    username: "xsupervisor",
    authorities: ["ROLE_SUPERVISOR"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supervisor"
  },
  "xhead": {
    id: "3",
    name: "Ольга Завідувач",
    username: "xhead",
    authorities: ["ROLE_DEPARTMENTHEAD"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=head"
  },
  "xadmin": {
    id: "4",
    name: "Марія Адмін",
    username: "xadmin",
    authorities: ["ROLE_ADMIN", "ROLE_SUPERVISOR"], // Admin can also act as supervisor
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  }
};

// Mock passwords
const mockPasswords: Record<string, string> = {
  "xstudent": "pass",
  "xsupervisor": "pass",
  "xhead": "pass",
  "xadmin": "pass"
};

export class MockApiService implements ApiService {
  private currentUser: User | null = null;
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
    this.currentUser = user;
    setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, user);
    
    return { user };
  }
  
  async logout(): Promise<void> {
    await this.delay();
    this.currentUser = null;
    removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  }
  
  async getCurrentUser(): Promise<User | null> {
    await this.delay();
    
    // Try to get the user from memory first, then localStorage
    if (!this.currentUser) {
      const storedUser = getItem<User>(LOCAL_STORAGE_KEYS.CURRENT_USER);
      if (storedUser) {
        this.currentUser = storedUser;
      }
    }
    
    return this.currentUser;
  }
}

export default MockApiService;
