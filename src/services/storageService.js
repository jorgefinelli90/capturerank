// /services/storageService.js
import { storage, db } from "../firebase/firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Función para subir imagen
export const uploadImage = async (file, userId) => {
  const storageRef = ref(storage, `images/${userId}/${file.name}`);
  
  // Subir la imagen a Firebase Storage
  const snapshot = await uploadBytes(storageRef, file);
  
  // Obtener la URL de descarga
  const url = await getDownloadURL(snapshot.ref);

  // Guardar la URL de la imagen y otros detalles en Firestore
  const imageDoc = await addDoc(collection(db, "images"), {
    userId: userId,
    url: url,
    ratings: 0,
    createdAt: Timestamp.now(),
  });

  return imageDoc;
};
