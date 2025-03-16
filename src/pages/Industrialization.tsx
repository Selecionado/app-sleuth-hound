
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Upload, 
  Plus, 
  FileText, 
  Pencil, 
  Trash,
  Search,
  Filter,
  Download,
  Calculator
} from "lucide-react";
import NewIndustrializationDialog from "@/components/NewIndustrializationDialog";
import IndustrializationDetailsDialog from "@/components/IndustrializationDetailsDialog";
import { toast } from "sonner";

interface IndustrializationProcess {
  id: number;
  date: string;
  rawMaterial: string;
  quantity: number;
  products: {
    name: string;
    quantity: string;
  }[];
  status: "Concluída" | "Pendente" | "Em Processamento" | "Cancelada";
  details: {
    notaFiscal: string;
    placa: string;
    pesoNF: number;
    pesoBalanca: number;
    pesoQuebra: number;
    umidade: number;
    impureza: number;
    avariados: number;
    pesoLiquido: number;
  };
}

interface CalculationData {
  // Preço de compra
  valorSaca: number;
  valorFrete: number;
  fretePorSaca: number;
  valorIndustrializacao: number;
  valorProdutoIndustrializado: number;
  
  // Cotação do preço
  cotacaoFarelo: number;
  cotacaoOleo: number;
  
  // Industrialização
  valorIndustrializacaoOperacao: number;
  valorOperacional: number;
  totalIndustrializacao: number;
  
  // Quantidade
  quantidadeToneladas: number;
  percentagemFarelo: number;
  percentagemOleo: number;
  
  // Resumo
  valorSoja: number;
  valorFarelo: number;
  valorOleo: number;
  saldo: number;
  percentagemValorInvestido: number;
  lucroPorTON: number;
  lucroPorSaca: number;
}

