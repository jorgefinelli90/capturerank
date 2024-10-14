// /pages/Home.js
import React, { useEffect, useState } from "react";
import { getImages } from "../services/imageService";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Obtener las imágenes en tiempo real
    const unsubscribe = getImages(setImages);
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid">
      {images.map((image) => (
        <img key={image.id} src={image.url} alt="subida por usuario" />
      ))}
    </div>
  );
};

export default Home;
