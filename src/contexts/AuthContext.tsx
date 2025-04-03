
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/auth";
import { useService } from "@/hooks/use-service.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiService = useService();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const currentUser = await apiService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [apiService]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.login({ username, password });
      setUser(response.user);
      localStorage.setItem("currentUser", JSON.stringify(response.user));
      toast.success("Ласкаво просимо!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Помилка входу. Перевірте ваші дані.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiService.logout();
      setUser(null);
      toast.success("Ви успішно вийшли з системи");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Помилка при виході з системи");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
