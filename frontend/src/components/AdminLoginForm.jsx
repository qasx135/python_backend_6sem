
import { adminLogin } from "../api";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

function AdminLoginForm({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await adminLogin(login, password); // предположим, что adminLogin уже импортирован
    if (data.is_admin) {
      localStorage.setItem("admin_login", login);
      onLogin(data);
    } else {
      alert("Доступ запрещён");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Логин админа"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.1)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1b6ca8'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.1)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1b6ca8'
            }
          }}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          py: 1.2,
          borderRadius: '12px',
          backgroundColor: '#1b6ca8',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(27, 108, 168, 0.3)',
          '&:hover': {
            backgroundColor: '#145790'
          },
          transition: 'all 0.3s ease'
        }}
      >
        Войти как админ
      </Button>
    </form>
  );
}

export default AdminLoginForm;