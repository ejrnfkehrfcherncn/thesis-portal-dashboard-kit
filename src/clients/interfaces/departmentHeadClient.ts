
import { Thesis } from "@/types/api";
import { User } from "@/types/auth";

export interface DepartmentHeadClient {
  getAllTheses(): Promise<Thesis[]>;
  getSupervisors(): Promise<User[]>;
  approveSupervisor(supervisorId: string): Promise<User>;
  rejectSupervisor(supervisorId: string): Promise<void>;
  setNavigate?(navigate: any): void;
}
