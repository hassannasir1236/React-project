import React, { useState } from "react";
import { useCategories } from "@/context/CategoryContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ConfirmDialog from "@/dialog/ConfirmDialog";
import FullPageLoader from "@/components/ui/FullPageLoader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input as FormInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ✅ Validation Schema
const CategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
  description: z.string().optional(),
});

// ✅ Helper: format Firestore Timestamps
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function CategoryTable() {
  const {
    loading,
    categories,
    createCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  if (loading) {
      return <FullPageLoader message="Loading Category..." />;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: { name: "", description: "" },
  });

  // ✅ Handle Edit
  const handleEdit = (category) => {
    setEditingCategory(category);
    form.reset(category);
    setIsModalOpen(true);
  };

  // ✅ Submit (Add / Update)
  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await editCategory(editingCategory.id, data);
      } else {
        await createCategory(data);
      }
      setIsModalOpen(false);
      form.reset();
      setEditingCategory(null);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // ✅ Delete Category
  const handleDelete = async (category) => {
    try {
      await removeCategory(category.id);
    } catch (error) {
    }
  };

  // ✅ Filtered Categories
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      {/* Search + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search by category..."
          className="w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border border-gray-400 dark:border-gray-600">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border border-gray-400 dark:border-gray-600">Name</th>
              <th className="px-4 py-3 border border-gray-400 dark:border-gray-600">Description</th>
              <th className="px-4 py-3 border border-gray-400 dark:border-gray-600">Created At</th>
              <th className="px-4 py-3 border border-gray-400 dark:border-gray-600">Updated At</th>
              <th className="px-4 py-3 border border-gray-400 dark:border-gray-600 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">{category.description}</td>
                  <td className="px-4 py-3">{formatTimestamp(category.createdAt)}</td>
                  <td className="px-4 py-3">{formatTimestamp(category.updatedAt)}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                    <ConfirmDialog
                      triggerLabel="Delete"
                      title="Delete Category?"
                      description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
                      confirmLabel="Yes, Delete"
                      variant="destructive"
                      onConfirm={() => handleDelete(category)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Add / Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <FormInput
                placeholder="Enter category name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Enter description (optional)"
                {...form.register("description")}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingCategory ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
