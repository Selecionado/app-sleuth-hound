
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Trash 
} from "lucide-react";
import NewIndustrializationDialog from "@/components/NewIndustrializationDialog";
import IndustrializationDetailsDialog from "@/components/IndustrializationDetailsDialog";

interface IndustrializationProcess {
  id: number;
  date: string;
  rawMaterial: string;
  quantity: number;
  products: {
    name: string;
    quantity: string;
  }[];
  status: "Concluída" | "Pendente";
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
    }
  ]);

  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<IndustrializationProcess | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Industrialização</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os processos de industrialização
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleImportPDF}
            disabled={isLoading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Importar PDF
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsNewDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 pb-4">
          <div className="p-4">
            <Input
              className="max-w-sm"
              placeholder="Buscar processos..."
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Matéria-prima</TableHead>
                <TableHead>Quantidade (ton)</TableHead>
                <TableHead>Produtos Gerados</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Carregando registros...
                  </TableCell>
                </TableRow>
              ) : processes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Nenhum processo de industrialização registrado.
                  </TableCell>
                </TableRow>
              ) : (
                processes.map((process) => (
                  <TableRow key={process.id}>
                    <TableCell>{process.date}</TableCell>
                    <TableCell>{process.rawMaterial}</TableCell>
                    <TableCell>{process.quantity}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {process.products.map((product, index) => (
                          <div key={index}>
                            {product.name}: {product.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        process.status === "Concluída" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {process.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewDetails(process)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
