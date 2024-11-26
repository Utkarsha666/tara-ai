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
  fetchProjectByStatus,
  fetchCapacityBuildingStatus,
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
  const [status, setStatus] = useState("All");

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
          // If status is "All", fetch all projects without status filter
          if (status === "All") {
            data = await fetchProjects(token); // Fetch all projects (no status filter)
          } else {
            data = await fetchProjectByStatus(token, status); // Fetch projects filtered by status
          }
        } else if (category === "Capacity Building") {
          // Fetch capacity building programs (no status filter for now)
          if (status === "All") {
            data = await fetchCapacityBuildingPrograms(token); // Fetch all programs (no status filter)
          } else {
            data = await fetchCapacityBuildingStatus(token, status); // Fetch based on status
          }
        } else if (category === "Events") {
          // Placeholder for future "Events" category logic (status filter is not used yet)
          data = []; // Temporarily empty
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
  }, [page, token, category, status]);

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
      <FormControl variant="outlined" sx={{ marginBottom: 4, marginTop: 2 }}>
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

      {/* Dropdown for Status */}
      <FormControl
        variant="outlined"
        sx={{ marginBottom: 4, marginTop: 2, marginLeft: 2 }}
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          sx={dropdownStyles} // Apply same width as the Category dropdown
        >
          <MenuItem value="Ongoing">Ongoing</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="All">All</MenuItem>
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
