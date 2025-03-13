
import { useState } from "react";
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
import { 
  Settings as SettingsIcon,
  FileText,
  Users,
  Database,
  Moon,
  Upload
} from "lucide-react";

const Settings = () => {
  const [systemName, setSystemName] = useState("POTENCIAGRO");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#4CAF50"); // Green as default
  
  const colorOptions = [
    { color: "#2196F3", value: "blue" },
    { color: "#4CAF50", value: "green" },
    { color: "#F44336", value: "red" },
    { color: "#9C27B0", value: "purple" },
    { color: "#FF9800", value: "orange" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#161b2b] min-h-screen text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <div className="flex items-center gap-2">
          <span>Lucas Antunes</span>
          <Badge variant="outline" className="bg-blue-900/30 text-white">v2.0</Badge>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Configurações do Sistema</h2>
      
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="w-auto inline-flex bg-[#1e2738] p-1 rounded mb-6">
          <TabsTrigger value="geral" className="flex items-center gap-2 data-[state=active]:bg-[#2a3447]">
            <FileText className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="contas" className="flex items-center gap-2 data-[state=active]:bg-[#2a3447]">
            <Users className="h-4 w-4" />
            Contas
          </TabsTrigger>
          <TabsTrigger value="dados" className="flex items-center gap-2 data-[state=active]:bg-[#2a3447]">
            <Database className="h-4 w-4" />
            Dados
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1e2738] border-none text-white shadow-md">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-1">Personalização</h3>
                  <p className="text-sm text-gray-400 mb-4">Personalizar a aparência do sistema</p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="system-name">Nome do Sistema</Label>
                      <Input 
                        id="system-name" 
                        value={systemName}
                        onChange={(e) => setSystemName(e.target.value)}
                        className="bg-[#13192a] border-[#2a3447] mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Logomarca</Label>
                      <div className="flex mt-1">
                        <Input 
                          disabled
                          value="Não foi escolhido nenhum ficheiro"
                          className="rounded-r-none bg-[#13192a] border-[#2a3447]"
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Modo Escuro
                        </Label>
                        <Switch
                          id="dark-mode"
                          checked={darkMode}
                          onCheckedChange={setDarkMode}
                        />
                      </div>
                      <div className="ml-6 text-sm text-gray-400">
                        Ativado
                      </div>
                    </div>
                    
                    <div>
                      <Label>Cor Primária</Label>
                      <div className="flex gap-2 mt-2">
                        {colorOptions.map((option) => (
                          <button
                            key={option.value}
                            className={`w-10 h-10 rounded-full ${selectedColor === option.color ? 'ring-2 ring-white' : ''}`}
                            style={{ backgroundColor: option.color }}
                            onClick={() => setSelectedColor(option.color)}
                            aria-label={`Cor ${option.value}`}
                          />
                        ))}
                      </div>
                      <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
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
          
          <Card className="bg-[#1e2738] border-none text-white shadow-md">
            <CardContent className="pt-6">
              <div>
                <h3 className="text-xl font-medium mb-1">Visualização</h3>
                <p className="text-sm text-gray-400 mb-4">Pré-visualização das configurações</p>
                
                <div className="bg-[#13192a] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold">{systemName}</h4>
                    <Badge variant="outline" className="bg-blue-900/30 text-white">v2.0</Badge>
                  </div>
                  
                  <p className="mb-4">Exemplo de componentes:</p>
                  
                  <Button 
                    className="mb-4"
                    style={{ backgroundColor: selectedColor }}
                  >
                    Botão Primário
                  </Button>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ backgroundColor: selectedColor, width: '100%' }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className="bg-[#2a3447]">Badge</Badge>
                    <Badge className="bg-[#2a3447]">Badge 2</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          className="mt-6 w-full md:w-auto md:min-w-[300px] mx-auto block bg-[#6cea7f] hover:bg-[#5bd36e] text-black"
        >
          Salvar Configurações
        </Button>
      </Tabs>
    </div>
  );
};

export default Settings;
