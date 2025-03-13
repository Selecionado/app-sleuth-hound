
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { 
  Bell, 
  Shield, 
  User, 
  Database, 
  Mail, 
  AlertTriangle, 
  Settings as SettingsIcon
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [auditLog, setAuditLog] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  
  const companyForm = useForm({
    defaultValues: {
      companyName: "Potenciagro Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@potenciagro.com.br",
      phone: "(11) 98765-4321",
      address: "Av. Paulista, 1000, São Paulo - SP",
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>
      
      <Tabs defaultValue="empresa" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Configure as informações básicas da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...companyForm}>
                <form className="space-y-4">
                  <FormField
                    control={companyForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={companyForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">Salvar Alterações</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Logo da Empresa</CardTitle>
              <CardDescription>
                Carregue o logotipo da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Logo</span>
                </div>
                <div>
                  <Button variant="outline" className="mb-2">Carregar Imagem</Button>
                  <p className="text-sm text-muted-foreground">
                    Formatos suportados: JPG, PNG, SVG. Tamanho máximo: 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Preferências de Notificação</CardTitle>
              </div>
              <CardDescription>
                Escolha como deseja receber notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações sobre compras, vendas e estoques
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas importantes por mensagem de texto
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium mb-3">Tipos de Notificação</h3>
                
                <div className="space-y-2">
                  {[
                    "Novas transações",
                    "Alertas de estoque baixo",
                    "Atualizações de preços de mercado",
                    "Relatórios semanais",
                    "Comunicados do sistema"
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Switch id={`notif-${item}`} defaultChecked />
                      <Label htmlFor={`notif-${item}`}>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Segurança</CardTitle>
              </div>
              <CardDescription>
                Configure as opções de segurança da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                </div>
                <Switch
                  id="two-factor"
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audit-log">Registro de Auditoria</Label>
                  <p className="text-sm text-muted-foreground">
                    Mantenha um registro de todas as ações realizadas no sistema
                  </p>
                </div>
                <Switch
                  id="audit-log"
                  checked={auditLog}
                  onCheckedChange={setAuditLog}
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium mb-3">Alterar Senha</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <Button className="mt-4">Atualizar Senha</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Usuários e Permissões</CardTitle>
              </div>
              <CardDescription>
                Gerencie os usuários que têm acesso ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                      LA
                    </div>
                    <div>
                      <p className="font-medium">Lucas Antunes</p>
                      <p className="text-sm text-muted-foreground">lucas@potenciagro.com.br</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Administrador
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
                      MS
                    </div>
                    <div>
                      <p className="font-medium">Maria Silva</p>
                      <p className="text-sm text-muted-foreground">maria@potenciagro.com.br</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Operador
                    </span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="mt-4">
                <User className="mr-2 h-4 w-4" />
                Adicionar Usuário
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sistema">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>Backup e Dados</CardTitle>
                </div>
                <CardDescription>
                  Configure opções de backup e armazenamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backup-frequency">Frequência de Backup</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensalmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="data-retention">Retenção de Dados</Label>
                  <Select defaultValue="1-year">
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">3 meses</SelectItem>
                      <SelectItem value="6-months">6 meses</SelectItem>
                      <SelectItem value="1-year">1 ano</SelectItem>
                      <SelectItem value="indefinite">Indeterminado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" className="w-full">
                  Fazer Backup Manual
                </Button>
                
                <Button variant="outline" className="w-full">
                  Restaurar Backup
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <CardTitle>Configurações de Email</CardTitle>
                </div>
                <CardDescription>
                  Configure o servidor SMTP para envio de emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="smtp-server">Servidor SMTP</Label>
                  <Input id="smtp-server" defaultValue="smtp.potenciagro.com.br" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="smtp-port">Porta</Label>
                    <Input id="smtp-port" defaultValue="587" />
                  </div>
                  
                  <div>
                    <Label htmlFor="smtp-security">Segurança</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger id="smtp-security">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="smtp-user">Usuário</Label>
                  <Input id="smtp-user" defaultValue="sistema@potenciagro.com.br" />
                </div>
                
                <div>
                  <Label htmlFor="smtp-password">Senha</Label>
                  <Input id="smtp-password" type="password" defaultValue="********" />
                </div>
                
                <Button className="w-full mt-2">Testar Conexão</Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <CardTitle>Ações de Sistema</CardTitle>
                </div>
                <CardDescription>
                  Operações avançadas do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full">
                    Limpar Cache
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Verificar Atualizações
                  </Button>
                  
                  <Button variant="destructive" className="w-full">
                    Reiniciar Sistema
                  </Button>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Versão do Sistema</Label>
                    <span className="text-sm font-medium">v2.0.534</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Último Backup</Label>
                    <span className="text-sm">26/06/2024 08:30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
