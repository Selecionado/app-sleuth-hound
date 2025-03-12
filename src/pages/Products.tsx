
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Soja em Grãos - Padrão",
      description: "Soja até 8 % de avariado"
    },
    {
      id: "2",
      name: "Farelo de soja",
      description: "Farelo de soja - Produto Industrializado"
    },
    {
      id: "3",
      name: "Óleo de soja",
      description: "Óleo de soja bruto degomado- Produto Industrializado"
    },
    {
      id: "4",
      name: "Resíduo de soja",
      description: "Subproduto de soja"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.name.trim() && newProduct.description.trim()) {
      const product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description
      };
      
      setProducts(prev => [...prev, product]);
      setNewProduct({ name: "", description: "" });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>
      
      <h2 className="text-xl font-semibold mb-4">Cadastro - Produto</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add New Product Form */}
        <Card>
          <CardHeader>
            <CardTitle>Novo Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descrição do produto"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  rows={4}
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setNewProduct({ name: "", description: "" })}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct}>
                  Salvar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground border-b">
                  <tr>
                    <th className="text-left py-3 px-2">Nome</th>
                    <th className="text-left py-3 px-2">Descrição</th>
                    <th className="text-right py-3 px-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="py-3 px-2">{product.name}</td>
                      <td className="py-3 px-2">{product.description}</td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteProduct(product.id)}
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

export default Products;
