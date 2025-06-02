
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface NotificationPreferences {
  dailySummary: boolean;
  weeklySummary: boolean;
  budgetAlerts: boolean;
  financialTips: boolean;
  expenseReminders: boolean;
  summaryTime: string;
  alertThreshold: string;
}

const NotificationSettings: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    dailySummary: true,
    weeklySummary: true,
    budgetAlerts: true,
    financialTips: false,
    expenseReminders: true,
    summaryTime: '20:00',
    alertThreshold: '80'
  });
  
  const { toast } = useToast();

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectChange = (key: keyof NotificationPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('notification_preferences', JSON.stringify(preferences));
    
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências de notificação foram atualizadas.",
    });
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('notification_preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔔 Configurações de Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* WhatsApp Notifications */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              💬 Notificações WhatsApp
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-summary">Resumo Diário</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba um resumo dos gastos do dia
                  </p>
                </div>
                <Switch
                  id="daily-summary"
                  checked={preferences.dailySummary}
                  onCheckedChange={(value) => handleToggle('dailySummary', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-summary">Resumo Semanal</Label>
                  <p className="text-sm text-muted-foreground">
                    Relatório completo da semana com gráficos
                  </p>
                </div>
                <Switch
                  id="weekly-summary"
                  checked={preferences.weeklySummary}
                  onCheckedChange={(value) => handleToggle('weeklySummary', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Aviso quando estiver próximo do limite
                  </p>
                </div>
                <Switch
                  id="budget-alerts"
                  checked={preferences.budgetAlerts}
                  onCheckedChange={(value) => handleToggle('budgetAlerts', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="financial-tips">Dicas Financeiras</Label>
                  <p className="text-sm text-muted-foreground">
                    Sugestões personalizadas de economia
                  </p>
                </div>
                <Switch
                  id="financial-tips"
                  checked={preferences.financialTips}
                  onCheckedChange={(value) => handleToggle('financialTips', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="expense-reminders">Lembrete de Gastos</Label>
                  <p className="text-sm text-muted-foreground">
                    Lembrar de registrar gastos não categorizados
                  </p>
                </div>
                <Switch
                  id="expense-reminders"
                  checked={preferences.expenseReminders}
                  onCheckedChange={(value) => handleToggle('expenseReminders', value)}
                />
              </div>
            </div>
          </div>

          {/* Timing Settings */}
          <div>
            <h3 className="font-semibold mb-4">⏰ Configurações de Horário</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary-time">Horário do Resumo Diário</Label>
                <Select 
                  value={preferences.summaryTime} 
                  onValueChange={(value) => handleSelectChange('summaryTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00 - Manhã</SelectItem>
                    <SelectItem value="12:00">12:00 - Almoço</SelectItem>
                    <SelectItem value="18:00">18:00 - Final do dia</SelectItem>
                    <SelectItem value="20:00">20:00 - Noite</SelectItem>
                    <SelectItem value="22:00">22:00 - Antes de dormir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alert-threshold">Limite para Alertas (%)</Label>
                <Select 
                  value={preferences.alertThreshold} 
                  onValueChange={(value) => handleSelectChange('alertThreshold', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50% do orçamento</SelectItem>
                    <SelectItem value="70">70% do orçamento</SelectItem>
                    <SelectItem value="80">80% do orçamento</SelectItem>
                    <SelectItem value="90">90% do orçamento</SelectItem>
                    <SelectItem value="100">100% do orçamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Example Messages */}
          <div>
            <h3 className="font-semibold mb-4">📱 Exemplos de Mensagens</h3>
            
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-800">Resumo Diário:</p>
                <p className="text-sm text-green-700">
                  "💰 Hoje você gastou R$ 85,50. Principais gastos: Alimentação (R$ 45) e Transporte (R$ 25). Dentro do seu orçamento! 👍"
                </p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Alerta de Orçamento:</p>
                <p className="text-sm text-yellow-700">
                  "⚠️ Atenção! Você já gastou 80% do seu orçamento de Alimentação este mês. Restam R$ 120 para os próximos 10 dias."
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Dica Financeira:</p>
                <p className="text-sm text-blue-700">
                  "💡 Dica: Você gastou 30% mais com delivery esta semana. Que tal cozinhar em casa hoje? Economia estimada: R$ 25!"
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            💾 Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
