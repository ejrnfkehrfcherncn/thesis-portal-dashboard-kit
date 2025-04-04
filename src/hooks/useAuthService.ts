
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useAuthService() {
  const navigate = useNavigate();

  useEffect(() => {
    authService.setNavigate(navigate);
  }, [navigate]);

  return authService;
}

export default useAuthService;
