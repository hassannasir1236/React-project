import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockSuppliers = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali@example.com",
    phone: "03001234567",
    address: "Karachi, Pakistan",
    createdAt: "2025-09-30",
  },
  {
    id: 2,
    name: "Sara Malik",
    email: "sara@example.com",
    phone: "03009876543",
    address: "Lahore, Pakistan",
    createdAt: "2025-09-28",
  },
  // Add more mock rows here...
];

export default function SupplierTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      {/* Search + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/3 text-black dark:text-white border-gray-400 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="text-black dark:text-white border-gray-600 dark:border-gray-400">
            Print
          </Button>
          <Button size="sm" variant="outline" className="text-black dark:text-white border-gray-600 dark:border-gray-400">
            Download PDF
          </Button>
          <Button size="sm" variant="outline" className="text-black dark:text-white border-gray-600 dark:border-gray-400">
            Download Word
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border border-gray-400 dark:border-gray-600">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 uppercase text-xs">
            <tr>
              {["Name","Email","Phone","Address","Created At","Actions"].map((col) => (
                <th key={col} className="px-4 py-3 border border-gray-400 dark:border-gray-600">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No suppliers found.
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{supplier.name}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{supplier.email}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{supplier.phone}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{supplier.address}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">{supplier.createdAt}</td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600 text-center space-x-2">
                    <Button size="sm" variant="outline" className="text-black dark:text-white border-gray-600 dark:border-gray-400">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="bg-black dark:bg-white text-white dark:text-black border-gray-600 dark:border-gray-400">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <Button size="sm" variant="outline" className="text-black dark:text-white border-gray-600 dark:border-gray-400">
          Previous
        </Button>
        <Button size="sm" variant="default" className="bg-black dark:bg-white text-white dark:text-black border-gray-600 dark:border-gray-400">
          1
        </Button>
        <Button size="sm" variant="outline" className="text-black dark:text-white border-gray-600 dark:border-gray-400">
          Next
        </Button>
      </div>
    </Card>
  );
}
