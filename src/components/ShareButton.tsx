
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import ShareLinkDialog from "./ShareLinkDialog";

interface ShareButtonProps {
  dataType: string;
  dataId: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ShareButton = ({ dataType, dataId, variant = "outline", size = "sm", className }: ShareButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setDialogOpen(true)}
        className={className}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Compartilhar
      </Button>

      <ShareLinkDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dataType={dataType}
        dataId={dataId}
      />
    </>
  );
};

export default ShareButton;
