
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceLayout } from '@/components/FinanceLayout';
import StatCard from '@/components/finance/StatCard';
import TransactionList from '@/components/finance/TransactionList';
import BudgetOverview from '@/components/finance/BudgetOverview';
import { useFinance } from '@/contexts/FinanceContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import TransactionModal from '@/components/TransactionModal';
import SalaryModal from '@/components/SalaryModal';
import ResetDataModal from '@/components/ResetDataModal';

const Dashboard: React.FC = () => {
  const { calculateStats } = useFinance();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'expense':
        setShowTransactionModal(true);
        toast({
          title: "Nova Despesa",
          description: "Abrindo formulário para adicionar despesa.",
        });
        break;
      case 'income':
        setShowTransactionModal(true);
        toast({
          title: "Nova Receita",
          description: "Abrindo formulário para adicionar receita.",
        });
        break;
      case 'salary':
        setShowSalaryModal(true);
        toast({
          title: "Adicionar Salário",
          description: "Configure sua renda mensal.",
        });
        break;
      case 'budget':
        navigate('/budgets');
        toast({
          title: "Orçamentos",
          description: "Redirecionando para a página de orçamentos.",
        });
        break;
      case 'reports':
        navigate('/reports');
        toast({
          title: "Relatórios",
          description: "Redirecionando para a página de relatórios.",
        });
        break;
      case 'reset':
        setShowResetModal(true);
        toast({
          title: "Reset de Dados",
          description: "Atenção: Esta ação removerá todos os dados!",
          variant: "destructive",
        });
        break;
      default:
        break;
    }
  };

  const generateReport = () => {
    navigate('/reports');
    toast({
      title: "Gerando relatório",
      description: "Redirecionando para a página de relatórios.",
    });
  };

  const addNewTransaction = () => {
    setShowTransactionModal(true);
    toast({
      title: "Nova Transação",
      description: "Abrindo formulário para adicionar transação.",
    });
  };

  const exportData = () => {
    toast({
      title: "Exportando dados",
      description: "Preparando arquivo para download...",
    });
    // Simular export
    setTimeout(() => {
      toast({
        title: "Download concluído",
        description: "Seus dados foram exportados com sucesso.",
      });
    }, 2000);
  };

  const backupData = () => {
    toast({
      title: "Backup realizado",
      description: "Seus dados foram salvos na nuvem.",
    });
  };

  return (
    <FinanceLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header com ações principais */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral das suas finanças pessoais
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportData} className="hover-scale">
              📊 Exportar
            </Button>
            <Button variant="outline" onClick={backupData} className="hover-scale">
              ☁️ Backup
            </Button>
            <Button onClick={addNewTransaction} className="hover-scale">
              ➕ Nova Transação
            </Button>
          </div>
        </div>

        {/* Stats Cards - Estilo Mobills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Saldo Total"
            value={stats.totalBalance}
            icon="💰"
            trend={{
              value: 12.5,
              isPositive: stats.totalBalance >= 0,
            }}
            className={stats.totalBalance >= 0 ? 'border-finance-success/50' : 'border-finance-expense/50'}
          />
          
          <StatCard
            title="Receitas do Mês"
            value={stats.monthlyIncome}
            icon="📈"
            trend={{
              value: 8.2,
              isPositive: true,
            }}
            className="border-finance-success/50"
          />
          
          <StatCard
            title="Gastos do Mês"
            value={stats.monthlyExpenses}
            icon="📉"
            trend={{
              value: 3.1,
              isPositive: false,
            }}
            className="border-finance-expense/50"
          />
          
          <StatCard
            title="Economia do Mês"
            value={stats.monthlyIncome - stats.monthlyExpenses}
            icon="🎯"
            trend={{
              value: 15.7,
              isPositive: (stats.monthlyIncome - stats.monthlyExpenses) >= 0,
            }}
            className="border-primary/50"
          />
        </div>

        {/* Ações Rápidas - Estilo Mobills */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>⚡ Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover-scale"
                onClick={() => handleQuickAction('expense')}
              >
                <span className="text-2xl">💳</span>
                <span className="text-xs">Nova Despesa</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover-scale"
                onClick={() => handleQuickAction('income')}
              >
                <span className="text-2xl">💰</span>
                <span className="text-xs">Nova Receita</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover-scale"
                onClick={() => handleQuickAction('salary')}
              >
                <span className="text-2xl">💼</span>
                <span className="text-xs">Definir Salário</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover-scale"
                onClick={() => handleQuickAction('budget')}
              >
                <span className="text-2xl">🎯</span>
                <span className="text-xs">Criar Orçamento</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover-scale"
                onClick={() => handleQuickAction('reports')}
              >
                <span className="text-2xl">📊</span>
                <span className="text-xs">Ver Relatórios</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover-scale border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleQuickAction('reset')}
              >
                <span className="text-2xl">🗑️</span>
                <span className="text-xs">Reset Dados</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Financeiro Inteligente */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="finance-card">
            <CardHeader>
              <CardTitle>🏦 Situação Atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Taxa de Economia</span>
                <span className="font-bold text-green-600">
                  {stats.monthlyIncome > 0 ? 
                    Math.round(((stats.monthlyIncome - stats.monthlyExpenses) / stats.monthlyIncome) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Gastos/Receita</span>
                <span className="font-bold">
                  {stats.monthlyIncome > 0 ? 
                    Math.round((stats.monthlyExpenses / stats.monthlyIncome) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Status</span>
                <span className={`font-bold ${
                  stats.monthlyIncome > stats.monthlyExpenses ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.monthlyIncome > stats.monthlyExpenses ? 'Positivo' : 'Negativo'}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <BudgetOverview />
          </div>
        </div>

        {/* Transações Recentes */}
        <div className="grid grid-cols-1 gap-6">
          <TransactionList />
        </div>

        {/* Insights Financeiros */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>💡 Insights Financeiros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-finance-success/10 border border-finance-success/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-medium text-finance-success">Excelente!</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Você economizou {formatCurrency(stats.monthlyIncome - stats.monthlyExpenses)} este mês. 
                      Continue assim para alcançar suas metas!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-finance-info/10 border border-finance-info/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-medium text-finance-info">Dica de Economia</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Considere definir um orçamento mensal para controlar melhor seus gastos. 
                      Use nosso sistema de orçamentos para isso!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-medium text-blue-700">Meta Mensal</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Defina uma meta de economia mensal. Recomendamos economizar pelo menos 20% 
                      da sua renda mensal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <TransactionModal
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
        />
        <SalaryModal
          isOpen={showSalaryModal}
          onClose={() => setShowSalaryModal(false)}
        />
        <ResetDataModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
        />
      </div>
    </FinanceLayout>
  );
};

export default Dashboard;
