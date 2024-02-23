import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  const notFoundStyle = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const boxStyle = {
    width: "350px",
    height: "300px",
    border: "2px solid #333",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "32px",
  };

  const titleStyle = {
    fontSize: "24px",
    margin: "20px 0",
  };

  const descriptionStyle = {
    fontSize: "16px",
    marginBottom: "40px",
  };

  return (
    <Box style={notFoundStyle}>
      <Box style={boxStyle}>
        <Typography aria-label="Not Found" style={{ fontSize: "50px" }}>
          ❌
        </Typography>
        <Typography style={titleStyle}>Oops! Page Not Found</Typography>
        <Typography style={descriptionStyle}>
          The page you are looking for might be under construction or does not
          exist.
        </Typography>
      </Box>
    </Box>
  );
}
