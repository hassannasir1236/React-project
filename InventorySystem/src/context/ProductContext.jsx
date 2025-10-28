import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/Services/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new product
  const createProduct = async (data) => {
    setLoading(true);
    try {
      const productWithDate = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const newProduct = await addProduct(productWithDate);
      setProducts((prev) => [
        ...prev,
        { id: newProduct.id, ...productWithDate },
      ]);
      toast.success("Product added successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update existing product
  const editProduct = async (id, data) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      await updateProduct(id, updatedData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
      toast.success("Product updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete product
  const removeProduct = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        createProduct,
        editProduct,
        removeProduct,
        editingProduct,
        setEditingProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
