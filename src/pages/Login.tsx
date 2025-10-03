import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [role, setRole] = useState<"security" | "admin">("security");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (username && password) {
      toast({
        title: "Authentication Successful",
        description: `Welcome, ${username}`,
      });
      
      if (role === "security") {
        navigate("/security");
      } else {
        navigate("/admin");
      }
    } else {
      toast({
        title: "Authentication Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-highlight/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-xl border-card-border shadow-elevated relative z-10">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Campus Sentinel
            </h1>
          </div>
          <CardTitle className="text-xl">Access Control System</CardTitle>
          <CardDescription>Authenticate to continue</CardDescription>

          {/* Role Selection */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant={role === "security" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setRole("security")}
            >
              <User className="h-4 w-4 mr-2" />
              Security
            </Button>
            <Button
              type="button"
              variant={role === "admin" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setRole("admin")}
            >
              <Lock className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-muted bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-muted bg-background/50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full shadow-glow-primary"
            >
              <Lock className="h-4 w-4 mr-2" />
              AUTHENTICATE
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
