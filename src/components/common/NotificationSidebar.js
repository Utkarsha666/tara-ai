import React from "react";
import { Box, Divider } from "@mui/material";
import PostCard from "../Community/PostCard";

const NotificationSidebar = ({
  sidebarPost,
  highlightedComment, // Pass the highlighted comment prop
  notificationSidebarRef,
  token,
  username,
  setError,
}) => {
  return (
    sidebarPost && (
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
        {/* Render PostCard component to display the post details */}
        <PostCard
          key={sidebarPost.id}
          post={sidebarPost}
          token={token}
          setError={setError}
          username={username}
          highlightedComment={highlightedComment} // Pass highlightedComment here
        />

        <Divider sx={{ marginTop: 3 }} />
      </Box>
    )
  );
};

export default NotificationSidebar;
