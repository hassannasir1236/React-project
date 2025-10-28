import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useProducts } from "@/context/ProductContext"; // ✅ Import context
import { Loader2 } from "lucide-react";

export default function DetailsProduct() {
  const {
    products,
    fetchProducts,
    removeProduct,
    setEditingProduct,
    loading,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts(); // ✅ Fetch Firestore records on mount
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      {/* 🔍 Search & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search product..."
          className="w-full md:w-1/3 text-black dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex space-x-2">
          <Button size="sm" variant="outline">Print</Button>
          <Button size="sm" variant="outline">Download PDF</Button>
          <Button size="sm" variant="outline">Download Word</Button>
        </div>
      </div>

      {/* 📦 Product Table */}
      <div className="overflow-auto rounded-md border border-gray-400 dark:border-gray-600">
        {loading ? (
          <div className="flex justify-center items-center py-6 text-gray-500 dark:text-gray-300">
            <Loader2 className="animate-spin mr-2" /> Loading products...
          </div>
        ) : (
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
                    <td className="px-4 py-3 border">{p.name}</td>
                    <td className="px-4 py-3 border">{p.sku}</td>
                    <td className="px-4 py-3 border">{p.barcode}</td>
                    <td className="px-4 py-3 border">{p.categoryId}</td>
                    <td className="px-4 py-3 border">{p.brandId}</td>
                    <td className="px-4 py-3 border">{p.supplierId}</td>
                    <td className="px-4 py-3 border">{p.costPrice}</td>
                    <td className="px-4 py-3 border">{p.sellingPrice}</td>
                    <td className="px-4 py-3 border">{p.discountType}</td>
                    <td className="px-4 py-3 border">{p.discountValue}</td>
                    <td className="px-4 py-3 border">{p.giftMinQty}</td>
                    <td className="px-4 py-3 border">{p.giftQty}</td>
                    <td className="px-4 py-3 border">{p.reorderLevel}</td>
                    <td className="px-4 py-3 border">{p.expiryDate}</td>
                    <td className="px-4 py-3 border">{p.stock}</td>
                    <td className="px-4 py-3 border">
                      {p.createdAt?.toDate
                        ? p.createdAt.toDate().toLocaleDateString()
                        : p.createdAt}
                    </td>
                    <td className="px-4 py-3 border text-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingProduct(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeProduct(p.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}
