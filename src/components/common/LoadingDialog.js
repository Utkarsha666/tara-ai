// components/common/LoadingDialog.js
import React from "react";
import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import CircularLoading from "./CircularLoading";

const LoadingDialog = ({ open, message }) => {
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ padding: 3 }}
        >
          <CircularLoading size={60} color="secondary" message={message} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
