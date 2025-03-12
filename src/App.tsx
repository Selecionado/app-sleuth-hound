
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Entities from "./pages/Entities";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import Industrialization from "./pages/Industrialization";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="entidades" element={<Entities />} />
              <Route path="produtos" element={<Products />} />
              <Route path="compras" element={<Purchases />} />
              <Route path="vendas" element={<Sales />} />
              <Route path="industrializacao" element={<Industrialization />} />
              <Route path="relatorios" element={<Reports />} />
              <Route path="mensagens" element={<Messages />} />
              <Route path="configuracoes" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
