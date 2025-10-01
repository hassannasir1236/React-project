import React from "react";
import AppLayout from "../../Layout/Index";
import AddBrand from "./AddBrand";
import DetailsBrand from "./DetailsBrand";
import { Toaster } from "sonner";

export default function BrandsIndex() {
  return (
    <AppLayout>
      <div className="">
        {/* Toaster */}
        <Toaster />

        {/* Add Brand Form */}
        <div className="">
          <AddBrand />
        </div>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs font-medium">
            Brand List
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Brand Table */}
        <div>
          <DetailsBrand />
        </div>
      </div>
    </AppLayout>
  );
}
