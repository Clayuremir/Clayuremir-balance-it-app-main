
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import TransactionModal from './TransactionModal';
import SalaryModal from './SalaryModal';
import ResetDataModal from './ResetDataModal';

interface FinanceLayoutProps {
  children: React.ReactNode;
}

export const FinanceLayout: React.FC<FinanceLayoutProps> = ({ children }) => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/login');
    }
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transações', icon: '💰' },
    { path: '/budgets', label: 'Orçamentos', icon: '📋' },
    { path: '/reports', label: 'Relatórios', icon: '📈' },
    { path: '/ai-connect', label: 'IA Connect', icon: '🤖' },
    { path: '/settings', label: 'Configurações', icon: '⚙️' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/lovable-uploads/9102c6e4-8c47-4a4d-a70f-0dc8bc167ba6.png" 
                  alt="Monefy Logo" 
                  className="h-8 w-8"
                />
                <h1 className="text-xl font-bold text-gray-900">Monefy</h1>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsTransactionModalOpen(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                ➕ Adicionar Transação
              </Button>
              
              <Button
                onClick={() => setIsSalaryModalOpen(true)}
                variant="outline"
                size="sm"
              >
                💰 Adicionar Salário
              </Button>

              <Button
                onClick={() => setIsResetModalOpen(true)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                🗑️ Reset
              </Button>

              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Olá, {user.user_metadata?.name || user.email}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="text-gray-600"
                  >
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>

      {/* Modals */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />

      <SalaryModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
      />

      <ResetDataModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
};
