
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserRole {
  value: string;
  label: string;
  description: string;
}

const roles: UserRole[] = [
  {
    value: "administrador",
    label: "Administrador",
    description: "Acesso total ao sistema podendo editar, salvar e excluir."
  },
  {
    value: "gestor",
    label: "Gestor",
    description: "Acesso total ao sistema porém somente visualização e gerar relatório."
  },
  {
    value: "operador",
    label: "Operador",
    description: "Acesso aos lançamentos, edição e gerar os relatórios."
  }
];

interface NewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: {
    name: string;
    email: string;
    contact: string;
    role: string;
  }) => void;
}

const NewUserDialog = ({ open, onOpenChange, onAddUser }: NewUserDialogProps) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [role, setRole] = React.useState("administrador");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAddUser({
      name,
      email,
      contact,
      role
    });
    
    // Reset form
    setName("");
    setEmail("");
    setContact("");
    setRole("administrador");
    onOpenChange(false);
  };
  
  const selectedRole = roles.find(r => r.value === role);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
            <Input
              id="name"
              placeholder="Nome do usuário"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium">Contato</label>
            <Input
              id="contact"
              placeholder="Telefone ou contato"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Função</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedRole && (
              <div className="text-sm text-gray-400 mt-2">
                <p><span className="text-white font-medium">{selectedRole.label}:</span> {selectedRole.description}</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mr-2 border-[#2a3447] bg-transparent hover:bg-[#2a3447] text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#6cea7f] hover:bg-[#5bd36e] text-black"
            >
              Convidar Usuário
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserDialog;
