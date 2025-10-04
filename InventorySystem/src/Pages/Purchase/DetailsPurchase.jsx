import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    id: 1,
    supplier: "Supplier A",
    purchaseDate: "2025-10-01",
    totalAmount: 1500,
  },
  {
    id: 2,
    supplier: "Supplier B",
    purchaseDate: "2025-10-02",
    totalAmount: 800,
  },
];

export default function DetailsPurchase() {
  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Purchase Records</h2>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white uppercase">
            <tr>
              <th className="border px-4 py-2">Supplier</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border px-4 py-2">{row.supplier}</td>
                <td className="border px-4 py-2">{row.purchaseDate}</td>
                <td className="border px-4 py-2">Rs. {row.totalAmount}</td>
                <td className="border px-4 py-2 space-x-2 text-center">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
