import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute";
import LoginForm from "../Pages/Auth/LoginForm";
import DashboardPage from "../Pages/Dashboard/Index";
import SupplierIndex from "../Pages/Supplier/Index";
import CategoryIndex from "../Pages/Category/Index";
import ProductIndex from "../Pages/Products/Index";
import BrandsIndex from "../Pages/Brands/BrandsIndex";
import SalesIndex from "../Pages/Sales/SalesIndex";
import PurchaseIndex from "../Pages/Purchase/PurchaseIndex";

import { SupplierProvider } from "@/context/SupplierContext";
import { BrandProvider } from "@/context/BrandContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { ProductProvider } from "@/context/ProductContext";
import { PurchaseProvider } from "@/context/PurchaseContext";

export default function CustomRoutes() {
  return (
      <SupplierProvider>
        <BrandProvider>
          <CategoryProvider>
            <ProductProvider>
              <PurchaseProvider>
                <Routes>
                  {/* Public Route */}
                  <Route path="/" element={<LoginForm />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/supplier"
                    element={
                      <PrivateRoute>
                        <SupplierIndex />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/category"
                    element={
                      <PrivateRoute>
                        <CategoryIndex />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <PrivateRoute>
                        <ProductIndex />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/brands"
                    element={
                      <PrivateRoute>
                        <BrandsIndex />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/sales"
                    element={
                      <PrivateRoute>
                        <SalesIndex />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/purchase"
                    element={
                      <PrivateRoute>
                        <PurchaseIndex />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </PurchaseProvider>
            </ProductProvider>
          </CategoryProvider>
        </BrandProvider>
      </SupplierProvider>
  );
}
