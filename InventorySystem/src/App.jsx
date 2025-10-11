import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginForm from './Pages/Auth/LoginForm';
import DashboardPage from './Pages/Dashboard/Index';
import SupplierIndex from "./Pages/Supplier/Index";
import CategoryIndex from "./Pages/Category/Index";
import ProductIndex from "./Pages/Products/Index";
import BrandsIndex from "./Pages/Brands/BrandsIndex";
import SalesIndex from "./Pages/Sales/SalesIndex";
import PurchaseIndex from "./Pages/Purchase/PurchaseIndex";
import CustomRoutes from './routes/CustomRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomRoutes />
    </>
  )
}

export default App
