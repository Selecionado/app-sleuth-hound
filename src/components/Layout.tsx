
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      
      {/* Responsive sidebar */}
      <div 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                   ${isMobile ? 'fixed z-40 shadow-xl' : 'relative'} 
                   transition-transform duration-300 ease-in-out h-screen`}
      >
        <Sidebar onCloseMobile={() => isMobile && setSidebarOpen(false)} />
      </div>
      
      <div className={`flex-1 flex flex-col overflow-hidden ${isMobile && sidebarOpen ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="py-3 px-6 border-b bg-background flex justify-between items-center">
          <h1 className="text-xl font-semibold">POTENCIAGRO</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm hidden sm:inline">Lucas Antunes</span>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
              LA
            </div>
            <div className="ml-2 text-xs bg-gray-700 text-white px-1.5 py-0.5 rounded">v2.5</div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
