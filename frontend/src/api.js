// src/api.js

const API_URL = "http://localhost:8000";

// 🔐 Логин студента
export const loginStudent = async (login, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
    return await res.json();
};

// 📚 Получение данных студента
export const get_student_data = async (login) => {
    const res = await fetch(`${API_URL}/student/me?login=${login}`);
    return await res.json();
};

// 👤 Логин админа
export const adminLogin = async (login, password) => {
    const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
    return await res.json();
};

// 📋 Получение всех студентов
export const getAllStudents = async () => {
    const res = await fetch(`${API_URL}/admin/students`);
    return await res.json();
};

// ➕ Добавление студента
export const addNewStudent = async (data) => {
    const res = await fetch(`${API_URL}/admin/add-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
};

// 🧩 Назначение предмета группе
export const assignSubjectToGroup = async (data) => {
    const res = await fetch(`${API_URL}/admin/add-subject-to-group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
};

// 🎯 Выставление оценки
export const addGradeToStudent = async (data) => {
    const res = await fetch(`${API_URL}/admin/add-grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
};