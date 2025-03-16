
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Tabs, 
  TabsContent,
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface ProjectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (projection: any) => void;
}

const formSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  entity: z.string().min(1, "Fornecedor é obrigatório"),
  
  // Preço de compra
  sackValue: z.string().min(1, "Valor da saca é obrigatório"),
  freightValue: z.string().min(1, "Valor do frete é obrigatório"),
  freightPerSack: z.string().optional(),
  industrializationValue: z.string().optional(),
  finalProductValue: z.string().optional(),
  
  // Cotação do preço
  mealValue: z.string().optional(),
  oilValue: z.string().optional(),
  
  // Industrialização
  industrializationCost: z.string().optional(),
  operationalCost: z.string().optional(),
  totalIndustrialization: z.string().optional(),
  
  // Quantidade
  quantity: z.string().optional(),
  mealQuantity: z.string().optional(),
  oilQuantity: z.string().optional(),
  
  // Resumo
  soyaTotal: z.string().optional(),
  mealTotal: z.string().optional(),
  oilTotal: z.string().optional(),
  balance: z.string().optional(),
  investmentPercentage: z.string().optional(),
  profitPerTon: z.string().optional(),
  profitPerSack: z.string().optional(),
  
  status: z.string().optional(),
  notes: z.string().optional(),
});

const formatCurrency = (value: string) => {
  // Remove non-numeric characters except dots
  const numericValue = value.replace(/[^\d.]/g, "");
  // Convert to number, fix to 2 decimal places and format
  const formattedValue = parseFloat(numericValue || "0").toFixed(2);
  // Return as string with comma as decimal separator
  return formattedValue.replace(".", ",");
};

