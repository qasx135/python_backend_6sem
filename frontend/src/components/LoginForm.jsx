import React, { useState } from "react";
import { loginStudent } from "../api";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginStudent(login, password);
        if (data && data.first_name) {
            localStorage.setItem("student_login", data.login);
            console.log(localStorage.getItem("student_login"));
            onLogin(data);
        } else {
            alert("Неверный логин или пароль");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;