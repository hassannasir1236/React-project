import React from "react";
import AppLayout from "../../Layout/Index";
import AddPurchase from "./AddPurchase";
import DetailsPurchase from "./DetailsPurchase";
import { Toaster } from "sonner";

export default function PurchaseIndex() {
  return (
    <AppLayout>
      <div className="">
        <Toaster />
        <AddPurchase />
        <div className="flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 uppercase text-sm tracking-widest">Purchase History</span>
        </div>
        <DetailsPurchase />
      </div>
    </AppLayout>
  );
}
