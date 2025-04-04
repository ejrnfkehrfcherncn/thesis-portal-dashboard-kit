
import { USE_MOCK_SERVICE } from "@/config";
import ApiAuthClient from "./api/authClient";
import ApiStudentClient from "./api/studentClient";
import ApiSupervisorClient from "./api/supervisorClient";
import ApiDepartmentHeadClient from "./api/departmentHeadClient";
import ApiAdminClient from "./api/adminClient";
import MockAuthClient from "./mock/authClient";
import MockStudentClient from "./mock/studentClient";
import MockSupervisorClient from "./mock/supervisorClient";
import MockDepartmentHeadClient from "./mock/departmentHeadClient";
import MockAdminClient from "./mock/adminClient";
import { AuthClient } from "./interfaces/authClient";
import { StudentClient } from "./interfaces/studentClient";
import { SupervisorClient } from "./interfaces/supervisorClient";
import { DepartmentHeadClient } from "./interfaces/departmentHeadClient";
import { AdminClient } from "./interfaces/adminClient";

// API base URL for the real service
const API_BASE_URL = "http://localhost:8080/api";

// Create auth client
export function createAuthClient(): AuthClient {
  if (USE_MOCK_SERVICE) {
    console.log("Using mock auth client");
    return new MockAuthClient();
  } else {
    console.log("Using real auth client");
    return new ApiAuthClient(API_BASE_URL);
  }
}

// Create student client
export function createStudentClient(): StudentClient {
  if (USE_MOCK_SERVICE) {
    console.log("Using mock student client");
    return new MockStudentClient();
  } else {
    console.log("Using real student client");
    return new ApiStudentClient(API_BASE_URL);
  }
}

// Create supervisor client
export function createSupervisorClient(): SupervisorClient {
  if (USE_MOCK_SERVICE) {
    console.log("Using mock supervisor client");
    return new MockSupervisorClient();
  } else {
    console.log("Using real supervisor client");
    return new ApiSupervisorClient(API_BASE_URL);
  }
}

// Create department head client
export function createDepartmentHeadClient(): DepartmentHeadClient {
  if (USE_MOCK_SERVICE) {
    console.log("Using mock department head client");
    return new MockDepartmentHeadClient();
  } else {
    console.log("Using real department head client");
    return new ApiDepartmentHeadClient(API_BASE_URL);
  }
}

// Create admin client
export function createAdminClient(): AdminClient {
  if (USE_MOCK_SERVICE) {
    console.log("Using mock admin client");
    return new MockAdminClient();
  } else {
    console.log("Using real admin client");
    return new ApiAdminClient(API_BASE_URL);
  }
}
