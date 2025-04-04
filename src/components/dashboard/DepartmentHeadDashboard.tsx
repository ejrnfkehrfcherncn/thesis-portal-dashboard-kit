
import React from "react";
import { BookOpen, User, Users } from "lucide-react";
import { User as UserType } from "@/types/auth";
import DashboardCard from "./DashboardCard";

interface DepartmentHeadDashboardProps {
  user: UserType;
}

const DepartmentHeadDashboard: React.FC<DepartmentHeadDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Вітаємо, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">
          Вітаємо у системі управління бакалаврськими темами! Тут ви можете переглядати та керувати всіма темами та викладачами вашого відділення.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Усі теми"
          description="Перегляньте та керуйте всіма темами"
          icon={<BookOpen className="h-6 w-6" />}
          count={128}
          linkTo="/all-theses"
        />
        <DashboardCard
          title="Викладачі"
          description="Керуйте викладачами відділення"
          icon={<Users className="h-6 w-6" />}
          count={23}
          linkTo="/supervisors"
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

export default DepartmentHeadDashboard;
