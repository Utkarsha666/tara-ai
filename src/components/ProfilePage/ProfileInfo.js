import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";
import { Avatar } from "@mui/material";

const ProfileInfo = ({ userData }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Avatar
          alt={userData.firstName}
          sx={{
            width: 150,
            height: 150,
            bgcolor: "#1976d2",
            color: "#fff",
            fontSize: 60,
          }}
        >
          {userData.firstName[0]}
        </Avatar>
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        {userData.firstName} {userData.lastName}
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Username:</strong> {userData.username}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Email:</strong> {userData.email}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Role:</strong> {userData.role}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Status:</strong> {userData.disabled ? "Suspended" : "Active"}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Address:</strong> {userData.address}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Phone Number:</strong> {userData.phoneNumber}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Organization:</strong> {userData.organization}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        <strong>Emergency Contact:</strong> {userData.emergencyContact}
      </Typography>

      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6" align="center" gutterBottom>
        <strong>Active Projects:</strong>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {/* Check if projectsInvolved is an array and has at least one item */}
        {Array.isArray(userData.projectsInvolved) &&
        userData.projectsInvolved.length > 0 ? (
          userData.projectsInvolved.map((project, index) => (
            <Chip
              key={index}
              label={project.projectName} // Access projectName from the object
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No projects involved.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ProfileInfo;
