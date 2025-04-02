
import { ApiService } from "./interfaces/apiService";
import { AuthResponse, LoginCredentials, User, UserRole } from "@/types/auth";

// Mock users for each role
const mockUsers: Record<string, User> = {
  "student@example.com": {
    id: "1",
    name: "Іван Студентський",
    email: "student@example.com",
    role: "Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student"
  },
  "supervisor@example.com": {
    id: "2",
    name: "Петро Викладач",
    email: "supervisor@example.com",
    role: "Supervisor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supervisor"
  },
  "head@example.com": {
    id: "3",
    name: "Ольга Завідувач",
    email: "head@example.com",
    role: "DepartmentHead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=head"
  },
  "admin@example.com": {
    id: "4",
    name: "Марія Адмін",
    email: "admin@example.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  }
};

// Mock passwords - in a real app, would be hashed and stored on server
const mockPasswords: Record<string, string> = {
  "student@example.com": "password",
  "supervisor@example.com": "password",
  "head@example.com": "password",
  "admin@example.com": "password"
};

export class MockApiService implements ApiService {
  private currentUser: User | null = null;
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay();
    
    const user = mockUsers[credentials.email];
    const correctPassword = mockPasswords[credentials.email];
    
    if (!user || credentials.password !== correctPassword) {
      throw new Error("Неправильний email або пароль");
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
