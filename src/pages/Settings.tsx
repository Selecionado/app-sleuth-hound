
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NewUserDialog from "@/components/NewUserDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Settings as SettingsIcon,
  FileText,
  Users,
  Database,
  Moon,
  Upload,
  UserPlus,
  Edit,
  Trash2,
  MoreVertical,
  Sun
} from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface User {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
}

const Settings = () => {
  const [systemName, setSystemName] = useState(() => {
    // Get the system name from localStorage or use the default
    return localStorage.getItem("systemName") || "POTENCIAGRO";
  });
  const { darkMode, setDarkMode } = useDarkMode();
  const [selectedColor, setSelectedColor] = useState("#4CAF50"); // Green as default
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Lucas Antunes",
      email: "suporte.florestal@gmail.com",
      contact: "66969619991",
      role: "administrador"
    }
  ]);
  
  const colorOptions = [
    { color: "#2196F3", value: "blue" },
    { color: "#4CAF50", value: "green" },
    { color: "#F44336", value: "red" },
    { color: "#9C27B0", value: "purple" },
    { color: "#FF9800", value: "orange" }
  ];

  // Save systemName to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("systemName", systemName);
  }, [systemName]);

  const handleAddUser = (newUser: {
    name: string;
    email: string;
    contact: string;
    role: string;
  }) => {
    setUsers([
      ...users,
      {
        id: `${users.length + 1}`,
        ...newUser
      }
    ]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSaveSettings = () => {
    // Save all settings to localStorage
    localStorage.setItem("systemName", systemName);
    localStorage.setItem("selectedColor", selectedColor);
    
    // Notify the user
    alert("Configurações salvas com sucesso!");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "administrador":
        return "bg-blue-500/30 text-blue-100 dark:bg-blue-500/30 dark:text-blue-100";
      case "gestor":
        return "bg-purple-500/30 text-purple-800 dark:bg-purple-500/30 dark:text-purple-100";
      case "operador":
        return "bg-green-500/30 text-green-800 dark:bg-green-500/30 dark:text-green-100";
      default:
        return "bg-gray-500/30 text-gray-800 dark:bg-gray-500/30 dark:text-gray-100";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "administrador":
        return "Administrador";
      case "gestor":
        return "Gestor";
      case "operador":
        return "Operador";
      default:
        return role;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto dark:bg-[#161b2b] min-h-screen bg-white dark:text-white text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <div className="flex items-center gap-2">
          <span>Lucas Antunes</span>
          <Badge variant="outline" className="dark:bg-blue-900/30 dark:text-white bg-blue-100 text-blue-800">v3.0</Badge>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Configurações do Sistema</h2>
      
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="w-auto inline-flex dark:bg-[#1e2738] bg-gray-100 p-1 rounded mb-6">
          <TabsTrigger value="geral" className="flex items-center gap-2 data-[state=active]:dark:bg-[#2a3447] data-[state=active]:bg-white">
            <FileText className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="contas" className="flex items-center gap-2 data-[state=active]:dark:bg-[#2a3447] data-[state=active]:bg-white">
            <Users className="h-4 w-4" />
            Contas
          </TabsTrigger>
          <TabsTrigger value="dados" className="flex items-center gap-2 data-[state=active]:dark:bg-[#2a3447] data-[state=active]:bg-white">
            <Database className="h-4 w-4" />
            Dados
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dark:bg-[#1e2738] bg-white dark:border-none border dark:text-white text-black shadow-md">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-1">Personalização</h3>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">Personalizar a aparência do sistema</p>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="system-name" className="dark:text-white text-black">Nome do Sistema</Label>
                        <Input 
                          id="system-name" 
                          value={systemName}
                          onChange={(e) => setSystemName(e.target.value)}
                          className="mt-1 dark:text-white text-black"
                        />
                      </div>
                      
                      <div>
                        <Label className="dark:text-white text-black">Logomarca</Label>
                        <div className="flex mt-1">
                          <Input 
                            disabled
                            value="Não foi escolhido nenhum ficheiro"
                            className="rounded-r-none dark:text-gray-400 text-gray-600"
                          />
                          <Button 
                            variant="default"
                            className="rounded-l-none bg-[#6cea7f] hover:bg-[#5bd36e] text-black gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block mb-2 dark:text-white text-black">Modo de Tema</Label>
                        <ToggleGroup type="single" value={darkMode ? "dark" : "light"} onValueChange={(value) => {
                          if (value) setDarkMode(value === "dark");
                        }} className="justify-start">
                          <ToggleGroupItem value="light" aria-label="Modo Claro" className="flex items-center gap-2 data-[state=on]:bg-blue-600">
                            <Sun className="h-4 w-4" />
                            Claro
                          </ToggleGroupItem>
                          <ToggleGroupItem value="dark" aria-label="Modo Escuro" className="flex items-center gap-2 data-[state=on]:bg-blue-600">
                            <Moon className="h-4 w-4" />
                            Escuro
                          </ToggleGroupItem>
                        </ToggleGroup>
                        <div className="mt-2 text-sm dark:text-gray-400 text-gray-600">
                          {darkMode ? "Modo escuro ativado" : "Modo claro ativado"}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="dark:text-white text-black">Cor Primária</Label>
                        <div className="flex gap-2 mt-2">
                          {colorOptions.map((option) => (
                            <button
                              key={option.value}
                              className={`w-10 h-10 rounded-full ${selectedColor === option.color ? 'ring-2 dark:ring-white ring-black' : ''}`}
                              style={{ backgroundColor: option.color }}
                              onClick={() => setSelectedColor(option.color)}
                              aria-label={`Cor ${option.value}`}
                            />
                          ))}
                        </div>
                        <div className="mt-4 w-full dark:bg-gray-700 bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-300"
                            style={{ backgroundColor: selectedColor, width: '80%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-[#1e2738] bg-white dark:border-none border dark:text-white text-black shadow-md">
              <CardContent className="pt-6">
                <div>
                  <h3 className="text-xl font-medium mb-1">Visualização</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">Pré-visualização das configurações</p>
                  
                  <div className="dark:bg-[#13192a] bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold">{systemName}</h4>
                      <Badge variant="outline" className="dark:bg-blue-900/30 dark:text-white bg-blue-100 text-blue-800">v3.0</Badge>
                    </div>
                    
                    <p className="mb-4">Exemplo de componentes:</p>
                    
                    <Button 
                      className="mb-4"
                      style={{ backgroundColor: selectedColor }}
                    >
                      Botão Primário
                    </Button>
                    
                    <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ backgroundColor: selectedColor, width: '100%' }}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge className="dark:bg-[#2a3447] bg-gray-200">Badge</Badge>
                      <Badge className="dark:bg-[#2a3447] bg-gray-200">Badge 2</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contas">
          <Card className="dark:bg-[#1e2738] bg-white dark:border-none border dark:text-white text-black shadow-md">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium mb-1">Usuários do Sistema</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600">Gerenciar acesso de usuários ao sistema</p>
                </div>
                <Button 
                  onClick={() => setDialogOpen(true)}
                  className="bg-[#6cea7f] hover:bg-[#5bd36e] text-black gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="dark:bg-[#13192a] bg-gray-100 dark:text-gray-400 text-gray-600 text-sm">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Nome</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Contato</th>
                      <th className="text-left py-3 px-4 font-medium">Função</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-[#2a3447] divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="py-3 px-4 dark:text-white text-black">{user.name}</td>
                        <td className="py-3 px-4 dark:text-white text-black">{user.email}</td>
                        <td className="py-3 px-4 dark:text-white text-black">{user.contact}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getRoleBadgeColor(user.role)}`}>
                            {getRoleDisplayName(user.role)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black dark:hover:bg-[#2a3447] hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black dark:hover:bg-[#2a3447] hover:bg-gray-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="dark:bg-[#1e2738] bg-white dark:border-[#2a3447] border-gray-200 dark:text-white text-black">
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-400 focus:text-red-400 dark:focus:bg-[#2a3447] focus:bg-gray-100"
                                >
                                  Excluir Usuário
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dados">
          <Card className="dark:bg-[#1e2738] bg-white dark:border-none border dark:text-white text-black shadow-md">
            <CardContent className="pt-6">
              <div>
                <h3 className="text-xl font-medium mb-1">Gerenciamento de Dados</h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">Configurações para o gerenciamento de dados do sistema</p>
                
                <div className="space-y-4">
                  <div className="dark:bg-[#13192a] bg-gray-100 p-4 rounded-lg">
                    <p className="text-center dark:text-gray-400 text-gray-600">Configurações de dados em breve</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <Button 
          className="mt-6 w-full md:w-auto md:min-w-[300px] mx-auto block bg-[#6cea7f] hover:bg-[#5bd36e] text-black"
          onClick={handleSaveSettings}
        >
          Salvar Configurações
        </Button>
      </Tabs>
      
      <NewUserDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Settings;
