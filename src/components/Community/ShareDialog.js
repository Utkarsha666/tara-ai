import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { createPost } from "../../utils/api/CommunityAPI"; // Import createPost API function
import { dialogStyles } from "../../styles/ShareDialogStyle"; // Import the updated dialog styles

const ShareDialog = ({
  open,
  onClose,
  token,
  setPosts,
  setError,
  onPostSuccess,
}) => {
  const [postTitle, setPostTitle] = useState(""); // State for post title
  const [postContent, setPostContent] = useState(""); // State for post content

  // Handle creating a post
  const handleCreatePost = async () => {
    if (!postTitle || !postContent) {
      setError("Please fill in both title and content.");
      return;
    }

    try {
      const newPost = { title: postTitle, content: postContent };
      const createdPost = await createPost(newPost, token);

      // Add the newly created post to the top of the posts array
      setPosts((prevPosts) => [createdPost, ...prevPosts]);

      // Trigger the success callback to show the snackbar
      onPostSuccess();

      // Close the dialog and reset form
      onClose();
      setPostTitle(""); // Reset title
      setPostContent(""); // Reset content
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={dialogStyles.dialogContainer}>
      <DialogTitle sx={dialogStyles.dialogTitle}>Create a New Post</DialogTitle>
      <DialogContent sx={dialogStyles.dialogContent}>
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
      </DialogContent>
      <DialogActions sx={dialogStyles.dialogActions}>
        <Button
          onClick={onClose}
          color="secondary"
          sx={dialogStyles.dialogButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreatePost}
          color="primary"
          sx={dialogStyles.dialogButton}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
