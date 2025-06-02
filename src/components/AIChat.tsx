
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFinance } from '@/contexts/FinanceContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente financeiro. Posso ajudar você a registrar gastos, analisar seus relatórios e dar dicas de economia. Como posso ajudar?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state, addTransaction, calculateStats } = useFinance();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const processUserMessage = async (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Detectar comando de registro de gasto
    const gastoMatch = lowerMessage.match(/gastei?\s+r?\$?(\d+(?:,\d{2})?)\s+(?:com|em|de|para)?\s*(.+)/);
    if (gastoMatch) {
      const valor = parseFloat(gastoMatch[1].replace(',', '.'));
      const descricao = gastoMatch[2].trim();
      
      // Categorizar automaticamente baseado na descrição
      const categoria = categorizarGasto(descricao);
      
      addTransaction({
        type: 'expense',
        amount: valor,
        category: categoria,
        description: descricao,
        date: new Date().toISOString().split('T')[0]
      });

      return `💰 Gasto registrado com sucesso!\n\n💸 Valor: R$ ${valor.toFixed(2)}\n📝 Descrição: ${descricao}\n🏷️ Categoria: ${categoria}\n\nSeu gasto foi adicionado ao seu controle financeiro.`;
    }

    // Detectar consultas sobre gastos
    if (lowerMessage.includes('quanto gastei') || lowerMessage.includes('meus gastos')) {
      const stats = calculateStats();
      return `📊 Resumo dos seus gastos:\n\n💰 Saldo atual: R$ ${stats.totalBalance.toFixed(2)}\n📈 Receita mensal: R$ ${stats.monthlyIncome.toFixed(2)}\n📉 Gastos mensais: R$ ${stats.monthlyExpenses.toFixed(2)}\n\nVocê está ${stats.monthlyIncome > stats.monthlyExpenses ? 'economizando' : 'gastando mais que ganha'} este mês.`;
    }

    // Detectar pedidos de relatório
    if (lowerMessage.includes('relatório') || lowerMessage.includes('resumo')) {
      const stats = calculateStats();
      const maiorGasto = state.transactions
        .filter(t => t.type === 'expense')
        .sort((a, b) => b.amount - a.amount)[0];

      return `📈 Relatório Financeiro Mensal\n\n💰 Saldo: R$ ${stats.totalBalance.toFixed(2)}\n📊 Receitas: R$ ${stats.monthlyIncome.toFixed(2)}\n💸 Gastos: R$ ${stats.monthlyExpenses.toFixed(2)}\n\n🔥 Maior gasto: ${maiorGasto?.description || 'Nenhum'} - R$ ${maiorGasto?.amount.toFixed(2) || '0'}\n\n💡 Dica: ${gerarDicaPersonalizada(stats)}`;
    }

    // Detectar pedidos de dicas
    if (lowerMessage.includes('dica') || lowerMessage.includes('economizar')) {
      const stats = calculateStats();
      return `💡 Dica personalizada:\n\n${gerarDicaPersonalizada(stats)}\n\n📝 Outras sugestões:\n• Configure alertas de orçamento\n• Categorize melhor seus gastos\n• Defina metas mensais de economia`;
    }

    // Detectar comandos de ajuda
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('comandos')) {
      return `🤖 Comandos disponíveis:\n\n💸 "gastei R$50 com mercado" - Registrar gasto\n📊 "quanto gastei este mês?" - Ver gastos\n📈 "meu relatório" - Resumo completo\n💡 "dica de economia" - Sugestões\n❓ "ajuda" - Ver comandos\n\nDigite sua pergunta em linguagem natural!`;
    }

    // Resposta padrão com IA simulada
    return gerarRespostaIA(message);
  };

  const categorizarGasto = (descricao: string): string => {
    const descLower = descricao.toLowerCase();
    
    if (descLower.includes('mercado') || descLower.includes('supermercado') || descLower.includes('comida') || descLower.includes('restaurante')) {
      return 'Alimentação';
    }
    if (descLower.includes('uber') || descLower.includes('gasolina') || descLower.includes('combustível') || descLower.includes('ônibus')) {
      return 'Transporte';
    }
    if (descLower.includes('aluguel') || descLower.includes('conta') || descLower.includes('luz') || descLower.includes('água')) {
      return 'Moradia';
    }
    if (descLower.includes('cinema') || descLower.includes('festa') || descLower.includes('bar') || descLower.includes('lazer')) {
      return 'Lazer';
    }
    if (descLower.includes('remédio') || descLower.includes('médico') || descLower.includes('hospital')) {
      return 'Saúde';
    }
    
    return 'Outros';
  };

  const gerarDicaPersonalizada = (stats: any): string => {
    const dicas = [
      'Tente reduzir 10% dos gastos com alimentação usando cupons de desconto.',
      'Configure um orçamento mensal para cada categoria de gasto.',
      'Use a regra 50/30/20: 50% necessidades, 30% desejos, 20% poupança.',
      'Analise seus gastos semanalmente para identificar padrões.',
      'Considere cozinhar mais em casa para economizar com alimentação.',
    ];
    
    return dicas[Math.floor(Math.random() * dicas.length)];
  };

  const gerarRespostaIA = (message: string): string => {
    const respostas = [
      'Entendi! Como assistente financeiro, posso ajudar você com controle de gastos. Tem alguma transação para registrar?',
      'Ótima pergunta! Para te ajudar melhor, você gostaria de ver seus gastos recentes ou registrar uma nova despesa?',
      'Estou aqui para ajudar com suas finanças! Digite comandos como "gastei R$30 com café" ou "quanto gastei este mês?"',
      'Como seu assistente financeiro, posso analisar seus gastos e dar dicas personalizadas. O que você gostaria de saber?'
    ];
    
    return respostas[Math.floor(Math.random() * respostas.length)];
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      const response = await processUserMessage(newMessage);
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'ai',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Erro",
        description: "Não consegui processar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🤖 Assistente Financeiro IA
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem... (ex: gastei R$50 com mercado)"
            disabled={isTyping}
          />
          <Button onClick={handleSendMessage} disabled={isTyping || !newMessage.trim()}>
            📤
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
