import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const Index = () => {
  const features = [{
    icon: '📊',
    title: 'Dashboard Completo',
    description: 'Visualize todas suas finanças em uma tela única com gráficos e estatísticas detalhadas.'
  }, {
    icon: '💳',
    title: 'Controle de Gastos',
    description: 'Registre e categorize todas suas transações de forma rápida e intuitiva.'
  }, {
    icon: '🎯',
    title: 'Orçamentos Inteligentes',
    description: 'Defina metas e acompanhe seus gastos com alertas automáticos.'
  }, {
    icon: '📈',
    title: 'Relatórios Detalhados',
    description: 'Análises completas dos seus padrões financeiros e evolução patrimonial.'
  }, {
    icon: '🔒',
    title: 'Segurança Total',
    description: 'Seus dados financeiros protegidos com criptografia de ponta.'
  }, {
    icon: '📱',
    title: 'Multi-plataforma',
    description: 'Acesse suas finanças de qualquer dispositivo, a qualquer hora.'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">$</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Monefy</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <Link to="/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Organize suas
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {" "}finanças{" "}
            </span>
            de forma simples
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Controle seus gastos, crie orçamentos inteligentes e alcance seus objetivos financeiros 
            com a ferramenta mais intuitiva do mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="px-8 py-6 text-lg">
                🚀 Experimente Grátis
              </Button>
            </Link>
            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Usuários</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">R$ 2M+</div>
              <div className="text-sm text-muted-foreground">Economizados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tudo que você precisa para suas finanças
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas e intuitivas para você tomar controle total 
            do seu dinheiro e construir um futuro financeiro sólido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <Card key={index} className="finance-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="bg-card/50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Veja o Monefy em ação
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Acesse nosso dashboard de demonstração e explore todas as funcionalidades 
            sem precisar criar uma conta.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-xl font-semibold mb-2">Saldo Total</h3>
                  <p className="text-3xl font-bold text-finance-success">R$ 4.100</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold mb-2">Receitas</h3>
                  <p className="text-3xl font-bold text-finance-success">R$ 5.800</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📉</div>
                  <h3 className="text-xl font-semibold mb-2">Gastos</h3>
                  <p className="text-3xl font-bold text-finance-expense">R$ 1.700</p>
                </div>
              </div>
              
              <Link to="/dashboard" className="inline-block mt-8">
                
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a milhares de pessoas que já organizaram suas finanças 
            e estão construindo um futuro próspero.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-12 py-6 text-lg">
                ✨ Começar Agora - Grátis
              </Button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">$</span>
              </div>
              <span className="text-xl font-bold text-foreground">Monefy</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Termos</a>
              <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
              <a href="#" className="hover:text-foreground transition-colors">Blog</a>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border">© 2025 Monefy. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>;
};
export default Index;