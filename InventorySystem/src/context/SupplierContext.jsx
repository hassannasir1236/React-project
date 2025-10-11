// src/context/SupplierContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllSuppliers, deleteSupplier } from "@/Services/suppiler";
import { toast } from "sonner";

const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getAllSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete supplier
  const removeSupplier = async (id) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Supplier deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete supplier");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        setSuppliers,
        removeSupplier,
        loading,
        refreshSuppliers: fetchSuppliers,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSuppliers = () => useContext(SupplierContext);
