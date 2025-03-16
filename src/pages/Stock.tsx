
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Download, Filter, ArrowUpDown, Eye, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

interface StockItem {
  id: number;
  productName: string;
  quantity: number;
  unit: string;
  category: string;
  lastUpdated: string;
  warehouse: string;
  status: "Disponível" | "Baixo Estoque" | "Crítico" | "Reservado";
  value: number;
}

const Stock = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      productName: "Farelo de Soja",
      quantity: 1500,
      unit: "ton",
      category: "Produtos Processados",
      lastUpdated: "22/10/2023",
      warehouse: "Armazém Principal",
      status: "Disponível",
      value: 1460.00
    },
    {
      id: 2,
      productName: "Óleo de Soja",
      quantity: 380,
      unit: "ton",
      category: "Produtos Processados",
      lastUpdated: "22/10/2023",
      warehouse: "Armazém Principal",
      status: "Disponível",
      value: 5400.00
    },
    {
      id: 3,
      productName: "Soja",
      quantity: 250,
      unit: "ton",
      category: "Matéria Prima",
      lastUpdated: "18/10/2023",
      warehouse: "Armazém 2",
      status: "Baixo Estoque",
      value: 105.00
    },
    {
      id: 4,
      productName: "Milho",
      quantity: 120,
      unit: "ton",
      category: "Matéria Prima",
      lastUpdated: "15/10/2023",
      warehouse: "Armazém 3",
      status: "Crítico",
      value: 89.50
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [sortField, setSortField] = useState<keyof StockItem | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Ordenar itens
  const handleSort = (field: keyof StockItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtrar e ordenar itens
  const filteredAndSortedItems = stockItems
    .filter((item) => {
      // Filtro de busca
      const matchesSearch =
        searchTerm === "" ||
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por aba
      const matchesTab =
        activeTab === "todos" ||
        (activeTab === "disponivel" && item.status === "Disponível") ||
        (activeTab === "baixo-estoque" && (item.status === "Baixo Estoque" || item.status === "Crítico")) ||
        (activeTab === "reservado" && item.status === "Reservado");

      return matchesSearch && matchesTab;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

  // Função para determinar a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-100 text-green-800";
      case "Baixo Estoque":
        return "bg-yellow-100 text-yellow-800";
      case "Crítico":
        return "bg-red-100 text-red-800";
      case "Reservado":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Cálculo de estatísticas
  const totalItems = stockItems.length;
  const totalValue = stockItems.reduce(
    (acc, item) => acc + item.quantity * item.value,
    0
  );
  const lowStockItems = stockItems.filter(
    (item) => item.status === "Baixo Estoque" || item.status === "Crítico"
  ).length;

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Estoque</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seu inventário e controle de estoque
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => toast.success("Funcionalidade em desenvolvimento")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total de Itens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Valor Total em Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Itens com Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar no estoque..."
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
              <TabsTrigger value="disponivel">Disponível</TabsTrigger>
              <TabsTrigger value="baixo-estoque">Baixo Estoque</TabsTrigger>
              <TabsTrigger value="reservado">Reservado</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="todos" className="mt-0">
            <CardContent className="p-0 pb-4">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("productName")}
                    >
                      Produto
                      {sortField === "productName" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("quantity")}
                    >
                      Quantidade
                      {sortField === "quantity" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      Categoria
                      {sortField === "category" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("warehouse")}
                    >
                      Armazém
                      {sortField === "warehouse" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("value")}
                    >
                      Valor Unitário
                      {sortField === "value" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortField === "status" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        Nenhum item encontrado no estoque.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.warehouse}</TableCell>
                        <TableCell>R$ {item.value.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(item.status)}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toast.success("Visualizando detalhes do item")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toast.success("Editando item")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toast.success("Excluindo item")}
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
            </CardContent>
          </TabsContent>

          <TabsContent value="disponivel" className="mt-0">
            <CardContent className="p-0 pb-4">
              {/* Same table content, just filtered for "Disponível" status */}
            </CardContent>
          </TabsContent>

          <TabsContent value="baixo-estoque" className="mt-0">
            <CardContent className="p-0 pb-4">
              {/* Same table content, just filtered for "Baixo Estoque" status */}
            </CardContent>
          </TabsContent>

          <TabsContent value="reservado" className="mt-0">
            <CardContent className="p-0 pb-4">
              {/* Same table content, just filtered for "Reservado" status */}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Stock;
