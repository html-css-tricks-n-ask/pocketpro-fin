import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseData {
  category: string;
  amount: number;
  color: string;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

const COLORS = [
  'hsl(172, 77%, 35%)',   // Primary
  'hsl(217, 91%, 60%)',   // Info
  'hsl(142, 71%, 45%)',   // Success
  'hsl(43, 96%, 56%)',    // Warning
  'hsl(0, 84%, 60%)',     // Destructive
  'hsl(210, 40%, 96%)',   // Secondary
];

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Expense Categories</CardTitle>
        <p className="text-sm text-muted-foreground">Breakdown of your spending by category</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium">{item.category}</span>
              </div>
              <span className="text-sm font-semibold">
                ${item.amount.toLocaleString()} ({((item.amount / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};