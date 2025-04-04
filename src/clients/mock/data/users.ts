
import { User, UserRole } from "@/types/auth";

// Mock users with arrays of authorities
export const mockUsers: Record<string, User> = {
  "xstudent": {
    id: "1",
    name: "Іван Студентський",
    username: "xstudent",
    authorities: ["ROLE_STUDENT"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student"
  },
  "xsupervisor": {
    id: "2",
    name: "Петро Викладач",
    username: "xsupervisor",
    authorities: ["ROLE_SUPERVISOR"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supervisor"
  },
  "xhead": {
    id: "3",
    name: "Ольга Завідувач",
    username: "xhead",
    authorities: ["ROLE_DEPARTMENTHEAD"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=head"
  },
  "xadmin": {
    id: "4",
    name: "Марія Адмін",
    username: "xadmin",
    authorities: ["ROLE_ADMIN", "ROLE_SUPERVISOR"], // Admin can also act as supervisor
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  }
};

// List of all users
export const mockUsersList: User[] = Object.values(mockUsers);

// Mock passwords
export const mockPasswords: Record<string, string> = {
  "xstudent": "pass",
  "xsupervisor": "pass",
  "xhead": "pass",
  "xadmin": "pass"
};
