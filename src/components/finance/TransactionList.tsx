
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFinance } from '@/contexts/FinanceContext';

const TransactionList: React.FC = () => {
  const { state, deleteTransaction } = useFinance();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getTransactionIcon = (category: string, type: 'income' | 'expense') => {
    const icons: { [key: string]: string } = {
      'Salário': '💰',
      'Freelance': '💻',
      'Investimentos': '📈',
      'Moradia': '🏠',
      'Alimentação': '🍽️',
      'Transporte': '🚗',
      'Saúde': '🏥',
      'Educação': '📚',
      'Lazer': '🎬',
      'Compras': '🛍️',
      'Outros': type === 'income' ? '💵' : '💸',
    };
    return icons[category] || (type === 'income' ? '💵' : '💸');
  };

  const recentTransactions = state.transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <Card className="finance-card">
      <CardHeader className="finance-card-header">
        <CardTitle>Transações Recentes</CardTitle>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item group">
              <div className="flex items-center space-x-3 flex-1">
                <div className="text-2xl">
                  {getTransactionIcon(transaction.category, transaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`category-badge ${
                      transaction.type === 'income' ? 'income-badge' : 'expense-badge'
                    }`}>
                      {transaction.category}
                    </span>
                    <span className="finance-stat-small">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-finance-success' 
                    : 'text-finance-expense'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
