import React from "react";
import { Box, Typography } from "@mui/material";
import {
  StyledCard,
  StyledCardContent,
  ProjectName, // Reintroduced for project title
  Status,
  Label,
  Item,
  List,
  DividerStyled,
} from "../../styles/Project/ProjectListItemStyle";

const ProjectListItem = ({ project, onClick }) => {
  const handleClick = () => {
    console.log("Project clicked:", project.id); // Log the clicked project ID
    onClick();
  };

  return (
    <StyledCard onClick={handleClick}>
      {" "}
      {/* Add onClick handler here */}
      <StyledCardContent>
        {/* Project Title */}
        <ProjectName variant="h6">{project.projectName}</ProjectName>

        {/* Status Badge */}
        <Status
          variant="body2"
          statusColor={project.status === "Ongoing" ? "green" : "red"}
        >
          {project.status}
        </Status>

        <DividerStyled />

        {/* Project Dates and Budget */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="body2">
            Start Date: {project.startDate}
          </Typography>
          <Typography variant="body2">End Date: {project.endDate}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="body2">Budget: ${project.budget}</Typography>
        </Box>

        <DividerStyled />

        {/* Locations */}
        {project.location && project.location.length > 0 && (
          <Box mt={3}>
            <Label variant="body2">Locations:</Label>
            <List>
              {project.location.map((loc, index) => (
                <Item key={index}>
                  <Typography variant="body2">{loc}</Typography>
                </Item>
              ))}
            </List>
          </Box>
        )}

        {/* Objectives */}
        {project.objectives && project.objectives.length > 0 && (
          <Box mt={3}>
            <Label variant="body2">Objectives:</Label>
            <List>
              {project.objectives.map((objective, index) => (
                <Item key={index}>
                  <Typography variant="body2">{objective}</Typography>
                </Item>
              ))}
            </List>
          </Box>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default ProjectListItem;
