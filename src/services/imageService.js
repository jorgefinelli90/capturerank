import { storage, db } from "../firebase/firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const uploadImage = async (file, userId) => {
  if (!file || !userId) {
    console.error("El archivo o userId está indefinido");
    return;
  }

  const storageRef = ref(storage, `images/${userId}/${file.name}`);

  try {
    // Subir la imagen a Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Obtener la URL de descarga de la imagen
    const url = await getDownloadURL(snapshot.ref);

    // Asegurarnos de que URL no sea undefined
    if (!url) {
      console.error("No se pudo obtener la URL de la imagen");
      return;
    }

    // Guardar la URL de la imagen y otros detalles en Firestore
    try {
      await addDoc(collection(db, "images"), {
        userId: userId,
        url: url,
        ratings: 0,
        createdAt: Timestamp.now(),
      });
      console.log("Documento agregado correctamente");
    } catch (error) {
      console.error("Error al agregar documento en Firestore: ", error.message);
    }

  } catch (error) {
    console.error("Error al subir la imagen: ", error.message);
  }
};
