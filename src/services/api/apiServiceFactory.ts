
import { ApiService } from "./interfaces/apiService";
import MockApiService from "./mockApiService";
import RealApiService from "./realApiService";

// Set this to false to use the real API service
export const USE_MOCK_SERVICE = true;

// API base URL for the real service
const API_BASE_URL = "http://localhost:8080/api";

export function createApiService(): ApiService {
  if (USE_MOCK_SERVICE) {
    console.log("Using mock API service");
    return new MockApiService();
  } else {
    console.log("Using real API service with base URL:", API_BASE_URL);
    return new RealApiService(API_BASE_URL);
  }
}

// Create a singleton instance
const apiService = createApiService();
export default apiService;
