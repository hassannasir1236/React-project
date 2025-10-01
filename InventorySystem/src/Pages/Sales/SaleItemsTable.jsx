import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockItems = [
  {
    id: 1,
    productId: "prod123",
    quantity: 2,
    costPrice: 100,
    giftQty: 1,
    totalQtyAdded: 3,
    subtotal: 200,
  },
];

export default function SaleItemsTable() {
  return (
    <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sale Items</h3>

      <div className="overflow-auto rounded-md">
        <table className="min-w-full text-sm table-auto border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              {["Product ID", "Quantity", "Gift Qty", "Total Qty", "Cost", "Subtotal"].map((head) => (
                <th key={head} className="px-4 py-2 border">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockItems.map((item) => (
              <tr key={item.id} className="border hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-2 border">{item.productId}</td>
                <td className="px-4 py-2 border">{item.quantity}</td>
                <td className="px-4 py-2 border">{item.giftQty}</td>
                <td className="px-4 py-2 border">{item.totalQtyAdded}</td>
                <td className="px-4 py-2 border">Rs {item.costPrice}</td>
                <td className="px-4 py-2 border">Rs {item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline">Print</Button>
        <Button variant="outline">Export</Button>
      </div>
    </Card>
  );
}
