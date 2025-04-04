
import React from "react";
import { BookOpen, User } from "lucide-react";
import { User as UserType } from "@/types/auth";
import DashboardCard from "./DashboardCard";

interface StudentDashboardProps {
  user: UserType;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Вітаємо, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">
          Вітаємо у системі управління бакалаврськими темами! Тут ви можете переглянути доступні теми та обрати собі тему для бакалаврської роботи.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Доступні теми"
          description="Перегляньте доступні бакалаврські теми"
          icon={<BookOpen className="h-6 w-6" />}
          count={42}
          linkTo="/theses"
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

export default StudentDashboard;
