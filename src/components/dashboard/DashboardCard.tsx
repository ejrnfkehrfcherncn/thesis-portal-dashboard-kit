
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export default DashboardCard;
