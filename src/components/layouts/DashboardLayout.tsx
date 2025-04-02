
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/auth";
import { 
  BookOpen, 
  ChevronRight, 
  Home, 
  LogOut, 
  Menu, 
  Settings, 
  User, 
  Users 
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Get navigation items based on user authorities
const getNavigation = (authorities: UserRole[]) => {
  const common = [
    { name: "Головна", href: "/dashboard", icon: Home },
    { name: "Профіль", href: "/profile", icon: User },
  ];

  let roleSpecificItems: Array<{ name: string; href: string; icon: any }> = [];

  if (authorities.includes("ROLE_STUDENT")) {
    roleSpecificItems = [
      ...roleSpecificItems,
      { name: "Теми", href: "/theses", icon: BookOpen },
    ];
  }

  if (authorities.includes("ROLE_SUPERVISOR")) {
    roleSpecificItems = [
      ...roleSpecificItems,
      { name: "Мої студенти", href: "/students", icon: Users },
      { name: "Мої теми", href: "/my-theses", icon: BookOpen },
    ];
  }

  if (authorities.includes("ROLE_DEPARTMENTHEAD")) {
    roleSpecificItems = [
      ...roleSpecificItems,
      { name: "Викладачі", href: "/supervisors", icon: Users },
      { name: "Усі теми", href: "/all-theses", icon: BookOpen },
    ];
  }

  if (authorities.includes("ROLE_ADMIN")) {
    roleSpecificItems = [
      ...roleSpecificItems,
      { name: "Користувачі", href: "/users", icon: Users },
      { name: "Налаштування", href: "/settings", icon: Settings },
    ];
  }

  return [...common, ...roleSpecificItems];
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (!user) return null;

  const navigation = getNavigation(user.authorities);
  
  const handleLogout = async () => {
    await logout();
  };

  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <img
                className="w-auto h-8"
                src="https://api.dicebear.com/7.x/shapes/svg?seed=portal"
                alt="Logo"
              />
              <h1 className="ml-3 text-xl font-semibold text-gray-800">Thesis Portal</h1>
            </div>
            <div className="flex flex-col flex-grow px-4 mt-5">
              <nav className="flex-1 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-academy-50 text-academy-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 flex-shrink-0 h-6 w-6",
                        location.pathname === item.href
                          ? "text-academy-700"
                          : "text-gray-400 group-hover:text-gray-500"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 border-t">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <Avatar className="inline-block">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 p-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Вийти
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="py-6 px-2 flex flex-col h-full">
              <div className="flex items-center mb-8">
                <img
                  className="w-auto h-8"
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=portal"
                  alt="Logo"
                />
                <h1 className="ml-3 text-xl font-semibold">Thesis Portal</h1>
              </div>
              
              <nav className="flex-1 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-academy-50 text-academy-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 flex-shrink-0 h-6 w-6",
                        location.pathname === item.href
                          ? "text-academy-700"
                          : "text-gray-400 group-hover:text-gray-500"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto">
                <div className="flex items-center p-4 border-t border-gray-200">
                  <Avatar className="inline-block">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {user.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Вийти
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="md:hidden py-6 px-4 sm:px-6 flex justify-between items-center border-b">
            <h1 className="text-2xl font-semibold text-gray-900">Thesis Portal</h1>
            <Avatar className="inline-block" onClick={() => console.log("Profile clicked")}>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="py-6 px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
