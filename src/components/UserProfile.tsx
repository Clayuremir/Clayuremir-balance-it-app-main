
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useFinance } from '@/contexts/FinanceContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    salary: 5000,
    profession: 'Desenvolvedor',
    company: 'Tech Company',
    avatar: ''
  });
  const { toast } = useToast();
  const { state } = useFinance();

  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    onClose();
  };

  const handleSalaryUpdate = () => {
    toast({
      title: "Salário atualizado",
      description: `Salário definido para R$ ${profile.salary.toLocaleString('pt-BR')}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            👤 Meu Perfil
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar e Info Principal */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-2xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              📸 Alterar Foto
            </Button>
          </div>

          {/* Informações Pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="profession">Profissão</Label>
              <Input
                id="profession"
                value={profile.profession}
                onChange={(e) => setProfile({...profile, profession: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({...profile, company: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="salary">Salário Mensal (R$)</Label>
              <div className="flex space-x-2">
                <Input
                  id="salary"
                  type="number"
                  value={profile.salary}
                  onChange={(e) => setProfile({...profile, salary: Number(e.target.value)})}
                />
                <Button variant="outline" onClick={handleSalaryUpdate}>
                  💰 Definir
                </Button>
              </div>
            </div>
          </div>

          {/* Estatísticas Financeiras */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Transações</p>
                  <p className="text-2xl font-bold">{state.transactions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orçamentos</p>
                  <p className="text-2xl font-bold">{state.budgets.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                  <p className="text-2xl font-bold">
                    {state.categories.income.length + state.categories.expense.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Economia</p>
                  <p className="text-2xl font-bold text-green-600">73%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex space-x-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              💾 Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
