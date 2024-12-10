import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { createPost } from "../../utils/api/CommunityAPI";
import { dialogStyles } from "../../styles/ShareDialogStyle";
import GradientButton from "../common/Button";
import CircularLoading from "../common/CircularLoading";
import SuccessSnackbar from "../common/SuccessSnackbar"; // Import the SuccessSnackbar

const ShareDialog = ({
  open,
  onClose,
  token,
  setPosts,
  selectedChannel, // Add selectedChannel prop
}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state

  // Handle creating a post
  const handleCreatePost = async () => {
    if (!postTitle || !postContent) {
      setError("Please fill in both title and content.");
      setSnackbarOpen(true); // Open snackbar when there is an error
      return;
    }

    setLoading(true); // Set loading to true when creating the post
    try {
      const newPost = { title: postTitle, content: postContent };
      // Pass the selectedChannel ID to the createPost function
      const createdPost = await createPost(newPost, token, selectedChannel);

      // Add the newly created post to the top of the posts array
      setPosts((prevPosts) => [createdPost, ...prevPosts]);

      // Close the dialog and reset form
      onClose();
      setPostTitle(""); // Reset title
      setPostContent(""); // Reset content
    } catch (err) {
      setError("Failed to create post"); // Set error message
      setSnackbarOpen(true); // Open snackbar on error
    } finally {
      setLoading(false); // Set loading to false after the process is done
    }
  };

  // Close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError(""); // Reset error message when snackbar is closed
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={dialogStyles.dialogContainer}>
        <DialogTitle sx={dialogStyles.dialogTitle}>
          Create a New Post
        </DialogTitle>
        <DialogContent sx={dialogStyles.dialogContent}>
          {loading ? (
            <CircularLoading message="Creating your post..." size={50} />
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                fullWidth
                variant="outlined"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                sx={dialogStyles.textField}
              />
              <TextField
                margin="dense"
                label="Content"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                sx={dialogStyles.textField}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={dialogStyles.dialogActions}>
          <GradientButton
            onClick={onClose}
            color="secondary"
            loading={loading} // Pass loading state to GradientButton
            sx={dialogStyles.dialogButton}
          >
            Cancel
          </GradientButton>
          <GradientButton
            onClick={handleCreatePost}
            color="primary"
            loading={loading} // Pass loading state to GradientButton
            sx={dialogStyles.dialogButton}
          >
            Share
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* SuccessSnackbar for displaying error or success message */}
      <SuccessSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={error} // Pass error message to Snackbar
        severity="error" // Set severity to "error"
      />
    </>
  );
};

export default ShareDialog;
