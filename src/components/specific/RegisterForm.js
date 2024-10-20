// /src/components/specific/RegisterForm.js
import React, { useState } from "react";
import { register } from "../../services/authService";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            alert("Registro exitoso");
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
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
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
