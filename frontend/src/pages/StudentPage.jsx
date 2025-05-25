import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
  Alert,
  Container
} from "@mui/material";

function StudentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Получаем login из URL или localStorage
    const searchParams = new URLSearchParams(location.search);
    let login = searchParams.get("login") || localStorage.getItem("student_login");

    if (!login) {
      setError("Логин не найден");
      navigate("/login");
      return;
    }

    // Запрос на бэкенд
    fetch(`http://localhost:8000/student/me?login=${login}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Полученные данные:", data);
        setStudentData(data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки данных", err);
        setError("Не удалось загрузить данные студента");
      });
  }, [location.search, navigate]);

  const groupedGrades = {};
  const grades = studentData?.grades || [];

  grades.forEach((g) => {
    const key = g.semester;
    if (!groupedGrades[key]) groupedGrades[key] = [];
    groupedGrades[key].push(g);
  });

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
          color: "#e0e1dd",
          padding: 2
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: "16px",
            backgroundColor: "rgba(13, 37, 63, 0.85)",
            backdropFilter: "blur(8px)",
            maxWidth: 400,
            width: "100%",
            textAlign: "center"
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Paper>
      </Box>
    );
  }

  if (!studentData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
          color: "#e0e1dd"
        }}
      >
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
        color: "#e0e1dd",
        minHeight: "100vh",
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={600}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "16px",
              backgroundColor: "rgba(13, 37, 63, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom align="center">
              {studentData.first_name} {studentData.last_name}
            </Typography>

            <Typography variant="h6" gutterBottom align="center" sx={{ mb: 4 }}>
              Группа: {studentData.group}
            </Typography>

            {Object.keys(groupedGrades).length > 0 ? (
              Object.entries(groupedGrades).map(([semester, semesterGrades], i) => (
                <Box key={i} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: "#aeeaff" }}>
                    {semester}
                  </Typography>
                  <TableContainer>
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "#aeeaff",
                              borderBottom: "2px solid rgba(255, 255, 255, 0.1)"
                            }}
                          >
                            Предмет
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "#aeeaff",
                              borderBottom: "2px solid rgba(255, 255, 255, 0.1)"
                            }}
                          >
                            Оценка
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {semesterGrades.map((g, idx) => (
                          <TableRow key={idx}>
                            <TableCell
                              sx={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "#fff"
                              }}
                            >
                              {g.subject}
                            </TableCell>
                            <TableCell
                              sx={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "#fff"
                              }}
                            >
                              {g.grade !== null && g.grade !== undefined
                                ? g.grade
                                : "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))
            ) : (
              <Typography
                align="center"
                sx={{
                  py: 3,
                  mb: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  color: "#aaa"
                }}
              >
                Нет предметов по вашей группе
              </Typography>
            )}

            <Box
              sx={{
                mt: 3,
                p: 2,
                textAlign: "center",
                backgroundColor: "rgba(173, 216, 230, 0.1)",
                borderRadius: 2
              }}
            >
              <Typography variant="h6" component="span" sx={{ mr: 1 }}>
                Средний балл:
              </Typography>
              <Typography
                component="span"
                variant="h6"
                sx={{
                  color:
                    studentData.average_grade >= 4.5
                      ? "#60c964"
                      : studentData.average_grade >= 3.5
                      ? "#ffd700"
                      : "#ff6b6b"
                }}
              >
                {studentData.average_grade?.toFixed(2) || "—"}
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default StudentPage;