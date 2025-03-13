
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportItem {
  date: string;
  entity: string;
  transporter: string;
  product: string;
  plate: string;
  quantity: string;
  bags: string;
  value: string;
  valuePerBag: string;
  freightValue: string;
}

const Reports = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState("compras");
  
  // Sample data
  const reportData: ReportItem[] = [
    {
      date: "11/03/2023",
      entity: "POTENCIAGRO LTDA",
      transporter: "SB TRANSPORTES E LOGÍSTICA LTDA",
      product: "Soja em Grãos - Padrão",
      plate: "RRU6C49",
      quantity: "53.600 kg",
      bags: "893,33",
      value: "R$ 921.116,00",
      valuePerBag: "R$ 1.031,10",
      freightValue: "R$ 827.316,00"
    }
  ];

  // Summary data
  const totalQuantity = "53.600 kg";
  const totalBags = "893,33";
  const totalValue = "R$ 921.116,00";
  const averageValuePerBag = "R$ 1.031,10";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Relatórios</h1>
      
      <Tabs defaultValue="compras" onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="compras">Compras</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compras" className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-md p-6 space-y-6">
            <h2 className="text-lg font-semibold">Filtros</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Período - Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">Período - Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entity">Entidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potenciagro">POTENCIAGRO LTDA</SelectItem>
                    <SelectItem value="other">Outra Entidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transporter">Transportadora</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma transportadora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sb">SB TRANSPORTES E LOGÍSTICA LTDA</SelectItem>
                    <SelectItem value="other">Outra Transportadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product">Produto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soja">Soja em Grãos - Padrão</SelectItem>
                    <SelectItem value="other">Outro Produto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plate">Placa</Label>
                <Input id="plate" placeholder="Digite a placa" />
              </div>
            </div>
            
            <Button variant="outline" className="mt-4">
              Limpar Filtros
            </Button>
          </div>
          
          {/* Summary */}
          <div className="bg-white rounded-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Resumo</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Gerar PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar XML
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Quantidade Total</div>
                <div className="text-lg font-semibold">{totalQuantity}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Sacas Total</div>
                <div className="text-lg font-semibold">{totalBags}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Valor Total</div>
                <div className="text-lg font-semibold">{totalValue}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Valor Médio por Saca</div>
                <div className="text-lg font-semibold">{averageValuePerBag}</div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Entidade</TableHead>
                    <TableHead>Transportadora</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Sacas</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Valor/Saca</TableHead>
                    <TableHead>Valor Frete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.entity}</TableCell>
                      <TableCell>{item.transporter}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.plate}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.bags}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.valuePerBag}</TableCell>
                      <TableCell>{item.freightValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="vendas" className="space-y-6">
          {/* Same structure as compras, but for sales */}
          <div className="bg-white rounded-md p-6 space-y-6">
            <h2 className="text-lg font-semibold">Filtros</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Same filter fields as compras */}
              <div className="space-y-2">
                <Label htmlFor="startDate">Período - Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">Período - Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entity">Entidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potenciagro">POTENCIAGRO LTDA</SelectItem>
                    <SelectItem value="other">Outra Entidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transporter">Transportadora</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma transportadora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sb">SB TRANSPORTES E LOGÍSTICA LTDA</SelectItem>
                    <SelectItem value="other">Outra Transportadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product">Produto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soja">Soja em Grãos - Padrão</SelectItem>
                    <SelectItem value="other">Outro Produto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plate">Placa</Label>
                <Input id="plate" placeholder="Digite a placa" />
              </div>
            </div>
            
            <Button variant="outline" className="mt-4">
              Limpar Filtros
            </Button>
          </div>
          
          {/* Summary - same as compras */}
          <div className="bg-white rounded-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Resumo</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Gerar PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar XML
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Quantidade Total</div>
                <div className="text-lg font-semibold">{totalQuantity}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Sacas Total</div>
                <div className="text-lg font-semibold">{totalBags}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Valor Total</div>
                <div className="text-lg font-semibold">{totalValue}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="text-sm text-gray-500">Valor Médio por Saca</div>
                <div className="text-lg font-semibold">{averageValuePerBag}</div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Entidade</TableHead>
                    <TableHead>Transportadora</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Sacas</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Valor/Saca</TableHead>
                    <TableHead>Valor Frete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.entity}</TableCell>
                      <TableCell>{item.transporter}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.plate}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.bags}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.valuePerBag}</TableCell>
                      <TableCell>{item.freightValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
