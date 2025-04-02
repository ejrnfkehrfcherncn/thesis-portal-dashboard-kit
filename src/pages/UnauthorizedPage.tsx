
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Helper function to format user roles for display
  const getRolesDisplay = () => {
    if (!user || !user.authorities || user.authorities.length === 0) {
      return "Немає ролей";
    }
    
    return user.authorities.join(", ");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">401 - Немає доступу</h1>
        <p className="text-xl text-gray-600 mb-8">
          {user
            ? `Ваші ролі (${getRolesDisplay()}) не мають доступу до цієї сторінки.`
            : "Ви не маєте доступу до цієї сторінки."}
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-academy-600 hover:bg-academy-700"
        >
          Повернутися на головну
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
