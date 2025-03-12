
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-4 px-6 border-b bg-background">
          <h1 className="text-xl font-semibold">POTENCIAGRO</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
