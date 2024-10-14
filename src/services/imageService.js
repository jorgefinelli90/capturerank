// /services/imageService.js
import { storage, db } from "../firebase/firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp, query, onSnapshot } from "firebase/firestore";

// Función para subir una imagen a Firebase Storage y guardar los detalles en Firestore
export const uploadImage = async (file, userId) => {
  const storageRef = ref(storage, `images/${userId}/${file.name}`);
  
  // Subir la imagen a Firebase Storage
  const snapshot = await uploadBytes(storageRef, file);
  
  // Obtener la URL de descarga de la imagen
  const url = await getDownloadURL(snapshot.ref);

  // Guardar la URL de la imagen y detalles en Firestore
  const imageDoc = await addDoc(collection(db, "images"), {
    userId: userId,
    url: url,
    ratings: 0,
    createdAt: Timestamp.now(),
  });

  return imageDoc;
};

// Obtener las imágenes en tiempo real desde Firestore
export const getImages = (callback) => {
  const q = query(collection(db, "images"));
  return onSnapshot(q, (querySnapshot) => {
    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    callback(images);
  });
};
