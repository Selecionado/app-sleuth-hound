
import { useState } from "react";
import { 
  TableCell, 
  TableRow, 
  TableHeader, 
  TableHead, 
  TableBody, 
  Table 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Link2, 
  Eye, 
  RefreshCw, 
  Trash2, 
  Search,
  Plus
} from "lucide-react";
import { toast } from "sonner";

// Interface para os links compartilhados
interface SharedLink {
  id: string;
  type: string;
  resourceId: string;
  resourceName: string;
  createdAt: string;
  expiresAt: string;
  url: string;
  views: number;
}

const SharedLinks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dados simulados de links compartilhados
  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([
    {
      id: "link-1",
      type: "industrialization",
      resourceId: "ind-12345",
      resourceName: "Industrialização Lote 12345",
      createdAt: "2023-11-15",
      expiresAt: "2023-12-15",
      url: `${window.location.origin}/share/industrialization/ind-12345?token=abc123`,
      views: 5
    },
    {
      id: "link-2",
      type: "transaction",
      resourceId: "trans-67890",
      resourceName: "Venda de Farelo para Cooperativa Central",
      createdAt: "2023-11-20",
      expiresAt: "2023-12-20",
      url: `${window.location.origin}/share/transaction/trans-67890?token=def456`,
      views: 12
    },
    {
      id: "link-3",
      type: "report",
      resourceId: "rep-86420",
      resourceName: "Relatório Mensal de Produção",
      createdAt: "2023-11-22",
      expiresAt: "2023-12-22",
      url: `${window.location.origin}/share/report/rep-86420?token=ghi789`,
      views: 8
    }
  ]);

  // Filtrar links com base na pesquisa
  const filteredLinks = sharedLinks.filter(link => 
    link.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para copiar link
  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência");
  };

  // Função para renovar link (simula renovação por 30 dias)
  const renewLink = (id: string) => {
    setSharedLinks(links => 
      links.map(link => {
        if (link.id === id) {
          const currentDate = new Date();
          const expiryDate = new Date();
          expiryDate.setDate(currentDate.getDate() + 30);
          
          return {
            ...link,
            expiresAt: expiryDate.toISOString().split('T')[0]
          };
        }
        return link;
      })
    );
    toast.success("Link renovado por mais 30 dias");
  };

  // Função para excluir link
  const deleteLink = (id: string) => {
    setSharedLinks(links => links.filter(link => link.id !== id));
    toast.success("Link excluído com sucesso");
  };

  // Função para formatar tipo do recurso
  const formatResourceType = (type: string) => {
    switch (type) {
      case "industrialization": return "Industrialização";
      case "transaction": return "Transação";
      case "report": return "Relatório";
      default: return type;
    }
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Links Compartilhados</h1>
          <p className="text-muted-foreground">
            Gerencie os links públicos para compartilhamento de dados
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Novo Link
        </Button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar links compartilhados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recurso</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
              <TableHead className="hidden lg:table-cell">Criado</TableHead>
              <TableHead className="hidden lg:table-cell">Expira</TableHead>
              <TableHead className="hidden sm:table-cell">Visualizações</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Nenhum link compartilhado encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.resourceName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatResourceType(link.type)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(link.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(link.expiresAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{link.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyLink(link.url)}
                        title="Copiar link"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(link.url, "_blank")}
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => renewLink(link.id)}
                        title="Renovar link"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteLink(link.id)}
                        title="Excluir link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SharedLinks;
