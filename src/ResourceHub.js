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
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AuthContext } from "./AuthContext";
import SuccessSnackbar from "./components/common/SuccessSnackbar";
import {
  fetchFolders,
  fetchFolderContents,
  downloadFile,
  createFolder,
} from "./utils/api/ResourceHubAPI";
import CircularLoading from "./components/common/CircularLoading";
import HomeIcon from "@mui/icons-material/Home";
import FileDownloadDialog from "./components/common/FileDownloadDialog";
import CreateFolderDialog from "./components/common/CreateFolderDialog";

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
  const [selectedFile, setSelectedFile] = useState(null); // For storing the selected file
  const [openDialog, setOpenDialog] = useState(false); // To control dialog visibility
  const [openCreateFolderDialog, setOpenCreateFolderDialog] = useState(false); // To control the create folder dialog
  const [newFolderName, setNewFolderName] = useState(""); // State for new folder name

  const loadFolders = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const data = await fetchFolders(token);
      setFolders(data);
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
    setLoading(true);

    try {
      const { items } = await fetchFolderContents(folderId, token);

      // Separate files and subfolders
      const files = items.filter((item) => item.type === "file");
      const subfolders = items.filter((item) => item.type === "folder");

      // Update the current folder state with the new folder and its contents
      setCurrentFolder({
        id: folderId,
        files,
        subfolders,
      });

      // Update folderHistory correctly by adding the current folderId only if it's not already present
      setFolderHistory((prevHistory) => {
        if (prevHistory[prevHistory.length - 1] === folderId) {
          return prevHistory;
        }
        return [...prevHistory, folderId];
      });
    } catch (err) {
      setSnackbarMessage(`Error fetching resources: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    // Check if we can go back (i.e., we are not at the root folder)
    if (folderHistory.length > 1) {
      // Pop the current folder from history and get the previous folder
      const previousFolderId = folderHistory[folderHistory.length - 2];

      // Update folderHistory by removing the last folder (going back one level)
      // Remove the last folder from history (back one level)
      setFolderHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, prevHistory.length - 1);
        return newHistory;
      });

      // Fetch the contents of the previous folder
      handleFolderClick(previousFolderId);
    } else {
      // If we are at the root (no folder in history), reset to root view
      setCurrentFolder(null);
      setFolderHistory([]);
    }
  };

  const handleDownloadFile = async () => {
    if (!selectedFile) {
      console.error("No file selected for download!");
      return;
    }

    const fileId = selectedFile.id;

    try {
      const blob = await downloadFile(fileId, token);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = selectedFile.name;
      link.click();

      setSnackbarMessage("File download started");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(`Error downloading file: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    const parentFolder = currentFolder ? currentFolder.id : null;

    try {
      const response = await createFolder(newFolderName, parentFolder, token);

      setSnackbarMessage(
        `Folder "${response.folder_name}" created successfully`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenCreateFolderDialog(false);
      setNewFolderName("");

      // After folder creation, go to the newly created folder's view
      handleFolderClick(response.folder_id);
    } catch (err) {
      setSnackbarMessage(`Error creating folder: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    loadFolders();
  }, [token]);

  // Go to root folder and reset state
  const goToRoot = () => {
    loadFolders();
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setOpenDialog(true);
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

        {/* Create Folder Icon */}
        <IconButton
          onClick={() => setOpenCreateFolderDialog(true)}
          sx={{ marginBottom: 2, marginLeft: 2 }}
        >
          <AddBoxIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </IconButton>
      </Box>

      <Box sx={{ paddingBottom: 2 }}>
        {/* Display Back Button only when inside a folder and folderHistory has more than 1 item */}
        <IconButton
          onClick={handleBackClick}
          sx={{ marginBottom: 2 }}
          disabled={folderHistory.length <= 1}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Display current folder name */}
      <Box sx={{ paddingBottom: 2, textAlign: "center" }}>
        <Typography variant="h6" color="text.primary">
          {currentFolder ? "" : "Root"}
        </Typography>
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
                <ListItem button onClick={() => handleFileClick(file)}>
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

      {/* Create Folder Dialog */}
      {/* The new Create Folder Dialog */}
      <CreateFolderDialog
        open={openCreateFolderDialog}
        onClose={() => setOpenCreateFolderDialog(false)}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        handleCreateFolder={handleCreateFolder}
      />

      {/* FileDownloadDialog Component */}
      <FileDownloadDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        file={selectedFile}
        onDownload={handleDownloadFile}
        loading={loading}
      />

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
