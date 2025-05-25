// src/layouts/AdminLayout.jsx

import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Сайдбар */}
      <Sidebar />

      {/* Основной контент */}
      <Box component="main" sx={{
        flexGrow: 1,
        p: 4,
        backgroundColor: "#0d1b2a",
        minHeight: "100vh"
      }}>
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;