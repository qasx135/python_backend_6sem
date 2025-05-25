import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

function AddSubjectToGroupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    group_name: "",
    subject_name: "",
    semester_name: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.group_name || !formData.subject_name || !formData.semester_name) return;
    onSubmit(formData);
    setFormData({
      group_name: "",
      subject_name: "",
      semester_name: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Группа</Typography>
        <TextField
          fullWidth
          name="group_name"
          placeholder="Например: ИВТ-202"
          value={formData.group_name}
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
          placeholder="Например: Математика"
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
          placeholder="Например: Осенний 2024"
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
        Назначить предмет группе
      </Button>
    </form>
  );
}

export default AddSubjectToGroupForm;