
import React from "react";
import { BookOpen, User, Users } from "lucide-react";
import { User as UserType } from "@/types/auth";
import DashboardCard from "./DashboardCard";

interface AdminDashboardProps {
  user: UserType;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Вітаємо, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">
          Вітаємо у системі управління бакалаврськими темами! Тут ви можете керувати всіма аспектами системи, включаючи користувачів та налаштування.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Користувачі"
          description="Керуйте користувачами системи"
          icon={<Users className="h-6 w-6" />}
          count={248}
          linkTo="/users"
        />
        <DashboardCard
          title="Налаштування"
          description="Змініть налаштування системи"
          icon={<BookOpen className="h-6 w-6" />}
          linkTo="/settings"
        />
        <DashboardCard
          title="Ваш профіль"
          description="Перегляньте та редагуйте ваш профіль"
          icon={<User className="h-6 w-6" />}
          linkTo="/profile"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
