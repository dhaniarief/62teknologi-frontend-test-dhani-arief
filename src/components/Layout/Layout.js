import React from "react";
import { tokens } from "../../context/ThemeProvider/ThemeProvider";
import { useTheme } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../Header/Header";

export default function Layout() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      className="app"
      minHeight="100vh"
      sx={{
        backgroundImage: `${colors.primary[400]})`,
      }}
    >
      <Header />
      <Box className="content">
        <Outlet />
      </Box>
    </Box>
  );
}
