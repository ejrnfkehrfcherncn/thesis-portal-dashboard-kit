import { ApiService } from "./interfaces/apiService";
import { AuthResponse, LoginCredentials, User, UserRole } from "@/types/auth";

// Mock users with arrays of authorities
const mockUsers: Record<string, User> = {
  "student": {
    id: "1",
    name: "Іван Студентський",
    username: "student",
    authorities: ["ROLE_STUDENT"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student"
  },
  "supervisor": {
    id: "2",
    name: "Петро Викладач",
    username: "supervisor",
    authorities: ["ROLE_SUPERVISOR"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supervisor"
  },
  "head": {
    id: "3",
    name: "Ольга Завідувач",
    username: "head",
    authorities: ["ROLE_DEPARTMENTHEAD"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=head"
  },
  "admin": {
    id: "4",
    name: "Марія Адмін",
    username: "admin",
    authorities: ["ROLE_ADMIN", "ROLE_SUPERVISOR"], // Admin can also act as supervisor
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  }
};

// Mock passwords - in a real app, would be hashed and stored on server
const mockPasswords: Record<string, string> = {
  "student": "password",
  "supervisor": "password",
  "head": "password",
  "admin": "password"
};

export class MockApiService implements ApiService {
  private currentUser: User | null = null;
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    return { user };
  }
  
  async logout(): Promise<void> {
    await this.delay();
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }
  
  async getCurrentUser(): Promise<User | null> {
    await this.delay();
    
    // Try to get the user from memory first, then localStorage
    if (!this.currentUser) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    
    return this.currentUser;
  }
}

export default MockApiService;
