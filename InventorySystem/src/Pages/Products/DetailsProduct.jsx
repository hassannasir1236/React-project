import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Perfume",
    sku: "P001",
    barcode: "123456",
    categoryId: "Fragrance",
    brandId: "BrandA",
    supplierId: "SupplierX",
    costPrice: 100,
    sellingPrice: 120,
    discountType: "percentage",
    discountValue: 10,
    giftMinQty: 2,
    giftQty: 1,
    reorderLevel: 5,
    expiryDate: "2025-12-31",
    stock: 25,
    imageUrl: "",
    createdAt: "2025-09-30",
  },
  {
    id: 2,
    name: "Shoes",
    sku: "S001",
    barcode: "987654",
    categoryId: "Footwear",
    brandId: "BrandB",
    supplierId: "SupplierY",
    costPrice: 200,
    sellingPrice: 250,
    discountType: "fixed",
    discountValue: 20,
    giftMinQty: 0,
    giftQty: 0,
    reorderLevel: 10,
    expiryDate: "",
    stock: 15,
    imageUrl: "",
    createdAt: "2025-09-28",
  },
];

export default function DetailsProduct() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      {/* Search + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search product..."
          className="w-full md:w-1/3 text-black dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            Print
          </Button>
          <Button size="sm" variant="outline">
            Download PDF
          </Button>
          <Button size="sm" variant="outline">
            Download Word
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border border-gray-400 dark:border-gray-600">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 uppercase text-xs">
            <tr>
              {[
                "Name",
                "SKU",
                "Barcode",
                "Category",
                "Brand",
                "Supplier",
                "Cost Price",
                "Selling Price",
                "Discount Type",
                "Discount Value",
                "Gift Min Qty",
                "Gift Qty",
                "Reorder Level",
                "Expiry Date",
                "Stock",
                "Created At",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 border border-gray-400 dark:border-gray-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={17}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.name}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.sku}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.barcode}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.categoryId}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.brandId}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.supplierId}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.costPrice}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.sellingPrice}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.discountType}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.discountValue}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.giftMinQty}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.giftQty}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.reorderLevel}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.expiryDate}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.stock}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{p.createdAt}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600 text-center space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
