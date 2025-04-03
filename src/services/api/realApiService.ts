
import { ApiService } from "./interfaces/apiService";
import { AuthResponse, LoginCredentials, User } from "@/types/auth";
import HttpApiClient from "./httpClient";
import { getItem, setItem, removeItem, LOCAL_STORAGE_KEYS } from '../localStorage';

export class RealApiService implements ApiService {
  private httpClient: HttpApiClient;
  
  constructor(baseUrl: string) {
    this.httpClient = new HttpApiClient(baseUrl);
  }
  
  setNavigate(navigate: any): void {
    this.httpClient.setNavigate(navigate);
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.httpClient.post<AuthResponse>("/auth/login", credentials);
    // Store user data in localStorage
    if (response && response.user) {
      setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, response.user);
    }
    return response;
  }
  
  async logout(): Promise<void> {
    await this.httpClient.post<void>("/auth/logout");
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
      const user = await this.httpClient.get<User>("/auth/me");
      
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

export default RealApiService;
