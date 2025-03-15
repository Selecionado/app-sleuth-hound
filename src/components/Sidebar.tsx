
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Factory, 
  FileText, 
  MessageSquare, 
  Settings 
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Entidades", path: "/entidades" },
  { icon: Package, label: "Produtos", path: "/produtos" },
  { icon: ShoppingCart, label: "Compras", path: "/compras" },
  { icon: DollarSign, label: "Vendas", path: "/vendas" },
  { icon: Factory, label: "Industrialização", path: "/industrializacao" },
  { icon: FileText, label: "Relatórios", path: "/relatorios" },
  { icon: MessageSquare, label: "Mensagens", path: "/mensagens" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

const Sidebar = ({ onCloseMobile }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <aside className="w-60 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
          P
        </div>
        <div className="font-bold text-sidebar-foreground">
          POTENCIAGRO<span className="text-xs ml-1 text-gray-400">v2.0</span>
        </div>
      </div>
      
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.path || 
                  (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
            LA
          </div>
          <div className="text-sm text-sidebar-foreground">Lucas Antunes</div>
          <div className="ml-auto text-xs bg-gray-700 text-white px-1.5 py-0.5 rounded">v2.0</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
