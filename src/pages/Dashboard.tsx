
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
