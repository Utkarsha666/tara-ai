import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const EditProfileDialog = ({
  openDialog,
  handleDialogClose,
  formData,
  handleInputChange,
  handleSaveProfile,
  roles,
  statuses,
}) => {
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      maxwidth="md"
      fullWidth
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Object.keys(formData).map((key) => {
            if (key === "role") {
              return (
                <FormControl key={key} fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    label="Role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else if (key === "status") {
              return (
                <FormControl key={key} fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }

            return (
              <TextField
                key={key}
                fullWidth
                label={formatLabel(key)}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveProfile} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
