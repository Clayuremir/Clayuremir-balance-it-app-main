
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useFinance } from '@/contexts/FinanceContext';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const FinancialGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergência',
      targetAmount: 10000,
      currentAmount: 3500,
      deadline: '2024-12-31',
      category: 'Reserva'
    },
    {
      id: '2',
      name: 'Viagem Europa',
      targetAmount: 8000,
      currentAmount: 2100,
      deadline: '2024-07-15',
      category: 'Lazer'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: 'Reserva'
  });

  const [showForm, setShowForm] = useState(false);
  const { calculateStats } = useFinance();
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para criar a meta.",
        variant: "destructive",
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ name: '', targetAmount: '', deadline: '', category: 'Reserva' });
    setShowForm(false);

    toast({
      title: "Meta criada!",
      description: `Meta "${goal.name}" foi adicionada com sucesso.`,
    });
  };

  const updateGoalProgress = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.max(0, goal.currentAmount + amount) }
        : goal
    ));

    toast({
      title: "Progresso atualizado!",
      description: `Valor ${amount > 0 ? 'adicionado' : 'removido'} da meta.`,
    });
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    toast({
      title: "Meta removida",
      description: "A meta foi excluída com sucesso.",
    });
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = calculateStats();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            🎯 Metas Financeiras
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancelar' : '+ Nova Meta'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">💰 Saldo Atual</h3>
              <p className="text-2xl font-bold text-blue-900">
                R$ {stats.totalBalance.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">🎯 Metas Ativas</h3>
              <p className="text-2xl font-bold text-green-900">{goals.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">📈 Total Objetivos</h3>
              <p className="text-2xl font-bold text-purple-900">
                R$ {goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Add Goal Form */}
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>📝 Nova Meta Financeira</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-name">Nome da Meta</Label>
                    <Input
                      id="goal-name"
                      placeholder="Ex: Reserva de emergência"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="goal-amount">Valor Objetivo (R$)</Label>
                    <Input
                      id="goal-amount"
                      type="number"
                      placeholder="0,00"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="goal-deadline">Data Limite</Label>
                    <Input
                      id="goal-deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="goal-category">Categoria</Label>
                    <Select 
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reserva">💰 Reserva de Emergência</SelectItem>
                        <SelectItem value="Lazer">🏖️ Viagem/Lazer</SelectItem>
                        <SelectItem value="Educação">📚 Educação</SelectItem>
                        <SelectItem value="Casa">🏠 Casa/Imóvel</SelectItem>
                        <SelectItem value="Veículo">🚗 Veículo</SelectItem>
                        <SelectItem value="Investimento">📈 Investimento</SelectItem>
                        <SelectItem value="Outros">🎯 Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleAddGoal} className="w-full">
                  🎯 Criar Meta
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            {goals.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold text-muted-foreground">Nenhuma meta criada</h3>
                <p className="text-sm text-muted-foreground">
                  Crie sua primeira meta financeira para começar!
                </p>
              </div>
            ) : (
              goals.map((goal) => {
                const progress = getProgressPercentage(goal);
                const daysRemaining = getDaysRemaining(goal.deadline);
                const isOverdue = daysRemaining < 0;

                return (
                  <Card key={goal.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{goal.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {goal.category}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progresso</span>
                          <span className="text-sm font-medium">
                            {progress.toFixed(1)}%
                          </span>
                        </div>
                        
                        <Progress value={progress} className="h-3" />
                        
                        <div className="flex justify-between text-sm">
                          <span>R$ {goal.currentAmount.toFixed(2)}</span>
                          <span>R$ {goal.targetAmount.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`}>
                            {isOverdue 
                              ? `${Math.abs(daysRemaining)} dias em atraso`
                              : `${daysRemaining} dias restantes`
                            }
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Faltam: R$ {(goal.targetAmount - goal.currentAmount).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const amount = prompt('Quanto você quer adicionar?');
                              if (amount) updateGoalProgress(goal.id, parseFloat(amount));
                            }}
                          >
                            ➕ Adicionar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const amount = prompt('Quanto você quer remover?');
                              if (amount) updateGoalProgress(goal.id, -parseFloat(amount));
                            }}
                          >
                            ➖ Remover
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialGoals;
