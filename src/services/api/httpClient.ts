import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export class HttpApiClient {
  private baseUrl: string;
  private navigate: any; // Для використання navigate

  constructor(baseUrl: string, navigate: any) {
    this.baseUrl = baseUrl;
    this.navigate = navigate; // Ініціалізуємо navigate
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
      credentials: 'include', // Для підтримки cookie
    })
      .then(response => {
        if (!response.ok) {
          // Якщо статус не в межах 200-299, обробляємо помилку
          if (response.status === 401) {
            // Помилка 401 - Перенаправлення на логін
            toast.error("Увійдіть ще раз.");
            this.navigate("/login");
          } else if (response.status === 403) {
            // Помилка 403 - Перенаправляємо на сторінку 403
            this.navigate("/403");
          } else if (response.status === 500) {
            // Помилка 500 - Перенаправляємо на сторінку 500
            this.navigate("/500");
          } else {
            // Обробка інших помилок
            return response.json().then(errorData => {
              toast.error(errorData.message || `Error: ${response.status}`);
            });
          }

          // Кидаємо помилку, щоб викинути її у блок catch
          return Promise.reject(`HTTP error! Status: ${response.status}`);
        }

        // Якщо статус в межах 2xx, повертаємо дані
        return response.json();
      })
      .catch(error => {
        // Обробка помилок
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        toast.error(errorMessage); // Використовуємо sonner для відображення помилки
        throw error; // Кидаємо помилку далі
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
