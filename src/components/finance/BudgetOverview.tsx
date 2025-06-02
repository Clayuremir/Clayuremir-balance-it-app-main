
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFinance } from '@/contexts/FinanceContext';

const BudgetOverview: React.FC = () => {
  const { state } = useFinance();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-finance-danger';
    if (percentage >= 70) return 'bg-finance-warning';
    return 'bg-finance-success';
  };

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 100) return '⚠️ Excedido';
    if (percentage >= 90) return '🔥 Crítico';
    if (percentage >= 70) return '⚡ Atenção';
    return '✅ No limite';
  };

  return (
    <Card className="finance-card">
      <CardHeader className="finance-card-header">
        <CardTitle>Orçamentos do Mês</CardTitle>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {state.budgets.map((budget) => {
            const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground">
                      {budget.category}
                    </h4>
                    <span className="text-xs">
                      {getBudgetStatus(percentage)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2 ${getProgressColor(percentage)}`}
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">
                      {percentage.toFixed(1)}% utilizado
                    </span>
                    <span className={`font-medium ${
                      percentage >= 100 
                        ? 'text-finance-danger' 
                        : percentage >= 70 
                          ? 'text-finance-warning' 
                          : 'text-finance-success'
                    }`}>
                      {formatCurrency(budget.limit - budget.spent)} restante
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
