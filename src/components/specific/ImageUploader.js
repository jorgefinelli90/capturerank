// /components/specific/ImageUploader.js
import React, { useState } from "react";
import { uploadImage } from "../../services/imageService";
import { updateTotalImages } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth"; // Custom hook para obtener la información de autenticación

const ImageUploader = () => {
  const [file, setFile] = useState(null); // Estado para el archivo seleccionado
  const { user } = useAuth(); // Obtenemos el usuario autenticado

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Actualizamos el estado con el archivo seleccionado
  };

  const handleUpload = async () => {
    if (file && user) {
      try {
        // Subir la imagen a Firebase Storage y guardar los detalles en Firestore
        await uploadImage(file, user.uid);
        
        // Actualizar el total de imágenes subidas por el usuario
        await updateTotalImages(user.uid);
        
        alert("Imagen subida exitosamente");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {
      alert("Debe seleccionar una imagen y estar autenticado.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} /> {/* Selección del archivo */}
      <button onClick={handleUpload}>Subir Imagen</button> {/* Botón para subir la imagen */}
    </div>
  );
};

export default ImageUploader;
