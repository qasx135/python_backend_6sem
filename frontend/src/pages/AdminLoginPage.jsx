// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../components/AdminLoginForm";
import {
  Box,
  Typography,
  Paper,
  Fade
} from "@mui/material";

function AdminLoginPage() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/admin/students");
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
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Вход администратора
          </Typography>

          <AdminLoginForm onLogin={handleAdminLogin} />
        </Paper>
      </Fade>
    </Box>
  );
}

export default AdminLoginPage;