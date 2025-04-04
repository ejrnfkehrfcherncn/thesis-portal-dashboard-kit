
import { User, UserRole } from "./auth";

export interface Thesis {
  id: string;
  title: string;
  description: string;
  supervisor: User;
  status: 'AVAILABLE' | 'ASSIGNED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  assignedTo?: User;
}

export interface ThesisResponse {
  thesis: Thesis;
}

export interface ThesesResponse {
  theses: Thesis[];
}
