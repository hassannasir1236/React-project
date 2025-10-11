// src/Pages/Supplier/SupplierTable.jsx
import React, { useState } from "react";
import { useSuppliers } from "@/context/SupplierContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmDialog from "@/dialog/ConfirmDialog";
import SupplierFormDialog from "./SupplierFormDialog";
export default function SupplierTable() {
  const { suppliers, removeSupplier, loading } = useSuppliers();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Skeleton while loading
  if (loading) {
    return (
      <Card className="p-6 shadow-lg bg-white dark:bg-gray-900">
        <div className="mb-4">
          <Skeleton className="h-10 w-1/3" />
        </div>

        <div className="overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase">
              <tr>
                {["Name", "Email", "Phone", "Address", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-5 w-32" />
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-5 w-24" />
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-5 w-48" />
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 text-center">
                    <Skeleton className="h-8 w-16 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  // 🔍 Searching
  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredSuppliers.length / perPage);
  const currentData = filteredSuppliers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 🔍 Search */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <Input
          placeholder="Search supplier..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3"
        />
      </div>

      {/* 🧾 Table */}
      <div className="overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300">
            <tr>
              {["Name", "Email", "Phone", "Address", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 border border-gray-200 dark:border-gray-700 text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No suppliers found.
                </td>
              </tr>
            ) : (
              currentData.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {s.name}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {s.email}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {s.phone}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {s.address}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 text-center">
                    <SupplierFormDialog
                      mode="edit"
                      supplier={s}
                      onSubmit={(values) => updateSupplier(s.id, values)}
                    />
                    <ConfirmDialog
                      triggerLabel="Delete"
                      title="Delete Supplier?"
                      description={`Are you sure you want to delete ${s.name}? This action cannot be undone.`}
                      confirmLabel="Yes, Delete"
                      onConfirm={() => removeSupplier(s.id)}
                      variant="destructive"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </Button>
          <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  );
}
