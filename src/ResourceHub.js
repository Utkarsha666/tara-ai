import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "./AuthContext";
import SuccessSnackbar from "./components/common/SuccessSnackbar";
import { fetchFolders, fetchFolderContents } from "./utils/api/ResourceHubAPI";
import CircularLoading from "./components/common/CircularLoading";
import HomeIcon from "@mui/icons-material/Home";

const ResourceHub = () => {
  const { token } = useContext(AuthContext);
  const [folders, setFolders] = useState([]); // Will hold either root or subfolders
  const [currentFolder, setCurrentFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [folderHistory, setFolderHistory] = useState([]); // Track visited folders

  const loadFolders = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const data = await fetchFolders(token);
      setFolders(data); // Set root folders initially
      setCurrentFolder(null); // Reset to root folder view
      setFolderHistory([]); // Reset folder history
    } catch (err) {
      setError(err.message);
      setSnackbarMessage(`Error: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = async (folderId) => {
    console.log("Navigating to folder with ID:", folderId);
    setLoading(true);

    try {
      const { items } = await fetchFolderContents(folderId, token); // Destructure items from the response

      // Separate files and subfolders
      const files = items.filter((item) => item.type === "file");
      const subfolders = items.filter((item) => item.type === "folder");

      // Update the current folder state with the new folder and its contents
      setCurrentFolder({
        id: folderId,
        files,
        subfolders,
      });
      setFolderHistory((prevHistory) => [...prevHistory, folderId]);
    } catch (err) {
      setSnackbarMessage(`Error fetching resources: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    // Check if we can go back
    if (folderHistory.length > 1) {
      // Pop the current folder from history and get the previous folder
      const previousFolderId = folderHistory[folderHistory.length - 2];

      // Remove the last folder from the history (going back one level)
      setFolderHistory((prevHistory) => prevHistory.slice(0, -1));

      // Fetch the contents of the previous folder
      handleFolderClick(previousFolderId);
    } else {
      setCurrentFolder(null);
    }
  };

  useEffect(() => {
    loadFolders();
  }, [token]);

  // Go to root folder and reset state
  const goToRoot = () => {
    loadFolders(); // Call the loadFolders function to reset the view to root
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <CircularLoading
            message="Loading content..."
            size={60}
            color="primary"
          />
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5" color="error">
            Error: {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ paddingBottom: 2, display: "flex", justifyContent: "center" }}>
        {/* Logo (Home Icon) to go to root */}
        <IconButton onClick={goToRoot} sx={{ marginBottom: 2 }}>
          <HomeIcon sx={{ fontSize: 40, color: "primary.main" }} />{" "}
          {/* Home Icon */}
        </IconButton>
      </Box>

      <Box sx={{ paddingBottom: 2 }}>
        {/* Display Back Button only when inside a folder and folderHistory has more than 1 item */}
        <IconButton
          onClick={handleBackClick}
          sx={{ marginBottom: 2 }}
          disabled={folderHistory.length <= 1} // Disable the button if there is no history to go back
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {/* Display Root Folders if no folder is selected */}
        {!currentFolder && folders.length > 0 && (
          <>
            {folders.map((folder) => (
              <React.Fragment key={`folder-${folder.folder_id}`}>
                <ListItem
                  button
                  onClick={() => handleFolderClick(folder.folder_id)}
                >
                  <ListItemIcon>
                    <FolderIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary={folder.folder_name || folder.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </>
        )}

        {/* Display Subfolders if inside a folder */}
        {currentFolder && currentFolder.subfolders.length > 0 && (
          <>
            {currentFolder.subfolders.map((subfolder) => (
              <React.Fragment key={`folder-${subfolder.id}`}>
                <ListItem
                  button
                  onClick={() => handleFolderClick(subfolder.id)}
                >
                  <ListItemIcon>
                    <FolderIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary={subfolder.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </>
        )}

        {/* Display Files if inside a folder */}
        {currentFolder && currentFolder.files.length > 0 && (
          <>
            {currentFolder.files.map((file) => (
              <React.Fragment key={`file-${file.id}`}>
                <ListItem>
                  <ListItemIcon>
                    <InsertDriveFileIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </>
        )}
      </List>

      {/* Snackbar component */}
      <SuccessSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default ResourceHub;
