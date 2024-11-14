import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { AuthContext } from "./AuthContext";
import Pagination from "./components/common/Pagination";
import CircularLoading from "./components/common/CircularLoading";
import { fetchProjects, addProject } from "./utils/api/ProjectManagementAPI";
import ProjectListItem from "./components/Project/ProjectListItem";
import ProjectDetailsDialog from "./components/Project/ProjectDetailsDialog"; // Import the Dialog component
import ProjectFormDialog from "./components/Project/ProjectFormDialog"; // Import the ProjectFormDialog
import SuccessSnackbar from "./components/common/SuccessSnackbar"; // Import Snackbar component
import {
  boxStyles,
  bannerImageStyle,
  buttonStyles,
  titleStyle,
  cardStyles,
} from "./styles/ProjectManagementStyles";

const ProjectManagement = () => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // Track if the project details dialog is open
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Track selected project ID
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // For form dialog visibility
  const [projectDetails, setProjectDetails] = useState(null); // Holds selected project details for editing

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controls visibility of the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to be displayed
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity of the message ('success' or 'error')

  const projectsPerPage = 10;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  useEffect(() => {
    const getProjects = async () => {
      if (!token) {
        console.error("No token available");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProjects(token);
        console.log("Fetched projects:", data);

        // Reverse the array to show the most recent projects first
        const reversedProjects = [...data].reverse();

        setTotalProjects(reversedProjects.length);
        setProjects(
          reversedProjects.slice(
            (page - 1) * projectsPerPage,
            page * projectsPerPage
          )
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [page, token]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProjectId(null);
  };

  const handleOpenAddProjectDialog = () => {
    setIsEditFormOpen(true); // Open the Add Project Form
    setProjectDetails(null); // Clear any previous project details
  };

  const handleCloseFormDialog = () => {
    setIsEditFormOpen(false); // Close the form dialog
  };

  const handleAddProjectSubmit = async (formData) => {
    try {
      if (formData.teamMembers.length === 0) {
        throw new Error("At least one team member is required");
      }
      const newProject = await addProject(formData, token);

      setProjects([newProject, ...projects]);
      setTotalProjects(totalProjects + 1);
      setIsEditFormOpen(false);

      // Show success snackbar
      setSnackbarMessage("Project added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding project:", error);

      // Show error snackbar with the custom message
      setSnackbarMessage(
        error.message || "An error occurred while adding the project."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 1 }}>
      {/* Title Section */}
      <Typography sx={titleStyle}>Project Management</Typography>

      {/* Banner Image Section */}
      <Box sx={bannerImageStyle} />

      {/* Add Projects Box Below the Banner */}
      <Box sx={boxStyles}>
        <Box sx={cardStyles}>
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenAddProjectDialog}
          >
            Add Project
          </Button>
        </Box>
        {/* Add Capacity Building Program */}
        <Box sx={cardStyles}>
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenAddProjectDialog}
          >
            Add Capacity Building Program
          </Button>
        </Box>
        {/* Add Event */}
        <Box sx={cardStyles}>
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={handleOpenAddProjectDialog}
          >
            Add Event
          </Button>
        </Box>
      </Box>

      {/* If loading, display the CircularLoading component */}
      {loading ? (
        <CircularLoading message="Loading projects..." />
      ) : (
        <>
          {/* Project List Section: Full-width grid */}
          <Grid container spacing={2} sx={{ width: "100%" }}>
            {projects.map((project, index) => (
              <Grid item xs={12} key={index}>
                <ProjectListItem
                  project={project}
                  onClick={() => handleProjectClick(project.id)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Custom Pagination Section */}
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalProjects / projectsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Project Details Dialog */}
      <ProjectDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        projectId={selectedProjectId}
        token={token}
      />

      {/* Add Project Form Dialog */}
      {isEditFormOpen && (
        <ProjectFormDialog
          open={isEditFormOpen}
          onClose={handleCloseFormDialog}
          onSubmit={handleAddProjectSubmit}
          isEditing={false}
        />
      )}

      {/* Success Snackbar */}
      <SuccessSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default ProjectManagement;
