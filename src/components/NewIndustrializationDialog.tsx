
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewIndustrializationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (process: any) => void;
}

const NewIndustrializationDialog = ({
  isOpen,
  onClose,
  onAdd
}: NewIndustrializationDialogProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rawMaterial: "Soja",
    quantity: "",
    notaFiscal: "",
    placa: "",
    pesoNF: "",
    umidade: "10.2",
    impureza: "1.0",
    avariados: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const quantity = parseFloat(formData.quantity);
    
    // Calculate products based on the percentage rules (76% farelo, 18.6% óleo)
    const fareloQuantity = (quantity * 0.76).toFixed(2);
    const oleoQuantity = (quantity * 0.186).toFixed(2);
    
    const newProcess = {
      id: Date.now(),
      date: formData.date.split('-').reverse().join('/'),
      rawMaterial: formData.rawMaterial,
      quantity: quantity,
      products: [
        { name: "Farelo de Soja", quantity: `${fareloQuantity} ton` },
        { name: "Óleo de Soja", quantity: `${oleoQuantity} ton` }
      ],
      status: "Pendente" as const,
      details: {
        notaFiscal: formData.notaFiscal,
        placa: formData.placa,
        pesoNF: parseFloat(formData.pesoNF),
        pesoBalanca: parseFloat(formData.pesoNF), // Same as pesoNF for simplicity
        pesoQuebra: 0,
        umidade: parseFloat(formData.umidade),
        impureza: parseFloat(formData.impureza),
        avariados: parseFloat(formData.avariados),
        pesoLiquido: parseFloat(formData.pesoNF) // Same as pesoNF for simplicity
      }
    };
    
    onAdd(newProcess);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Processo de Industrialização</DialogTitle>
          <DialogDescription>
            Registre um novo processo de industrialização de soja.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rawMaterial">Matéria-prima</Label>
                <Input
                  id="rawMaterial"
                  name="rawMaterial"
                  value={formData.rawMaterial}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade (ton)</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="0.01"
                  placeholder="Quantidade em toneladas"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notaFiscal">Nota Fiscal</Label>
                <Input
                  id="notaFiscal"
                  name="notaFiscal"
                  placeholder="Número da NF"
                  value={formData.notaFiscal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="placa">Placa do Veículo</Label>
                <Input
                  id="placa"
                  name="placa"
                  placeholder="Ex: ABC1234"
                  value={formData.placa}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pesoNF">Peso NF (kg)</Label>
                <Input
                  id="pesoNF"
                  name="pesoNF"
                  type="number"
                  placeholder="Peso na Nota Fiscal"
                  value={formData.pesoNF}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avariados">Avariados (%)</Label>
                <Input
                  id="avariados"
                  name="avariados"
                  type="number"
                  step="0.01"
                  placeholder="Percentual de avariados"
                  value={formData.avariados}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="umidade">Umidade (%)</Label>
                <Input
                  id="umidade"
                  name="umidade"
                  type="number"
                  step="0.01"
                  placeholder="Percentual de umidade"
                  value={formData.umidade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="impureza">Impureza (%)</Label>
                <Input
                  id="impureza"
                  name="impureza"
                  type="number"
                  step="0.01"
                  placeholder="Percentual de impureza"
                  value={formData.impureza}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Produtos Gerados (calculados automaticamente)</Label>
              <div className="grid grid-cols-2 gap-4 p-3 border rounded-md bg-muted/20">
                <div>
                  <span className="font-medium">Farelo de Soja:</span> 
                  {formData.quantity && <span> {(parseFloat(formData.quantity) * 0.76).toFixed(2)} ton (76%)</span>}
                </div>
                <div>
                  <span className="font-medium">Óleo de Soja:</span> 
                  {formData.quantity && <span> {(parseFloat(formData.quantity) * 0.186).toFixed(2)} ton (18.6%)</span>}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewIndustrializationDialog;
