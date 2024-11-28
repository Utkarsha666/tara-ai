import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import UserProfileDialog from "../common/UserProfileDialog"; // Import the UserProfileDialog
import CircularLoading from "../common/CircularLoading"; // Import the CircularLoading component

const ChannelMembersDialog = ({
  membersDialogOpen,
  setMembersDialogOpen,
  members,
  loading,
  error,
  token, // Pass token to UserProfileDialog
}) => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false); // State for user profile dialog
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user

  const handleClose = () => {
    setMembersDialogOpen(false);
  };

  const handleOpenProfile = (username) => {
    setSelectedUser(username); // Set the selected user
    setProfileDialogOpen(true); // Open the user profile dialog
  };

  const handleCloseProfile = () => {
    setProfileDialogOpen(false);
    setSelectedUser(null); // Reset selected user when closing
  };

  return (
    <>
      <Dialog
        open={membersDialogOpen} // Ensure dialog remains open regardless of loading state
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle align="center" sx={{ fontWeight: 600 }}>
          Channel Members
        </DialogTitle>
        <DialogContent>
          {loading ? (
            // If loading is true, show the CircularLoading spinner
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <CircularLoading size={40} /> {/* Show the loading spinner */}
            </Box>
          ) : error ? (
            // If there is an error, show an error message
            <Typography color="error" variant="body2" align="center">
              <strong>Error:</strong> {error}
            </Typography>
          ) : members.length === 0 ? (
            // If no members are found, display a message
            <Typography variant="body2" align="center" color="textSecondary">
              No members found.
            </Typography>
          ) : (
            // Otherwise, display the list of members
            <List sx={{ paddingTop: 0 }}>
              {members.map((member) => (
                <React.Fragment key={member.id}>
                  <ListItem
                    button
                    sx={{
                      paddingY: 1.5,
                      borderRadius: 4,
                    }}
                    onClick={() => handleOpenProfile(member)}
                  >
                    <Avatar
                      sx={{ width: 40, height: 40, marginRight: 2 }}
                      src={member.avatar || ""}
                      alt={member}
                    >
                      {!member.avatar && <Person />}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="500">
                          {member}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            sx={{ width: "100%" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Profile Dialog */}
      {selectedUser && (
        <UserProfileDialog
          open={profileDialogOpen}
          onClose={handleCloseProfile}
          username={selectedUser}
          token={token} // Pass token to UserProfileDialog
        />
      )}
    </>
  );
};

export default ChannelMembersDialog;
