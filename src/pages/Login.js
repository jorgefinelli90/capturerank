// /pages/Login.js
import React, { useState } from "react";
import { login, loginWithGoogle } from "../services/authService";
import Modal from "../components/common/Modal";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setOpen(false); // Cerrar modal después del login exitoso
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setOpen(false);
    } catch (error) {
      console.error("Error con Google:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Iniciar Sesión</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleGoogleLogin}>Iniciar con Google</button>
      </Modal>
    </div>
  );
};

export default Login;
