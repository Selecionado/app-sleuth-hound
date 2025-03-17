
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Form, FormControl, FormField, FormItem, FormLabel 
} from "@/components/ui/form";
import { 
  Plus, Edit, Trash, Search, Filter, Calendar, Printer, Check, X 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { 
  Popover, PopoverContent, PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Define transaction interface
interface Transaction {
  id: string;
  type: "pagar" | "receber";
  description: string;
  amount: number;
  dueDate: Date;
  category: string;
  status: "pendente" | "pago" | "cancelado";
  createdAt: Date;
  sourceType?: string;
  sourceId?: string;
}

// Sample data for categories
const initialCategories = [
  "Fornecedores", 
  "Funcionários", 
  "Impostos", 
  "Serviços", 
  "Vendas", 
  "Clientes", 
  "Outros"
];

const Financial = () => {
  const [activeTab, setActiveTab] = useState("todas");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  const form = useForm({
    defaultValues: {
      type: "pagar" as "pagar" | "receber",
      description: "",
      amount: 0,
      dueDate: new Date(),
      category: "",
      status: "pendente" as "pendente" | "pago" | "cancelado",
    }
  });

  // Load initial sample data
  useEffect(() => {
    // Check if we have saved transactions in localStorage
    const savedTransactions = localStorage.getItem("financialTransactions");
    if (savedTransactions) {
      try {
        // Parse dates
        const parsed = JSON.parse(savedTransactions, (key, value) => {
          if (key === "dueDate" || key === "createdAt") {
            return new Date(value);
          }
          return value;
        });
        setTransactions(parsed);
      } catch (error) {
        console.error("Error parsing saved transactions:", error);
        loadSampleData();
      }
    } else {
      loadSampleData();
    }

    // Load categories
    const savedCategories = localStorage.getItem("financialCategories");
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error("Error parsing saved categories:", error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("financialTransactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("financialCategories", JSON.stringify(categories));
  }, [categories]);

  const loadSampleData = () => {
    const sampleTransactions: Transaction[] = [
      {
        id: "1",
        type: "pagar",
        description: "Pagamento fornecedor X",
        amount: 5000,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        category: "Fornecedores",
        status: "pendente",
        createdAt: new Date(),
      },
      {
        id: "2",
        type: "receber",
        description: "Venda cliente Y",
        amount: 7500,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        category: "Clientes",
        status: "pendente",
        createdAt: new Date(),
      },
      {
        id: "3",
        type: "pagar",
        description: "Imposto mensal",
        amount: 1200,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        category: "Impostos",
        status: "pendente",
        createdAt: new Date(),
      }
    ];
    setTransactions(sampleTransactions);
  };

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    form.reset({
      type: "pagar",
      description: "",
      amount: 0,
      dueDate: new Date(),
      category: "",
      status: "pendente",
    });
    setIsAddDialogOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setIsEditMode(true);
    setCurrentTransaction(transaction);
    
    form.reset({
      type: transaction.type,
      description: transaction.description,
      amount: transaction.amount,
      dueDate: transaction.dueDate,
      category: transaction.category,
      status: transaction.status,
    });
    
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
      toast.success("Transação excluída com sucesso!");
    }
  };

  const handleStatusChange = (id: string, newStatus: "pendente" | "pago" | "cancelado") => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id ? { ...transaction, status: newStatus } : transaction
    ));
    toast.success(`Status atualizado para ${newStatus}!`);
  };

  const onSubmit = (data: any) => {
    if (isEditMode && currentTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(transaction => 
        transaction.id === currentTransaction.id
          ? { 
              ...transaction, 
              ...data,
            }
          : transaction
      ));
      toast.success("Transação atualizada com sucesso!");
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
      };
      
      setTransactions([...transactions, newTransaction]);
      
      // Add new category if it doesn't exist
      if (data.category && !categories.includes(data.category)) {
        setCategories([...categories, data.category]);
      }
      
      toast.success("Transação adicionada com sucesso!");
    }
    
    setIsAddDialogOpen(false);
  };

  const handlePrint = () => {
    // Create a printable version of the transactions
    const printContent = document.createElement("div");
    printContent.innerHTML = `
      <h1 style="text-align: center; margin-bottom: 20px;">Relatório Financeiro</h1>
      <p style="text-align: center; margin-bottom: 20px;">Data: ${format(new Date(), "dd/MM/yyyy")}</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tipo</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Descrição</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Valor</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Vencimento</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Categoria</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredTransactions.map(transaction => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${transaction.type === "pagar" ? "A Pagar" : "A Receber"}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${transaction.description}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">R$ ${transaction.amount.toFixed(2)}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${format(transaction.dueDate, "dd/MM/yyyy")}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${transaction.category}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${transaction.status}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div style="margin-top: 20px; text-align: right;">
        <p>Total a Pagar: R$ ${totalPayable.toFixed(2)}</p>
        <p>Total a Receber: R$ ${totalReceivable.toFixed(2)}</p>
        <p>Saldo: R$ ${(totalReceivable - totalPayable).toFixed(2)}</p>
      </div>
    `;
    
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Relatório Financeiro</title>
          </head>
          <body>
            ${printContent.innerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Filter transactions based on filters and search term
  const filteredTransactions = transactions.filter(transaction => {
    const matchesTab = activeTab === "todas" || 
      (activeTab === "pagar" && transaction.type === "pagar") ||
      (activeTab === "receber" && transaction.type === "receber");
    
    const matchesSearch = searchTerm === "" || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || transaction.type === filterType;
    
    const matchesStatus = !filterStatus || transaction.status === filterStatus;
    
    const matchesCategory = !filterCategory || transaction.category === filterCategory;
    
    const matchesDate = !filterDate || 
      format(transaction.dueDate, "yyyy-MM-dd") === format(filterDate, "yyyy-MM-dd");
    
    return matchesTab && matchesSearch && matchesType && matchesStatus && matchesCategory && matchesDate;
  });

  // Calculate totals
  const totalPayable = transactions
    .filter(t => t.type === "pagar" && t.status !== "cancelado")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalReceivable = transactions
    .filter(t => t.type === "receber" && t.status !== "cancelado")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Financeiro</h1>
          <p className="text-sm text-muted-foreground">
            Gerenciamento de contas a pagar e receber
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              R$ {totalPayable.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              R$ {totalReceivable.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(totalReceivable - totalPayable) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              R$ {(totalReceivable - totalPayable).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pagar">A Pagar</TabsTrigger>
          <TabsTrigger value="receber">A Receber</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transações..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-10">
                        <Calendar className="mr-2 h-4 w-4" />
                        {filterDate ? format(filterDate, "dd/MM/yyyy") : "Data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filterDate || undefined}
                        onSelect={(date) => setFilterDate(date)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                      {filterDate && (
                        <div className="flex justify-end p-2 border-t">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setFilterDate(null)}
                          >
                            Limpar
                          </Button>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                  
                  <Select value={filterStatus || ""} onValueChange={(value) => setFilterStatus(value || null)}>
                    <SelectTrigger className="w-[130px] h-10">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterCategory || ""} onValueChange={(value) => setFilterCategory(value || null)}>
                    <SelectTrigger className="w-[130px] h-10">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="relative overflow-x-auto rounded-b-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          Nenhuma transação encontrada
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <Badge variant="outline" className={
                              transaction.type === "pagar" 
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }>
                              {transaction.type === "pagar" ? "A Pagar" : "A Receber"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{format(transaction.dueDate, "dd/MM/yyyy")}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              transaction.status === "pendente" 
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
                                : transaction.status === "pago" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
                            }>
                              {transaction.status === "pendente" ? "Pendente" : 
                                transaction.status === "pago" ? "Pago" : "Cancelado"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {transaction.status === "pendente" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-600"
                                  onClick={() => handleStatusChange(transaction.id, "pago")}
                                  title="Marcar como pago"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {transaction.status === "pendente" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-600"
                                  onClick={() => handleStatusChange(transaction.id, "cancelado")}
                                  title="Cancelar"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEdit(transaction)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600"
                                onClick={() => handleDelete(transaction.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Transação" : "Nova Transação"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pagar">A Pagar</SelectItem>
                        <SelectItem value="receber">A Receber</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Descrição da transação" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        placeholder="0.00" 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Vencimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Selecione ou digite" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input 
                        placeholder="Nova categoria" 
                        className="w-1/2"
                        onChange={(e) => {
                          if (e.target.value) {
                            field.onChange(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />
              
              {isEditMode && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="pago">Pago</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              
              <DialogFooter>
                <Button type="submit">
                  {isEditMode ? "Salvar Alterações" : "Adicionar Transação"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Financial;
