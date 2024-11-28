import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled components for a more polished design
const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#f5f5f5",
  color: "#333",
  fontWeight: 600,
  fontSize: "1.25rem",
  paddingBottom: 20,
  borderBottom: "1px solid #ddd",
});

const StyledTextField = styled(TextField)({
  marginBottom: 16,
  "& .MuiInputLabel-root": {
    color: "#444",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#bbb",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3f51b5", // Change to your primary color
    },
  },
});

const StyledButton = styled(Button)({
  borderRadius: "20px",
  textTransform: "none",
  padding: "8px 24px",
  fontWeight: 600,
});

const CreateChannelDialog = ({ open, onClose, onCreateChannel }) => {
  const [channelName, setChannelName] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleCreate = () => {
    if (channelName.trim() === "") {
      alert("Please enter a channel name.");
      return;
    }
    onCreateChannel(channelName, visibility);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Create a New Channel</StyledDialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" paragraph>
          Create a channel to discuss and collaborate with others.
        </Typography>
        <StyledTextField
          label="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          fullWidth
          variant="outlined"
          autoFocus
          InputProps={{
            startAdornment: <Box sx={{ paddingLeft: "8px" }}>#</Box>,
          }}
        />
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel>Visibility</InputLabel>
          <Select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            label="Visibility"
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} variant="contained" color="primary">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={handleCreate}
          variant="contained"
          color="primary"
        >
          Create
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChannelDialog;
