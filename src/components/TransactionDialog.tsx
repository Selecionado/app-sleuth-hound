
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "purchase" | "sale";
}

const TransactionDialog = ({ isOpen, onClose, title, type }: TransactionDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [freightValue, setFreightValue] = useState("0");
  const [entity, setEntity] = useState("");
  const [product, setProduct] = useState("");
  const [bagValue, setBagValue] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [productUnitValue, setProductUnitValue] = useState("0.00");

  // Calculated values
  const [totalFreight, setTotalFreight] = useState("R$ 0,00");
  const [totalProduct, setTotalProduct] = useState("R$ 0,00");
  const [totalLoad, setTotalLoad] = useState("R$ 0,00");
  const [bags, setBags] = useState("0");
  const [totalBag, setTotalBag] = useState("R$ 0,00");

  useEffect(() => {
    // Convert to numbers and handle parsing
    const freightNum = parseFloat(freightValue) || 0;
    const qtyNum = parseFloat(quantity) || 0;
    const productValueNum = parseFloat(productUnitValue) || 0;
    const bagValueNum = parseFloat(bagValue) || 0;

    // Calculate values
    const calculatedTotalFreight = freightNum;
    const calculatedTotalProduct = qtyNum * productValueNum;
    const calculatedTotalLoad = calculatedTotalFreight + calculatedTotalProduct;
    const calculatedBags = qtyNum > 0 ? Math.floor(qtyNum / 60) : 0;
    const calculatedTotalBag = calculatedTotalLoad - (calculatedBags * bagValueNum);

    // Format currency values
    setTotalFreight(`R$ ${calculatedTotalFreight.toFixed(2).replace('.', ',')}`);
    setTotalProduct(`R$ ${calculatedTotalProduct.toFixed(2).replace('.', ',')}`);
    setTotalLoad(`R$ ${calculatedTotalLoad.toFixed(2).replace('.', ',')}`);
    setBags(calculatedBags.toString());
    setTotalBag(`R$ ${calculatedTotalBag.toFixed(2).replace('.', ',')}`);
  }, [freightValue, quantity, productUnitValue, bagValue]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Here you would save the transaction data
    console.log({
      date,
      invoiceNumber,
      carrier,
      licensePlate,
      freightValue,
      entity,
      product,
      bagValue,
      quantity,
      productUnitValue,
      totalFreight,
      totalProduct,
      totalLoad,
      bags,
      totalBag
    });
    onClose();
  };

  const formatCurrency = (value: string) => {
    return `R$ ${value}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-5xl max-h-[95vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">{type === "purchase" ? "Compra" : "Venda"}</h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Date and Invoice */}
            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nota Fiscal</label>
              <Input 
                placeholder="Número da nota fiscal" 
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>

            {/* Carrier and License Plate */}
            <div>
              <label className="block text-sm font-medium mb-1">Transportadora</label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a transportadora" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transportadora1">Transportadora 1</SelectItem>
                  <SelectItem value="transportadora2">Transportadora 2</SelectItem>
                  <SelectItem value="transportadora3">Transportadora 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Placa</label>
              <Input 
                placeholder="PLACA DO VEÍCULO" 
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>

            {/* Freight Value and Entity */}
            <div>
              <label className="block text-sm font-medium mb-1">Valor do Frete</label>
              <Input 
                placeholder="0" 
                value={freightValue}
                onChange={(e) => setFreightValue(e.target.value)}
              />
              <span className="text-xs text-muted-foreground">Formato: R$ 105,50</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {type === "purchase" ? "Fornecedor" : "Cliente"}
              </label>
              <Select value={entity} onValueChange={setEntity}>
                <SelectTrigger>
                  <SelectValue placeholder={`Selecione o ${type === "purchase" ? "fornecedor" : "cliente"}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entity1">POTENCIAGRO LTDA</SelectItem>
                  <SelectItem value="entity2">Entidade 2</SelectItem>
                  <SelectItem value="entity3">Entidade 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product and Bag Value */}
            <div>
              <label className="block text-sm font-medium mb-1">Produto</label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product1">Soja em Grãos - Padrão</SelectItem>
                  <SelectItem value="product2">Produto 2</SelectItem>
                  <SelectItem value="product3">Produto 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valor Saca</label>
              <Input 
                placeholder="0" 
                value={bagValue}
                onChange={(e) => setBagValue(e.target.value)}
              />
              <span className="text-xs text-muted-foreground">Formato: R$ 105,50</span>
            </div>

            {/* Product Value and Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Valor do Produto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <Input 
                  className="pl-10"
                  placeholder="0.00" 
                  value={productUnitValue}
                  onChange={(e) => setProductUnitValue(e.target.value)}
                />
              </div>
              <span className="text-xs text-muted-foreground">Valor da saca dividido por 60</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantidade (kg)</label>
              <Input 
                placeholder="0" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <span className="text-xs text-muted-foreground">Valor inteiro em quilogramas (ex: 53.800)</span>
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Resultados</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium">Total Frete:</p>
                <p className="text-lg font-semibold">{totalFreight}</p>
                <p className="text-xs text-muted-foreground">Quantidade × Valor do frete ÷ 1.000</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Produto:</p>
                <p className="text-lg font-semibold">{totalProduct}</p>
                <p className="text-xs text-muted-foreground">Quantidade × Valor do produto</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Valor total da carga:</p>
                <p className="text-lg font-semibold">{totalLoad}</p>
                <p className="text-xs text-muted-foreground">Total Frete + Total Produto</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sacas:</p>
                <p className="text-lg font-semibold">{bags}</p>
                <p className="text-xs text-muted-foreground">Quantidade ÷ 60</p>
              </div>
              
              <div className="col-span-2">
                <p className="text-sm font-medium">Valor total saca:</p>
                <p className="text-lg font-semibold">{totalBag}</p>
                <p className="text-xs text-muted-foreground">Valor total da carga ÷ Sacas</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-8">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDialog;
