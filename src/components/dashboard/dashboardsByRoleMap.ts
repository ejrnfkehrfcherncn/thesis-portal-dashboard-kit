
import { UserRole } from "@/types/auth";
import StudentDashboard from "./StudentDashboard";
import SupervisorDashboard from "./SupervisorDashboard";
import AdminDashboard from "./AdminDashboard";
import DepartmentHeadDashboard from "./DepartmentHeadDashboard";

export const dashboardsByRole = {
  "ROLE_STUDENT": StudentDashboard,
  "ROLE_SUPERVISOR": SupervisorDashboard,
  "ROLE_ADMIN": AdminDashboard,
  "ROLE_DEPARTMENTHEAD": DepartmentHeadDashboard,
} as const;
