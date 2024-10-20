import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/specific/LoginForm";
import RegisterForm from "./components/specific/RegisterForm";
import ImageUploader from "./components/specific/ImageUploader";
import ImageGallery from "./components/specific/ImageGallery"; // Importar la galería de imágenes

function App() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <h1>Sube tus imágenes</h1>

      {/* Si el usuario no está autenticado, muestra botones para login o registro */}
      {!user ? (
        <div>
          <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
          <button onClick={() => setShowRegister(true)}>Registrarse</button>

          {showLogin && (
            <div>
              <h2>Login</h2>
              <LoginForm />
              <button onClick={() => setShowLogin(false)}>Cerrar</button>
            </div>
          )}

          {showRegister && (
            <div>
              <h2>Registro</h2>
              <RegisterForm />
              <button onClick={() => setShowRegister(false)}>Cerrar</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ImageUploader /> {/* Componente de subida de imágenes */}
          <ImageGallery />   {/* Galería de imágenes subidas */}
        </div>
      )}
    </div>
  );
}

export default App;

