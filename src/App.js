import React, { useState, useContext, useEffect, useRef } from "react";
import { Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "./AuthContext";
import NotificationDropdown from "./components/common/NotificationDropdown";

// Import custom theme
import theme from "./theme";

// Import icons
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InfoIcon from "@mui/icons-material/Info";
import MapIcon from "@mui/icons-material/Map";
import ImpactIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Import pages
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Report from "./Report";
import Maps from "./Map";
import About from "./About";
import ImpactPoints from "./ImpactPoints";
import CommunityHub from "./CommunityHub";
import ProfilePage from "./ProfilePage";
import ProjectManagement from "./ProjectManagement";
import ResourceHub from "./ResourceHub"; // Import the ResourceHub component

// Import external styles
import appStyles from "./styles/AppStyles";
import { fetchPostById, fetchCommentById } from "./utils/api/SidebarAPI";
// Import NotificationSidebar
import NotificationSidebar from "./components/common/NotificationSidebar";
import {
  fetchProjectDetails,
  fetchCapacityBuildingProgramsDetails,
} from "./utils/api/ProjectManagementAPI";
import { markNotificationAsRead } from "./utils/api/NotificationAPI";
import ProjectDetailsDialog from "./components/Project/ProjectDetailsDialog";
import ChatbotWrapper from "./components/common/ChatbotWrapper";

const App = () => {
  const {
    isLoggedIn,
    logout,
    id: userId,
    username,
    token,
  } = useContext(AuthContext);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const openManageMenu = Boolean(anchorEl);
  const openNotificationMenu = Boolean(notificationAnchorEl);
  const [sidebarPost, setSidebarPost] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedComment, setHighlightedComment] = useState(null);

  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [projectData, setProjectData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [loadingSidebar, setLoadingSidebar] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  // Reference to the notification sidebar
  const notificationSidebarRef = useRef(null);
  const [sidebarMessage, setSidebarMessage] = useState(null);

  const handleManageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleManageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  // Function to handle notification updates
  const handleNotificationUpdate = (hasNotifications) => {
    setUnreadNotifications(hasNotifications ? 1 : 0);
  };

  const handleNotificationClick = async (notification) => {
    setLoadingSidebar(true); // Set loading to true when fetching data

    try {
      const postId = notification.post_id;
      const commentId = notification.comment_id;
      const projectId = notification.project_id;
      const channelId = notification.channel_id;
      const channelName = notification.channel_name;
      const notificationType = notification.notification_type;

      const response = await markNotificationAsRead(userId, notification.id);

      // Initialize postData, commentData, and fetchedProjectData to null
      let postData = null;
      let commentData = null;
      let fetchedProjectData = null;

      // Check if post_id is null and if channel_id exists
      if (postId === null && channelId) {
        // Only display the channel message in the sidebar
        setSidebarPost(null); // No post to display
        setHighlightedComment(null); // No comment to highlight
        setProjectData(null); // No project data
        // You can add the custom message here for the channel notification
        setSidebarMessage(
          `You have been added to the private channel: ${channelName}`
        );
      } else {
        // Fetch the post data if post_id exists
        if (postId) {
          postData = await fetchPostById(postId, token);
        }

        // Fetch the comment data if comment_id exists
        if (commentId) {
          commentData = await fetchCommentById(postId, commentId, token);
        }

        // Fetch the project data if project_id exists
        if (notification.notification_type == "PROJECT") {
          fetchedProjectData = await fetchProjectDetails(projectId, token);
          setNotificationType(notificationType);
        } else if (notification.notification_type == "CAPACITY_BUILDING") {
          fetchedProjectData = await fetchCapacityBuildingProgramsDetails(
            projectId,
            token
          );
          setNotificationType(notificationType);
        }

        // Update the sidebar to display the post, comment, or project
        setSidebarPost(postData);
        setHighlightedComment(commentData || null);
        setProjectData(fetchedProjectData || null);
        setSidebarMessage(null); // Clear any message from the previous step
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the notification details.");
    } finally {
      setLoadingSidebar(false); // Set loading to false after fetching is complete
    }
  };

  // Close the notification sidebar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the sidebar is visible and if the click is outside
      if (
        notificationSidebarRef.current &&
        !notificationSidebarRef.current.contains(event.target) &&
        !event.target.closest("#notification-button")
      ) {
        // Close the sidebar if clicking outside, whether it's a post or project
        setSidebarPost(null);
        setProjectData(null); // Also clear project data if it's showing
        setSidebarMessage(null);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup on component unmount or when dependencies change
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeSidebar = () => {
    setSidebarPost(null);
    setProjectData(null);
    setSidebarMessage(null);
  };

  const openProjectDialog = (project) => {
    setSelectedProjectId(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* AppBar */}
        <AppBar position="fixed" sx={appStyles.appBar}>
          <Toolbar sx={appStyles.toolbar}>
            <img
              src={require("./assets/images/logo-2.png")}
              alt="Logo"
              style={appStyles.logo}
            />
            <Box sx={{ flexGrow: 1 }} />
            {isLoggedIn ? (
              <Button
                color="inherit"
                onClick={logout}
                sx={appStyles.logoutButton}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={appStyles.logoutButton}
              >
                Login
              </Button>
            )}
            {isLoggedIn && (
              <Box sx={{ marginLeft: 1 }}>
                <Link to="/profile">
                  <AccountCircleIcon sx={appStyles.accountIcon} />
                </Link>
              </Box>
            )}
            {isLoggedIn && (
              <Box>
                <IconButton
                  id="notification-button"
                  color="inherit"
                  onClick={handleNotificationMenuClick}
                >
                  <Badge
                    color="error"
                    variant={unreadNotifications > 0 ? "dot" : "standard"}
                    invisible={unreadNotifications === 0}
                  >
                    <NotificationsIcon sx={{ fontSize: "30px" }} />
                  </Badge>
                </IconButton>
                <NotificationDropdown
                  anchorEl={notificationAnchorEl}
                  onClose={handleNotificationMenuClose}
                  userId={userId}
                  onNotificationUpdate={handleNotificationUpdate}
                  onNotificationClick={handleNotificationClick}
                />
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Main content box */}
        <Box sx={{ display: "flex", flex: 1, marginTop: "65px" }}>
          {/* Sidebar */}
          <Box sx={appStyles.sidebar}>
            <List sx={{ width: "90%", padding: 0 }}>
              {[
                { to: "/", icon: <HomeIcon />, text: "Home" },
                {
                  to: "/dashboard",
                  icon: <DashboardIcon />,
                  text: "Dashboard",
                },
                {
                  to: "/report",
                  icon: <AssessmentIcon />,
                  text: "Research Assistant",
                },
                {
                  to: "/impact-points",
                  icon: <ImpactIcon />,
                  text: "Monitoring & Evaluation",
                },
                {
                  to: "/community-hub",
                  icon: <GroupIcon />,
                  text: "Collaboration",
                },
                {
                  to: "/resource-hub",
                  icon: <FolderIcon />, // Resource Hub Icon
                  text: "Resources",
                },
                { to: "/maps", icon: <MapIcon />, text: "Maps" },
              ].map((item) => (
                <ListItem
                  button
                  component={Link}
                  to={item.to}
                  key={item.text}
                  sx={appStyles.listItem}
                >
                  {item.icon}
                  <ListItemText
                    primary={item.text}
                    sx={appStyles.listItemText}
                  />
                </ListItem>
              ))}

              {/* Manage Menu with Icon and Submenu */}
              <ListItem
                button
                onClick={handleManageMenuClick}
                sx={appStyles.manageMenu}
              >
                <ListItemIcon sx={appStyles.manageMenuIcon}>
                  <SettingsIcon sx={{ color: "white", fontSize: "20px" }} />
                </ListItemIcon>
                <ListItemText primary="Manage" sx={appStyles.listItemText} />
                <ArrowDropDownIcon sx={{ color: "#D3D3D3" }} />
              </ListItem>
              <Menu
                anchorEl={anchorEl}
                open={openManageMenu}
                onClose={handleManageMenuClose}
                sx={appStyles.menu}
              >
                <MenuItem
                  component={Link}
                  to="/project-management"
                  onClick={handleManageMenuClose}
                >
                  Project Management
                </MenuItem>
              </Menu>

              {/* About Menu Item */}
              <ListItem
                button
                component={Link}
                to="/about"
                sx={appStyles.aboutMenuItem}
              >
                <InfoIcon sx={{ color: "white" }} />
                <ListItemText primary="About" sx={appStyles.listItemText} />
              </ListItem>
            </List>
          </Box>

          {/* Main content container */}
          <Container sx={appStyles.container}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/report"
                element={isLoggedIn ? <Report /> : <Navigate to="/login" />}
              />
              <Route
                path="/impact-points"
                element={
                  isLoggedIn ? <ImpactPoints /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/community-hub"
                element={
                  isLoggedIn ? <CommunityHub /> : <Navigate to="/login" />
                }
              />
              <Route path="/maps" element={<Maps />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/project-management"
                element={
                  isLoggedIn ? <ProjectManagement /> : <Navigate to="/login" />
                }
              />
              {/* Add Resource Hub Route */}
              <Route
                path="/resource-hub"
                element={
                  isLoggedIn ? <ResourceHub /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </Container>

          {/* Notification Sidebar */}
          <NotificationSidebar
            sidebarPost={sidebarPost}
            highlightedComment={highlightedComment}
            notificationSidebarRef={notificationSidebarRef}
            token={token}
            username={username}
            setError={setError}
            projectData={projectData}
            closeSidebar={closeSidebar}
            openProjectDialog={openProjectDialog}
            isLoading={loadingSidebar}
            sidebarMessage={sidebarMessage}
          />
          {/* Project Details Dialog */}
          {isDialogOpen && (
            <ProjectDetailsDialog
              open={isDialogOpen}
              onClose={closeDialog}
              projectId={selectedProjectId}
              notificationType={notificationType}
              token={token}
            />
          )}
        </Box>
        <ChatbotWrapper token={token} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
