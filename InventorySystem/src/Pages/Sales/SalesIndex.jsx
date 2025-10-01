import React from "react";
import AddSale from "./AddSale";
import SaleItemsTable from "./SaleItemsTable";
import { Toaster } from "sonner";
import AppLayout from "../../Layout/Index"; // your main layout

export default function SalesIndex() {
  return (
    <AppLayout>
      <div className="space-y-10 p-6">
        <Toaster />

        {/* Add Sale */}
        <AddSale />

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400 uppercase text-xs">Sale Items</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {/* Sale Items */}
        <SaleItemsTable />
      </div>
    </AppLayout>
  );
}