const ProjectionDialog = ({ isOpen, onClose, onAdd }: ProjectionDialogProps) => {
  const [activeTab, setActiveTab] = useState("compra");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      entity: "",
      sackValue: "105,00",
      freightValue: "35,00",
      freightPerSack: "2,10",
      industrializationValue: "13,20",
      finalProductValue: "120,30",
      mealValue: "1460,00",
      oilValue: "5400,00",
      industrializationCost: "220,00",
      operationalCost: "",
      totalIndustrialization: "220000,00",
      quantity: "1000",
      mealQuantity: "760",
      oilQuantity: "187",
      soyaTotal: "2005000,01",
      mealTotal: "1109600,00",
      oilTotal: "1009800,00",
      balance: "114399,99",
      investmentPercentage: "5,71",
      profitPerTon: "114,40",
      profitPerSack: "6,86",
      status: "pendente",
      notes: "",
    },
  });

  // Calculate dependent values when form values change
  useEffect(() => {
    // Get current values
    const values = form.getValues();
    
    // Parse numeric values
    const sackValue = parseFloat(values.sackValue?.replace(",", ".") || "0");
    const freightValue = parseFloat(values.freightValue?.replace(",", ".") || "0");
    const quantity = parseFloat(values.quantity?.replace(",", ".") || "0");
    
    // Calculate freight per sack (B3/16.666666)
    const freightPerSack = freightValue / 16.666666;
    form.setValue("freightPerSack", freightPerSack.toFixed(2).replace(".", ","));
    
    // Calculate industrialization value (B15/16.666666)/1000
    const indValue = parseFloat(values.industrializationCost?.replace(",", ".") || "0");
    const industrializationValue = (indValue / 16.666666) / 1000;
    form.setValue("industrializationValue", industrializationValue.toFixed(2).replace(".", ","));
    
    // Calculate final product value (B5+B4+B2)
    const finalProductValue = sackValue + freightPerSack + industrializationValue;
    form.setValue("finalProductValue", finalProductValue.toFixed(2).replace(".", ","));
    
    // Calculate meal quantity (B18*76/100)
    const mealQuantity = quantity * 76 / 100;
    form.setValue("mealQuantity", mealQuantity.toFixed(0).replace(".", ","));
    
    // Calculate oil quantity (B18*18,7/100)
    const oilQuantity = quantity * 18.7 / 100;
    form.setValue("oilQuantity", oilQuantity.toFixed(0).replace(".", ","));
    
    // Calculate total industrialization (B13*B18+B14)
    const industrializationCost = parseFloat(values.industrializationCost?.replace(",", ".") || "0");
    const operationalCost = parseFloat(values.operationalCost?.replace(",", ".") || "0");
    const totalIndustrialization = industrializationCost * quantity + operationalCost;
    form.setValue("totalIndustrialization", totalIndustrialization.toFixed(2).replace(".", ","));
    
    // Calculate soya total ((B18/60)*B6*1000)
    const soyaTotal = (quantity / 60) * finalProductValue * 1000;
    form.setValue("soyaTotal", soyaTotal.toFixed(2).replace(".", ","));
    
    // Calculate meal total (B9*B19)
    const mealValue = parseFloat(values.mealValue?.replace(",", ".") || "0");
    const mealTotal = mealValue * mealQuantity;
    form.setValue("mealTotal", mealTotal.toFixed(2).replace(".", ","));
    
    // Calculate oil total (B10*B20)
    const oilValue = parseFloat(values.oilValue?.replace(",", ".") || "0");
    const oilTotal = oilValue * oilQuantity;
    form.setValue("oilTotal", oilTotal.toFixed(2).replace(".", ","));
    
    // Calculate balance (B24+B25)-B23
    const balance = (mealTotal + oilTotal) - soyaTotal;
    form.setValue("balance", balance.toFixed(2).replace(".", ","));
    
    // Calculate investment percentage (B26/B23*100)
    const investmentPercentage = (balance / soyaTotal) * 100;
    form.setValue("investmentPercentage", investmentPercentage.toFixed(2).replace(".", ","));
    
    // Calculate profit per ton (B26/B18)
    const profitPerTon = balance / quantity;
    form.setValue("profitPerTon", profitPerTon.toFixed(2).replace(".", ","));
    
    // Calculate profit per sack (B28/16.666667)
    const profitPerSack = profitPerTon / 16.666667;
    form.setValue("profitPerSack", profitPerSack.toFixed(2).replace(".", ","));
    
  }, [form.watch(["sackValue", "freightValue", "industrializationCost", "operationalCost", "quantity", "mealValue", "oilValue"])]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onAdd({
      date: formatDate(values.date),
      entity: values.entity,
      sackValue: values.sackValue,
      freightValue: values.freightValue,
      balance: values.balance,
      status: values.status,
      notes: values.notes,
      // Add all other fields
      freightPerSack: values.freightPerSack,
      industrializationValue: values.industrializationValue,
      finalProductValue: values.finalProductValue,
      mealValue: values.mealValue,
      oilValue: values.oilValue,
      industrializationCost: values.industrializationCost,
      operationalCost: values.operationalCost,
      totalIndustrialization: values.totalIndustrialization,
      quantity: values.quantity,
      mealQuantity: values.mealQuantity,
      oilQuantity: values.oilQuantity,
      soyaTotal: values.soyaTotal,
      mealTotal: values.mealTotal,
      oilTotal: values.oilTotal,
      investmentPercentage: values.investmentPercentage,
      profitPerTon: values.profitPerTon,
      profitPerSack: values.profitPerSack,
    });
    
    onClose();
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Projeção</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar uma nova projeção de industrialização
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="entity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Selecione o fornecedor" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Tabs defaultValue="compra" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="compra">Preço de Compra</TabsTrigger>
                <TabsTrigger value="cotacao">Cotação do Preço</TabsTrigger>
                <TabsTrigger value="industrializacao">Industrialização</TabsTrigger>
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="compra" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sackValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Saca (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="freightValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor do Frete (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="freightPerSack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frete / Saca (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industrializationValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor - Industrialização (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="finalProductValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Produto Industrializado (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="cotacao" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mealValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farelo (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="oilValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Óleo (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="industrializacao" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industrializationCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor - Industrialização (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="220,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="operationalCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operacional (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="totalIndustrialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total - Industrialização (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mealQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farelo - 76,0%</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="oilQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Óleo - 18,7%</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="resumo" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="soyaTotal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soja (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mealTotal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farelo (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="oilTotal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Óleo (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="balance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Saldo (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="investmentPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porcentagem do valor investido (%)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="profitPerTon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lucro por TON (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="profitPerSack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lucro por Saca (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0,00" readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Observações adicionais"
                      className="min-h-[60px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectionDialog;
