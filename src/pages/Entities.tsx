
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pen, Trash } from "lucide-react";

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

const Entities = () => {
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [newEntity, setNewEntity] = useState<Omit<Entity, 'id'>>({
    name: "",
    contactName: "",
    phone: "",
    type: "Fornecedor"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntity({
      ...newEntity,
      [name]: value
    });
  };

  const handleTypeChange = (value: string) => {
    setNewEntity({
      ...newEntity,
      type: value
    });
  };

  const handleSave = () => {
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
  };

  const handleDelete = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro - Entidade</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Nova Entidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nome da empresa ou pessoa"
                  value={newEntity.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium mb-1">Nome do Contato</label>
                <Input
                  id="contactName"
                  name="contactName"
                  placeholder="Nome completo do contato"
                  value={newEntity.contactName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Número</label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Número do telefone do contato"
                  value={newEntity.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-1">Descrição</label>
                <Select
                  value={newEntity.type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fornecedor">Fornecedor</SelectItem>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                    <SelectItem value="Transportadora">Transportadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">Salvar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Table Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Entidades Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Nome</th>
                    <th className="text-left py-3 font-medium">Nome do Contato</th>
                    <th className="text-left py-3 font-medium">Número</th>
                    <th className="text-left py-3 font-medium">Tipo</th>
                    <th className="text-left py-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {entities.map((entity) => (
                    <tr key={entity.id} className="border-b">
                      <td className="py-3">{entity.name}</td>
                      <td className="py-3">{entity.contactName}</td>
                      <td className="py-3">{entity.phone}</td>
                      <td className="py-3">{entity.type}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pen className="h-4 w-4" />
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
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Entities;
