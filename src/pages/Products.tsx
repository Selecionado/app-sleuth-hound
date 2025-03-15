
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, Search, Filter, Download, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string;
  category?: string;
  stock?: number;
  unit?: string;
  price?: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Soja em Grãos - Padrão",
      description: "Soja até 8 % de avariado",
      category: "Matéria prima",
      stock: 1250,
      unit: "ton",
      price: 125.5
    },
    {
      id: "2",
      name: "Farelo de soja",
      description: "Farelo de soja - Produto Industrializado",
      category: "Produto final",
      stock: 750,
      unit: "ton",
      price: 98.3
    },
    {
      id: "3",
      name: "Óleo de soja",
      description: "Óleo de soja bruto degomado- Produto Industrializado",
      category: "Produto final",
      stock: 430,
      unit: "kL",
      price: 210.75
    },
    {
      id: "4",
      name: "Resíduo de soja",
      description: "Subproduto de soja",
      category: "Subproduto",
      stock: 85,
      unit: "ton",
      price: 45.0
    }
  ]);

  const [activeTab, setActiveTab] = useState("produtos");
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "Matéria prima",
    stock: "",
    unit: "ton",
    price: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        description: newProduct.description,
        category: newProduct.category,
        stock: newProduct.stock ? parseFloat(newProduct.stock) : 0,
        unit: newProduct.unit,
        price: newProduct.price ? parseFloat(newProduct.price) : 0
      };
      
      setProducts(prev => [...prev, product]);
      setNewProduct({
        name: "",
        description: "",
        category: "Matéria prima",
        stock: "",
        unit: "ton",
        price: ""
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "Matéria prima":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Produto final":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Subproduto":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            Cadastro e gerenciamento de produtos
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button 
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="produtos" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="novo">Novo Produto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="produtos">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto rounded-b-lg">
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-700 uppercase bg-muted/40">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">Produto</th>
                      <th scope="col" className="px-6 py-3 text-left">Descrição</th>
                      <th scope="col" className="px-6 py-3 text-left">Categoria</th>
                      <th scope="col" className="px-6 py-3 text-left">Estoque</th>
                      <th scope="col" className="px-6 py-3 text-left">Preço/ton</th>
                      <th scope="col" className="px-6 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                          Nenhum produto encontrado
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 max-w-[300px] truncate">
                            {product.description}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={getCategoryColor(product.category)}>
                              {product.category || "Não categorizado"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {product.stock} {product.unit}
                          </td>
                          <td className="px-6 py-4">
                            R$ {product.price?.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="novo">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Cadastrar Novo Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nome do Produto
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nome do produto"
                      value={newProduct.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium">
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
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium">
                      Categoria
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newProduct.category}
                      onChange={handleInputChange}
                    >
                      <option value="Matéria prima">Matéria prima</option>
                      <option value="Produto final">Produto final</option>
                      <option value="Subproduto">Subproduto</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="stock" className="block text-sm font-medium">
                        Estoque Inicial
                      </label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        placeholder="Quantidade"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="unit" className="block text-sm font-medium">
                        Unidade
                      </label>
                      <select
                        id="unit"
                        name="unit"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newProduct.unit}
                        onChange={handleInputChange}
                      >
                        <option value="ton">ton</option>
                        <option value="kg">kg</option>
                        <option value="L">L</option>
                        <option value="kL">kL</option>
                        <option value="un">un</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium">
                      Preço (R$/unidade)
                    </label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Preço por unidade"
                      value={newProduct.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleAddProduct}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Produto
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
