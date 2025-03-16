
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the entity interface
interface Entity {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  type: string;
}

// Initial sample data
const initialEntities: Entity[] = [
  {
    id: "1",
    name: "POTENCIAGRO LTDA",
    contactName: "JAMES M. ALGAYER",
    phone: "65992759617",
    type: "Fornecedor"
  },
  {
    id: "2",
    name: "AGRO NOBRE",
    contactName: "Alexandre de Lima Souza",
    phone: "66996127229",
    type: "Cliente"
  },
  {
    id: "3",
    name: "SB TRANSPORTES E LOGISTICA LTDA",
    contactName: "JUAREZ SOUZA",
    phone: "66999020774",
    type: "Transportadora"
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Fornecedor":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "Cliente":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "Transportadora":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
  }
};

const Entities = () => {
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [activeTab, setActiveTab] = useState("entidades");
  const [searchTerm, setSearchTerm] = useState("");
  const [newEntity, setNewEntity] = useState<Omit<Entity, 'id'>>({
    name: "",
    contactName: "",
    phone: "",
    type: "Fornecedor"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntity({
      ...newEntity,
      [name]: value
    });
  };

  const handleSave = () => {
    if (newEntity.name.trim() && newEntity.contactName.trim()) {
      const id = Date.now().toString();
      const entityToAdd = {
        id,
        ...newEntity
      };
      
      setEntities([...entities, entityToAdd]);
      
      // Reset form
      setNewEntity({
        name: "",
        contactName: "",
        phone: "",
        type: "Fornecedor"
      });
      
      // Switch back to entities tab
      setActiveTab("entidades");
    }
  };

  const handleDelete = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  const filteredEntities = entities.filter(entity => 
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Entidades</h1>
          <p className="text-sm text-muted-foreground">
            Cadastro e gerenciamento de entidades
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="entidades" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="entidades">Entidades</TabsTrigger>
          <TabsTrigger value="nova">Nova Entidade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="entidades">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar entidades..."
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
            <CardContent className="p-0">
              <div className="relative overflow-x-auto rounded-b-lg">
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-muted/40">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">Nome</th>
                      <th scope="col" className="px-6 py-3 text-left">Nome do Contato</th>
                      <th scope="col" className="px-6 py-3 text-left">Número</th>
                      <th scope="col" className="px-6 py-3 text-left">Tipo</th>
                      <th scope="col" className="px-6 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntities.length === 0 ? (
                      <tr className="bg-white dark:bg-transparent border-b hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                          Nenhuma entidade encontrada
                        </td>
                      </tr>
                    ) : (
                      filteredEntities.map((entity) => (
                        <tr key={entity.id} className="bg-white dark:bg-transparent border-b hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {entity.name}
                          </td>
                          <td className="px-6 py-4">
                            {entity.contactName}
                          </td>
                          <td className="px-6 py-4">
                            {entity.phone}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={getTypeColor(entity.type)}>
                              {entity.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDelete(entity.id)}
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
          </Card>
        </TabsContent>
        
        <TabsContent value="nova">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Cadastrar Nova Entidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nome da Entidade
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nome da empresa ou pessoa"
                      value={newEntity.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactName" className="block text-sm font-medium">
                      Nome do Contato
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      placeholder="Nome completo do contato"
                      value={newEntity.contactName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">
                      Número
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Número do telefone do contato"
                      value={newEntity.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium">
                      Tipo
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newEntity.type}
                      onChange={handleInputChange}
                    >
                      <option value="Fornecedor">Fornecedor</option>
                      <option value="Cliente">Cliente</option>
                      <option value="Transportadora">Transportadora</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleSave}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Entidade
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Entities;
