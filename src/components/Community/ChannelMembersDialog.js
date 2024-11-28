// ./components/Community/ChannelMembersDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import UserProfileDialog from "../common/UserProfileDialog"; // Import the UserProfileDialog
import CircularLoading from "../common/CircularLoading"; // Import the CircularLoading component
import GradientButton from "../common/Button"; // Import the GradientButton

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
  const theme = useTheme();

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
        open={membersDialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          borderRadius: 2,
          boxShadow: theme.shadows[5],
        }}
      >
        <DialogTitle
          align="center"
          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
        >
          Channel Members
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 2,
          }}
        >
          {loading ? (
            // If loading is true, show the CircularLoading spinner
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <CircularLoading size={40} />
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
            <List sx={{ paddingTop: 0, width: "100%" }}>
              {members.map((member) => (
                <React.Fragment key={member.id}>
                  <ListItem
                    button
                    sx={{
                      paddingY: 1.5,
                      borderRadius: 2,
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
        <DialogActions
          sx={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GradientButton
            onClick={handleClose}
            loading={loading}
            sx={{
              width: "100%",
              textTransform: "none",
              padding: "8px 16px",
            }}
          >
            Close
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* User Profile Dialog */}
      {selectedUser && (
        <UserProfileDialog
          open={profileDialogOpen}
          onClose={handleCloseProfile}
          username={selectedUser}
          token={token}
        />
      )}
    </>
  );
};

export default ChannelMembersDialog;
