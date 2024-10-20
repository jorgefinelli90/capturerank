import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseSetup";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

const ImageUploader = () => {
  const [file, setFile] = useState(null); // Almacena el archivo seleccionado
  const [progress, setProgress] = useState(0); // Progreso de la carga
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores
  const [success, setSuccess] = useState(false); // Estado de éxito
  const [images, setImages] = useState([]); // Almacena las URLs de las imágenes
  const [inputKey, setInputKey] = useState(Date.now()); // Controla el reinicio del input

  // Función para cargar las imágenes desde Firestore cuando se monta el componente
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageList = querySnapshot.docs.map((doc) => ({
          url: doc.data().url,
          userEmail: doc.data().userEmail, // Mostrar el correo del usuario que subió la imagen
        }));
        setImages(imageList); // Actualiza el estado con las URLs de las imágenes
      } catch (error) {
        console.error("Error al obtener imágenes: ", error);
      }
    };

    fetchImages(); // Cargar imágenes al iniciar
  }, []); // Ejecutar solo al montar el componente

  // Cuando se selecciona un archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Almacena el archivo en el estado
    setError(""); // Limpiar errores anteriores
    setSuccess(false); // Limpiar mensajes de éxito
  };

  // Cuando se hace clic en "Subir"
  const handleUpload = async () => {
    // Verifica si hay un archivo seleccionado
    if (!file) {
      setError("Por favor selecciona un archivo antes de subir.");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`); // Referencia al archivo en Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file); // Subir el archivo con seguimiento de progreso

    setLoading(true); // Indicar que está cargando
    setError(""); // Reiniciar el estado de error

    // Escucha el progreso de la subida
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calcular progreso
        setProgress(progress); // Actualizar progreso

        switch (snapshot.state) {
          case "paused":
            console.log("Subida pausada");
            break;
          case "running":
            console.log("Subida en progreso");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Manejo de errores durante la subida
        setError("Error al subir la imagen: " + error.message);
        setLoading(false); // Detener el indicador de carga
        console.error("Error durante la subida:", error);
      },
      async () => {
        // Cuando la subida es exitosa
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref); // Obtener la URL del archivo subido
          console.log("URL obtenida:", url); // Verificar si se obtiene la URL correctamente

          // Guardar la URL de la imagen y otros detalles en Firestore
          try {
            await addDoc(collection(db, "images"), {
              url: url,
              userEmail: "jor@test.com", // Reemplaza esto con el email dinámico del usuario autenticado
              createdAt: Timestamp.now(), // Fecha de creación
            });
            console.log("Documento agregado correctamente a Firestore");

            // Actualizar el feed de imágenes
            setImages((prevImages) => [...prevImages, { url: url, userEmail: "jor@test.com" }]);

            setSuccess(true); // Indicar que la subida fue exitosa
            setLoading(false); // Detener el indicador de carga
            setFile(null); // Limpiar el archivo seleccionado
            setProgress(0); // Reiniciar progreso
            setInputKey(Date.now()); // Reiniciar el input de archivo para permitir subir otra imagen
          } catch (error) {
            setError("Error al guardar la imagen en Firestore: " + error.message);
            setLoading(false);
            console.error("Error al guardar en Firestore:", error.message);
          }
        } catch (error) {
          setError("Error al obtener la URL de descarga: " + error.message);
          setLoading(false); // Detener el indicador de carga
          console.error("Error al obtener la URL:", error.message);
        }
      }
    );
  };

  return (
    <div>
      <h2>Subir imagen</h2>
      {/* Input para seleccionar archivo */}
      <input key={inputKey} type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir Imagen"} {/* Indicador de botón */}
      </button>

      {/* Mostrar progreso de la carga */}
      {progress > 0 && (
        <div>
          <p>Progreso: {progress.toFixed(2)}%</p>
        </div>
      )}

      {/* Mensaje de carga */}
      {loading && <p>Subiendo imagen, por favor espera...</p>}

      {/* Mostrar error si hay */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar éxito si la subida fue exitosa */}
      {success && <p style={{ color: "green" }}>Imagen subida con éxito!</p>}

      {/* Mostrar las imágenes subidas */}
      <div>
        <h3>Imágenes subidas:</h3>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt="Imagen subida" style={{ width: "300px", margin: "10px" }} />
              <p>Subido por: {image.userEmail}</p>
            </div>
          ))
        ) : (
          <p>No hay imágenes aún.</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
