import React from "react";
import { Backdrop, Box } from "@mui/material";
import "./Loading.css";

const Loading = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box className="loader"></Box>
    </Backdrop>
  );
};

export default Loading;
