import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

const ReportDialog = ({ reportData, dialogOpen, handleCloseDialog }) => {
  const title = reportData.report.match(/^# (.+)$/m)?.[1] || "Untitled";

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#fafafa",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease-out",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: "16px 0",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent dividers sx={{ padding: "24px 16px" }}>
        <Typography variant="h6" gutterBottom>
          <strong>Analysts:</strong>{" "}
          {reportData.analysts.map((a) => a.name).join(", ")}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Date:</strong>{" "}
          {new Date(reportData.created_at).toLocaleDateString()}
        </Typography>
        <Divider sx={{ marginBottom: "16px" }} />
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <Typography variant="h4">{children}</Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5">{children}</Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6">{children}</Typography>
            ),
            h4: ({ children }) => (
              <Typography variant="body1">{children}</Typography>
            ),
            h5: ({ children }) => (
              <Typography variant="body1">{children}</Typography>
            ),
            h6: ({ children }) => (
              <Typography variant="body1">{children}</Typography>
            ),
            p: ({ children }) => (
              <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                {children}
              </Typography>
            ),
          }}
        >
          {reportData.report}
        </ReactMarkdown>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: "16px 0" }}>
        <Button
          onClick={handleCloseDialog}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "50px",
            padding: "8px 20px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
