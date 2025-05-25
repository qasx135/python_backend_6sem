import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import {
  Typography,
  Paper,
  Fade
} from "@mui/material";
import AddSubjectToGroupForm from "../components/AddSubjectToGroupForm";

function AdminAddSubjectToGroupPage() {
  const navigate = useNavigate();

  const handleAssign = async (data) => {
    try {
        console.log(data)
      // Здесь можно использовать fetch или axios — как у тебя
      const response = await fetch("http://localhost:8000/admin/add-subject-to-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Ошибка назначения");

      alert("Предмет успешно назначен!");
      navigate("/admin/students");
    } catch (err) {
      console.error(err);
      alert("Ошибка при назначении предмета");
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
            Назначить предмет группе
          </Typography>
          <AddSubjectToGroupForm onSubmit={handleAssign} />
        </Paper>
      </Fade>
    </AdminLayout>
  );
}

export default AdminAddSubjectToGroupPage;