import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { TransactionForm, Transaction } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";
import { AuthBanner } from "@/components/auth/AuthBanner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [userRole] = useState<'admin' | 'user' | 'read-only'>('user'); // Demo role
  const { toast } = useToast();

  // Mock data - In a real app, this would come from your backend
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      amount: 5000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-01-15'
    },
    {
      id: '2',
      type: 'expense',
      amount: 120,
      category: 'Food',
      description: 'Grocery shopping',
      date: '2024-01-14'
    },
    {
      id: '3',
      type: 'expense',
      amount: 80,
      category: 'Transport',
      description: 'Gas and parking',
      date: '2024-01-13'
    },
    {
      id: '4',
      type: 'expense',
      amount: 200,
      category: 'Entertainment',
      description: 'Concert tickets',
      date: '2024-01-12'
    }
  ]);

  const dashboardStats = {
    totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    balance: transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0),
    monthlyChange: 12.5
  };

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const existing = acc.find(item => item.category === transaction.category);
      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: transaction.amount,
          color: '#8884d8'
        });
      }
      return acc;
    }, [] as any[]);

  const trendData = [
    { month: 'Jan', income: 5000, expenses: 3200, balance: 1800 },
    { month: 'Feb', income: 5200, expenses: 2900, balance: 2300 },
    { month: 'Mar', income: 4800, expenses: 3100, balance: 1700 },
    { month: 'Apr', income: 5500, expenses: 3400, balance: 2100 },
    { month: 'May', income: 5000, expenses: 2800, balance: 2200 },
    { month: 'Jun', income: 5300, expenses: 3000, balance: 2300 },
  ];

  const handleAddTransaction = () => {
    if (userRole === 'read-only') {
      toast({
        title: "Access Denied",
        description: "Read-only users cannot add transactions.",
        variant: "destructive"
      });
      return;
    }
    setEditingTransaction(null);
    setShowTransactionForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    if (userRole === 'read-only') {
      toast({
        title: "Access Denied",
        description: "Read-only users cannot edit transactions.",
        variant: "destructive"
      });
      return;
    }
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (userRole === 'read-only') {
      toast({
        title: "Access Denied",
        description: "Read-only users cannot delete transactions.",
        variant: "destructive"
      });
      return;
    }
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction Deleted",
      description: "The transaction has been successfully deleted.",
    });
  };

  const handleSubmitTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => 
        t.id === editingTransaction.id 
          ? { ...transactionData, id: editingTransaction.id }
          : t
      ));
      toast({
        title: "Transaction Updated",
        description: "The transaction has been successfully updated.",
      });
    } else {
      const newTransaction: Transaction = {
        ...transactionData,
        id: Date.now().toString()
      };
      setTransactions(prev => [newTransaction, ...prev]);
      toast({
        title: "Transaction Added",
        description: "The transaction has been successfully added.",
      });
    }
    setShowTransactionForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AuthBanner userRole={userRole} userName="Demo User" />
        
        <DashboardHeader 
          stats={dashboardStats}
          onAddTransaction={handleAddTransaction}
          userRole={userRole}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpenseChart data={expenseData} />
          <TrendChart data={trendData} />
        </div>

        <div className="mt-8">
          <TransactionList 
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            userRole={userRole}
          />
        </div>

        <Dialog open={showTransactionForm} onOpenChange={setShowTransactionForm}>
          <DialogContent className="p-0 border-0 bg-transparent shadow-none">
            <TransactionForm
              onSubmit={handleSubmitTransaction}
              onCancel={() => setShowTransactionForm(false)}
              initialData={editingTransaction || undefined}
              userRole={userRole}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
