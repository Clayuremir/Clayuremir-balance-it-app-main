
import React, { useState } from 'react';
import { FinanceLayout } from '@/components/FinanceLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BudgetModal from '@/components/BudgetModal';

const Budgets: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const mockBudgets = [
    { id: '1', category: 'Alimentação', budget: 800, spent: 650, icon: '🍽️' },
    { id: '2', category: 'Transporte', budget: 300, spent: 280, icon: '🚗' },
    { id: '3', category: 'Lazer', budget: 400, spent: 520, icon: '🎬' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      toast({
        title: "Orçamento excluído",
        description: "O orçamento foi removido com sucesso.",
      });
    }
  };

  return (
    <FinanceLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orçamentos</h1>
            <p className="text-muted-foreground mt-1">
              Controle seus gastos por categoria
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            ➕ Novo Orçamento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBudgets.map((budget) => {
            const percentage = Math.min((budget.spent / budget.budget) * 100, 100);
            return (
              <Card key={budget.id} className="finance-card">
                <CardHeader className="finance-card-header">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{budget.icon}</span>
                    <span>{budget.category}</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(budget.id)}
                  >
                    🗑️
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Gasto</span>
                      <span className="font-semibold">{formatCurrency(budget.spent)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Orçamento</span>
                      <span className="font-semibold">{formatCurrency(budget.budget)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progresso</span>
                        <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(budget.spent, budget.budget)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">Restante</span>
                      <span className={`font-semibold ${budget.spent > budget.budget ? 'text-red-500' : 'text-green-500'}`}>
                        {formatCurrency(budget.budget - budget.spent)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <BudgetModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </div>
    </FinanceLayout>
  );
};

export default Budgets;
