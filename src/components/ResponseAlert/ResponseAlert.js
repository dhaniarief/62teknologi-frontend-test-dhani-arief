import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/system";

const StyledSnackbar = styled(Snackbar)({
  "& .MuiAlert-filledSuccess": {
    backgroundColor: "#4CAF50",
  },
  "& .MuiAlert-filledError": {
    backgroundColor: "#f44336",
  },
});

const StyledAlert = styled(Alert)({
  color: "white",
});

const ResponseAlert = ({ response, success, openAlert, setOpenAlert }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openAlert);
  }, [openAlert]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenAlert(false);
  };

  const alertType = success ? "success" : "error";

  return (
    <StyledSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <StyledAlert severity={alertType} variant="filled" onClose={handleClose}>
        {response}
      </StyledAlert>
    </StyledSnackbar>
  );
};

export default ResponseAlert;
