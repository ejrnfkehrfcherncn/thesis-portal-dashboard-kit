
import { useAuth } from '@/contexts/AuthContext';
import { studentService } from '@/services/studentService';
import { supervisorService } from '@/services/supervisorService';
import { departmentHeadService } from '@/services/departmentHeadService';
import { adminService } from '@/services/adminService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserRole } from '@/types/auth';

export function useRoleService() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Set navigate function for all services
  useEffect(() => {
    studentService.setNavigate(navigate);
    supervisorService.setNavigate(navigate);
    departmentHeadService.setNavigate(navigate);
    adminService.setNavigate(navigate);
  }, [navigate]);

  if (!user || !user.authorities || user.authorities.length === 0) {
    return null;
  }

  // Return appropriate service based on user's highest role
  if (user.authorities.includes('ROLE_ADMIN')) {
    return adminService;
  }

  if (user.authorities.includes('ROLE_DEPARTMENTHEAD')) {
    return departmentHeadService;
  }

  if (user.authorities.includes('ROLE_SUPERVISOR')) {
    return supervisorService;
  }

  if (user.authorities.includes('ROLE_STUDENT')) {
    return studentService;
  }

  return null;
}

export default useRoleService;
