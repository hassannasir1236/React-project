import React from "react";
import AppLayout from "../../Layout/Index";
import AddProduct from "./AddProduct";
import DetailsProduct from "./DetailsProduct";
import { Toaster } from "sonner";

export default function ProductIndex() {
  return (
    <AppLayout>
      <div className="space-y-10 p-6">

        {/* Toaster */}
        <Toaster />

        {/* Add Product Form Card */}
        <div>
          <AddProduct />
        </div>

        {/* Separator with text */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs font-medium">
            Product List
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Product Table Card */}
        <div>
          <DetailsProduct />
        </div>

      </div>
    </AppLayout>
  );
}
