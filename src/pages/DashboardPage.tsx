import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, Users } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getWelcomeMessage = () => {
    if (user.authorities.includes("ROLE_STUDENT")) {
      return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете переглянути доступні теми та обрати собі тему для бакалаврської роботи.";
    }
    
    if (user.authorities.includes("ROLE_SUPERVISOR")) {
      return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете керувати темами, які ви запропонували, та студентами, які обрали ваші теми.";
    }
    
    if (user.authorities.includes("ROLE_DEPARTMENTHEAD")) {
      return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете переглядати та керувати всіма те��ами та викладачами вашого відділення.";
    }
    
    if (user.authorities.includes("ROLE_ADMIN")) {
      return "Вітаємо у системі управління бакалаврськими темами! Тут ви можете керувати всіма аспектами системи, включаючи користувачів та налаштування.";
    }
    
    return "Вітаємо у системі управління бакалаврськими темами!";
  };

  const getDashboardCards = () => {
    let cards = [];
    
    if (user.authorities.includes("ROLE_STUDENT")) {
      cards.push(
        <DashboardCard
          key="theses"
          title="Доступні теми"
          description="Перегляньте доступні бакалаврські теми"
          icon={<BookOpen className="h-6 w-6" />}
          count={42}
          linkTo="/theses"
        />
      );
    }
    
    if (user.authorities.includes("ROLE_SUPERVISOR")) {
      cards.push(
        <DashboardCard
          key="my-theses"
          title="Мої теми"
          description="Керуйте темами, які ви запропонували"
          icon={<BookOpen className="h-6 w-6" />}
          count={7}
          linkTo="/my-theses"
        />,
        <DashboardCard
          key="students"
          title="Мої студенти"
          description="Перегляньте своїх студентів"
          icon={<Users className="h-6 w-6" />}
          count={12}
          linkTo="/students"
        />
      );
    }
    
    if (user.authorities.includes("ROLE_DEPARTMENTHEAD")) {
      cards.push(
        <DashboardCard
          key="all-theses"
          title="Усі теми"
          description="Перегляньте та керуйте всіма темами"
          icon={<BookOpen className="h-6 w-6" />}
          count={128}
          linkTo="/all-theses"
        />,
        <DashboardCard
          key="supervisors"
          title="Викладачі"
          description="Керуйте викладачами відділення"
          icon={<Users className="h-6 w-6" />}
          count={23}
          linkTo="/supervisors"
        />
      );
    }
    
    if (user.authorities.includes("ROLE_ADMIN")) {
      cards.push(
        <DashboardCard
          key="users"
          title="Користувачі"
          description="Керуйте користувачами системи"
          icon={<Users className="h-6 w-6" />}
          count={248}
          linkTo="/users"
        />,
        <DashboardCard
          key="settings"
          title="Налаштування"
          description="Змініть налаштування системи"
          icon={<BookOpen className="h-6 w-6" />}
          linkTo="/settings"
        />
      );
    }
    
    // Always show profile card
    cards.push(
      <DashboardCard
        key="profile"
        title="Ваш профіль"
        description="Перегляньте та редагуйте ваш профіль"
        icon={<User className="h-6 w-6" />}
        linkTo="/profile"
      />
    );
    
    return cards;
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
