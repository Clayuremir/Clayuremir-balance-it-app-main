
import React, { useState } from 'react';
import { FinanceLayout } from '@/components/FinanceLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const mockReportData = {
    totalIncome: 5000,
    totalExpenses: 3500,
    balance: 1500,
    categories: [
      { name: 'Alimentação', amount: 800, percentage: 22.9 },
      { name: 'Transporte', amount: 600, percentage: 17.1 },
      { name: 'Moradia', amount: 1200, percentage: 34.3 },
      { name: 'Lazer', amount: 400, percentage: 11.4 },
      { name: 'Outros', amount: 500, percentage: 14.3 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Relatório gerado!",
        description: "Seu relatório foi gerado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao gerar o relatório.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = (format: string) => {
    toast({
      title: "Exportando relatório",
      description: `Relatório sendo exportado em formato ${format.toUpperCase()}.`,
    });
  };

  const printReport = () => {
    window.print();
    toast({
      title: "Imprimindo relatório",
      description: "Abrindo janela de impressão.",
    });
  };

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Relatório Financeiro - Monefy',
        text: 'Confira meu relatório financeiro',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado",
        description: "Link do relatório copiado para a área de transferência.",
      });
    }
  };

  return (
    <FinanceLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground mt-1">
              Análise detalhada das suas finanças
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button variant="outline" onClick={() => exportReport('pdf')}>
              📄 PDF
            </Button>
            <Button variant="outline" onClick={() => exportReport('excel')}>
              📊 Excel
            </Button>
            <Button variant="outline" onClick={printReport}>
              🖨️ Imprimir
            </Button>
            <Button variant="outline" onClick={shareReport}>
              📤 Compartilhar
            </Button>
          </div>
        </div>

        {/* Report Configuration */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>Configuração do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="reportType">Tipo de Relatório</Label>
                <select
                  id="reportType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="summary">Resumo Geral</option>
                  <option value="detailed">Detalhado</option>
                  <option value="category">Por Categoria</option>
                  <option value="monthly">Mensal</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="startDate">Data Inicial</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="endDate">Data Final</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={generateReport} 
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? '🔄 Gerando...' : '📊 Gerar Relatório'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="finance-card border-finance-success/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receitas</p>
                  <p className="text-2xl font-bold text-finance-success">
                    {formatCurrency(mockReportData.totalIncome)}
                  </p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card border-finance-expense/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Despesas</p>
                  <p className="text-2xl font-bold text-finance-expense">
                    {formatCurrency(mockReportData.totalExpenses)}
                  </p>
                </div>
                <div className="text-3xl">📉</div>
              </div>
            </CardContent>
          </Card>

          <Card className="finance-card border-primary/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo</p>
                  <p className={`text-2xl font-bold ${mockReportData.balance >= 0 ? 'text-finance-success' : 'text-finance-expense'}`}>
                    {formatCurrency(mockReportData.balance)}
                  </p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReportData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{formatCurrency(category.amount)}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({category.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" onClick={() => exportReport('csv')}>
            💾 Exportar CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport('json')}>
            📋 Exportar JSON
          </Button>
          <Button variant="outline" onClick={printReport}>
            🖨️ Versão para Impressão
          </Button>
          <Button onClick={shareReport}>
            📤 Compartilhar Relatório
          </Button>
        </div>
      </div>
    </FinanceLayout>
  );
};

export default Reports;
