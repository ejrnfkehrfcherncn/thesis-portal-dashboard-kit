
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Award } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Будь ласка, заповніть усі поля");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await login(username, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Помилка входу. Спробуйте пізніше.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (role: string) => {
    setUsername(`${role}`);
    setPassword("password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-academy-100">
            <Award className="h-8 w-8 text-academy-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">DiplomaDistributor</CardTitle>
          <CardDescription>Sign in to access the thesis distribution system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full bg-academy-600 hover:bg-academy-700" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            For demonstration purposes, click a role to pre-fill
          </div>
          <div className="flex justify-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDemoLogin('student')}
            >
              Student
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDemoLogin('supervisor')}
            >
              Supervisor
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDemoLogin('head')}
            >
              Dept. Head
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDemoLogin('admin')}
            >
              Admin
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
