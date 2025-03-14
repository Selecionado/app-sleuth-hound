
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, File, Pencil, Trash, Eye } from "lucide-react";
import TransactionDialog from "@/components/TransactionDialog";
import TransactionDetailsDialog from "@/components/TransactionDetailsDialog";

interface Purchase {
  id: number;
  date: string;
  entity: string;
  invoiceNumber: string;
  product: string;
  quantity: string;
  totalValue: string;
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: 1,
      date: "11/03/2023",
      entity: "POTENCIAGRO LTDA",
      invoiceNumber: "1488",
      product: "Soja em Grãos - Padrão",
      quantity: "53.600 kg",
      totalValue: "R$ 521.116,00"
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  const handleViewDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDetailsDialogOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsDialogOpen(false);
    // You could open the edit dialog here if you want
    console.log("Edit purchase:", selectedPurchase);
  };

  const handleDelete = () => {
    if (selectedPurchase) {
      setPurchases(purchases.filter(purchase => purchase.id !== selectedPurchase.id));
      setIsDetailsDialogOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Compras</h1>
          <p className="text-sm text-muted-foreground">
            {purchases.length} {purchases.length === 1 ? "registro encontrado" : "registros encontrados"}
          </p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Compra
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Entidade</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Nota Fiscal</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Produto</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Quantidade</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Valor Total</th>
                  <th className="h-12 px-4 text-center align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{purchase.date}</td>
                    <td className="p-4 align-middle">{purchase.entity}</td>
                    <td className="p-4 align-middle">{purchase.invoiceNumber}</td>
                    <td className="p-4 align-middle">{purchase.product}</td>
                    <td className="p-4 align-middle">{purchase.quantity}</td>
                    <td className="p-4 align-middle">{purchase.totalValue}</td>
                    <td className="p-4 align-middle">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewDetails(purchase)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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

      {isDialogOpen && (
        <TransactionDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          title="Nova Compra"
          type="purchase"
        />
      )}

      {isDetailsDialogOpen && selectedPurchase && (
        <TransactionDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          transaction={selectedPurchase}
          type="purchase"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Purchases;
