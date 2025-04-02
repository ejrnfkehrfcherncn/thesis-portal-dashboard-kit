
import { ApiService } from "./interfaces/apiService";
import { AuthResponse, LoginCredentials, User } from "@/types/auth";
import HttpApiClient from "./httpClient";

export class RealApiService implements ApiService {
  private httpClient: HttpApiClient;
  
  constructor(baseUrl: string) {
    this.httpClient = new HttpApiClient(baseUrl);
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>("/auth/login", credentials);
  }
  
  async logout(): Promise<void> {
    await this.httpClient.post<void>("/auth/logout");
    localStorage.removeItem("currentUser");
  }
  
  async getCurrentUser(): Promise<User | null> {
    try {
      // Try to get from cache first
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      
      // If not in cache, fetch from API
      const user = await this.httpClient.get<User>("/auth/me");
      
      // Cache the result
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      
      return user;
    } catch (error) {
      // If we get an error, clear any stored user and return null
      localStorage.removeItem("currentUser");
      return null;
    }
  }
}

export default RealApiService;
