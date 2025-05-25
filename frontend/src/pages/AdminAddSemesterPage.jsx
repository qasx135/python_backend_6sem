







import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import {
  Typography,
  Paper,
  Fade
} from "@mui/material";
import AddSemesterForm from "../components/AddSemesterForm";

function AdminAddSemesterPage() {
  const navigate = useNavigate();

  const handleAddSemester = async (data) => {
    try {
      // Здесь можно использовать fetch или axios — как у тебя
      const response = await fetch("http://localhost:8000/admin/add-semester", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Ошибка добавления");

      alert("Семестр успешно добавлен!");
      navigate("/admin/students");
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении семестра");
    }
  };

  return (
    <AdminLayout>
      <Fade in={true} timeout={600}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: '16px',
            backgroundColor: 'rgba(13, 37, 63, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            backdropFilter: 'blur(8px)',
            maxWidth: 500,
            margin: 'auto',
            width: '100%'
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Добавить семестр
          </Typography>
          <AddSemesterForm onSubmit={handleAddSemester} />
        </Paper>
      </Fade>
    </AdminLayout>
  );
}

export default AdminAddSemesterPage;