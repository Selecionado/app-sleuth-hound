
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, FileText, Download } from "lucide-react";

interface IndustrializationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  process: {
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
  };
}

const IndustrializationDetailsDialog = ({
  isOpen,
  onClose,
  process
}: IndustrializationDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Processo de Industrialização</DialogTitle>
          <DialogDescription>
            Visualize os detalhes do processo de industrialização #{process.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Informações Gerais</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-medium">{process.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    process.status === "Concluída" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {process.status}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Matéria-prima</p>
              <p className="font-medium">{process.rawMaterial}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Quantidade</p>
              <p className="font-medium">{process.quantity} ton</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Produtos Gerados</p>
              <div className="space-y-2">
                {process.products.map((product, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{product.name}</p>
                    <p className="font-medium">{product.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Ver Relatório Completo
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Dados da Carga</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Nota Fiscal</p>
                <p className="font-medium">{process.details.notaFiscal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Placa</p>
                <p className="font-medium">{process.details.placa}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pesos</p>
              <div className="space-y-1 pl-2">
                <div className="flex justify-between">
                  <p>Peso NF</p>
                  <p className="font-medium">{process.details.pesoNF.toLocaleString()} kg</p>
                </div>
                <div className="flex justify-between">
                  <p>Peso Balança</p>
                  <p className="font-medium">{process.details.pesoBalanca.toLocaleString()} kg</p>
                </div>
                <div className="flex justify-between">
                  <p>Quebra</p>
                  <p className="font-medium">{process.details.pesoQuebra.toLocaleString()} kg</p>
                </div>
                <div className="flex justify-between">
                  <p>Peso Líquido</p>
                  <p className="font-medium">{process.details.pesoLiquido.toLocaleString()} kg</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Qualidade</p>
              <div className="space-y-1 pl-2">
                <div className="flex justify-between">
                  <p>Umidade</p>
                  <p className="font-medium">{process.details.umidade}%</p>
                </div>
                <div className="flex justify-between">
                  <p>Impureza</p>
                  <p className="font-medium">{process.details.impureza}%</p>
                </div>
                <div className="flex justify-between">
                  <p>Avariados</p>
                  <p className="font-medium">{process.details.avariados}%</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar Dados
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between gap-2">
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </Button>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IndustrializationDetailsDialog;
