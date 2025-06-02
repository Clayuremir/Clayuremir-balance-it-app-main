
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useFinance } from '@/contexts/FinanceContext';

interface ResetDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetDataModal: React.FC<ResetDataModalProps> = ({ isOpen, onClose }) => {
  const [confirmText, setConfirmText] = useState('');
  const [step, setStep] = useState(1);
  const { state } = useFinance();
  const { toast } = useToast();

  const handleReset = () => {
    if (confirmText !== 'RESETAR') {
      toast({
        title: "Erro",
        description: "Digite 'RESETAR' para confirmar.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você implementaria a lógica real de reset
    localStorage.clear();
    
    toast({
      title: "Dados resetados!",
      description: "Todos os dados foram removidos. Recarregue a página para começar do zero.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleStartFresh = () => {
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-red-600">
            🗑️ Reset de Dados
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="text-center space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">⚠️ Atenção!</h3>
                  <p className="text-sm text-red-700">
                    Esta ação irá remover TODOS os seus dados:
                  </p>
                  <ul className="text-sm text-red-700 mt-2 text-left">
                    <li>• {state.transactions.length} transações</li>
                    <li>• {state.budgets.length} orçamentos</li>
                    <li>• Todas as configurações</li>
                    <li>• Histórico financeiro</li>
                  </ul>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Esta ação é <strong>irreversível</strong>. Você começará com uma conta totalmente limpa.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleStartFresh} className="flex-1">
                  🗑️ Continuar Reset
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">🔒 Confirmação Final</h3>
                  <p className="text-sm text-yellow-700">
                    Para confirmar o reset, digite <strong>RESETAR</strong> no campo abaixo:
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirm">Digite "RESETAR" para confirmar</Label>
                  <Input
                    id="confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                    placeholder="RESETAR"
                    className="text-center font-mono"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  ← Voltar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleReset} 
                  className="flex-1"
                  disabled={confirmText !== 'RESETAR'}
                >
                  💥 RESETAR TUDO
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetDataModal;
