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
} from "@mui/material";
import GradientButton from "../common/Button";
import CircularLoading from "../common/CircularLoading";

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

  // If editing a project, pre-fill the form data with the current project values
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
      // Reset to default values for a new project
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

  const handleAddTag = (name, value) => {
    if (value.trim()) {
      if (name === "objectives") {
        const values = value
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        setFormData({
          ...formData,
          [name]: [...formData[name], ...values],
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

  const handleDeleteTag = (name, value) => {
    setFormData({
      ...formData,
      [name]: formData[name].filter((item) => item !== value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const updatedProject = {
      ...formData,
      location: formData.location.map((loc) => loc.trim()),
      objectives: formData.objectives.map((objective) => objective.trim()),
      teamMembers: formData.teamMembers.map((member) => member.trim()),
    };

    // Simulate form submission delay (e.g., API call)
    await onSubmit(updatedProject);

    setLoading(false);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {isEditing ? "Edit Project" : "Add New Project"}
      </DialogTitle>
      <Box sx={{ padding: 2 }}>
        {loading ? (
          // Show CircularLoading component while loading
          <CircularLoading message="Submitting Project..." />
        ) : (
          // Show form when not loading
          <>
            <TextField
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            {/* Status Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Donor"
              name="donor"
              value={formData.donor}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* Location Tags */}
            <TextField
              label="Locations (press-enter to add tags)"
              name="locationInput"
              value={formData.locationInput}
              onChange={handleChange}
              fullWidth
              margin="normal"
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

            {/* Objectives Tags */}
            <TextField
              label="Objectives (press-enter to add tags)"
              name="objectivesInput"
              value={formData.objectivesInput}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTag("objectives", formData.objectivesInput);
                  e.preventDefault();
                }
              }}
            />
            <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
              {formData.objectives.map((obj, index) => (
                <Chip
                  key={index}
                  label={obj}
                  onDelete={() => handleDeleteTag("objectives", obj)}
                />
              ))}
            </Stack>

            {/* Team Members Tags */}
            <TextField
              label="Team Members (press-enter to add tags)"
              name="teamMembersInput"
              value={formData.teamMembersInput}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
