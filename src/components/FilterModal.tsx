
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    category: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'date',
    sortOrder: 'desc' as 'asc' | 'desc'
  });

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filter-category">Categoria</Label>
              <select
                id="filter-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
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

            <div className="space-y-2">
              <Label htmlFor="filter-sortBy">Ordenar por</Label>
              <select
                id="filter-sortBy"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              >
                <option value="date">Data</option>
                <option value="amount">Valor</option>
                <option value="description">Descrição</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-sortOrder">Ordem</Label>
              <select
                id="filter-sortOrder"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.sortOrder}
                onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }))}
              >
                <option value="desc">Decrescente</option>
                <option value="asc">Crescente</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2 pt-6">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Limpar
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1"
            >
              Aplicar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterModal;
