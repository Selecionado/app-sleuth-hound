
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
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
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-medium mb-2">Total de Entidades</h2>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-medium mb-2">Total de Produtos</h2>
            <p className="text-3xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-medium mb-2">Vendas do Mês</h2>
            <p className="text-3xl font-bold">R$ 45.879,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-medium mb-2">Industrialização</h2>
            <p className="text-3xl font-bold">12 ton</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <h2 className="font-medium mb-4">Vendas Mensais</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Vendas"]} />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-6">
            <h2 className="font-medium mb-4">Distribuição de Produtos</h2>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Porcentagem"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
