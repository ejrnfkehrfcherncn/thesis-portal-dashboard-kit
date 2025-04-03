
import { toast } from 'sonner';
import { removeItem, LOCAL_STORAGE_KEYS } from '../localStorage';

export class HttpApiClient {
  private baseUrl: string;
  private navigate: any; // For using navigate

  constructor(baseUrl: string, navigate?: any) {
    this.baseUrl = baseUrl;
    this.navigate = navigate; // Initialize navigate
  }

  public setNavigate(navigate: any): void {
    this.navigate = navigate;
  }

  private handleUnauthorized(): void {
    // Clear user data from local storage
    removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    
    // Show session expired message
    toast.error("Ваша сесія закінчилася. Будь ласка, увійдіть знову.");
    
    // Navigate to login page if navigate function is available
    if (this.navigate) {
      this.navigate("/login");
    } else {
      // Fallback if navigate is not available
      window.location.href = "/login";
    }
  }

  public request<T>(
    endpoint: string,
    method: string,
    data?: unknown
  ): Promise<T> {
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include', // For cookie support
    })
      .then(response => {
        if (!response.ok) {
          // Handle status codes outside 200-299
          if (response.status === 401) {
            // 401 error - handle unauthorized
            this.handleUnauthorized();
          } else if (response.status === 403) {
            // 403 error - redirect to 403 page
            if (this.navigate) {
              this.navigate("/unauthorized");
            }
          } else if (response.status === 500) {
            // 500 error - redirect to 500 page
            if (this.navigate) {
              this.navigate("/500");
            }
          } else {
            // Handle other errors
            return response.json().then(errorData => {
              toast.error(errorData.message || `Error: ${response.status}`);
            });
          }

          // Throw error to trigger catch block
          return Promise.reject(`HTTP error! Status: ${response.status}`);
        }

        // If status is 2xx, return data
        return response.json();
      })
      .catch(error => {
        // Error handling
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        toast.error(errorMessage); // Use sonner for displaying errors
        throw error; // Throw error further
      });
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "GET");
  }

  public post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, "POST", data);
  }

  public put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, "PUT", data);
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "DELETE");
  }
}

export default HttpApiClient;
