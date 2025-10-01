import React from "react";
import AppLayout from "../../Layout/Index"; 
import AddSupplier from "./AddSupplier";
import SupplierTable from "./DetailSupplier";
import { Toaster } from "sonner";

function SupplierIndex() {
  return (
      <AppLayout>
        <div className="">
          {/* Toaster */}
          <Toaster />

          {/* Add Supplier Form */}
          <div>
            <AddSupplier />
          </div>

           {/* Separator with optional text */}
          <div className="flex items-center my-18">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs font-medium">
              Supplier List
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Supplier Table */}
          <div>
            <SupplierTable />
          </div>
        </div>
      </AppLayout>

  );
}

export default SupplierIndex;
