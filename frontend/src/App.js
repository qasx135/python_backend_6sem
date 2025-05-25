// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/StudentPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminStudentsPage from "./pages/AdminStudentsPage";
import AdminAddStudentPage from "./pages/AdminAddStudentPage";
import AdminAddSubjectToGroupPage from "./pages/AdminAddSubjectToGroupPage";
import AdminAddGradePage from "./pages/AdminAddGradePage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminAddSubjectPage from "./pages/AdminAddSubjectPage";
import AdminAddSemesterPage from "./pages/AdminAddSemesterPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/student/me" element={<StudentPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/students" element={<AdminStudentsPage />} />
                <Route path="/admin/add-student" element={<AdminAddStudentPage />} />
                <Route path="/admin/add-subject-to-group" element={<AdminAddSubjectToGroupPage />} />
                <Route path="/admin/add-grade" element={<AdminAddGradePage />} />
                <Route path="/admin/add-subject" element={<AdminAddSubjectPage />} />
                <Route path="/admin/add-semester" element={<AdminAddSemesterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;