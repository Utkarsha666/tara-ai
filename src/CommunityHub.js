import React, { useEffect, useState, useContext } from "react";
import {
  fetchChannels,
  fetchPosts,
  createChannel,
} from "./utils/api/CommunityAPI";
import PostCard from "./components/Community/PostCard";
import ShareDialog from "./components/Community/ShareDialog";
import CreateChannelDialog from "./components/Community/CreateChannelDialog";
import { AuthContext } from "./AuthContext";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ChatIcon from "@mui/icons-material/Chat";
import LockIcon from "@mui/icons-material/Lock";

import SuccessSnackbar from "./components/common/SuccessSnackbar";
import CircularLoading from "./components/common/CircularLoading";
import ProjectDialog from "./components/Community/ProjectDialog";

import {
  bannerImageStyle,
  boxStyles,
  cardStyles,
  buttonStyles,
  titleStyle,
  loadingStyle,
  errorStyle,
  sidebarStyle,
  channelListItemStyle,
  channelIconStyle,
  channelTextStyle,
  sidebarHeaderStyle,
} from "./styles/CommunityHubStyles";

const CommunityHub = () => {
  const { token, username } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [capacityBuildingDialogOpen, setCapacityBuildingDialogOpen] =
    useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [previousChannel, setPreviousChannel] = useState(null);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [createChannelDialogOpen, setCreateChannelDialogOpen] = useState(false);

  /// Fetch channels when the token is available
  useEffect(() => {
    if (!token) return;

    const getChannels = async () => {
      try {
        setLoadingChannels(true);
        const data = await fetchChannels(token);
        setChannels(data);
      } catch (err) {
        setError("Failed to fetch channels");
      } finally {
        setLoadingChannels(false);
      }
    };

    getChannels();
  }, [token]);

  // Fetch posts for the selected channel
  useEffect(() => {
    if (!selectedChannel || selectedChannel === previousChannel) return;

    const getPostsData = async () => {
      setLoadingPosts(true);
      try {
        const data = await fetchPosts(selectedChannel, token);
        setPosts(data.reverse());
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoadingPosts(false);
      }
    };

    getPostsData();
    setPreviousChannel(selectedChannel);
  }, [selectedChannel, token, previousChannel]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePostSuccess = () => {
    setSnackbarMessage("Post successfully created!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleOpenProjectDialog = () => setProjectDialogOpen(true);

  const handleCloseProjectDialog = () => setProjectDialogOpen(false);

  const handleOpenCapacityBuildingDialog = () =>
    setCapacityBuildingDialogOpen(true);

  // Handle channel selection
  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
  };

  const handleOpenCreateChannelDialog = () => {
    setCreateChannelDialogOpen(true);
  };

  const handleCloseCreateChannelDialog = () => {
    setCreateChannelDialogOpen(false); // Close the Create Channel dialog
  };

  // Handle creating a new channel
  const handleCreateChannel = async (name, visibility) => {
    try {
      // Call the API to create the new channel
      const newChannel = await createChannel(name, visibility, token);
      // Update the channels list with the newly created channel
      setChannels((prevChannels) => [newChannel, ...prevChannels]);

      // Close the dialog and show success message
      handleCloseCreateChannelDialog();
      setSnackbarMessage("Channel successfully created!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to create channel");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      {/* Banner Image */}
      <Box sx={bannerImageStyle} />

      {/* Horizontal Icon and Button Boxes */}
      <Box sx={boxStyles}>
        <Box sx={cardStyles}>
          <ShareIcon sx={{ fontSize: 40, color: "#3f51b5" }} />
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenDialog}
            disabled={!selectedChannel}
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

      {/* Main Layout with Sidebar and Posts */}
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Left Sidebar for Channels */}
        <Box sx={sidebarStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography sx={sidebarHeaderStyle}>Channels</Typography>
            {/* Hyperlink for "Add Channel" */}
            <Typography
              component="a"
              href="#"
              onClick={handleOpenCreateChannelDialog}
              sx={{
                textDecoration: "none",
                color: "#3f51b5", // Customize color as needed
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add Channel
            </Typography>
          </Box>

          {loadingChannels ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
              <CircularLoading
                size={40}
                color="primary"
                message="Loading Channels..."
              />
            </Box>
          ) : (
            <List>
              {channels.length > 0 ? (
                channels.map((channel) => (
                  <ListItem
                    button
                    key={channel.id}
                    sx={channelListItemStyle}
                    onClick={() => handleChannelClick(channel.id)}
                  >
                    <ChatIcon sx={channelIconStyle} />
                    <ListItemText
                      primary={channel.name}
                      sx={channelTextStyle}
                    />
                    {channel.visibility === "private" && (
                      <LockIcon sx={{ color: "#ff5722", marginLeft: 1 }} />
                    )}
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No channels available.
                </Typography>
              )}
            </List>
          )}
        </Box>

        {/* Right Section for Community Posts */}
        <Box sx={{ flex: 1 }}>
          {selectedChannel && loadingPosts ? (
            <Box sx={loadingStyle}>
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
                {channels.find((channel) => channel.id === selectedChannel)
                  ?.name || "Community Posts"}
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
                    No posts available for this channel.
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Share Dialog for creating a new post */}
      <ShareDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        token={token}
        setPosts={setPosts}
        setError={setError}
        onPostSuccess={handlePostSuccess}
        selectedChannel={selectedChannel}
      />

      {/* Create Channel Dialog */}
      <CreateChannelDialog
        open={createChannelDialogOpen}
        onClose={handleCloseCreateChannelDialog}
        onCreateChannel={handleCreateChannel}
      />

      <ProjectDialog
        open={projectDialogOpen}
        onClose={handleCloseProjectDialog}
        token={token}
        type="project"
      />

      <ProjectDialog
        open={capacityBuildingDialogOpen}
        onClose={() => setCapacityBuildingDialogOpen(false)}
        token={token}
        type="capacityBuilding"
      />

      {/* Success Snackbar */}
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
