
import { AuthClient } from "../interfaces/authClient";
import { AuthResponse, LoginCredentials, User } from "@/types/auth";
import BaseHttpClient from "../baseHttpClient";
import { getItem, setItem, removeItem, LOCAL_STORAGE_KEYS } from '@/services/localStorage';

export class ApiAuthClient implements AuthClient {
  private http: BaseHttpClient;

  constructor(baseUrl: string) {
    this.http = new BaseHttpClient(`${baseUrl}/auth`);
  }

  setNavigate(navigate: any): void {
    this.http.setNavigate(navigate);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>("/login", credentials);
    if (response?.user) {
      setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, response.user);
    }
    return response;
  }
  
  async logout(): Promise<void> {
    await this.http.post<void>("/logout");
    removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  }
  
  async getCurrentUser(): Promise<User | null> {
    try {
      // Try to get from cache first
      const storedUser = getItem<User>(LOCAL_STORAGE_KEYS.CURRENT_USER);
      if (storedUser) {
        return storedUser;
      }
      
      // If not in cache, fetch from API
      const user = await this.http.get<User>("/me");
      
      // Cache the result
      if (user) {
        setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, user);
      }
      
      return user;
    } catch (error) {
      // If we get an error, clear any stored user and return null
      removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      return null;
    }
  }
}

export default ApiAuthClient;
