import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import LoginForm from './pages/Auth/LoginForm'
// import DashboardPage from './Pages/Dashboard/Index'
// import SupplierIndex from "./Pages/Supplier/Index";
// import CategoryIndex from "./Pages/Category/Index";
// import ProductIndex from "./Pages/Products/Index";
// import BrandsIndex from "./Pages/Brands/BrandsIndex";
import SalesIndex from "./Pages/Sales/SalesIndex";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         {/* <div className="bg-gray-700 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">

          </div>
          Acme Inc.
        </a> */}
        <SalesIndex />
      {/* </div>
    </div> */}

    </>
  )
}

export default App
