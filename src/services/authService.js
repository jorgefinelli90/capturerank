// /services/authService.js
import { auth, db } from "../firebase/firebaseSetup";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, updateDoc, increment } from "firebase/firestore";

// Registro con email y contraseña
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Inicio de sesión con email y contraseña
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Inicio de sesión con Google
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Cierre de sesión
export const logout = () => {
  return signOut(auth);
};

// Función para actualizar el total de imágenes subidas por el usuario
export const updateTotalImages = async (userId) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    totalImages: increment(1),
  });
};
