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
  const [clickedUsername, setClickedUsername] = useState(null); // State to store clicked username (either author or @username)
  const [isContentExpanded, setIsContentExpanded] = useState(false); // State for content expansion toggle
  const avatar = author?.avatar || "/default-avatar.png"; // Default avatar if not available
  const commentDate = formatDate(created_at); // Format comment creation date

  // Function to handle username click and open the dialog
  const handleUsernameClick = (username) => {
    if (clickedUsername && clickedUsername !== username) {
      // If another username was clicked, close the dialog first
      setDialogOpen(false);
    }
    setClickedUsername(username); // Set clicked username (either author or @username)
    setDialogOpen(true); // Open the dialog for the clicked username
  };

  // Function to replace @username with a clickable link in the comment content
  const handleCommentContent = (content) => {
    const regex = /@([a-zA-Z0-9_]+)/g; // Match @username pattern
    return content.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        // If it's a username (odd index in the split result), make it a clickable link
        return (
          <span
            key={index}
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => handleUsernameClick(part)} // Open dialog on click
          >
            @{part}
          </span>
        );
      }
      // Regular text part (even index in the split result)
      return part;
    });
  };

  // Function to truncate content to a specific length
  const truncateContent = (content, maxLength = 200) => {
    if (content.length > maxLength) {
      return isContentExpanded ? content : content.slice(0, maxLength) + "...";
    }
    return content;
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
              onClick={() => handleUsernameClick(author)} // Open dialog for the author
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
            {handleCommentContent(truncateContent(content))}{" "}
            {/* Apply truncation logic */}
          </Typography>
          {content.length > 200 && (
            <span
              style={{ color: "#007bff", cursor: "pointer", marginTop: 10 }}
              onClick={() => setIsContentExpanded(!isContentExpanded)}
            >
              {isContentExpanded ? "Show Less" : "Show More"}
            </span>
          )}
        </CommentContent>
      </CommentCardWrapper>

      {/* User Profile Dialog */}
      <UserProfileDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)} // Close dialog
        username={clickedUsername || author} // Pass username (either clicked or comment author)
        token={token} // Pass token to fetch user data
      />
    </>
  );
};

export default CommentCard;
