
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "rgba(13, 37, 63, 0.9)",
        color: "#e0e1dd",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 3,
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.3)"
      }}
    >
      <Typography
        variant="h6"
        component="div"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
          color: "#aeeaff"
        }}
      >
        Админ-панель
      </Typography>

      <Divider
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          mb: 2
        }}
      />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/admin/students"
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff"
              }
            }}
          >
            <ListItemText primary="Студенты" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/admin/add-student"
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff"
              }
            }}
          >
            <ListItemText primary="Добавить студента" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/admin/add-subject"
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff"
              }
            }}
          >
            <ListItemText primary="Добавить предмет" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/admin/add-semester"
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff"
              }
            }}
          >
            <ListItemText primary="Добавить семестр" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/admin/add-subject-to-group"
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff"
              }
            }}
          >
            <ListItemText primary="Назначить предмет группе" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/admin/add-grade"
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff"
              }
            }}
          >
            <ListItemText primary="Выставить оценку" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;