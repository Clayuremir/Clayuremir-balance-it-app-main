
import React, { useState } from 'react';
import { FinanceLayout } from '@/components/FinanceLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WhatsAppConnect from '@/components/WhatsAppConnect';
import AIChat from '@/components/AIChat';
import NotificationSettings from '@/components/NotificationSettings';
import FinancialGoals from '@/components/FinancialGoals';

const AIConnect: React.FC = () => {
  const [activeTab, setActiveTab] = useState('whatsapp');

  return (
    <FinanceLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🤖 Monefy IA Connect</h1>
          <p className="text-muted-foreground">
            Conecte-se ao WhatsApp e converse com nossa IA para gerenciar suas finanças
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="whatsapp">💬 WhatsApp</TabsTrigger>
            <TabsTrigger value="ai-chat">🤖 IA Chat</TabsTrigger>
            <TabsTrigger value="notifications">🔔 Notificações</TabsTrigger>
            <TabsTrigger value="goals">🎯 Metas</TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>🚀 Conectar WhatsApp Business</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WhatsAppConnect />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">📋 Recursos WhatsApp:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        Registrar gastos por mensagem
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        Resumos automáticos diários
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        Alertas de orçamento em tempo real
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        Dicas personalizadas de economia
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        Consultas em linguagem natural
                      </li>
                    </ul>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">💡 Exemplos de comandos:</h4>
                      <div className="text-sm space-y-1">
                        <p><code>"gastei R$30 com uber"</code></p>
                        <p><code>"quanto gastei hoje?"</code></p>
                        <p><code>"meu relatório do mês"</code></p>
                        <p><code>"dica de economia"</code></p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-chat" className="space-y-4">
            <AIChat />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <FinancialGoals />
          </TabsContent>
        </Tabs>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Status das Integrações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">IA Assistant</p>
                  <p className="text-sm text-muted-foreground">Ativo e funcionando</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    {localStorage.getItem('whatsapp_connected') ? 'Conectado' : 'Desconectado'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Notificações</p>
                  <p className="text-sm text-muted-foreground">Configuradas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceLayout>
  );
};

export default AIConnect;
