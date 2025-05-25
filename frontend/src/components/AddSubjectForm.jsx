

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

function AddSubjectForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Введите название предмета");
    onSubmit({ name });
    setName(""); // Очистка поля после отправки
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Название предмета</Typography>
        <TextField
          fullWidth
          name="name"
          placeholder="Например: Математика"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        Добавить предмет
      </Button>
    </form>
  );
}

export default AddSubjectForm;