
import React, { useState } from 'react';
import { FinanceLayout } from '@/components/FinanceLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFinance } from '@/contexts/FinanceContext';
import { useToast } from '@/hooks/use-toast';
import TransactionModal from '@/components/TransactionModal';
import FilterModal from '@/components/FilterModal';

const Transactions: React.FC = () => {
  const { state, addTransaction, deleteTransaction } = useFinance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
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

  const filteredTransactions = state.transactions
    .filter(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || transaction.category === selectedCategory)
    )
    .sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a];
      let bValue = b[sortBy as keyof typeof b];
      
      if (sortBy === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      deleteTransaction(id);
      toast({
        title: "Transação excluída",
        description: "A transação foi removida com sucesso.",
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('date');
    setSortOrder('desc');
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos.",
    });
  };

  const exportTransactions = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Data,Descrição,Categoria,Tipo,Valor\n" +
      filteredTransactions.map(t => 
        `${t.date},${t.description},${t.category},${t.type},${t.amount}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transacoes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportação concluída",
      description: "Suas transações foram exportadas com sucesso.",
    });
  };

  return (
    <FinanceLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transações</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas transações financeiras
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline" onClick={() => setShowFilterModal(true)}>
              🔍 Filtrar
            </Button>
            <Button variant="outline" onClick={exportTransactions}>
              📊 Exportar
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              ➕ Nova Transação
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="finance-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Buscar</Label>
                <Input
                  id="search"
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  <option value="Salário">Salário</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Moradia">Moradia</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Lazer">Lazer</option>
                </select>
              </div>
              <div>
                <Label htmlFor="sortBy">Ordenar por</Label>
                <select
                  id="sortBy"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Data</option>
                  <option value="amount">Valor</option>
                  <option value="description">Descrição</option>
                </select>
              </div>
              <div className="flex items-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '⬆️' : '⬇️'}
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  🗑️ Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>
              Transações ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
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
                      onClick={() => handleDelete(transaction.id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhuma transação encontrada
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setShowAddModal(true)}
                  >
                    ➕ Adicionar primeira transação
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <TransactionModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
        
        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={(filters) => {
            setSelectedCategory(filters.category);
            setSortBy(filters.sortBy);
            setSortOrder(filters.sortOrder);
            setShowFilterModal(false);
          }}
        />
      </div>
    </FinanceLayout>
  );
};

export default Transactions;
