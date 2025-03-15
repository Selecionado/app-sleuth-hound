
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Share2, Link as LinkIcon } from "lucide-react";

interface ShareLinkDialogProps {
  open: boolean;
  onClose: () => void;
  dataType: string;
  dataId: string;
}

const ShareLinkDialog = ({ open, onClose, dataType, dataId }: ShareLinkDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareLink, setShareLink] = useState("");
  
  const generateShareLink = () => {
    setIsGenerating(true);
    
    // Gerar um token único (na vida real, isso seria feito no backend)
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    
    // Construir o link completo
    const baseUrl = window.location.origin;
    const publicLink = `${baseUrl}/share/${dataType}/${dataId}?token=${token}`;
    
    // Simular um atraso de backend
    setTimeout(() => {
      setShareLink(publicLink);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copiado para a área de transferência");
    
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar dados</DialogTitle>
          <DialogDescription>
            Gere um link público para compartilhar esses dados com qualquer pessoa.
          </DialogDescription>
        </DialogHeader>
        
        {!shareLink ? (
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Qualquer pessoa com o link poderá visualizar esses dados sem necessidade de login.
              </p>
            </div>
            
            <Button 
              onClick={generateShareLink} 
              disabled={isGenerating}
              className="w-full"
            >
              <Share2 className="mr-2 h-4 w-4" />
              {isGenerating ? "Gerando link..." : "Gerar link de compartilhamento"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="w-full"
                  onClick={(e) => {
                    (e.target as HTMLInputElement).select();
                  }}
                />
              </div>
              <Button size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Este link é válido por 30 dias. Você pode revogá-lo a qualquer momento nas configurações.
            </p>
          </div>
        )}
        
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkDialog;
