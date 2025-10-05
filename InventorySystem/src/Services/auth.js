// src/services/auth.js

import { auth } from "@/firebase/Config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
        switch (error.code) {
        case "auth/user-not-found":
            throw new Error("User does not exist.");
        case "auth/wrong-password":
            throw new Error("Incorrect password.");
        case "auth/invalid-email":
            throw new Error("Invalid email format.");
        case "auth/too-many-requests":
            throw new Error("Too many failed attempts. Try again later.");
        case "auth/user-disabled":
            throw new Error("This user account has been disabled.");
        default:
            console.error("Login error:", error); // Optional for debugging
            throw new Error("Login failed. Please check your credentials.");
        }
    }
};  

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  return signOut(auth);
};

/**
 * Get current user using a listener
 * @param {function} callback - gets called with user or null
 * @returns {function} unsubscribe function
 */
export const getCurrentUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};
