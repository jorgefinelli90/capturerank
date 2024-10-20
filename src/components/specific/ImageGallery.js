// /src/components/specific/ImageGallery.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseSetup";

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const querySnapshot = await getDocs(collection(db, "images"));
            const imageData = querySnapshot.docs.map(doc => doc.data());
            setImages(imageData);
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h2>Imágenes Subidas</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.url} alt={`Imagen subida por ${image.userId}`} style={{ width: "100%" }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
