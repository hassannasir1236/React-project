import { db } from "@/firebase/Config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const brandCollection = collection(db, "brands");

export const getBrands = async () => {
  const snapshot = await getDocs(brandCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addBrand = async (data) => {
  return await addDoc(brandCollection, data);
};

export const updateBrand = async (id, data) => {
  const brandRef = doc(db, "brands", id);
  return await updateDoc(brandRef, data);
};

export const deleteBrand = async (id) => {
  const brandRef = doc(db, "brands", id);
  return await deleteDoc(brandRef);
};
