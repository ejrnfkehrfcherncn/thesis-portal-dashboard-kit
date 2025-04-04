
import { toast } from 'sonner';
import { removeItem, LOCAL_STORAGE_KEYS } from '@/services/localStorage';

export class BaseHttpClient {
  protected baseUrl: string;
  protected navigate: any;

  constructor(baseUrl: string, navigate?: any) {
    this.baseUrl = baseUrl;
    this.navigate = navigate;
  }

  setNavigate(navigate: any) {
    this.navigate = navigate;
  }

  private handleUnauthorized() {
    removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    toast.error("Сесія завершена. Будь ласка, увійдіть знову.");
    this.navigate ? this.navigate("/login") : window.location.href = "/login";
  }

  private handleError(response: Response): Promise<never> {
    if (response.status === 401) this.handleUnauthorized();
    if (response.status === 403 && this.navigate) this.navigate("/unauthorized");
    if (response.status === 500 && this.navigate) this.navigate("/500");

    return response.json().then(data => {
      toast.error(data.message || `Error ${response.status}`);
      return Promise.reject(data);
    });
  }

  async request<T>(endpoint: string, method: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    if (!response.ok) return this.handleError(response);
    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "GET");
  }

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, "POST", data);
  }

  put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, "PUT", data);
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "DELETE");
  }
}

export default BaseHttpClient;
