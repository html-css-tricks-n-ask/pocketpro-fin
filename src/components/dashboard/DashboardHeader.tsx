import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, PlusCircle } from "lucide-react";

interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyChange: number;
}

interface DashboardHeaderProps {
  stats: DashboardStats;
  onAddTransaction: () => void;
  userRole?: 'admin' | 'user' | 'read-only';
}

export const DashboardHeader = ({ stats, onAddTransaction, userRole = 'user' }: DashboardHeaderProps) => {
  const isReadOnly = userRole === 'read-only';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personal Finance Dashboard</h1>
          <p className="text-muted-foreground mt-2">Track your income, expenses, and financial goals</p>
        </div>
        {!isReadOnly && (
          <Button 
            onClick={onAddTransaction} 
            className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold">${stats.balance.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {stats.monthlyChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive mr-1" />
            )}
            <span className={`text-sm ${stats.monthlyChange >= 0 ? 'text-success' : 'text-destructive'}`}>
              {Math.abs(stats.monthlyChange)}% from last month
            </span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-success">${stats.totalIncome.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-gradient-success rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-destructive">${stats.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-destructive rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
              <p className="text-2xl font-bold text-info">
                {stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0}%
              </p>
            </div>
            <div className="h-12 w-12 bg-info rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};