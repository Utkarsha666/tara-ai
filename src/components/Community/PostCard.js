import React, { useState } from "react";
import { Box, Typography, Avatar, Button, TextField } from "@mui/material";
import CommentCard from "./CommentCard";
import {
  PostCardWrapper,
  PostHeader,
  PostTitle,
  PostUserTime,
  PostContent,
  CommentsSection,
} from "../../styles/PostCardStyle"; // Simplified import for styling
import { addComment } from "../../utils/api/CommunityAPI";
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

const PostCard = ({ post, token, setError, username, highlightedComment }) => {
  const [newComment, setNewComment] = useState(""); // State to hold new comment
  const [loadingComment, setLoadingComment] = useState(false); // Loading state for adding comment
  const [showAllComments, setShowAllComments] = useState(false); // State to toggle comments
  const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog visibility
  const [isContentExpanded, setIsContentExpanded] = useState(false); // State to track content expansion
  const [clickedUsername, setClickedUsername] = useState(null); // Track which username is clicked (post.author or tagged user)

  // Function to add a comment
  const handleAddComment = async (postId) => {
    if (newComment.trim() === "") return;

    const comment = {
      id: postId, // Post ID associated with this comment
      content: newComment,
      author: username, // Username of the comment author
      created_at: new Date().toISOString(), // Current date and time
    };

    setLoadingComment(true);
    try {
      // Call the API to add the comment
      await addComment(postId, comment, token);
      // After the comment is successfully added, update the local state to show the comment
      post.comments = [comment, ...post.comments]; // Insert new comment at the top (beginning) of the array
      setNewComment(""); // Clear the input field
    } catch (error) {
      setError("Failed to add comment");
    } finally {
      setLoadingComment(false);
    }
  };

  const postDate = formatDate(post.created_at); // Format post creation date

  // Reverse the order of comments to display the most recent ones first
  const commentsToShow = showAllComments
    ? post.comments.slice().reverse() // Show all comments in reverse order
    : post.comments.slice(0, 3).reverse(); // Show first 3 comments in reverse order

  // Determine avatar source or use initials as fallback
  const avatar = post.author?.avatar || null; // If no avatar, set it to null
  const authorInitials = post.author
    ? post.author.charAt(0).toUpperCase()
    : "U";

  // Handle Enter key to submit the comment
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line
      handleAddComment(post.id); // Trigger comment post
    }
  };

  // Function to handle username click and open the dialog
  const handleUsernameClick = (clickedUser) => {
    setClickedUsername(clickedUser); // Set clicked username (either post.author or tagged user)
    setDialogOpen(true); // Open the dialog
  };

  // Truncate post content if it's too long
  const truncateContent = (content, maxLength = 200) => {
    if (content.length > maxLength) {
      return isContentExpanded ? content : content.slice(0, maxLength) + "...";
    }
    return content;
  };

  // Function to replace @username with a clickable link in post content
  const handlePostContent = (content) => {
    const regex = /@([a-zA-Z0-9_]+)/g; // Match @username pattern
    return content.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        // If it's a username (odd index in the split result), make it a clickable link
        return (
          <span
            key={index}
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => handleUsernameClick(part)}
          >
            @{part}
          </span>
        );
      }
      // Regular text part (even index in the split result)
      return part;
    });
  };

  return (
    <PostCardWrapper>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostUserTime>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Material UI Avatar with fallback to initials */}
            <Avatar sx={{ width: 40, height: 40 }} src={avatar}>
              {/* If no avatar, display initials */}
              {avatar ? null : authorInitials}
            </Avatar>
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {/* Make the post.author clickable */}
                <span
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => handleUsernameClick(post.author)}
                >
                  {post.author}
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {postDate ? postDate : "No date"}
              </Typography>
            </Box>
          </Box>
        </PostUserTime>
      </PostHeader>

      {/* Post content with clickable @username links */}
      <PostContent>
        <Typography variant="body1">
          {handlePostContent(truncateContent(post.content))}{" "}
          {/* Apply the truncation logic */}
        </Typography>
        {post.content.length > 200 && (
          <span
            style={{ color: "#007bff", cursor: "pointer", marginTop: 10 }}
            onClick={() => setIsContentExpanded(!isContentExpanded)}
          >
            {isContentExpanded ? "Show Less" : "Show More"}
          </span>
        )}
      </PostContent>

      {/* Comments Section */}
      <CommentsSection>
        <h3>Comments</h3>

        {/* Highlighted Comment */}
        {highlightedComment && (
          <Box
            sx={{
              backgroundColor: "#f0f8ff",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Tagged Comment:
            </Typography>
            <Typography variant="body2">
              {highlightedComment.content}
            </Typography>
          </Box>
        )}

        {/* Render comments */}
        {commentsToShow.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          commentsToShow.map((comment, index) => (
            <CommentCard key={index} comment={comment} token={token} />
          ))
        )}

        {/* Show "See More" or "See Less" if there are more than 3 comments */}
        {post.comments.length > 3 && (
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "See Less" : "See More"}
          </span>
        )}

        {/* Input field for new comment */}
        <TextField
          fullWidth
          placeholder="Write a comment..."
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ marginTop: 2, borderRadius: 8 }}
        />
        <Button
          onClick={() => handleAddComment(post.id)}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loadingComment}
          sx={{ marginTop: 2, borderRadius: 8 }}
        >
          {loadingComment ? "Posting..." : "Post Comment"}
        </Button>
      </CommentsSection>

      {/* User Profile Dialog Component */}
      <UserProfileDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        username={clickedUsername}
        token={token}
      />
    </PostCardWrapper>
  );
};

export default PostCard;
