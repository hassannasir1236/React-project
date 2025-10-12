import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/Services/categories";
import { Timestamp } from "firebase/firestore";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories once
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

    // ✅ Add category (update state immediately)
    const createCategory = async (data) => {
        try {
            setLoading(true);

            // Prepare the data with timestamps
            const newCategory = {
            ...data,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            };

            // Add to Firestore
            const docRef = await addCategory(newCategory);

            // Show success message
            toast.success("Category added successfully!", { position: "top-right" });

            // Update local state immediately
            setCategories((prev) => [
                ...prev,
                { id: docRef.id, ...newCategory },
            ]);

        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Edit Category (update updatedAt)
    const editCategory = async (id, data) => {
        try {
            setLoading(true);

            // Add updatedAt timestamp
            const updatedCategory = {
            ...data,
            updatedAt: Timestamp.now(),
            };

            // Update Firestore record
            await updateCategory(id, updatedCategory);

            // Update local state immediately
            setCategories((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, ...updatedCategory } : cat
            )
            );

            toast.success("Category updated successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Failed to update category");
        } finally {
            setLoading(false);
        }
    };

  // ✅ Delete category (update state immediately)
  const removeCategory = async (id) => {
    try {
        setLoading(true);
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        createCategory,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
