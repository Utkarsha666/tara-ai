import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GradientButton from "../common/Button";
import CircularLoading from "../common/CircularLoading";

const AddChannelMemberDialog = ({ open, onClose, onAddMember }) => {
  const [usernames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleAddUsername = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const username = e.target.value.trim();
      if (!usernames.includes(username)) {
        setUsernames([...usernames, username]);
        e.target.value = "";
      }
    }
  };

  const handleDeleteUsername = (usernameToDelete) => {
    setUsernames(usernames.filter((username) => username !== usernameToDelete));
  };

  const handleAddMember = () => {
    if (usernames.length === 0) return;
    setLoading(true);
    onAddMember(usernames).finally(() => {
      setLoading(false);
      setUsernames([]);
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

        {/* Input for Usernames */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            paddingBottom: "8px",
            alignItems: "center",
          }}
        >
          {/* Display tags for each username */}
          {usernames.map((username, index) => (
            <Chip
              key={index}
              label={username}
              onDelete={() => handleDeleteUsername(username)}
              color="primary"
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              }}
            />
          ))}

          {/* Text input field for adding new usernames */}
          <TextField
            variant="outlined"
            placeholder="username, press enter to add tags"
            onKeyDown={handleAddUsername}
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
            fullWidth
          />
        </Box>
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
            "Add Members"
          )}
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddChannelMemberDialog;
