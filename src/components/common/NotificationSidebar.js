import React from "react";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import PostCard from "../Community/PostCard";
import ProjectListItem from "../Project/ProjectListItem";
import CloseIcon from "@mui/icons-material/Close";
import CircularLoading from "../common/CircularLoading"; // Import CircularLoading component

const NotificationSidebar = ({
  sidebarPost,
  highlightedComment,
  notificationSidebarRef,
  token,
  username,
  setError,
  projectData,
  closeSidebar,
  openProjectDialog, // Function to open the project dialog
  isLoading, // New prop for loading state
}) => {
  // If no post or project data and sidebar is not loading, return null
  if (!sidebarPost && !projectData && !isLoading) return null;

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
        background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
        borderRadius: "12px 0 0 12px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
        zIndex: 1200,
        overflowY: "auto",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={closeSidebar}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#888",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Sidebar Header */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#333", marginBottom: 2 }}
      >
        Notifications
      </Typography>

      {/* Show loading spinner if data is still being fetched */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularLoading message="Loading Notifications..." />
        </Box>
      ) : (
        <>
          {/* Render post or project data */}
          {sidebarPost && (
            <Box sx={{ marginBottom: 2 }}>
              <PostCard
                key={sidebarPost.id}
                post={sidebarPost}
                token={token}
                setError={setError}
                username={username}
                highlightedComment={highlightedComment}
              />
            </Box>
          )}

          {projectData && (
            <Box sx={{ marginBottom: 2 }}>
              <ProjectListItem
                project={projectData}
                onClick={() => openProjectDialog(projectData)}
              />
            </Box>
          )}
        </>
      )}

      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

      <Box sx={{ textAlign: "center", paddingTop: 2, color: "#999" }}>
        <Typography variant="body2">Powered by Tara</Typography>
      </Box>
    </Box>
  );
};

export default NotificationSidebar;
