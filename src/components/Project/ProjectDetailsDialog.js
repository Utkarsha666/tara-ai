import React, { useState, useEffect } from "react";
import { Dialog, Divider, Box, IconButton } from "@mui/material";
import {
  fetchProjectDetails,
  updateProjectDetails,
} from "../../utils/api/ProjectManagementAPI";
import GradientButton from "../common/Button";
import CircularLoading from "../common/CircularLoading";
import UserProfileDialog from "../common/UserProfileDialog";
import EditIcon from "@mui/icons-material/Edit";
import ProjectFormDialog from "./ProjectFormDialog";

import {
  DialogWrapper,
  DialogTitleStyled,
  DialogContentStyled,
  SectionTitle,
  SectionText,
  StatusText,
  ChipTag,
  TeamMemberLink,
  DialogActionsStyled,
} from "../../styles/Project/ProjectDetailsDialogStyles";

const ProjectDetailsDialog = ({ open, onClose, projectId, token }) => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    const getProjectDetails = async () => {
      if (!projectId || !token) return;

      setLoading(true); // Start loading
      try {
        const data = await fetchProjectDetails(projectId, token);
        setProjectDetails(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      getProjectDetails();
    }
  }, [open, projectId, token]);

  const handleUsernameClick = (username) => {
    setSelectedUsername(username);
    setUserProfileOpen(true);
  };

  const handleEditClick = () => {
    setIsEditFormOpen(true); // Open the edit form
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleSubmitEdit = async (updatedProject) => {
    // Make API call to update the project
    try {
      const response = await updateProjectDetails(
        projectId,
        token,
        updatedProject
      );
      setProjectDetails(response);
      setIsEditFormOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // If loading, display the CircularLoading spinner
  if (loading) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContentStyled>
          <CircularLoading /> {/* Show the CircularLoading spinner */}
        </DialogContentStyled>
      </Dialog>
    );
  }

  // If projectDetails is null or undefined, we don't display the dialog's content
  if (!projectDetails) {
    return null;
  }

  const statusColor =
    projectDetails.status === "Ongoing" ? "#4caf50" : "#f44336";

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogWrapper>
          <DialogTitleStyled>
            {projectDetails.projectName}
            <IconButton
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#1976d2",
              }}
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
          </DialogTitleStyled>

          <DialogContentStyled>
            <SectionTitle>
              <strong>Description</strong>
            </SectionTitle>
            <SectionText>{projectDetails.description}</SectionText>

            <Divider sx={{ margin: "16px 0" }} />

            <SectionTitle>
              <strong>Status</strong>
            </SectionTitle>
            <StatusText statusColor={statusColor}>
              {projectDetails.status}
            </StatusText>

            <Divider sx={{ margin: "16px 0" }} />

            <SectionTitle>
              <strong>Timeline</strong>
            </SectionTitle>
            <SectionText>
              <strong>Start Date:</strong>{" "}
              {new Date(projectDetails.startDate).toLocaleDateString()}
            </SectionText>
            <SectionText>
              <strong>End Date:</strong>{" "}
              {new Date(projectDetails.endDate).toLocaleDateString()}
            </SectionText>

            <Divider sx={{ margin: "16px 0" }} />

            <SectionTitle>
              <strong>Budget</strong>
            </SectionTitle>
            <SectionText>${projectDetails.budget.toLocaleString()}</SectionText>

            {/* Display the donor */}
            {projectDetails.donor && (
              <Box mb={3}>
                <SectionTitle>
                  <strong>Donor</strong>
                </SectionTitle>
                <SectionText>{projectDetails.donor}</SectionText>
              </Box>
            )}

            {projectDetails.location.length > 0 && (
              <Box mb={3}>
                <SectionTitle>
                  <strong>Locations</strong>
                </SectionTitle>
                {projectDetails.location.map((loc, index) => (
                  <ChipTag key={index} label={loc} />
                ))}
              </Box>
            )}

            {projectDetails.objectives.length > 0 && (
              <Box mb={3}>
                <SectionTitle>
                  <strong>Objectives</strong>
                </SectionTitle>
                <Box>
                  {projectDetails.objectives.map((objective, index) => (
                    <ChipTag key={index} label={objective} />
                  ))}
                </Box>
              </Box>
            )}

            {projectDetails.teamMembers.length > 0 && (
              <Box mb={3}>
                <SectionTitle>
                  <strong>Team Members</strong>
                </SectionTitle>
                {projectDetails.teamMembers.map((member, index) => (
                  <SectionText key={index}>
                    <TeamMemberLink
                      href="#"
                      onClick={() => handleUsernameClick(member.username)}
                    >
                      {member.username}
                    </TeamMemberLink>
                  </SectionText>
                ))}
              </Box>
            )}
          </DialogContentStyled>

          <DialogActionsStyled>
            <GradientButton onClick={onClose} loading={false}>
              Close
            </GradientButton>
          </DialogActionsStyled>
        </DialogWrapper>
      </Dialog>

      {/* UserProfileDialog */}
      <UserProfileDialog
        open={userProfileOpen}
        onClose={() => setUserProfileOpen(false)}
        username={selectedUsername}
        token={token}
      />

      {/* Edit Form Dialog */}
      {isEditFormOpen && (
        <ProjectFormDialog
          project={projectDetails}
          onClose={handleCloseEditForm}
          onSubmit={handleSubmitEdit}
          isEditing={true}
        />
      )}
    </>
  );
};

export default ProjectDetailsDialog;
