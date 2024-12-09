import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  fetchProjectByStatus,
  fetchCapacityBuildingStatus,
} from "../../utils/api/ProjectManagementAPI";
import {
  CheckCircle,
  LocationOn,
  Business,
  AttachMoney,
} from "@mui/icons-material";
import CircularLoading from "../common/CircularLoading";
import UserProfileDialog from "../common/UserProfileDialog";
import GradientButton from "../common/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ProjectDialog = ({ open, onClose, token, type }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [expandedObjectives, setExpandedObjectives] = useState({});

  useEffect(() => {
    if (open && token) {
      const fetchData = async () => {
        try {
          if (type === "project") {
            const projects = await fetchProjectByStatus(token, "Ongoing");
            setProjects(projects);
          } else if (type === "capacityBuilding") {
            const capacityBuilding = await fetchCapacityBuildingStatus(
              token,
              "Ongoing"
            );
            setProjects(capacityBuilding);
          }
        } catch (err) {
          setError(`Failed to fetch ${type}.`);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [open, token, type]);

  const handleUsernameClick = (username) => {
    setSelectedUsername(username);
    setUserProfileDialogOpen(true);
  };

  const handleToggleObjectives = (projectId) => {
    setExpandedObjectives((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId], // Toggle the expanded state for this project
    }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#f5f5f5", color: "#111" }}>
          Ongoing Projects
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#f5f5f5", padding: 3 }}>
          {loading ? (
            <CircularLoading message="Loading projects..." />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : projects.length === 0 ? (
            <Typography>No ongoing projects available.</Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              {projects.map((project) => (
                <Card
                  key={project.id}
                  sx={{
                    borderRadius: 8,
                    boxShadow: 3,
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#3f51b5" }}
                    >
                      {project.projectName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ marginBottom: 1 }}
                    >
                      <Business
                        sx={{ verticalAlign: "middle", marginRight: 1 }}
                      />
                      {project.donor}
                    </Typography>

                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                      <strong>Description:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                      {project.description}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <AttachMoney sx={{ marginRight: 1 }} />
                          <strong>Budget:</strong> ${project.budget}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <LocationOn sx={{ marginRight: 1 }} />
                          <strong>Location:</strong>
                        </Typography>
                        <Box sx={{ marginBottom: 2 }}>
                          {/* Locations Tags */}
                          {project.location.map((loc, index) => (
                            <Chip
                              key={index}
                              label={loc}
                              sx={{
                                marginRight: 1,
                                marginBottom: 1,
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: "20px",
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CheckCircle sx={{ marginRight: 1 }} />
                          <strong>Status:</strong> {project.status}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      <strong>Objectives:</strong>
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                      {/* Objectives Cards */}
                      {project.objectives
                        .slice(
                          0,
                          expandedObjectives[project.id]
                            ? project.objectives.length
                            : 3
                        )
                        .map((objective, index) => (
                          <Card
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: 2,
                              marginBottom: 1,
                              borderRadius: 2,
                              backgroundColor: objective.completed
                                ? "#e8f5e9"
                                : "#fce4e4",
                              boxShadow: 2,
                            }}
                          >
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                fontWeight="bold"
                              >
                                {objective.name}
                              </Typography>
                            </Box>
                            <Box>
                              {objective.completed ? (
                                <CheckIcon sx={{ color: "#388e3c" }} />
                              ) : (
                                <CloseIcon sx={{ color: "#d32f2f" }} />
                              )}
                            </Box>
                          </Card>
                        ))}
                    </Box>

                    {/* "See More" / "See Less" Toggle */}
                    {project.objectives.length > 3 && (
                      <Typography
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: "#1976d2",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleToggleObjectives(project.id)}
                      >
                        {expandedObjectives[project.id]
                          ? "See Less"
                          : "See More"}
                      </Typography>
                    )}

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      <strong>Team Members:</strong>
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                      {project.teamMembers.map((member) => (
                        <Chip
                          key={member.userId}
                          label={
                            <Typography
                              variant="body2"
                              sx={{ cursor: "pointer", color: "#1976d2" }}
                              onClick={() =>
                                handleUsernameClick(member.username)
                              }
                            >
                              {member.username}
                            </Typography>
                          }
                          sx={{
                            marginRight: 1,
                            marginBottom: 1,
                            backgroundColor: "#fefe",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "20px",
                          }}
                        />
                      ))}
                    </Box>

                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      <strong>Start Date:</strong>{" "}
                      {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                    {project.endDate && (
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        <strong>End Date:</strong>{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#f5f5f5" }}>
          <GradientButton onClick={onClose} loading={loading}>
            Close
          </GradientButton>
        </DialogActions>
      </Dialog>
      {/* User Profile Dialog */}
      <UserProfileDialog
        open={userProfileDialogOpen}
        onClose={() => setUserProfileDialogOpen(false)}
        username={selectedUsername}
        token={token}
      />
    </>
  );
};

export default ProjectDialog;
