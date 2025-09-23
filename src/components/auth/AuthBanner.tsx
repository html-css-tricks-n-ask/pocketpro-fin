import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Eye } from "lucide-react";
import heroImage from "@/assets/finance-hero.jpg";

interface AuthBannerProps {
  userRole?: 'admin' | 'user' | 'read-only';
  userName?: string;
}

export const AuthBanner = ({ userRole = 'user', userName = 'Demo User' }: AuthBannerProps) => {
  const getRoleIcon = () => {
    switch (userRole) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'read-only':
        return <Eye className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return 'bg-destructive text-destructive-foreground';
      case 'user':
        return 'bg-primary text-primary-foreground';
      case 'read-only':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl">
      <div 
        className="h-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      <Card className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Welcome back, {userName}!</h2>
              <p className="text-sm text-muted-foreground">Manage your finances with ease</p>
            </div>
            <Badge className={`${getRoleColor()} flex items-center gap-1`}>
              {getRoleIcon()}
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};