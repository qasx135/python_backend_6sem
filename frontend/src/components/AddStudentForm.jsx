import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

function AddStudentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    group_id: "",
    login: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Можно очистить форму после отправки
    setFormData({
      first_name: "",
      last_name: "",
      middle_name: "",
      group_id: "",
      login: "",
      password: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Имя</Typography>
        <TextField
          fullWidth
          name="first_name"
          placeholder="Например: Иван"
          value={formData.first_name}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Фамилия</Typography>
        <TextField
          fullWidth
          name="last_name"
          placeholder="Например: Иванов"
          value={formData.last_name}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Отчество</Typography>
        <TextField
          fullWidth
          name="middle_name"
          placeholder="Например: Петрович"
          value={formData.middle_name}
          onChange={handleChange}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>ID группы</Typography>
        <TextField
          fullWidth
          name="group_id"
          placeholder="Например: 1"
          value={formData.group_id}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Логин</Typography>
        <TextField
          fullWidth
          name="login"
          placeholder="Логин"
          value={formData.login}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Пароль</Typography>
        <TextField
          fullWidth
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          py: 1.2,
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#aeeaff',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#fff'
          },
          transition: 'all 0.3s ease'
        }}
      >
        Добавить студента
      </Button>
    </form>
  );
}

export default AddStudentForm;