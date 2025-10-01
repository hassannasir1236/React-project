import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const mockBrands = [
  { id: 1, name: "Nike", createdAt: "2025-09-30" },
  { id: 2, name: "Adidas", createdAt: "2025-09-28" },
];

export default function DetailsBrand() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = mockBrands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      {/* Search + Actions */}
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

      {/* Table */}
      <div className="overflow-auto rounded-md border border-gray-400 dark:border-gray-600">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 uppercase text-xs">
            <tr>
              {["Brand Name", "Created At", "Actions"].map((col) => (
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
                  colSpan={3}
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
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">
                    {brand.name}
                  </td>
                  <td className="px-4 py-3 border border-gray-400 dark:border-gray-600">
                    {brand.createdAt}
                  </td>
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
