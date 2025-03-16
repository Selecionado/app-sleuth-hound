import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Pencil,
  Trash,
  Eye,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ProjectionDialog from "@/components/ProjectionDialog";
import ProjectionDetailsDialog from "@/components/ProjectionDetailsDialog";

interface Projection {
  id: number;
  date: string;
  entity: string;
  sackValue: string;
  freightValue: string;
  balance: string;
  status?: "pendente" | "aprovado" | "concluído" | "cancelado";
}

const Projection = () => {
  const [projections, setProjections] = useState<Projection[]>([
    {
      id: 1,
      date: "25/10/2023",
      entity: "POTENCIAGRO LTDA",
      sackValue: "R$ 105,00",
      freightValue: "R$ 35,00",
      balance: "R$ 114.399,99",
      status: "aprovado"
    },
    {
      id: 2,
      date: "15/10/2023",
      entity: "Agrosul Comércio",
      sackValue: "R$ 103,50",
      freightValue: "R$ 32,00",
      balance: "R$ 98.760,00",
      status: "pendente"
    },
    {
      id: 3,
      date: "05/10/2023",
      entity: "Cooperativa Agrícola",
      sackValue: "R$ 104,20",
      freightValue: "R$ 33,50",
      balance: "R$ 105.480,00",
      status: "concluído"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProjection, setSelectedProjection] = useState<Projection | null>(null);
  const [activeTab, setActiveTab] = useState("todos");

  const handleViewDetails = (projection: Projection) => {
    setSelectedProjection(projection);
    setIsDetailsDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedProjection) {
      setProjections(projections.filter(projection => projection.id !== selectedProjection.id));
      setIsDetailsDialogOpen(false);
      toast("Projeção removida com sucesso");
    }
  };

  const handleCreateProjection = (newProjection: any) => {
    setProjections([...projections, { 
      ...newProjection, 
      id: Date.now(),
      sackValue: `R$ ${newProjection.sackValue || "0,00"}`,
      freightValue: `R$ ${newProjection.freightValue || "0,00"}`,
      balance: `R$ ${newProjection.balance || "0,00"}`
    }]);
    toast("Projeção criada com sucesso");
  };

  const filteredProjections = projections.filter(projection => {
    const matchesSearch = searchTerm === "" || 
      projection.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projection.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "todos" || 
      (activeTab === "pendentes" && projection.status === "pendente") ||
      (activeTab === "aprovados" && projection.status === "aprovado") ||
      (activeTab === "concluidos" && projection.status === "concluído");
    
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
          <h1 className="text-2xl font-bold">Projeção</h1>
          <p className="text-sm text-muted-foreground">
            {filteredProjections.length} {filteredProjections.length === 1 ? "registro encontrado" : "registros encontrados"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Projeção
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar projeções..."
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
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-900 dark:text-gray-100">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-900 dark:text-gray-100">Fornecedor</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-900 dark:text-gray-100">Valor da Saca</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-900 dark:text-gray-100">Valor do Frete</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-900 dark:text-gray-100">Saldo</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-900 dark:text-gray-100">Status</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-gray-900 dark:text-gray-100">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjections.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-muted-foreground">
                          Nenhum registro encontrado
                        </td>
                      </tr>
                    ) : (
                      filteredProjections.map((projection) => (
                        <tr
                          key={projection.id}
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle text-gray-900 dark:text-gray-100">{projection.date}</td>
                          <td className="p-4 align-middle font-medium text-gray-900 dark:text-gray-100">{projection.entity}</td>
                          <td className="p-4 align-middle text-gray-900 dark:text-gray-100">{projection.sackValue}</td>
                          <td className="p-4 align-middle text-gray-900 dark:text-gray-100">{projection.freightValue}</td>
                          <td className="p-4 align-middle font-medium text-gray-900 dark:text-gray-100">{projection.balance}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline" className={getStatusColor(projection.status)}>
                              {projection.status || "Não definido"}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">
                            <div className="flex justify-center space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewDetails(projection)}
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
                                onClick={() => {
                                  setSelectedProjection(projection);
                                  handleDelete();
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
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
            <CardContent className="p-0">
              {/* Content is dynamically filtered by the activeTab state */}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="aprovados" className="mt-0">
            <CardContent className="p-0">
              {/* Content is dynamically filtered by the activeTab state */}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="concluidos" className="mt-0">
            <CardContent className="p-0">
              {/* Content is dynamically filtered by the activeTab state */}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>

      {isDialogOpen && (
        <ProjectionDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          onAdd={handleCreateProjection} 
        />
      )}

      {isDetailsDialogOpen && selectedProjection && (
        <ProjectionDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          projection={selectedProjection}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Projection;
