import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AuthContext } from "./AuthContext";
import Pagination from "./components/common/Pagination";
import CircularLoading from "./components/common/CircularLoading";
import {
  fetchProjects,
  addProject,
  fetchCapacityBuildingPrograms,
  addCapacityBuildingPrograms,
} from "./utils/api/ProjectManagementAPI";
import ProjectListItem from "./components/Project/ProjectListItem";
import ProjectDetailsDialog from "./components/Project/ProjectDetailsDialog";
import ProjectFormDialog from "./components/Project/ProjectFormDialog";
import SuccessSnackbar from "./components/common/SuccessSnackbar";
import {
  boxStyles,
  bannerImageStyle,
  buttonStyles,
  titleStyle,
  cardStyles,
  dropdownStyles,
} from "./styles/ProjectManagementStyles";

const ProjectManagement = () => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [category, setCategory] = useState("Projects");

  const projectsPerPage = 10;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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

        let data;

        // Fetch data based on the selected category
        if (category === "Projects") {
          data = await fetchProjects(token); // Fetch projects when category is "Projects"
        } else if (category === "Capacity Building") {
          data = await fetchCapacityBuildingPrograms(token); // Fetch capacity building programs when category is "Capacity Building"
        } else if (category === "Events") {
          // For now, do nothing for "Events" category (you can add logic later if needed)
          data = [];
          console.log("Category: Events, no fetching logic implemented yet");
        }

        // Reverse the array to show the most recent items first
        const reversedData = [...data].reverse();

        setTotalProjects(reversedData.length);
        setProjects(
          reversedData.slice(
            (page - 1) * projectsPerPage,
            page * projectsPerPage
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [page, token, category]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setCategory(category);
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

  const handleAddSubmit = async (formData) => {
    try {
      if (formData.teamMembers.length === 0) {
        throw new Error("At least one team member is required");
      }

      let newItem;

      if (category === "Projects") {
        newItem = await addProject(formData, token);
      } else if (category === "Capacity Building") {
        newItem = await addCapacityBuildingPrograms(formData, token);
      }

      // Add the new item (either project or capacity building) to the list
      setProjects([newItem, ...projects]);
      setTotalProjects(totalProjects + 1);
      setIsEditFormOpen(false);

      // Show success snackbar
      setSnackbarMessage(`${category} added successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding item:", error);

      // Show error snackbar with the custom message
      setSnackbarMessage(
        error.message ||
          `An error occurred while adding the ${category.toLowerCase()}.`
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

      {/* Add Projects Box */}
      <Box sx={boxStyles}>
        {/* Add Project Button */}
        <Box sx={cardStyles}>
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={() => {
              setCategory("Projects"); // Ensure category is set to "Projects"
              handleOpenAddProjectDialog();
            }}
          >
            Add Project
          </Button>
        </Box>

        {/* Add Capacity Building Program */}
        <Box sx={cardStyles}>
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={() => {
              setCategory("Capacity Building"); // Set category to "Capacity Building"
              handleOpenAddProjectDialog();
            }}
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

      {/* Dropdown for Category */}
      <FormControl variant="outlined" sx={{ marginBottom: 2, marginTop: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          sx={dropdownStyles} // Apply the custom dropdown styles
        >
          <MenuItem value="Projects">Projects</MenuItem>
          <MenuItem value="Capacity Building">Capacity Building</MenuItem>
          <MenuItem value="Events">Events</MenuItem>
        </Select>
      </FormControl>

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
        category={category} // Add category here
      />

      {/* Add Project Form Dialog */}
      {isEditFormOpen && (
        <ProjectFormDialog
          open={isEditFormOpen}
          onClose={handleCloseFormDialog}
          onSubmit={handleAddSubmit}
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
