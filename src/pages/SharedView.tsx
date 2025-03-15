
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Componente para visualização pública de dados compartilhados
const SharedView = () => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Aqui seria feita uma requisição para o backend para validar o token e buscar os dados
    // Estamos simulando esse comportamento
    
    const fetchSharedData = async () => {
      try {
        // Validação básica
        if (!token) {
          setError("Link inválido ou expirado");
          setLoading(false);
          return;
        }

        // Simulando um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dados simulados baseados no tipo
        let mockData;
        
        switch (type) {
          case "industrialization":
            mockData = {
              id,
              date: "2023-11-15",
              invoice: "NFE-123456",
              quantity: 15000,
              moisture: 14.2,
              impurity: 1.8,
              damaged: 0.5,
              netWeight: 14500,
              mealProduced: 11020,
              oilProduced: 2697,
              status: "Concluído"
            };
            break;
          case "transaction":
            mockData = {
              id,
              date: "2023-11-20",
              type: "Venda",
              product: "Farelo de Soja",
              quantity: 5000,
              price: 2100.50,
              total: 10502500,
              client: "Cooperativa Central"
            };
            break;
          case "report":
            mockData = {
              id,
              title: "Relatório de Desempenho",
              period: "Outubro 2023",
              totalProduction: 180000,
              totalSales: 162000,
              averagePrice: 2200.75
            };
            break;
          default:
            setError("Tipo de dados não suportado");
            setLoading(false);
            return;
        }
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar dados compartilhados");
        setLoading(false);
      }
    };

    fetchSharedData();
  }, [type, id, token]);

  const formatValue = (key: string, value: any) => {
    if (key.includes("date")) return new Date(value).toLocaleDateString("pt-BR");
    if (key.includes("price") || key.includes("total")) return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    if (key.includes("quantity") || key.includes("weight") || key.includes("produced")) return `${value.toLocaleString("pt-BR")} kg`;
    if (key.includes("moisture") || key.includes("impurity") || key.includes("damaged")) return `${value}%`;
    return value;
  };

  const getTitle = () => {
    switch (type) {
      case "industrialization": return "Processo de Industrialização";
      case "transaction": return "Transação";
      case "report": return "Relatório";
      default: return "Dados Compartilhados";
    }
  };

  const handleDownloadPDF = () => {
    // Aqui seria implementada a lógica para download do PDF
    alert("Funcionalidade de download em desenvolvimento");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-6 w-full max-w-md" />
          </div>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-full max-w-sm" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-1/3" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full max-w-xs" />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-500">Erro</CardTitle>
            <CardDescription>Não foi possível acessar os dados compartilhados</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o início
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getTitle()}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Dados compartilhados publicamente por POTENCIAGRO
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do {getTitle()}</CardTitle>
            <CardDescription>
              Visualização pública de dados - Ref: {id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data && Object.entries(data).map(([key, value]) => {
                if (key === "id") return null;
                return (
                  <div key={key} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="font-medium capitalize text-gray-700 dark:text-gray-300">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {formatValue(key, value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Visualização segura
            </div>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SharedView;
