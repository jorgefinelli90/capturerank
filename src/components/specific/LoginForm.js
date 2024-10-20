// /src/components/specific/LoginForm.js
import React, { useState } from "react";
import { login, loginWithGoogle } from "../../services/authService";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Inicio de sesión exitoso");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            alert("Inicio de sesión con Google exitoso");
        } catch (error) {
            console.error("Error con Google:", error);
        }
    };

    return (
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
            <button type="button" onClick={handleGoogleLogin}>Iniciar con Google</button>
        </form>
    );
};

export default LoginForm;
