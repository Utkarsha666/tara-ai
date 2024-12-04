import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import GradientButton from "./Button";
import CircularLoading from "./CircularLoading";

const FileUploadDialog = ({
  open,
  onClose,
  handleFileSelect,
  handleFileUpload,
  fileToUpload,
  uploadProgress,
}) => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleFileSelect({ target: { files: [file] } });
  };

  const handleUploadClick = () => {
    setLoading(true);
    handleFileUpload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6" align="center" gutterBottom>
          Upload Your File
        </Typography>

        {/* Drag and Drop Area */}
        <Box
          sx={{
            padding: 2,
            border: "2px dashed",
            borderColor: dragging ? "primary.main" : "grey.400",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.3s ease-in-out",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CloudUpload sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            Drag & Drop your file here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Or click below to browse
          </Typography>
          <input
            type="file"
            accept="*"
            style={{ display: "none" }}
            onChange={(event) => handleFileSelect(event)}
          />
          <GradientButton
            onClick={() => document.querySelector("input[type='file']").click()}
            loading={loading}
          >
            Browse Files
          </GradientButton>
        </Box>

        {/* Show selected file name */}
        {fileToUpload && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 2 }}
          >
            Selected File: {fileToUpload.name}
          </Typography>
        )}

        {/* Show upload progress bar if uploading */}
        {uploadProgress && (
          <Box sx={{ marginTop: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}

        {/* Show Circular Loading if in loading state */}
        {loading && (
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <CircularLoading message="Uploading..." size={50} color="primary" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <GradientButton onClick={onClose} loading={loading}>
          Cancel
        </GradientButton>
        <GradientButton
          onClick={handleUploadClick}
          loading={loading}
          disabled={!fileToUpload || uploadProgress > 0}
        >
          Upload
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;
