
import React, { useState } from 'react';
import { FinanceLayout } from '@/components/FinanceLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    name: 'Usuário Demo',
    email: 'demo@monefy.com',
    currency: 'BRL',
    language: 'pt-BR',
    notifications: true,
    darkMode: false,
    autoBackup: true,
    reminderTime: '18:00'
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Configurações salvas!",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
      setSettings({
        name: 'Usuário Demo',
        email: 'demo@monefy.com',
        currency: 'BRL',
        language: 'pt-BR',
        notifications: true,
        darkMode: false,
        autoBackup: true,
        reminderTime: '18:00'
      });
      toast({
        title: "Configurações restauradas",
        description: "As configurações padrão foram restauradas.",
      });
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'monefy-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Dados exportados",
      description: "Suas configurações foram exportadas com sucesso.",
    });
  };

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
    document.documentElement.classList.toggle('dark');
    toast({
      title: settings.darkMode ? "Modo claro ativado" : "Modo escuro ativado",
      description: "O tema foi alterado com sucesso.",
    });
  };

  return (
    <FinanceLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground mt-1">
              Personalize sua experiência no Monefy
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button variant="outline" onClick={handleReset}>
              🔄 Restaurar Padrões
            </Button>
            <Button variant="outline" onClick={handleExportData}>
              💾 Exportar Dados
            </Button>
          </div>
        </div>

        {/* Profile Settings */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={settings.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>Configurações do App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Moeda</Label>
                <select
                  id="currency"
                  name="currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={settings.currency}
                  onChange={handleInputChange}
                >
                  <option value="BRL">Real (BRL)</option>
                  <option value="USD">Dólar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="language">Idioma</Label>
                <select
                  id="language"
                  name="language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={settings.language}
                  onChange={handleInputChange}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div>
                <Label htmlFor="reminderTime">Horário de Lembrete</Label>
                <Input
                  id="reminderTime"
                  name="reminderTime"
                  type="time"
                  value={settings.reminderTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>Notificações e Preferências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre suas transações
                </p>
              </div>
              <input
                id="notifications"
                name="notifications"
                type="checkbox"
                checked={settings.notifications}
                onChange={handleInputChange}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="darkMode">Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Alternar entre tema claro e escuro
                </p>
              </div>
              <Button
                variant="outline"
                onClick={toggleDarkMode}
              >
                {settings.darkMode ? '🌞 Claro' : '🌙 Escuro'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Backup Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Fazer backup automático dos seus dados
                </p>
              </div>
              <input
                id="autoBackup"
                name="autoBackup"
                type="checkbox"
                checked={settings.autoBackup}
                onChange={handleInputChange}
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="finance-card">
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              🔐 Alterar Senha
            </Button>
            <Button variant="outline" className="w-full">
              📱 Configurar 2FA
            </Button>
            <Button variant="outline" className="w-full">
              📋 Ver Sessões Ativas
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full max-w-md"
          >
            {isSaving ? '💾 Salvando...' : '💾 Salvar Configurações'}
          </Button>
        </div>
      </div>
    </FinanceLayout>
  );
};

export default Settings;
