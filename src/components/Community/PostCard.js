import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CommentCard from "./CommentCard";
import {
  PostCardWrapper,
  PostHeader,
  PostTitle,
  PostUserTime,
  PostContent,
  CommentsSection,
} from "../../styles/PostCardStyle"; // Simplified import for styling
import {
  addComment,
  updatePost,
  deletePost,
} from "../../utils/api/CommunityAPI";
import UserProfileDialog from "../common/UserProfileDialog";
import SuccessSnackbar from "../common/SuccessSnackbar";

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

const PostCard = ({
  post,
  token,
  setError,
  username,
  highlightedComment,
  onDeletePost,
}) => {
  const [newComment, setNewComment] = useState(""); // State to hold new comment
  const [loadingComment, setLoadingComment] = useState(false); // Loading state for adding comment
  const [showAllComments, setShowAllComments] = useState(false); // State to toggle comments
  const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog visibility
  const [isContentExpanded, setIsContentExpanded] = useState(false); // State to track content expansion
  const [clickedUsername, setClickedUsername] = useState(null); // Track which username is clicked (post.author or tagged user)
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State to open the edit dialog
  const [editedPostContent, setEditedPostContent] = useState(post.content); // Edited content
  const [editedPostTitle, setEditedPostTitle] = useState(post.title); // Edited title

  // Snackbar state for error and success messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error"); // "error" by default

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null); // Store the ID of the post to delete

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

  // Function to handle post editing
  const handleEditPost = async () => {
    if (editedPostContent.trim() === "" || editedPostTitle.trim() === "") {
      setSnackbarMessage("Title and content cannot be empty.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const updatedPost = {
      ...post,
      title: editedPostTitle,
      content: editedPostContent,
    };

    try {
      await updatePost(post.id, updatedPost, token); // Call the API to update the post
      post.title = editedPostTitle; // Update the local post state
      post.content = editedPostContent;
      setEditDialogOpen(false); // Close the dialog after successful update
      setSnackbarMessage("Post updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true); // Open snackbar with success message
    } catch (error) {
      setSnackbarMessage("Failed to update post");
      setSnackbarSeverity("error");
      setSnackbarOpen(true); // Open snackbar with error message
    }
  };

  // Function to open the delete confirmation dialog
  const openDeleteDialog = (postId) => {
    setPostIdToDelete(postId); // Store the post ID that is about to be deleted
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  // Function to delete the post
  const handleDeletePost = async () => {
    try {
      await deletePost(postIdToDelete, token); // Use the postIdToDelete here
      onDeletePost(postIdToDelete); // Call onDeletePost with the post ID
      setSnackbarMessage("Post deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to delete post");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false); // Close the delete confirmation dialog
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
        {/* Edit and Delete hyperlinks (only visible to the post author) */}
        {post.author === username && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Edit Link */}
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                color: "#007bff",
                marginRight: 2, // Spacing between Edit and Delete links
              }}
              onClick={() => setEditDialogOpen(true)}
            >
              Edit
            </Typography>

            {/* Delete Link */}
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                color: "#d32f2f", // Red color for Delete
              }}
              onClick={() => openDeleteDialog(post.id)}
            >
              Delete
            </Typography>
          </Box>
        )}
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

      {/* Edit Post Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            value={editedPostTitle}
            onChange={(e) => setEditedPostTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Content"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={editedPostContent}
            onChange={(e) => setEditedPostContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditPost} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deleting Post */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SuccessSnackbar for error or success */}
      <SuccessSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </PostCardWrapper>
  );
};

export default PostCard;
