import React, { useState, useContext } from "react";
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
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "./AuthContext"; // AuthContext for login state

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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

// Import external styles
import appStyles from "./styles/AppStyles";

const App = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const openManageMenu = Boolean(anchorEl);

  const handleManageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleManageMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    // Wrap the entire app in the ThemeProvider to apply the custom theme globally
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
              <Box sx={{ marginLeft: 2 }}>
                <Link to="/profile">
                  <AccountCircleIcon sx={appStyles.accountIcon} />
                </Link>
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
                { to: "/report", icon: <AssessmentIcon />, text: "Report" },
                {
                  to: "/impact-points",
                  icon: <ImpactIcon />,
                  text: "Impact Points",
                },
                {
                  to: "/community-hub",
                  icon: <GroupIcon />,
                  text: "Community",
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
                element={
                  isLoggedIn ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/login" state={{ from: "/dashboard" }} />
                  )
                }
              />
              <Route
                path="/report"
                element={
                  isLoggedIn ? (
                    <Report />
                  ) : (
                    <Navigate to="/login" state={{ from: "/report" }} />
                  )
                }
              />
              <Route
                path="/impact-points"
                element={
                  isLoggedIn ? (
                    <ImpactPoints />
                  ) : (
                    <Navigate to="/login" state={{ from: "/impact-points" }} />
                  )
                }
              />
              <Route
                path="/community-hub"
                element={
                  isLoggedIn ? (
                    <CommunityHub />
                  ) : (
                    <Navigate to="/login" state={{ from: "/community-hub" }} />
                  )
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
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
