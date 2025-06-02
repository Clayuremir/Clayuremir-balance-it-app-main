
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useFinance } from '@/contexts/FinanceContext';

interface SalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalaryModal: React.FC<SalaryModalProps> = ({ isOpen, onClose }) => {
  const [salaryData, setSalaryData] = useState({
    amount: '',
    frequency: 'monthly',
    payDay: '1',
    description: 'Salário'
  });
  
  const { addTransaction } = useFinance();
  const { toast } = useToast();

  const handleAddSalary = () => {
    if (!salaryData.amount) {
      toast({
        title: "Erro",
        description: "Por favor, insira o valor do salário.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(salaryData.amount);
    const today = new Date().toISOString().split('T')[0];

    addTransaction({
      type: 'income',
      amount: amount,
      category: 'Salário',
      description: salaryData.description,
      date: today,
      tags: ['salário', 'renda fixa']
    });

    toast({
      title: "Salário adicionado!",
      description: `Salário de R$ ${amount.toLocaleString('pt-BR')} foi registrado.`,
    });

    setSalaryData({
      amount: '',
      frequency: 'monthly',
      payDay: '1',
      description: 'Salário'
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            💰 Adicionar Salário
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Valor do Salário (R$)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0,00"
              value={salaryData.amount}
              onChange={(e) => setSalaryData({...salaryData, amount: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="frequency">Frequência</Label>
            <Select value={salaryData.frequency} onValueChange={(value) => setSalaryData({...salaryData, frequency: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="biweekly">Quinzenal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="payDay">Dia do Pagamento</Label>
            <Select value={salaryData.payDay} onValueChange={(value) => setSalaryData({...salaryData, payDay: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 31}, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    Dia {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={salaryData.description}
              onChange={(e) => setSalaryData({...salaryData, description: e.target.value})}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleAddSalary} className="flex-1">
              💾 Adicionar Salário
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryModal;
