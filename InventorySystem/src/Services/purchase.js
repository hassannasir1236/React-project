import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/Config";

const purchaseCollectionRef = collection(db, "purchases");

// Add a new purchase
export const addPurchase = async (purchaseData) => {
  // purchaseData should include fields like supplierId, purchaseDate, items[], etc.
  const docRef = await addDoc(purchaseCollectionRef, {
    ...purchaseData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id: docRef.id };
};

// Get all purchases
export const getPurchases = async () => {
  const snapshot = await getDocs(purchaseCollectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get a single purchase by ID
export const getPurchaseById = async (id) => {
  const purchaseDocRef = doc(db, "purchases", id);
  const snapshot = await getDocs(collection(purchaseDocRef, "items"));
  const purchaseData = (await getDocs(purchaseDocRef)).data();
  return { id, ...purchaseData };
};

// Update a purchase
export const updatePurchase = async (id, updatedData) => {
  const purchaseDocRef = doc(db, "purchases", id);
  await updateDoc(purchaseDocRef, {
    ...updatedData,
    updatedAt: new Date(),
  });
};

// Delete a purchase
export const deletePurchase = async (id) => {
  const purchaseDocRef = doc(db, "purchases", id);
  await deleteDoc(purchaseDocRef);
};
