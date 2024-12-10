import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Box,
  Chip,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import GradientButton from "../common/Button";
import CircularLoading from "../common/CircularLoading";
import { CheckCircle, Edit, Delete } from "@mui/icons-material";

const ProjectFormDialog = ({ project, onClose, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    status: "Ongoing",
    startDate: "",
    endDate: "",
    donor: "",
    budget: "",
    location: [],
    objectives: [],
    teamMembers: [],
    locationInput: "",
    objectivesInput: "",
    teamMembersInput: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && project) {
      setFormData({
        projectName: project.projectName,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        donor: project.donor,
        budget: project.budget,
        location: project.location || [],
        objectives: project.objectives || [],
        teamMembers: project.teamMembers
          ? project.teamMembers.map((member) => member.username)
          : [],
        locationInput: "",
        objectivesInput: "",
        teamMembersInput: "",
      });
    } else {
      setFormData({
        projectName: "",
        description: "",
        status: "Ongoing",
        startDate: "",
        endDate: "",
        donor: "",
        budget: "0",
        location: [],
        objectives: [],
        teamMembers: [],
        locationInput: "",
        objectivesInput: "",
        teamMembersInput: "",
      });
    }
  }, [project, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleObjectiveCompletionChange = (index) => {
    const updatedObjectives = [...formData.objectives];
    updatedObjectives[index].completed = !updatedObjectives[index].completed;
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const handleAddTag = (name, value) => {
    if (value.trim()) {
      if (name === "objectives") {
        const values = value
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        const objectives = values.map((item) => ({
          name: item,
          completed: false,
        }));

        setFormData({
          ...formData,
          [name]: [...formData[name], ...objectives],
          [`${name}Input`]: "",
        });
      } else {
        setFormData({
          ...formData,
          [name]: [...formData[name], value.trim()],
          [`${name}Input`]: "",
        });
      }
    }
  };

  const handleDeleteTag = (name, valueOrIndex) => {
    if (name === "objectives") {
      const updatedObjectives = [...formData.objectives];
      updatedObjectives.splice(valueOrIndex, 1);
      setFormData({
        ...formData,
        [name]: updatedObjectives,
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== valueOrIndex),
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const updatedProject = {
      ...formData,
      location: formData.location.map((loc) => loc.trim()),
      objectives: formData.objectives.map((objective) => ({
        name: objective.name.trim(),
        completed: objective.completed,
      })),
      teamMembers: formData.teamMembers.map((member) => member.trim()),
      budget: parseFloat(formData.budget) || 0,
    };

    await onSubmit(updatedProject);
    setLoading(false);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {isEditing ? "Edit Project" : "Add New Project"}
      </DialogTitle>
      <Box sx={{ padding: 3 }}>
        {loading ? (
          <CircularLoading message="Submitting Project..." />
        ) : (
          <>
            <Grid container spacing={3}>
              {/* Project Details */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Donor"
                  name="donor"
                  value={formData.donor}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Status, Dates, Budget */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              {/* Objectives Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Objectives (Milestones)
                </Typography>
                <TextField
                  label="Add Objective"
                  name="objectivesInput"
                  value={formData.objectivesInput}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag("objectives", formData.objectivesInput);
                      e.preventDefault();
                    }
                  }}
                />
                <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
                  {formData.objectives.map((obj, index) => (
                    <Box
                      key={index}
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        backgroundColor: obj.completed ? "#e8f5e9" : "#ffffff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={obj.completed}
                              onChange={() =>
                                handleObjectiveCompletionChange(index)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="body1"
                              sx={{
                                textDecoration: obj.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {obj.name}
                            </Typography>
                          }
                        />
                      </Box>

                      {/* Edit and Delete icons */}
                      <Box>
                        <IconButton
                          color="primary"
                          onClick={() => handleDeleteTag("objectives", index)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Grid>

              {/* Location Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Locations
                </Typography>
                <TextField
                  label="Add Location"
                  name="locationInput"
                  value={formData.locationInput}
                  onChange={handleChange}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag("location", formData.locationInput);
                      e.preventDefault();
                    }
                  }}
                />
                <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                  {formData.location.map((loc, index) => (
                    <Chip
                      key={index}
                      label={loc}
                      onDelete={() => handleDeleteTag("location", loc)}
                    />
                  ))}
                </Stack>
              </Grid>

              {/* Team Members Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Team Members
                </Typography>
                <TextField
                  label="Add Team Member"
                  name="teamMembersInput"
                  value={formData.teamMembersInput}
                  onChange={handleChange}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag("teamMembers", formData.teamMembersInput);
                      e.preventDefault();
                    }
                  }}
                />
                <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                  {formData.teamMembers.map((member, index) => (
                    <Chip
                      key={index}
                      label={member}
                      onDelete={() => handleDeleteTag("teamMembers", member)}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <DialogActions>
        <GradientButton onClick={onClose} color="secondary">
          Cancel
        </GradientButton>
        <GradientButton
          onClick={handleSubmit}
          color="primary"
          loading={loading}
        >
          Submit
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectFormDialog;
