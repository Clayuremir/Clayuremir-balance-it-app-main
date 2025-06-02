
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const WhatsAppConnect: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Número inválido",
        description: "Por favor, insira um número de WhatsApp válido.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Simular conexão com API do WhatsApp
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular geração de QR Code
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp://send?phone=${phoneNumber}`);
      
      toast({
        title: "Conectando...",
        description: "Escaneie o QR Code no seu WhatsApp para confirmar a conexão.",
      });

      // Simular confirmação após 3 segundos
      setTimeout(() => {
        setIsConnected(true);
        localStorage.setItem('whatsapp_connected', 'true');
        localStorage.setItem('whatsapp_phone', phoneNumber);
        
        toast({
          title: "WhatsApp conectado!",
          description: "Agora você pode enviar gastos via WhatsApp.",
        });
      }, 3000);

    } catch (error) {
      toast({
        title: "Erro na conexão",
        description: "Não foi possível conectar ao WhatsApp. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setQrCode('');
    localStorage.removeItem('whatsapp_connected');
    localStorage.removeItem('whatsapp_phone');
    
    toast({
      title: "WhatsApp desconectado",
      description: "Sua conta foi desconectada do WhatsApp.",
    });
  };

  React.useEffect(() => {
    const connected = localStorage.getItem('whatsapp_connected');
    const savedPhone = localStorage.getItem('whatsapp_phone');
    
    if (connected && savedPhone) {
      setIsConnected(true);
      setPhoneNumber(savedPhone);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💬 Conectar WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isConnected ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Número do WhatsApp</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isConnecting}
                  />
                </div>

                <Button 
                  onClick={handleConnect} 
                  className="w-full"
                  disabled={isConnecting}
                >
                  {isConnecting ? '🔄 Conectando...' : '📱 Conectar WhatsApp'}
                </Button>
              </div>

              {qrCode && (
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img src={qrCode} alt="QR Code WhatsApp" className="w-48 h-48" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Escaneie este QR Code no seu WhatsApp
                  </p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">🚀 Como funciona:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Envie "gastei R$50 com mercado" no WhatsApp</li>
                  <li>• Receba resumos automáticos de gastos</li>
                  <li>• Alertas quando estourar o orçamento</li>
                  <li>• Dicas personalizadas de economia</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="font-semibold text-green-800">WhatsApp Conectado!</h3>
                <p className="text-sm text-green-700 mt-2">
                  Número: {phoneNumber}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold mb-2">📝 Comandos disponíveis:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Registrar gasto:</strong> "gastei R$50 com mercado"</p>
                  <p><strong>Ver gastos:</strong> "quanto gastei este mês?"</p>
                  <p><strong>Relatório:</strong> "meu resumo financeiro"</p>
                  <p><strong>Ajuda:</strong> "ajuda" ou "comandos"</p>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                className="w-full"
              >
                🔌 Desconectar WhatsApp
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppConnect;
