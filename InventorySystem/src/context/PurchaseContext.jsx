import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";
import {
  getPurchases,
  addPurchase,
  updatePurchase,
  deletePurchase,
} from "@/Services/purchase";

const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);

  // ✅ Fetch all purchases
  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const data = await getPurchases();
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      toast.error("Failed to fetch purchases", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new purchase
  const createPurchase = async (data) => {
    setLoading(true);
    try {
      const purchaseWithDate = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const newPurchase = await addPurchase(purchaseWithDate);
      setPurchases((prev) => [
        ...prev,
        { id: newPurchase.id, ...purchaseWithDate },
      ]);
      toast.success("Purchase added successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error adding purchase:", error);
      toast.error("Failed to add purchase", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update existing purchase
  const editPurchase = async (id, data) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      await updatePurchase(id, updatedData);
      setPurchases((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
      toast.success("Purchase updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating purchase:", error);
      toast.error("Failed to update purchase", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete purchase
  const removePurchase = async (id) => {
    setLoading(true);
    try {
      await deletePurchase(id);
      setPurchases((prev) => prev.filter((p) => p.id !== id));
      toast.success("Purchase deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting purchase:", error);
      toast.error("Failed to delete purchase", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        loading,
        fetchPurchases,
        createPurchase,
        editPurchase,
        removePurchase,
        editingPurchase,
        setEditingPurchase,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchases = () => useContext(PurchaseContext);
