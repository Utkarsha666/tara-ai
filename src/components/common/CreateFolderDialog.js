import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

const CreateFolderDialog = ({
  open,
  onClose,
  newFolderName,
  setNewFolderName,
  handleCreateFolder,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <FolderIcon sx={{ marginRight: 1, color: "primary.main" }} />
          Create New Folder
        </Box>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "text.secondary",
            },
            "& .MuiInputBase-root": {
              fontSize: "14px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)", // subtle border
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main", // highlight on focus
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 20px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)", // subtle hover effect
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateFolder}
          color="primary"
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 20px",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderDialog;
