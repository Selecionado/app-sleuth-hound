
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-3 px-6 border-b bg-background flex justify-between items-center">
          <h1 className="text-xl font-semibold">POTENCIAGRO</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Lucas Antunes</span>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
              LA
            </div>
            <div className="ml-2 text-xs bg-gray-700 text-white px-1.5 py-0.5 rounded">v2.0</div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
