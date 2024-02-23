import { Box, IconButton, useTheme, Drawer, Typography } from "@mui/material";
import {
  ColorModeContext,
  tokens,
} from "../../context/ThemeProvider/ThemeProvider";
import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function Header() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[800]}
      height={64}
    >
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ minWidth: 280, minHeight: "100vh" }}>
          <Box
            sx={{ height: 64 }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={colors.primary[800]}
            textAlign="center"
            p={2}
          >
            <Typography variant="h2" color={colors.grey[100]} flexGrow={1}>
              Enam Dua
            </Typography>
            <IconButton
              onClick={toggleDrawer(false)}
              id="menu-button"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
      <Box display="flex">
        <IconButton onClick={toggleDrawer(true)} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton
          onClick={colorMode.toggleColorMode}
          id="theme-button"
          aria-label="theme"
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
