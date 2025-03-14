
import { Button } from "@/components/ui/button";
import { Pencil, Trash, X } from "lucide-react";

interface TransactionDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  type: "purchase" | "sale";
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionDetailsDialog = ({
  isOpen,
  onClose,
  transaction,
  type,
  onEdit,
  onDelete,
}: TransactionDetailsDialogProps) => {
  if (!isOpen) return null;

  const title = type === "purchase" ? "Detalhes da Compra" : "Detalhes da Venda";
  const entityLabel = type === "purchase" ? "Fornecedor" : "Cliente";

  // Calculate bags from kg (assuming 60kg per bag)
  const weightInKg = parseFloat(transaction.quantity.replace(/[^\d,]/g, '').replace(',', '.'));
  const bags = Math.floor(weightInKg / 60);
  const formattedBags = bags > 0 ? `(${bags} sacas)` : '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-background rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Information */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Informações Gerais</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="font-medium">{transaction.date}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nota Fiscal:</span>
                  <span className="font-medium">{transaction.invoiceNumber}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{entityLabel}:</span>
                  <span className="font-medium">{transaction.entity}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produto:</span>
                  <span className="font-medium">{transaction.product}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transportadora:</span>
                  <span className="font-medium">SB TRANSPORTES E LOGISTICA LTDA</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Placa do Veículo:</span>
                  <span className="font-medium">DDR5Q88</span>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Valores</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantidade:</span>
                  <span className="font-medium">{transaction.quantity} {formattedBags}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor por kg:</span>
                  <span className="font-medium">R$ 1,83</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor por saca:</span>
                  <span className="font-medium">R$ 110,00</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor do frete (kg):</span>
                  <span className="font-medium">R$ 85,00</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor do produto:</span>
                  <span className="font-medium">R$ 100.283,33</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor do frete:</span>
                  <span className="font-medium">R$ 4.649,50</span>
                </div>
                
                <div className="flex justify-between mt-4">
                  <span className="text-lg font-semibold">Valor Total:</span>
                  <span className="text-lg font-semibold">R$ 104.932,83</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            
            <div className="flex gap-2">
              {onEdit && (
                <Button 
                  variant="outline" 
                  className="bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200"
                  onClick={onEdit}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
              
              {onDelete && (
                <Button 
                  variant="outline" 
                  className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                  onClick={onDelete}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsDialog;
