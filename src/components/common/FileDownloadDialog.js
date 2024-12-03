import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  LinearProgress,
  Box,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import GradientButton from "./Button";

const FileDownloadDialog = ({
  open,
  onClose,
  file,
  onDownload,
  loading,
  progress,
}) => {
  if (!file) return null;

  // Extracting file extension
  const fileExtension = file.name.split(".").pop();
  const fileTypeDisplay = fileExtension ? `*.${fileExtension}` : "Unknown type";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Download File</Typography>
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle1" color="textSecondary">
            {file.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Type: ${fileTypeDisplay}`}
          </Typography>
        </Box>

        {/* Show the progress bar if the file is being downloaded */}
        {loading && (
          <Box mb={2}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        {/* Cancel Button */}
        <GradientButton
          onClick={onClose}
          color="secondary"
          loading={false}
          sx={{ flexGrow: 1 }}
        >
          Cancel
        </GradientButton>

        {/* Download Button */}
        <GradientButton
          onClick={onDownload}
          color="primary"
          loading={loading}
          sx={{ flexGrow: 1 }}
        >
          <DownloadIcon sx={{ mr: 1 }} />
          Download
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default FileDownloadDialog;
