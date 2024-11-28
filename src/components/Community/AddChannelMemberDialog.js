// ./components/Community/AddChannelMemberDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GradientButton from "../common/Button";
import CircularLoading from "../common/CircularLoading";

const AddChannelMemberDialog = ({ open, onClose, onAddMember }) => {
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleAddMember = () => {
    if (!newUsername) return;
    setLoading(true);
    onAddMember(newUsername).finally(() => {
      setLoading(false);
      setNewUsername("");
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        borderRadius: 2,
        boxShadow: theme.shadows[5],
      }}
    >
      <DialogContent
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Dialog Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: theme.palette.primary.main,
          }}
        >
          Add Member to Channel
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Input for Username */}
        <TextField
          label="Enter Username"
          variant="outlined"
          fullWidth
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.grey[400],
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
          placeholder="e.g., john_doe"
        />
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Cancel Button */}
        <GradientButton
          onClick={onClose}
          loading={loading}
          variant="outlined"
          sx={{
            textTransform: "none",
            padding: "8px 16px",
            backgroundColor: theme.palette.grey[200],
            borderRadius: 2,
          }}
        >
          Cancel
        </GradientButton>

        {/* Add Member Button */}
        <GradientButton
          onClick={handleAddMember}
          loading={loading}
          sx={{
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <CircularLoading
              size={24}
              color="inherit"
              message="Adding..."
              style={{ margin: "0 auto" }}
            />
          ) : (
            "Add Member"
          )}
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddChannelMemberDialog;
