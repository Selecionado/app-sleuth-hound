
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from "recharts";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, TrendingDown, TrendingUp, AreaChart as AreaChartIcon, Clock } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("visao-geral");
  
  // Data for summary cards
  const summaryData = [
    {
      title: "Saldo Total",
      value: "R$ 45.231,89",
      change: "+20.1%",
      trend: "up",
      icon: <DollarSign className="h-4 w-4 text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Receitas",
      value: "R$ 10.345,00",
      change: "+4.5%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4 text-white" />,
      color: "bg-green-600"
    },
    {
      title: "Despesas",
      value: "R$ 6.780,00",
      change: "-2.5%",
      trend: "down",
      icon: <TrendingDown className="h-4 w-4 text-white" />,
      color: "bg-red-600"
    },
    {
      title: "Economia",
      value: "R$ 3.565,00",
      change: "+8.2%",
      trend: "up",
      icon: <Clock className="h-4 w-4 text-white" />,
      color: "bg-purple-600"
    }
  ];

  // Sample data for charts
  const salesData = [
    { name: "Jan", value: 25000 },
    { name: "Fev", value: 32000 },
    { name: "Mar", value: 28000 },
    { name: "Abr", value: 45000 },
    { name: "Mai", value: 39000 },
    { name: "Jun", value: 45879 },
  ];
  
  const productData = [
    { name: "Soja", value: 65 },
    { name: "Farelo", value: 20 },
    { name: "Óleo", value: 15 },
  ];

  // Data for financial summary
  const financialData = [
    { name: "01", receitas: 4000, despesas: 2400 },
    { name: "05", receitas: 3000, despesas: 1398 },
    { name: "10", receitas: 2000, despesas: 9800 },
    { name: "15", receitas: 2780, despesas: 3908 },
    { name: "20", receitas: 1890, despesas: 4800 },
    { name: "25", receitas: 2390, despesas: 3800 },
    { name: "30", receitas: 3490, despesas: 4300 },
  ];

  // Top income sources data
  const topIncomeSources = [
    { name: "Venda de Soja", value: 8500 },
    { name: "Venda de Farelo", value: 5200 },
    { name: "Venda de Óleo", value: 3800 },
    { name: "Serviços", value: 2100 },
    { name: "Outros", value: 980 },
  ];

  // Top expenses data
  const topExpenses = [
    { name: "Matéria prima", value: 3500 },
    { name: "Funcionários", value: 2800 },
    { name: "Logística", value: 1650 },
    { name: "Manutenção", value: 980 },
    { name: "Energia", value: 730 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-md">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className={`${item.color} p-4 flex items-center justify-center`}>
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                  <div className="flex items-center mt-1">
                    {item.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {item.change} em relação ao mês passado
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Tabs for different views */}
      <Tabs defaultValue="visao-geral" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="analises">Análises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visao-geral" className="space-y-6">
          {/* Financial Summary Section */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Resumo Financeiro</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visão geral das suas finanças nos últimos 30 dias
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={financialData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FF8042" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`R$ ${value.toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Dia ${label}`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="receitas" 
                      stroke="#0088FE" 
                      fillOpacity={1} 
                      fill="url(#colorReceitas)" 
                      name="Receitas"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="despesas" 
                      stroke="#FF8042" 
                      fillOpacity={1} 
                      fill="url(#colorDespesas)" 
                      name="Despesas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Sections - Top Income and Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Income Sources */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Maiores Receitas</CardTitle>
                <p className="text-sm text-muted-foreground">Top 5 fontes de receita</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topIncomeSources}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]} />
                      <Bar dataKey="value" fill="#0088FE" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Expenses */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Maiores Despesas</CardTitle>
                <p className="text-sm text-muted-foreground">Top 5 categorias de gastos</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topExpenses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {topExpenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transacoes" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                As transações serão exibidas aqui. Implemente a visualização de transações conforme necessário.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analises" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Análises Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Análises detalhadas serão exibidas aqui. Implemente os gráficos de análise conforme necessário.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