const Industrialization = () => {
  const [processes, setProcesses] = useState<IndustrializationProcess[]>([
    {
      id: 1,
      date: "11/03/2023",
      rawMaterial: "Soja",
      quantity: 100,
      products: [
        { name: "Farelo de Soja", quantity: "75 ton" },
        { name: "Óleo de Soja", quantity: "20 ton" }
      ],
      status: "Concluída",
      details: {
        notaFiscal: "409",
        placa: "QTJ8H74",
        pesoNF: 100000,
        pesoBalanca: 100000,
        pesoQuebra: 0,
        umidade: 10.2,
        impureza: 1.0,
        avariados: 4.5,
        pesoLiquido: 95000
      }
    },
    {
      id: 2,
      date: "04/03/2023",
      rawMaterial: "Soja",
      quantity: 80,
      products: [
        { name: "Farelo de Soja", quantity: "60 ton" },
        { name: "Óleo de Soja", quantity: "16 ton" }
      ],
      status: "Pendente",
      details: {
        notaFiscal: "418",
        placa: "QAX5J85",
        pesoNF: 80000,
        pesoBalanca: 79800,
        pesoQuebra: -200,
        umidade: 10.4,
        impureza: 1.0,
        avariados: 4.6,
        pesoLiquido: 76000
      }
    },
    {
      id: 3,
      date: "25/02/2023",
      rawMaterial: "Soja",
      quantity: 95,
      products: [
        { name: "Farelo de Soja", quantity: "72 ton" },
        { name: "Óleo de Soja", quantity: "18 ton" }
      ],
      status: "Em Processamento",
      details: {
        notaFiscal: "385",
        placa: "MXD7B12",
        pesoNF: 95000,
        pesoBalanca: 94800,
        pesoQuebra: -200,
        umidade: 9.8,
        impureza: 0.8,
        avariados: 3.7,
        pesoLiquido: 91500
      }
    }
  ]);

  const [calculationData, setCalculationData] = useState<CalculationData>({
    valorSaca: 105.00,
    valorFrete: 35.00,
    fretePorSaca: 2.10,
    valorIndustrializacao: 13.20,
    valorProdutoIndustrializado: 120.30,
    
    cotacaoFarelo: 1460.00,
    cotacaoOleo: 5400.00,
    
    valorIndustrializacaoOperacao: 220.00,
    valorOperacional: 0.00,
    totalIndustrializacao: 220000.00,
    
    quantidadeToneladas: 1000,
    percentagemFarelo: 76.0,
    percentagemOleo: 18.7,
    
    valorSoja: 2005000.01,
    valorFarelo: 1109600.00,
    valorOleo: 1009800.00,
    saldo: 114399.99,
    percentagemValorInvestido: 5.71,
    lucroPorTON: 114.40,
    lucroPorSaca: 6.86
  });

  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<IndustrializationProcess | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [showCalculator, setShowCalculator] = useState(false);

  const handleViewDetails = (process: IndustrializationProcess) => {
    setSelectedProcess(process);
    setIsDetailsDialogOpen(true);
  };

  const handleImportPDF = () => {
    setIsLoading(true);
    
    // Simulate PDF processing
    setTimeout(() => {
      const newProcess: IndustrializationProcess = {
        id: Date.now(),
        date: "25/10/2024",
        rawMaterial: "Soja",
        quantity: 38.64,
        products: [
          { name: "Farelo de Soja", quantity: "29.37 ton" },
          { name: "Óleo de Soja", quantity: "7.19 ton" }
        ],
        status: "Pendente",
        details: {
          notaFiscal: "432",
          placa: "KAC9C76",
          pesoNF: 38620,
          pesoBalanca: 38640,
          pesoQuebra: -20,
          umidade: 10.2,
          impureza: 1.0,
          avariados: 47.0,
          pesoLiquido: 38640
        }
      };
      
      setProcesses(prev => [newProcess, ...prev]);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof CalculationData, value: number) => {
    setCalculationData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Recalculate dependent values
      newData.fretePorSaca = newData.valorFrete / 16.6666;
      newData.valorIndustrializacao = (newData.valorIndustrializacaoOperacao / 16.6666666) / 1000;
      newData.valorProdutoIndustrializado = newData.valorSaca + newData.fretePorSaca + newData.valorIndustrializacao;
      
      // Industrialização calculations
      newData.totalIndustrializacao = newData.valorIndustrializacaoOperacao * newData.quantidadeToneladas;
      
      // Calculate products quantities based on percentages
      const farelo = newData.quantidadeToneladas * (newData.percentagemFarelo / 100);
      const oleo = newData.quantidadeToneladas * (newData.percentagemOleo / 100);
      
      // Resumo calculations
      newData.valorSoja = (newData.quantidadeToneladas / 60) * newData.valorProdutoIndustrializado * 1000;
      newData.valorFarelo = newData.cotacaoFarelo * farelo;
      newData.valorOleo = newData.cotacaoOleo * oleo;
      newData.saldo = (newData.valorFarelo + newData.valorOleo) - newData.valorSoja;
      newData.percentagemValorInvestido = (newData.saldo / newData.valorSoja) * 100;
      newData.lucroPorTON = newData.saldo / newData.quantidadeToneladas;
      newData.lucroPorSaca = newData.lucroPorTON / 16.666667;
      
      return newData;
    });
  };

  const filteredProcesses = processes.filter(process => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      process.rawMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.details.notaFiscal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.details.placa.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    const matchesTab = activeTab === "todos" || 
      (activeTab === "pendentes" && process.status === "Pendente") ||
      (activeTab === "em-processamento" && process.status === "Em Processamento") ||
      (activeTab === "concluidos" && process.status === "Concluída");
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Em Processamento":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Concluída":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Cancelada":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Industrialização</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os processos de industrialização
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleImportPDF}
            disabled={isLoading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Importar PDF
          </Button>
          <Button 
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setShowCalculator(!showCalculator)}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculadora
          </Button>
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsNewDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Button>
        </div>
      </div>

      {showCalculator && (
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Calculadora de Industrialização</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preco-compra">
              <TabsList className="mb-4">
                <TabsTrigger value="preco-compra">Preço de Compra</TabsTrigger>
                <TabsTrigger value="cotacao">Cotação do Preço</TabsTrigger>
                <TabsTrigger value="industrializacao">Industrialização</TabsTrigger>
                <TabsTrigger value="quantidades">Quantidades</TabsTrigger>
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
              </TabsList>

              <TabsContent value="preco-compra">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor da saca (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorSaca} 
                      onChange={(e) => handleInputChange('valorSaca', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor com 2 casas decimais</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor do frete (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorFrete} 
                      onChange={(e) => handleInputChange('valorFrete', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor com 2 casas decimais</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Frete / Saca (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.fretePorSaca.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Valor Frete/16,66666</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor - Industrialização (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorIndustrializacao.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = (Valor Industrialização/16,6666666)/1000</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor do produto industrializado (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorProdutoIndustrializado.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Valor Saca + Frete/Saca + Valor Industrialização</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cotacao">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Farelo (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.cotacaoFarelo} 
                      onChange={(e) => handleInputChange('cotacaoFarelo', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor com 2 casas decimais</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Óleo (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.cotacaoOleo} 
                      onChange={(e) => handleInputChange('cotacaoOleo', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor com 2 casas decimais</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="industrializacao">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor - Industrialização (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorIndustrializacaoOperacao} 
                      onChange={(e) => handleInputChange('valorIndustrializacaoOperacao', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor pré definido com 220,00</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Operacional (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorOperacional} 
                      onChange={(e) => handleInputChange('valorOperacional', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor com 2 casas decimais</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total - Industrialização (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.totalIndustrializacao.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Valor Industrialização * Quantidade * Operacional</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quantidades">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantidade (ton)</label>
                    <Input 
                      type="number" 
                      value={calculationData.quantidadeToneladas} 
                      onChange={(e) => handleInputChange('quantidadeToneladas', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Valor pré definido 1.000</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Farelo - {calculationData.percentagemFarelo}%</label>
                    <Input 
                      type="number" 
                      value={(calculationData.quantidadeToneladas * calculationData.percentagemFarelo / 100).toFixed(0)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Quantidade * {calculationData.percentagemFarelo}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Óleo - {calculationData.percentagemOleo}%</label>
                    <Input 
                      type="number" 
                      value={(calculationData.quantidadeToneladas * calculationData.percentagemOleo / 100).toFixed(0)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Quantidade * {calculationData.percentagemOleo}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Percentagem Farelo (%)</label>
                    <Input 
                      type="number" 
                      value={calculationData.percentagemFarelo} 
                      onChange={(e) => handleInputChange('percentagemFarelo', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ajuste a percentagem de farelo</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Percentagem Óleo (%)</label>
                    <Input 
                      type="number" 
                      value={calculationData.percentagemOleo} 
                      onChange={(e) => handleInputChange('percentagemOleo', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ajuste a percentagem de óleo</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resumo">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Soja (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorSoja.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = (Quantidade/60) * Valor Produto Industrializado * 1000</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Farelo (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorFarelo.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Cotação Farelo * Quantidade Farelo</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Óleo (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.valorOleo.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Cotação Óleo * Quantidade Óleo</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Saldo (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.saldo.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = (Valor Farelo + Valor Óleo) - Valor Soja</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Percentagem do valor investido</label>
                    <Input 
                      type="number" 
                      value={calculationData.percentagemValorInvestido.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Percentagem do valor investido</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Lucro por TON (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.lucroPorTON.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Saldo / Quantidade</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Lucro por Saca (R$)</label>
                    <Input 
                      type="number" 
                      value={calculationData.lucroPorSaca.toFixed(2)} 
                      readOnly
                      className="w-full bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Formula = Lucro por TON / 16,666667</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar processos..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="todos" onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="mt-2 mb-6">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="em-processamento">Em Processamento</TabsTrigger>
              <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="todos" className="mt-0">
            <CardContent className="p-0 pb-4">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Matéria-prima</TableHead>
                    <TableHead>Quantidade (ton)</TableHead>
                    <TableHead>Produtos Gerados</TableHead>
                    <TableHead>Nota Fiscal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        Carregando registros...
                      </TableCell>
                    </TableRow>
                  ) : filteredProcesses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        Nenhum processo de industrialização registrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProcesses.map((process) => (
                      <TableRow key={process.id} className="hover:bg-muted/50">
                        <TableCell>{process.date}</TableCell>
                        <TableCell>{process.rawMaterial}</TableCell>
                        <TableCell>{process.quantity}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {process.products.map((product, index) => (
                              <div key={index} className="text-sm">
                                {product.name}: {product.quantity}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{process.details.notaFiscal}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(process.status)}>
                            {process.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleViewDetails(process)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
          
          {/* As outras abas teriam o mesmo conteúdo, apenas filtrado pelo status */}
          <TabsContent value="pendentes" className="mt-0">
            <CardContent className="p-0 pb-4">
              {/* Mesmo conteúdo da tabela, mas filtrado para "Pendente" */}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="em-processamento" className="mt-0">
            <CardContent className="p-0 pb-4">
              {/* Mesmo conteúdo da tabela, mas filtrado para "Em Processamento" */}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="concluidos" className="mt-0">
            <CardContent className="p-0 pb-4">
              {/* Mesmo conteúdo da tabela, mas filtrado para "Concluída" */}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>

      {isNewDialogOpen && (
        <NewIndustrializationDialog 
          isOpen={isNewDialogOpen} 
          onClose={() => setIsNewDialogOpen(false)}
          onAdd={(newProcess) => {
            setProcesses(prev => [newProcess, ...prev]);
          }}
        />
      )}

      {isDetailsDialogOpen && selectedProcess && (
        <IndustrializationDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          process={selectedProcess}
        />
      )}
    </div>
  );
};

export default Industrialization;
