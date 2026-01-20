// SidebarLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const drawerWidth = 200;

export default function SidebarLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <List>
          <ListItemButton component={NavLink} to="/">
            <ListItemText primary="All Tasks" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/task-map">
            <ListItemText primary="Task Map" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flex: 1, p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
