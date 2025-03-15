
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  FileText,
  Pencil,
  Trash,
  Eye,
  Filter,
  Download,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ShareButton from "@/components/ShareButton";
import TransactionDialog from "@/components/TransactionDialog";
import TransactionDetailsDialog from "@/components/TransactionDetailsDialog";

interface Purchase {
  id: number;
  date: string;
  entity: string;
  invoiceNumber: string;
  product: string;
  quantity: string;
  totalValue: string;
  status?: "pendente" | "aprovado" | "concluído" | "cancelado";
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: 1,
      date: "11/03/2023",
      entity: "POTENCIAGRO LTDA",
      invoiceNumber: "1488",
      product: "Soja em Grãos - Padrão",
      quantity: "53.600 kg",
      totalValue: "R$ 521.116,00",
      status: "concluído"
    },
    {
      id: 2,
      date: "05/03/2023",
      entity: "Agrosul Comércio",
      invoiceNumber: "2145",
      product: "Farelo de soja",
      quantity: "25.000 kg",
      totalValue: "R$ 187.500,00",
      status: "pendente"
    },
    {
      id: 3,
      date: "28/02/2023",
      entity: "Cooperativa Agrícola",
      invoiceNumber: "3267",
      product: "Óleo de soja bruto",
      quantity: "15.800 L",
      totalValue: "R$ 134.300,00",
      status: "aprovado"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [activeTab, setActiveTab] = useState("todos");

  const handleViewDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDetailsDialogOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsDialogOpen(false);
    // You could open the edit dialog here if you want
    console.log("Edit purchase:", selectedPurchase);
  };

  const handleDelete = () => {
    if (selectedPurchase) {
      setPurchases(purchases.filter(purchase => purchase.id !== selectedPurchase.id));
      setIsDetailsDialogOpen(false);
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      purchase.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    const matchesTab = activeTab === "todos" || 
      (activeTab === "pendentes" && purchase.status === "pendente") ||
      (activeTab === "aprovados" && purchase.status === "aprovado") ||
      (activeTab === "concluidos" && purchase.status === "concluído");
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "aprovado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "concluído":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Compras</h1>
          <p className="text-sm text-muted-foreground">
            {filteredPurchases.length} {filteredPurchases.length === 1 ? "registro encontrado" : "registros encontrados"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline"
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button 
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button 
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Compra
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar compras..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="todos" onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="mt-2 mb-6">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="aprovados">Aprovados</TabsTrigger>
              <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="todos" className="mt-0">
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b bg-muted/40">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Entidade</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Nota Fiscal</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Produto</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Quantidade</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Valor Total</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPurchases.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-4 text-center text-muted-foreground">
                          Nenhum registro encontrado
                        </td>
                      </tr>
                    ) : (
                      filteredPurchases.map((purchase) => (
                        <tr
                          key={purchase.id}
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle">{purchase.date}</td>
                          <td className="p-4 align-middle font-medium">{purchase.entity}</td>
                          <td className="p-4 align-middle">{purchase.invoiceNumber}</td>
                          <td className="p-4 align-middle">{purchase.product}</td>
                          <td className="p-4 align-middle">{purchase.quantity}</td>
                          <td className="p-4 align-middle font-medium">{purchase.totalValue}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline" className={getStatusColor(purchase.status)}>
                              {purchase.status || "Não definido"}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">
                            <div className="flex justify-center space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewDetails(purchase)}
                                className="h-8 w-8"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                              <ShareButton 
                                dataType="purchase"
                                dataId={purchase.id.toString()}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="pendentes" className="mt-0">
            {/* Same table structure as "todos" but filtered for pending */}
            <CardContent className="p-0">
              {/* Table content same as above */}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="aprovados" className="mt-0">
            {/* Same table structure as "todos" but filtered for approved */}
            <CardContent className="p-0">
              {/* Table content same as above */}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="concluidos" className="mt-0">
            {/* Same table structure as "todos" but filtered for completed */}
            <CardContent className="p-0">
              {/* Table content same as above */}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>

      {isDialogOpen && (
        <TransactionDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          title="Nova Compra"
          type="purchase"
        />
      )}

      {isDetailsDialogOpen && selectedPurchase && (
        <TransactionDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          transaction={selectedPurchase}
          type="purchase"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Purchases;
