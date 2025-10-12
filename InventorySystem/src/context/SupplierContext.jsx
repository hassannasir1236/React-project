// src/context/SupplierContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/Services/suppiler";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";

const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all suppliers
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getAllSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
        toast.error("Failed to fetch suppliers", {
          position: "top-right",
        });
    } finally {
      setLoading(false);
    }
  };

    // ✅ Add a supplier
    const createSupplier = async (supplierData) => {
    setLoading(true);
    try {
        const newSupplierData = {
        ...supplierData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        };

        const newId = await addSupplier(newSupplierData);

        // ✅ Add to local state (with Firestore timestamps included)
        const newSupplier = { id: newId, ...newSupplierData };
        setSuppliers((prev) => [...prev, newSupplier]);

        toast.success("Supplier added successfully!", { position: "top-right" });
    } catch (err) {
        console.error("Error adding supplier:", err);
        toast.error("Failed to add supplier", { position: "top-right" });
    } finally {
        setLoading(false);
    }
    };

    // ✅ Update an existing supplier
    const editSupplier = async (id, updatedData) => {
    setLoading(true);
    try {
        const updatedSupplierData = {
        ...updatedData,
        updatedAt: Timestamp.now(), // update only this timestamp
        };

        await updateSupplier(id, updatedSupplierData);

        // ✅ Update state immediately
        setSuppliers((prev) =>
        prev.map((s) =>
            s.id === id ? { ...s, ...updatedSupplierData } : s
        )
        );

        toast.success("Supplier updated successfully!", { position: "top-right" });
    } catch (err) {
        console.error("Error updating supplier:", err);
        toast.error("Failed to update supplier", { position: "top-right" });
    } finally {
        setLoading(false);
    }
    };

  // ✅ Delete a supplier
  const removeSupplier = async (id) => {
    setLoading(true);
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Supplier deleted successfully!", {
          position: "top-right",
        });
    } catch (err) {
      console.error("Error deleting supplier:", err);
      toast.error("Failed to delete supplier", {
          position: "top-right",
        });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch data on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        loading,
        createSupplier,
        editSupplier,
        removeSupplier,
        refreshSuppliers: fetchSuppliers,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSuppliers = () => useContext(SupplierContext);
