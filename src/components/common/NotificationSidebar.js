import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import PostCard from "../Community/PostCard"; // Ensure PostCard is imported correctly

const NotificationSidebar = ({
  sidebarPost,
  highlightedComment, // Pass the highlighted comment prop
  notificationSidebarRef,
  token,
  username,
  setError,
  projectData, // Pass projectData to render project details
}) => {
  if (!sidebarPost && !projectData) return null; // If neither post nor project is provided, render nothing.

  return (
    <Box
      ref={notificationSidebarRef}
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 550,
        height: "100%",
        padding: 3,
        background: "#fff",
        borderRadius: "10px 0 0 10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        zIndex: 1200,
        overflowY: "auto",
        transition: "all 0.3s ease",
      }}
    >
      {sidebarPost && (
        <PostCard
          key={sidebarPost.id}
          post={sidebarPost}
          token={token}
          setError={setError}
          username={username}
          highlightedComment={highlightedComment}
        />
      )}

      {projectData && (
        <Box>
          {/* Render Project Details if available */}
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {projectData.projectName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Description:</strong> {projectData.description}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Status:</strong> {projectData.status}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Start Date:</strong> {projectData.startDate}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>End Date:</strong> {projectData.endDate}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Donor:</strong> {projectData.donor || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Budget:</strong>{" "}
            {projectData.budget
              ? `$${projectData.budget.toLocaleString()}`
              : "N/A"}
          </Typography>

          {projectData.location && projectData.location.length > 0 && (
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Location:</strong> {projectData.location.join(", ")}
            </Typography>
          )}

          {projectData.objectives && projectData.objectives.length > 0 && (
            <Box sx={{ marginBottom: 2 }}>
              <strong>Objectives:</strong>
              <ul>
                {projectData.objectives.map((objective, index) => (
                  <li key={index}>
                    <Typography variant="body2">{objective}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}

          {projectData.teamMembers && projectData.teamMembers.length > 0 && (
            <Box>
              <strong>Team Members:</strong>
              <ul>
                {projectData.teamMembers.map((member, index) => (
                  <li key={index}>
                    <Typography variant="body2">{member.username}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      )}

      <Divider sx={{ marginTop: 3 }} />
    </Box>
  );
};

export default NotificationSidebar;
