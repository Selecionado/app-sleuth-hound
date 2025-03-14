
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, File, Pencil, Trash, Eye } from "lucide-react";
import TransactionDialog from "@/components/TransactionDialog";
import TransactionDetailsDialog from "@/components/TransactionDetailsDialog";

interface Sale {
  id: number;
  date: string;
  entity: string;
  invoiceNumber: string;
  product: string;
  quantity: string;
  totalValue: string;
}

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([
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
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDetailsDialogOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsDialogOpen(false);
    // You could open the edit dialog here if you want
    console.log("Edit sale:", selectedSale);
  };

  const handleDelete = () => {
    if (selectedSale) {
      setSales(sales.filter(sale => sale.id !== selectedSale.id));
      setIsDetailsDialogOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vendas</h1>
          <p className="text-sm text-muted-foreground">
            {sales.length} {sales.length === 1 ? "registro encontrado" : "registros encontrados"}
          </p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Venda
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
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{sale.date}</td>
                    <td className="p-4 align-middle">{sale.entity}</td>
                    <td className="p-4 align-middle">{sale.invoiceNumber}</td>
                    <td className="p-4 align-middle">{sale.product}</td>
                    <td className="p-4 align-middle">{sale.quantity}</td>
                    <td className="p-4 align-middle">{sale.totalValue}</td>
                    <td className="p-4 align-middle">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewDetails(sale)}
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
          title="Nova Venda"
          type="sale"
        />
      )}

      {isDetailsDialogOpen && selectedSale && (
        <TransactionDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          transaction={selectedSale}
          type="sale"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Sales;
