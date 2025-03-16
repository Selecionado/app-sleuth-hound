
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectionDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projection: any;
  onDelete: () => void;
}

const ProjectionDetailsDialog = ({
  isOpen,
  onClose,
  projection,
  onDelete,
}: ProjectionDetailsDialogProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "aprovado":
        return "bg-blue-100 text-blue-800";
      case "concluído":
        return "bg-green-100 text-green-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Detalhes da Projeção</span>
            <Badge variant="outline" className={getStatusColor(projection.status)}>
              {projection.status || "Não definido"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
              <p>{projection.date}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Fornecedor</h4>
              <p>{projection.entity}</p>
            </div>
          </div>

          <Tabs defaultValue="compra" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="compra">Preço de Compra</TabsTrigger>
              <TabsTrigger value="cotacao">Cotação do Preço</TabsTrigger>
              <TabsTrigger value="industrializacao">Industrialização</TabsTrigger>
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compra" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Valor da Saca</h4>
                  <p>{projection.sackValue}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Valor do Frete</h4>
                  <p>{projection.freightValue}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Frete / Saca</h4>
                  <p>R$ {projection.freightPerSack}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Valor - Industrialização</h4>
                  <p>R$ {projection.industrializationValue}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Valor Produto Industrializado</h4>
                  <p>R$ {projection.finalProductValue}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cotacao" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Farelo</h4>
                  <p>R$ {projection.mealValue}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Óleo</h4>
                  <p>R$ {projection.oilValue}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="industrializacao" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Valor - Industrialização</h4>
                  <p>R$ {projection.industrializationCost}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Operacional</h4>
                  <p>R$ {projection.operationalCost}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total - Industrialização</h4>
                <p>R$ {projection.totalIndustrialization}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Quantidade</h4>
                  <p>{projection.quantity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Farelo - 76,0%</h4>
                  <p>{projection.mealQuantity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Óleo - 18,7%</h4>
                  <p>{projection.oilQuantity}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resumo" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Soja</h4>
                  <p>R$ {projection.soyaTotal}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Farelo</h4>
                  <p>R$ {projection.mealTotal}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Óleo</h4>
                  <p>R$ {projection.oilTotal}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Saldo</h4>
                  <p className="font-medium">{projection.balance}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Porcentagem do valor investido</h4>
                  <p>{projection.investmentPercentage}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Lucro por TON</h4>
                  <p>R$ {projection.profitPerTon}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Lucro por Saca</h4>
                  <p>R$ {projection.profitPerSack}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {projection.notes && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Observações</h4>
              <p>{projection.notes}</p>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onDelete}>
                <Trash className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectionDetailsDialog;
