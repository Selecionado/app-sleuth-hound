
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
import { Checkbox } from "@/components/ui/checkbox";

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
  const [notifyUsers, setNotifyUsers] = useState(true);

  // Calculated values
  const [totalFreight, setTotalFreight] = useState("R$ 0,00");
  const [totalProduct, setTotalProduct] = useState("R$ 0,00");
  const [totalLoad, setTotalLoad] = useState("R$ 0,00");
  const [bags, setBags] = useState("0");
  const [totalBag, setTotalBag] = useState("R$ 0,00");

  // Calculate product unit value when bag value changes
  useEffect(() => {
    const bagValueNum = parseFloat(bagValue.replace(",", ".")) || 0;
    const calculatedProductUnitValue = (bagValueNum / 60).toFixed(2).replace(".", ",");
    setProductUnitValue(calculatedProductUnitValue);
  }, [bagValue]);

  // Calculate all derived values when inputs change
  useEffect(() => {
    // Convert to numbers and handle parsing
    const freightNum = parseFloat(freightValue.replace(",", ".")) || 0;
    const qtyNum = parseFloat(quantity.replace(",", ".")) || 0;
    const productValueNum = parseFloat(productUnitValue.replace(",", ".")) || 0;
    const bagValueNum = parseFloat(bagValue.replace(",", ".")) || 0;

    // Calculate bags (Quantity ÷ 60)
    const calculatedBags = qtyNum > 0 ? Math.floor(qtyNum / 60) : 0;

    // Calculate total product (Quantity × Valor do produto)
    const calculatedTotalProduct = qtyNum * productValueNum;

    // Calculate other values
    const calculatedTotalFreight = freightNum;
    const calculatedTotalLoad = calculatedTotalFreight + calculatedTotalProduct;
    const calculatedTotalBag = calculatedBags > 0 ? calculatedTotalLoad / calculatedBags : 0;

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
      totalBag,
      notifyUsers
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 overflow-auto">
      <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Entity and Product */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {type === "purchase" ? "Fornecedor" : "Cliente"}
              </label>
              <Select value={entity} onValueChange={setEntity}>
                <SelectTrigger>
                  <SelectValue placeholder={`Selecione...`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entity1">POTENCIAGRO LTDA</SelectItem>
                  <SelectItem value="entity2">Entidade 2</SelectItem>
                  <SelectItem value="entity3">Entidade 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Produto</label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product1">Soja em Grãos - Padrão</SelectItem>
                  <SelectItem value="product2">Produto 2</SelectItem>
                  <SelectItem value="product3">Produto 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Carrier and License Plate */}
            <div>
              <label className="block text-sm font-medium mb-1">Transportadora</label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transportadora1">Transportadora 1</SelectItem>
                  <SelectItem value="transportadora2">Transportadora 2</SelectItem>
                  <SelectItem value="transportadora3">Transportadora 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Placa do Veículo</label>
              <Input 
                placeholder="Placa do veículo" 
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>

            {/* Quantity and Values */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantidade (kg)</label>
              <Input 
                placeholder="0" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valor por kg</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <Input 
                  className="pl-10"
                  placeholder="por kg" 
                  value={productUnitValue}
                  onChange={(e) => setProductUnitValue(e.target.value)}
                />
              </div>
            </div>

            {/* Bag Value and Freight Value */}
            <div>
              <label className="block text-sm font-medium mb-1">Valor por saca</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <Input 
                  className="pl-10"
                  placeholder="por saca de 60kg" 
                  value={bagValue}
                  onChange={(e) => setBagValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Frete por kg</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <Input 
                  className="pl-10"
                  placeholder="por kg" 
                  value={freightValue}
                  onChange={(e) => setFreightValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Calculated Values */}
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Valores Calculados</h3>
            <div className="grid grid-cols-3 gap-4 bg-gray-100 dark:bg-[#11182b] rounded-md overflow-hidden">
              <div className="p-4">
                <p className="text-sm font-medium">Produto</p>
                <p className="text-lg font-semibold">{totalProduct}</p>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium">Frete</p>
                <p className="text-lg font-semibold">{totalFreight}</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-[#1e293b]">
                <p className="text-sm font-medium">Total</p>
                <p className="text-lg font-semibold">{totalLoad}</p>
              </div>
            </div>
          </div>

          {/* Notify Users Checkbox */}
          <div className="flex items-center mt-6">
            <Checkbox 
              id="notifyUsers" 
              checked={notifyUsers} 
              onCheckedChange={(checked) => setNotifyUsers(checked === true)}
            />
            <label htmlFor="notifyUsers" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Notificar outros usuários sobre esta operação
            </label>
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
