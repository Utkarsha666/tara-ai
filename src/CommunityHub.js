import React, { useEffect, useState, useContext } from "react";
import { fetchPosts } from "./utils/api/CommunityAPI"; // Import API function to fetch posts
import PostCard from "./components/Community/PostCard"; // Import PostCard component
import ShareDialog from "./components/Community/ShareDialog"; // Import ShareDialog component
import { AuthContext } from "./AuthContext";
import { Box, Container, Typography, Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

// Importing the SuccessSnackbar component
import SuccessSnackbar from "./components/common/SuccessSnackbar";

// Importing CircularLoading component
import CircularLoading from "./components/common/CircularLoading";

import ProjectDialog from "./components/Community/ProjectDialog";

// Importing styles from the styles file
import {
  bannerImageStyle,
  boxStyles,
  cardStyles,
  buttonStyles,
  titleStyle,
  loadingStyle,
  errorStyle,
} from "./styles/CommunityHubStyles";

const CommunityHub = () => {
  const { token, username } = useContext(AuthContext); // Consume the AuthContext to get token
  const [posts, setPosts] = useState([]); // Ensure posts is an array
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const [dialogOpen, setDialogOpen] = useState(false); // State for the dialog visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to hold snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity level for the snackbar
  const [projectDialogOpen, setProjectDialogOpen] = useState(false); // State for the View Projects dialog
  const [capacityBuildingDialogOpen, setCapacityBuildingDialogOpen] =
    useState(false);

  // Fetch posts on component mount
  useEffect(() => {
    if (!token) return;

    const getPosts = async () => {
      try {
        const data = await fetchPosts(token);
        // Reverse posts array to display most recent first
        setPosts(data.reverse());
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [token]);

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle closing the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Trigger snackbar with a success message
  const handlePostSuccess = () => {
    setSnackbarMessage("Post successfully created!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true); // Show the snackbar
  };

  // Open the View Projects dialog
  const handleOpenProjectDialog = () => setProjectDialogOpen(true);

  // Close the View Projects dialog
  const handleCloseProjectDialog = () => setProjectDialogOpen(false);

  const handleOpenCapacityBuildingDialog = () =>
    setCapacityBuildingDialogOpen(true);

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      {/* Banner Image, displayed immediately */}
      <Box sx={bannerImageStyle} />

      {/* Horizontal Icon and Button Boxes */}
      <Box sx={boxStyles}>
        <Box sx={cardStyles}>
          <ShareIcon sx={{ fontSize: 40, color: "#3f51b5" }} />
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenDialog}
          >
            Share Post
          </Button>
        </Box>
        <Box sx={cardStyles}>
          <WorkIcon sx={{ fontSize: 40, color: "#3f51b5" }} />
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenProjectDialog}
          >
            View Projects
          </Button>
        </Box>
        <Box sx={cardStyles}>
          <SchoolIcon sx={{ fontSize: 40, color: "#3f51b5" }} />
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenCapacityBuildingDialog}
          >
            View Capacity Building Programs
          </Button>
        </Box>
        <Box sx={cardStyles}>
          <EventNoteIcon sx={{ fontSize: 40, color: "#3f51b5" }} />
          <Button variant="contained" sx={buttonStyles}>
            View Events
          </Button>
        </Box>
      </Box>

      {/* Error or Loading State */}
      {loading ? (
        <Box sx={loadingStyle}>
          {/* Using CircularLoading instead of CircularProgress */}
          <CircularLoading
            size={60}
            color="primary"
            message="Loading posts..."
          />
        </Box>
      ) : error ? (
        <Box sx={loadingStyle}>
          <Typography variant="h6" sx={errorStyle}>
            {error}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h3" sx={titleStyle}>
            Community Posts
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ marginTop: 1 }}
          >
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  token={token}
                  setError={setError}
                  username={username}
                />
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No posts available.
              </Typography>
            )}
          </Box>
        </>
      )}

      {/* Share Dialog for creating a new post */}
      <ShareDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        token={token}
        setPosts={setPosts}
        setError={setError}
        onPostSuccess={handlePostSuccess} // Pass the success callback
      />

      <ProjectDialog
        open={projectDialogOpen}
        onClose={handleCloseProjectDialog}
        token={token}
        type="project"
      />

      {/* Capacity Building Dialog */}
      <ProjectDialog
        open={capacityBuildingDialogOpen}
        onClose={() => setCapacityBuildingDialogOpen(false)}
        token={token}
        type="capacityBuilding"
      />

      {/* Success Snackbar for showing success message */}
      <SuccessSnackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default CommunityHub;
