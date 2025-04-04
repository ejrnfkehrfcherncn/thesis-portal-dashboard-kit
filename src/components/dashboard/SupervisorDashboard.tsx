
import React from "react";
import { BookOpen, User, Users } from "lucide-react";
import { User as UserType } from "@/types/auth";
import DashboardCard from "./DashboardCard";

interface SupervisorDashboardProps {
  user: UserType;
}

const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Вітаємо, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">
          Вітаємо у системі управління бакалаврськими темами! Тут ви можете керувати темами, які ви запропонували, та студентами, які обрали ваші теми.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Мої теми"
          description="Керуйте темами, які ви запропонували"
          icon={<BookOpen className="h-6 w-6" />}
          count={7}
          linkTo="/my-theses"
        />
        <DashboardCard
          title="Мої студенти"
          description="Перегляньте своїх студентів"
          icon={<Users className="h-6 w-6" />}
          count={12}
          linkTo="/students"
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

export default SupervisorDashboard;
