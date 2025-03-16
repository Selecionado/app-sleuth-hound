
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Entities from "@/pages/Entities";
import Purchases from "@/pages/Purchases";
import Sales from "@/pages/Sales";
import Industrialization from "@/pages/Industrialization";
import Messages from "@/pages/Messages";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import SharedView from "@/pages/SharedView";
import Stock from "./pages/Stock";
import Projection from "./pages/Projection";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "entities", element: <Entities /> },
      { path: "purchases", element: <Purchases /> },
      { path: "sales", element: <Sales /> },
      { path: "projection", element: <Projection /> },
      { path: "industrialization", element: <Industrialization /> },
      { path: "messages", element: <Messages /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
      { path: "stock", element: <Stock /> },
    ],
  },
  { path: "/share/:type/:id", element: <SharedView /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
