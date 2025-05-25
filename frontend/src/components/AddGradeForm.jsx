import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

function AddGradeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    student_login: "",
    subject_name: "",
    semester_name: "", // семестр
    grade: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.student_login || !formData.subject_name || !formData.semester_name || !formData.grade) return;
    onSubmit(formData);
    setFormData({
      student_login: "",
      subject_name: "",
      name: "",
      grade: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Логин студента</Typography>
        <TextField
          fullWidth
          name="student_login"
          placeholder="Например: ivanov"
          value={formData.student_login}
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
        <Typography variant="subtitle2" gutterBottom>Предмет</Typography>
        <TextField
          fullWidth
          name="subject_name"
          placeholder="Название предмета"
          value={formData.subject_name}
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
        <Typography variant="subtitle2" gutterBottom>Семестр</Typography>
        <TextField
          fullWidth
          name="semester_name"
          placeholder="Осенний 2024"
          value={formData.semester_name}
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
        <Typography variant="subtitle2" gutterBottom>Оценка</Typography>
        <TextField
          fullWidth
          type="number"
          step="0.1"
          min="1"
          max="5"
          name="grade"
          placeholder="От 1 до 5"
          value={formData.grade}
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
        Выставить оценку
      </Button>
    </form>
  );
}

export default AddGradeForm;