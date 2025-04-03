
import { toast } from "sonner";

export class HttpApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return await response.json();
    }

    // Handle 401 Unauthorized globally
    if (response.status === 401) {
      // We'll redirect to login in the auth context
      throw new Error("UNAUTHORIZED");
    }

    // Handle other errors
    const errorData = await response.json().catch(() => ({
      message: "An unexpected error occurred"
    }));
    
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  public async request<T>(
    endpoint: string,
    method: string,
    data?: unknown
  ): Promise<T> {
    try {

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        mode: 'cors',
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : undefined
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        throw error; // Re-throw unauthorized error to be handled by auth context
      }
      
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }

  public async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "GET");
  }

  public async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, "POST", data);
  }

  public async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, "PUT", data);
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "DELETE");
  }
}

export default HttpApiClient;
