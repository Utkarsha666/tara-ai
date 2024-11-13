import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import {
  CommentCardWrapper,
  CommentContent,
  CommentHeader,
} from "../../styles/CommentCardStyles";
import UserProfileDialog from "../common/UserProfileDialog";

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
};

const CommentCard = ({ comment, token }) => {
  const { author, content, created_at } = comment;

  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
  const avatar = author?.avatar || "/default-avatar.png"; // Default avatar if not available
  const commentDate = formatDate(created_at); // Format comment creation date

  // Function to handle username click and open the dialog
  const handleUsernameClick = () => {
    setDialogOpen(true); // Open the dialog
  };

  return (
    <>
      <CommentCardWrapper>
        {/* Comment Header: User Profile & Date */}
        <CommentHeader>
          <Avatar src={avatar} alt={author} sx={{ width: 40, height: 40 }} />
          <Box sx={{ marginLeft: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#007bff", cursor: "pointer" }}
              onClick={handleUsernameClick}
            >
              {author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {commentDate}
            </Typography>
          </Box>
        </CommentHeader>

        {/* Comment Content */}
        <CommentContent>
          <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.5 }}>
            {content || "No content available"}
          </Typography>
        </CommentContent>
      </CommentCardWrapper>

      {/* User Profile Dialog */}
      <UserProfileDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)} // Close dialog
        username={author} // Pass username to fetch user data
        token={token} // Pass token to fetch user data
      />
    </>
  );
};

export default CommentCard;
