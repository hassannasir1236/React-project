import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
} from "@/Services/brands";

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  // ✅ Fetch all brands (only once or when needed)
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to fetch brands", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create new brand (update local state)
  const createBrand = async (data) => {
    setLoading(true);
    try {
      const brandWithDate = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const newBrand = await addBrand(brandWithDate);
      setBrands((prev) => [...prev, { id: newBrand.id, ...brandWithDate }]); // ✅ update locally
      toast.success("Brand added successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Failed to add brand", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update existing brand (update local state)
  const editBrand = async (id, data) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      await updateBrand(id, updatedData);
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updatedData } : b))
      ); // ✅ update locally
      toast.success("Brand updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Failed to update brand", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete brand (update local state)
  const removeBrand = async (id) => {
    setLoading(true);
    try {
      await deleteBrand(id);
      setBrands((prev) => prev.filter((b) => b.id !== id)); // ✅ remove locally
      toast.success("Brand deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandContext.Provider
      value={{
        brands,
        loading,
        fetchBrands,
        createBrand,
        editBrand,
        removeBrand,
        editingBrand,
        setEditingBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrands = () => useContext(BrandContext);
