import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  initialData?: Transaction;
  userRole?: 'admin' | 'user' | 'read-only';
}

const categories = {
  income: ['Salary', 'Freelance', 'Investments', 'Business', 'Other Income'],
  expense: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other Expense']
};

export const TransactionForm = ({ onSubmit, onCancel, initialData, userRole = 'user' }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'expense' as 'income' | 'expense',
    amount: initialData?.amount || 0,
    category: initialData?.category || '',
    description: initialData?.description || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const isReadOnly = userRole === 'read-only';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    if (isReadOnly) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-card shadow-elegant border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {initialData ? 'Edit Transaction' : 'Add New Transaction'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange('type', value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount || ''}
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
              disabled={isReadOnly}
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories[formData.type].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                disabled={isReadOnly}
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this transaction..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={isReadOnly}
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            {!isReadOnly && (
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={!formData.amount || !formData.category}
              >
                {initialData ? 'Update' : 'Add'} Transaction
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};