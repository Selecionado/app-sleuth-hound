
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  ListOrdered,
  Factory,
  MessageSquare,
  FileText,
  Settings,
  Warehouse,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = ({ onCloseMobile }: { onCloseMobile?: () => void }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <BarChart3 size={20} />,
      href: "/dashboard",
    },
    {
      label: "Produtos",
      icon: <Package size={20} />,
      href: "/products",
    },
    {
      label: "Entidades",
      icon: <Users size={20} />,
      href: "/entities",
    },
    {
      label: "Compras",
      icon: <ShoppingCart size={20} />,
      href: "/purchases",
    },
    {
      label: "Vendas",
      icon: <ListOrdered size={20} />,
      href: "/sales",
    },
    {
      label: "Industrialização",
      icon: <Factory size={20} />,
      href: "/industrialization",
    },
    {
      label: "Estoque",
      icon: <Warehouse size={20} />,
      href: "/stock",
    },
    {
      label: "Mensagens",
      icon: <MessageSquare size={20} />,
      href: "/messages",
    },
    {
      label: "Relatórios",
      icon: <FileText size={20} />,
      href: "/reports",
    },
    {
      label: "Configurações",
      icon: <Settings size={20} />,
      href: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-[#1e2738] text-white border-r border-[#2a3447] transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen ? (
          <span className="text-lg font-semibold">POTENCIAGRO</span>
        ) : (
          <span className="text-lg font-semibold mx-auto">PG</span>
        )}
        <button 
          onClick={toggleSidebar} 
          className="flex items-center justify-center h-8 w-8 rounded-full bg-[#2a3447] hover:bg-[#3a4457] transition-colors focus:outline-none"
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      
      <div className="flex-grow py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors duration-200",
                  location.pathname === item.href
                    ? "bg-[#2a3447] font-semibold text-white"
                    : "font-medium text-gray-300 hover:bg-[#2a3447] hover:text-white"
                )}
              >
                <div className={cn("flex items-center", !isSidebarOpen && "justify-center w-full")}>
                  {item.icon}
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-[#2a3447] flex items-center justify-center">
        {isSidebarOpen ? (
          <p className="text-sm text-gray-400">Versão 2.5</p>
        ) : (
          <p className="text-sm text-gray-400">v2.5</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
