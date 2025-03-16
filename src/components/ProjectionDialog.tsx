
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface ProjectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (projection: any) => void;
}

const formSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  entity: z.string().min(1, "Entidade é obrigatória"),
  reference: z.string().min(1, "Referência é obrigatória"),
  product: z.string().min(1, "Produto é obrigatório"),
  quantity: z.string().min(1, "Quantidade é obrigatória"),
  unitPrice: z.string().min(1, "Preço unitário é obrigatório"),
  totalValue: z.string().min(1, "Valor total é obrigatório"),
  status: z.string().optional(),
  notes: z.string().optional(),
  forecast: z.string().min(1, "Previsão é obrigatória"),
  target: z.string().min(1, "Meta é obrigatória"),
  strategy: z.string().min(1, "Estratégia é obrigatória"),
});

const ProjectionDialog = ({ isOpen, onClose, onAdd }: ProjectionDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      entity: "",
      reference: "",
      product: "",
      quantity: "",
      unitPrice: "",
      totalValue: "",
      status: "pendente",
      notes: "",
      forecast: "",
      target: "",
      strategy: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onAdd({
      date: formatDate(values.date),
      entity: values.entity,
      invoiceNumber: values.reference,
      product: values.product,
      quantity: `${values.quantity} kg`,
      totalValue: `R$ ${values.totalValue}`,
      status: values.status,
      notes: values.notes,
      forecast: values.forecast,
      target: values.target,
      strategy: values.strategy,
    });
    
    onClose();
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Calculate total value when quantity or unit price changes
  const calculateTotal = () => {
    const quantity = parseFloat(form.getValues("quantity").replace(/[^\d.-]/g, "")) || 0;
    const unitPrice = parseFloat(form.getValues("unitPrice").replace(/[^\d.-]/g, "")) || 0;
    const total = quantity * unitPrice;
    form.setValue("totalValue", total.toFixed(2).replace(".", ","));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Projeção</DialogTitle>
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
                    <FormLabel>Entidade</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Selecione a entidade" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referência</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Referência do documento" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Selecione o produto" />
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
                      <Input 
                        {...field} 
                        placeholder="0" 
                        onChange={(e) => {
                          field.onChange(e);
                          setTimeout(calculateTotal, 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Unitário</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="0,00" 
                        onChange={(e) => {
                          field.onChange(e);
                          setTimeout(calculateTotal, 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Total</FormLabel>
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
                name="forecast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previsão</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Previsão para realização" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Meta de realização" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="strategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estratégia</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Descreva a estratégia de realização" 
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
