
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, UserRole } from "@/types/auth";

// Update the type definition to specify that components accept a user prop
type RoleBasedRendererProps<T extends string> = {
  componentsMap: Record<T, React.ComponentType<{ user: User }>>;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
};

export function RoleBasedRenderer<T extends string>({
  componentsMap,
  fallback = <div>Unauthorized</div>,
  loading = <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-700"></div>
  </div>,
}: RoleBasedRendererProps<T>) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <>{loading}</>;
  if (!user || !user.authorities || user.authorities.length === 0) return <>{fallback}</>;

  // Find the first role that has a matching component
  const matchingRole = user.authorities.find(role => role in componentsMap) as T;
  
  if (!matchingRole) return <>{fallback}</>;
  
  const Component = componentsMap[matchingRole];
  return <Component user={user} />;
}

export default RoleBasedRenderer;
