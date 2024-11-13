import React, { useState, useEffect } from "react";
import { DialogActions, Divider, Box, Chip, Typography } from "@mui/material";
import { fetchUserData } from "../../utils/api/CommunityAPI";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledTypography,
  ProfileBox,
  StyledAvatar,
} from "../../styles/UserProfileDialogStyle";
import GradientButton from "../common/Button"; // Import the GradientButton
import CircularLoading from "../common/CircularLoading"; // Import the CircularLoading component

const UserProfileDialog = ({ open, onClose, username, token }) => {
  const [userInfo, setUserInfo] = useState(null); // State to store the fetched user data
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch user data when the dialog is opened
  useEffect(() => {
    if (open && username) {
      setLoading(true);
      fetchUserData(username, token)
        .then((data) => {
          console.log("Fetched user data:", data); // Debugging: log the fetched data
          setUserInfo(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [open, username, token]);

  const getAvatarName = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>User Information</StyledDialogTitle>
      <StyledDialogContent>
        {loading ? (
          <CircularLoading
            size={60}
            color="primary"
            message="Loading user information..."
          />
        ) : userInfo ? (
          <ProfileBox>
            {/* Avatar with initials */}
            <StyledAvatar>
              {getAvatarName(userInfo.firstName, userInfo.lastName)}
            </StyledAvatar>

            <StyledTypography variant="body1">
              <strong>First Name:</strong> {userInfo.firstName}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Last Name:</strong> {userInfo.lastName}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Email:</strong> {userInfo.email}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Role:</strong> {userInfo.role}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Address:</strong> {userInfo.address}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Phone Number:</strong> {userInfo.phoneNumber}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Emergency Contact:</strong> {userInfo.emergencyContact}
            </StyledTypography>
            <StyledTypography variant="body1">
              <strong>Organization:</strong> {userInfo.organization}
            </StyledTypography>

            {/* Add the Divider and Projects Involved section */}
            <Divider sx={{ marginY: 3 }} />
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Projects Involved:</strong>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Check if projectsInvolved is an array and has at least one item */}
              {Array.isArray(userInfo.projectsInvolved) &&
              userInfo.projectsInvolved.length > 0 ? (
                userInfo.projectsInvolved.map((project, index) => (
                  <Chip
                    key={index}
                    label={project.projectName} // Access projectName from the object
                    sx={{ marginRight: 1, marginBottom: 1 }}
                  />
                ))
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  No projects involved.
                </Typography>
              )}
            </Box>
          </ProfileBox>
        ) : (
          <StyledTypography>No user information available</StyledTypography>
        )}
      </StyledDialogContent>
      <DialogActions>
        {/* Use the GradientButton instead of StyledButton */}
        <GradientButton onClick={onClose}>Close</GradientButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default UserProfileDialog;
