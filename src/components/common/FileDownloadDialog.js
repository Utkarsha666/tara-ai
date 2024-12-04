import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import GradientButton from "./Button";
import CircularLoading from "./CircularLoading";

const FileDownloadDialog = ({
  open,
  onClose,
  file,
  onDownload,
  loading,
  progress,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!file) return null;

  // Extracting file extension
  const fileExtension = file.name.split(".").pop();
  const fileTypeDisplay = fileExtension ? `*.${fileExtension}` : "Unknown type";

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    await onDownload();
    setIsDownloading(false);
  };

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

        {/* Show Circular Loading when the download is in progress */}
        {isDownloading && (
          <Box mb={2}>
            <CircularLoading
              size={60}
              color="primary"
              message="Downloading..."
            />
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
          onClick={handleDownloadClick}
          color="primary"
          loading={loading || isDownloading}
          sx={{ flexGrow: 1 }}
          disabled={isDownloading}
        >
          {!isDownloading ? (
            <>
              <DownloadIcon sx={{ mr: 1 }} />
              Download
            </>
          ) : (
            <CircularLoading size={24} color="primary" message="" />
          )}
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default FileDownloadDialog;
