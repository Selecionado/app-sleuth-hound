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
  Database,
  Link2,
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
      label: "Links Compartilhados",
      icon: <Link2 size={20} />,
      href: "/shared-links",
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
        "flex flex-col h-full bg-[#1e2738] text-white border-r border-[#2a3447] w-64",
        !isSidebarOpen ? "w-16" : ""
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <span className="text-lg font-semibold">POTENCIAGRO</span>
        <button onClick={toggleSidebar} className="focus:outline-none">
          {/* You can use an icon here to toggle the sidebar */}
          {isSidebarOpen ? "<<" : ">>"}
        </button>
      </div>
      <div className="flex-grow p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-md hover:bg-[#2a3447] transition-colors duration-200",
                  location.pathname === item.href
                    ? "bg-[#2a3447] font-semibold"
                    : "font-medium"
                )}
              >
                {item.icon}
                <span className={cn(!isSidebarOpen ? "hidden" : "")}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-[#2a3447]">
        <p className="text-sm text-gray-400">
          Versão 2.0
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
