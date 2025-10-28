import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/Config";

const productCollectionRef = collection(db, "products");

// ✅ Add a new product
export const addProduct = async (productData) => {
  const docRef = await addDoc(productCollectionRef, productData);
  return { id: docRef.id };
};

// ✅ Get all products
export const getProducts = async () => {
  const snapshot = await getDocs(productCollectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Update a product
export const updateProduct = async (id, updatedData) => {
  const productDocRef = doc(db, "products", id);
  await updateDoc(productDocRef, updatedData);
};

// ✅ Delete a product
export const deleteProduct = async (id) => {
  const productDocRef = doc(db, "products", id);
  await deleteDoc(productDocRef);
};