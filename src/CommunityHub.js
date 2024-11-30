import React, { useEffect, useState, useContext } from "react";
import {
  fetchChannels,
  fetchPosts,
  createChannel,
  fetchChannelMembers,
  addUserToChannel,
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
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
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
import ChannelMembersDialog from "./components/Community/ChannelMembersDialog";
import AddChannelMemberDialog from "./components/Community/AddChannelMemberDialog";

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
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [createChannelDialogOpen, setCreateChannelDialogOpen] = useState(false);
  // New state for members and dialog
  const [members, setMembers] = useState([]);
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  // New state for "Add Member" form
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  /// Fetch channels when the token is available
  useEffect(() => {
    if (!token) return;

    const getChannels = async () => {
      try {
        setLoadingChannels(true);
        const data = await fetchChannels(token);
        setChannels(data);
      } catch (err) {
        setSnackbarMessage("failed, to fetch channels");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
        setSnackbarMessage("failed, to fetch posts");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoadingPosts(false);
      }
    };

    getPostsData();
    setPreviousChannel(selectedChannel);
  }, [selectedChannel, token, previousChannel]);

  // Function to fetch channel members
  const fetchMembers = async (channelId) => {
    setMembersDialogOpen(true);
    setLoadingMembers(true);
    try {
      const data = await fetchChannelMembers(channelId, token);
      setMembers(data);
    } catch (err) {
      setSnackbarMessage("failed, to fetch members");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    if (membersDialogOpen && selectedChannel) {
      fetchMembers(selectedChannel); // Pass selectedChannel to fetchMembers
    }
  }, [membersDialogOpen, selectedChannel]);

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
    setCreateChannelDialogOpen(false);
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
      setSnackbarMessage("Channel creation failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAddMemberDialogOpen = () => {
    setAddMemberDialogOpen(true);
  };

  const handleAddMemberDialogClose = () => {
    setAddMemberDialogOpen(false);
  };

  // Function to handle adding a user to the channel
  const handleAddMember = async (newUsername) => {
    if (!newUsername) return; // Don't submit if the username is empty

    try {
      await addUserToChannel(selectedChannel, newUsername, token); // Call API to add user
      setSnackbarMessage(`${newUsername} has been added to the channel.`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setAddMemberDialogOpen(false);
    } catch (err) {
      setSnackbarMessage(
        "failed, make sure the username is not already in the team"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
                color: "#3f51b5",
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
              {selectedChannel &&
                channels.find((channel) => channel.id === selectedChannel)
                  ?.visibility === "private" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 2,
                    }}
                  >
                    <Typography
                      component="a"
                      href="#"
                      onClick={() => fetchMembers(selectedChannel)}
                      sx={{
                        textDecoration: "underline",
                        color: "#3f51b5",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      View Members
                    </Typography>

                    {/* Add Member Link */}
                    <Typography
                      component="a"
                      href="#"
                      onClick={handleAddMemberDialogOpen} // Opens the "Add Member" dialog
                      sx={{
                        textDecoration: "underline",
                        color: "#3f51b5",
                        fontSize: "14px",
                        cursor: "pointer",
                        marginLeft: 2, // Adds space between the links
                      }}
                    >
                      Add Member
                    </Typography>
                  </Box>
                )}

              <Typography variant="h3" sx={titleStyle}>
                {channels.find((channel) => channel.id === selectedChannel)
                  ?.name || "Channels"}
              </Typography>

              <Box sx={boxStyles}>
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
                    ...
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

      {/* Dialog for Members */}
      <ChannelMembersDialog
        membersDialogOpen={membersDialogOpen}
        setMembersDialogOpen={setMembersDialogOpen}
        members={members}
        loading={loadingMembers}
        error={error}
        token={token}
      />

      {/* Add Member Dialog */}
      <AddChannelMemberDialog
        open={addMemberDialogOpen}
        onClose={handleAddMemberDialogClose}
        onAddMember={handleAddMember}
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
