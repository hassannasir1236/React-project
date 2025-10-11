// services/supplier.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/Config"; // Make sure path is correct


const supplierCollectionRef = collection(db, "suppliers");

// ✅ Add a new supplier
export const addSupplier = async (supplierData) => {
  const docRef = await addDoc(supplierCollectionRef, supplierData);
  return docRef.id; // Returns new document ID
};

// ✅ Get all suppliers
export const getAllSuppliers = async () => {
  const snapshot = await getDocs(supplierCollectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ✅ Update a supplier
export const updateSupplier = async (id, updatedData) => {
  const supplierDocRef = doc(db, "suppliers", id);
  await updateDoc(supplierDocRef, updatedData);
};

// ✅ Delete a supplier
export const deleteSupplier = async (id) => {
  const supplierDocRef = doc(db, "suppliers", id);
  await deleteDoc(supplierDocRef);
};
