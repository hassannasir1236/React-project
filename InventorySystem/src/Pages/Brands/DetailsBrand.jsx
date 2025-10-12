import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useBrands } from "@/context/BrandContext";
import AddBrand from "./AddBrand";
import ConfirmDialog from "@/dialog/ConfirmDialog";

// ✅ Helper: Format Firestore timestamp or JS Date
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "-";

  let date;
  try {
    date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  } catch {
    date = new Date(timestamp);
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function DetailsBrand() {
  const { brands, removeBrand, editingBrand, setEditingBrand } = useBrands();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // 🔍 Filter brands by name
  const filteredBrands = brands.filter((b) =>
    b.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🧩 Handle Add/Edit Modal
  const handleOpenModal = (brand = null) => {
    setEditingBrand(brand); // if null → add mode, else edit mode
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingBrand(null);
    setOpenModal(false);
  };

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      {/* 🔍 Search + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search brand..."
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

      {/* 🧾 Brand Table */}
      <div className="overflow-auto rounded-md border border-gray-400 dark:border-gray-600">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 uppercase text-xs">
            <tr>
              {["Brand Name", "Created At", "Updated At", "Actions"].map((col) => (
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
            {filteredBrands.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No brands found.
                </td>
              </tr>
            ) : (
              filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600 font-medium">
                    {brand.name}
                  </td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                    {formatTimestamp(brand.createdAt)}
                  </td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                    {formatTimestamp(brand.updatedAt)}
                  </td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600 text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal(brand)}
                    >
                      Edit
                    </Button>
                    <ConfirmDialog
                      triggerLabel="Delete"
                      title="Delete Brand?"
                      description={`Are you sure you want to delete "${brand.name}"? This action cannot be undone.`}
                      confirmLabel="Yes, Delete"
                      onConfirm={() => removeBrand(brand.id)}
                      variant="destructive"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🧩 Add/Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✕
            </button>

            {/* Pass mode & brand to AddBrand */}
            <AddBrand
              existingBrand={editingBrand}
              mode={editingBrand ? "edit" : "add"}
              onSuccess={handleCloseModal}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
