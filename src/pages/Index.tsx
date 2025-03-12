
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSignIcon, TrendingUpIcon, BarChart3Icon, PieChartIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Bem-vindo ao Finance Tracker",
      description: "Seu assistente de controle financeiro pessoal",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-tight">Finance Tracker</h1>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 45.231,89</div>
              <p className="text-xs text-muted-foreground">
                +20,1% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 10.345,00</div>
              <p className="text-xs text-muted-foreground">
                +4,5% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 6.780,00</div>
              <p className="text-xs text-muted-foreground">
                -2,5% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia</CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 3.565,00</div>
              <p className="text-xs text-muted-foreground">
                +8,2% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>
                  Visão geral das suas finanças nos últimos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de resumo financeiro será exibido aqui</p>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Maiores Receitas</CardTitle>
                  <CardDescription>Top 5 fontes de receita</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Salário</span> <span className="font-medium">R$ 8.500,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Freelance</span> <span className="font-medium">R$ 1.200,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dividendos</span> <span className="font-medium">R$ 645,00</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Maiores Despesas</CardTitle>
                  <CardDescription>Top 5 categorias de gastos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Aluguel</span> <span className="font-medium">R$ 2.500,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Alimentação</span> <span className="font-medium">R$ 1.800,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Transporte</span> <span className="font-medium">R$ 1.200,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Lazer</span> <span className="font-medium">R$ 780,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saúde</span> <span className="font-medium">R$ 500,00</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>
                  Suas últimas movimentações financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Mercado</h3>
                      <p className="text-sm text-muted-foreground">10 de Junho, 2023</p>
                    </div>
                    <span className="text-red-500 font-medium">-R$ 320,00</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Salário</h3>
                      <p className="text-sm text-muted-foreground">05 de Junho, 2023</p>
                    </div>
                    <span className="text-green-500 font-medium">+R$ 8.500,00</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Academia</h3>
                      <p className="text-sm text-muted-foreground">01 de Junho, 2023</p>
                    </div>
                    <span className="text-red-500 font-medium">-R$ 180,00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Freelance</h3>
                      <p className="text-sm text-muted-foreground">29 de Maio, 2023</p>
                    </div>
                    <span className="text-green-500 font-medium">+R$ 1.200,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Gastos</CardTitle>
                <CardDescription>
                  Distribuição das suas despesas por categoria
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de análise de gastos será exibido aqui</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
