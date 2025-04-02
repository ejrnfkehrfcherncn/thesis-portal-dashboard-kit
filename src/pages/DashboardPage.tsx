
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, Users } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getWelcomeMessage = () => {
    switch (user.role) {
      case "Student":
        return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете переглянути доступні теми та обрати собі тему для бакалаврської роботи.";
      case "Supervisor":
        return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете керувати темами, які ви запропонували, та студентами, які обрали ваші теми.";
      case "DepartmentHead":
        return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете переглядати та керувати всіма темами та викладачами вашого відділення.";
      case "Admin":
        return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете керувати всіма аспектами системи, включаючи користувачів та налаштування.";
      default:
        return "Вітаємо у системі управління бакалаврськими темами!";
    }
  };

  const getDashboardCards = () => {
    switch (user.role) {
      case "Student":
        return (
          <>
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
          </>
        );
      case "Supervisor":
        return (
          <>
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
          </>
        );
      case "DepartmentHead":
        return (
          <>
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
          </>
        );
      case "Admin":
        return (
          <>
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Вітаємо, {user.name}!</h1>
          <p className="text-muted-foreground mt-2">
            {getWelcomeMessage()}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getDashboardCards()}
        </div>
      </div>
    </DashboardLayout>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
  linkTo: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  count,
  linkTo,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className="bg-academy-100 text-academy-700 p-2 rounded-full">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {count !== undefined && (
          <div className="text-3xl font-bold mb-2">{count}</div>
        )}
        <CardDescription>{description}</CardDescription>
        <a
          href={linkTo}
          className="text-academy-600 hover:text-academy-800 text-sm font-medium mt-4 inline-block"
        >
          Перейти →
        </a>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
