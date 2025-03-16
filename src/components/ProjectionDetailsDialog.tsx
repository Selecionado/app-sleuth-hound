
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="sm:max-w-[600px]">
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
              <h4 className="text-sm font-medium text-muted-foreground">Entidade</h4>
              <p>{projection.entity}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Referência</h4>
              <p>{projection.invoiceNumber}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Produto</h4>
              <p>{projection.product}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Quantidade</h4>
              <p>{projection.quantity}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Valor Total</h4>
              <p className="font-medium">{projection.totalValue}</p>
            </div>
          </div>

          {projection.forecast && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Previsão</h4>
              <p>{projection.forecast}</p>
            </div>
          )}

          {projection.target && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Meta</h4>
              <p>{projection.target}</p>
            </div>
          )}

          {projection.strategy && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Estratégia</h4>
              <p>{projection.strategy}</p>
            </div>
          )}

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
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
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
