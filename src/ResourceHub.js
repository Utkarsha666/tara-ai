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
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from "./AuthContext";
import SuccessSnackbar from "./components/common/SuccessSnackbar";
import {
  fetchFolders,
  fetchFolderContents,
  downloadFile,
  createFolder,
  uploadFile,
  deleteFile,
} from "./utils/api/ResourceHubAPI";
import CircularLoading from "./components/common/CircularLoading";
import HomeIcon from "@mui/icons-material/Home";
import FileDownloadDialog from "./components/common/FileDownloadDialog";
import CreateFolderDialog from "./components/common/CreateFolderDialog";
import FileUploadDialog from "./components/common/FileUploadDialog";

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
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false); // To open file upload dialog
  const [fileToUpload, setFileToUpload] = useState(null); // File selected for upload
  const [anchorEl, setAnchorEl] = useState(null); // For the three dots menu
  const [selectedFileForMenu, setSelectedFileForMenu] = useState(null); // Track selected file for menu actions
  const [isMenuOpened, setIsMenuOpened] = useState(false); // Track whether the menu is opened

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
    // Check if the menu is opened, if it is, prevent the download dialog from opening
    if (isMenuOpened) {
      setIsMenuOpened(false); // Close the menu after clicking on the file
      return; // Do nothing here if the menu was opened
    }

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

  const handleFileSelect = (event) => {
    setFileToUpload(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) {
      setSnackbarMessage("No file selected!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const folderId = currentFolder ? currentFolder.id : "root";

    try {
      const response = await uploadFile(folderId, formData, token);

      setSnackbarMessage(`File "${response.filename}" uploaded successfully`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setUploadFileDialogOpen(false);
      setFileToUpload(null);

      // Optionally, refresh the folder contents
      handleFolderClick(folderId);
    } catch (err) {
      setSnackbarMessage(`Error uploading file: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (!isMenuOpened) {
      // Menu has been closed, now we can safely proceed with the file deletion
      if (selectedFileForMenu) {
        handleDeleteFile();
        // Proceed with the delete logic after the menu closes
      }
    }
  }, [isMenuOpened]); // Watch for changes to isMenuOpened

  const handleDeleteFile = async () => {
    if (!selectedFileForMenu) return;
    handleMenuClose();

    try {
      const response = await deleteFile(selectedFileForMenu, token);

      // Show success message in snackbar
      setSnackbarMessage("File deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reload folders or refresh current folder after deletion
      if (!currentFolder || currentFolder.id === null) {
        loadFolders(); // If at root, reload folder list
      } else {
        handleFolderClick(currentFolder.id); // Refresh current folder
      }
    } catch (err) {
      // Handle errors during deletion
      setSnackbarMessage(`Error deleting file: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // for closing the file menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpened(false); // Close the menu
  };

  // clicking the file/folder menu
  const handleMenuClick = (event, file) => {
    setSelectedFileForMenu(file);
    setAnchorEl(event.currentTarget);
    setIsMenuOpened(true);
    event.stopPropagation();
  };

  useEffect(() => {
    loadFolders();
  }, [token]);

  // Go to root folder and reset state
  const goToRoot = () => {
    loadFolders();
  };

  const handleFileClick = (file) => {
    // Check if the menu is opened, if it is, prevent the download dialog from opening
    if (isMenuOpened) {
      setIsMenuOpened(false); // Close the menu after clicking on the file
      return; // Do nothing here if the menu was opened
    }
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

        {/* Upload File Icon */}
        {!currentFolder ? (
          <Tooltip
            title="File uploads are only allowed within folders, not at the root level."
            disableInteractive
            arrow
          >
            <span>
              <IconButton
                onClick={() => setUploadFileDialogOpen(true)}
                sx={{ marginBottom: 2, marginLeft: 2 }}
                disabled={!currentFolder} // Disable button when at root
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <IconButton
            onClick={() => setUploadFileDialogOpen(true)}
            sx={{ marginBottom: 2, marginLeft: 2 }}
            disabled={!currentFolder} // Disable button when at root
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
          </IconButton>
        )}
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
        {!currentFolder &&
          folders.length > 0 &&
          folders.map((folder) => (
            <React.Fragment key={`folder-${folder.folder_id}`}>
              <ListItem
                button
                onClick={() => handleFolderClick(folder.folder_id)}
              >
                <ListItemIcon>
                  <FolderIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={folder.folder_name || folder.name} />
                <IconButton
                  onClick={(e) => handleMenuClick(e, folder.folder_id)}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}

        {currentFolder &&
          currentFolder.subfolders.length > 0 &&
          currentFolder.subfolders.map((subfolder) => (
            <React.Fragment key={`folder-${subfolder.id}`}>
              <ListItem button onClick={() => handleFolderClick(subfolder.id)}>
                <ListItemIcon>
                  <FolderIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={subfolder.name} />
                <IconButton onClick={(e) => handleMenuClick(e, subfolder.id)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}

        {currentFolder &&
          currentFolder.files.length > 0 &&
          currentFolder.files.map((file) => (
            <React.Fragment key={`file-${file.id}`}>
              <ListItem button onClick={() => handleFileClick(file)}>
                <ListItemIcon>
                  <InsertDriveFileIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={file.name} />
                <IconButton onClick={(e) => handleMenuClick(e, file.id)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteFile}>Delete</MenuItem>
        {/* Add other menu items as needed */}
      </Menu>

      {/* Upload File Dialog */}
      <FileUploadDialog
        open={uploadFileDialogOpen}
        onClose={() => setUploadFileDialogOpen(false)}
        handleFileSelect={handleFileSelect}
        handleFileUpload={handleFileUpload}
        fileToUpload={fileToUpload}
      />

      {/* Create Folder Dialog */}
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
