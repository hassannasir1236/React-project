// /Services/categories.js
import { db } from "@/firebase/Config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const categoryCollection = collection(db, "categories");

// ✅ Get all categories
export const getCategories = async () => {
  const snapshot = await getDocs(categoryCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ✅ Add new category
export const addCategory = async (data) => {
  return await addDoc(categoryCollection, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
};

// ✅ Update category
export const updateCategory = async (id, data) => {
  const categoryRef = doc(db, "categories", id);
  await updateDoc(categoryRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// ✅ Delete category
export const deleteCategory = async (id) => {
  const categoryRef = doc(db, "categories", id);
  await deleteDoc(categoryRef);
};
