

// import { Sidebar } from "frontend/src/components/Sidebar.jsx"

import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Fade
} from "@mui/material";
import { getAllStudents } from "../api";

function AdminStudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudents().then(setStudents);
  }, []);

  return (
    <AdminLayout>
      <Fade in={true} timeout={600}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: "16px",
            backgroundColor: "rgba(13, 37, 63, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Студенты
          </Typography>

          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#aeeaff" }}>Фамилия</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#aeeaff" }}>Имя</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#aeeaff" }}>Отчество</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#aeeaff" }}>Группа</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#aeeaff" }}>Средний балл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#fff" }}>
                        {s.last_name}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#fff" }}>
                        {s.first_name}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#fff" }}>
                        {s.middle_name || "—"}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#fff" }}>
                        {s.group}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#fff" }}>
                        {s.average_grade?.toFixed(2) || "—"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: "#aaa" }}>
                      Нет студентов
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Fade>
    </AdminLayout>
  );
}

export default AdminStudentsPage;