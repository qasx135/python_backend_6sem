import React, { useState } from "react";
import { loginStudent } from "../api";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Fade,
  Alert
} from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginStudent(login, password);
      if (data && data.first_name) {
        localStorage.setItem("student_login", login);
        navigate(`/student/me?login=${login}`);
      }
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

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
      <Fade in={true} timeout={600}>
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: "16px",
            backgroundColor: "rgba(13, 37, 63, 0.85)",
            backdropFilter: "blur(8px)",
            width: "100%",
            maxWidth: 400
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вход
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Логин"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.1)"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.3)"
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1b6ca8"
                }
              }}
            />

            <TextField
              fullWidth
              label="Пароль"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.1)"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.3)"
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1b6ca8"
                }
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: "12px",
                backgroundColor: "#1b6ca8",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(27, 108, 168, 0.3)",
                "&:hover": {
                  backgroundColor: "#145790"
                },
                transition: "all 0.3s ease"
              }}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </Fade>
    </Box>
  );
}

export default LoginPage;