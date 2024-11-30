import React from "react";
import { Box, Typography } from "@mui/material";
import {
  StyledCard,
  StyledCardContent,
  ProjectName,
  Status,
  Label,
  ObjectiveTag,
  DividerStyled,
} from "../../styles/Project/ProjectListItemStyle";

const ProjectListItem = ({ project, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <StyledCard onClick={handleClick}>
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
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">
            Start Date: {project.startDate}
          </Typography>
          <Typography variant="body2">End Date: {project.endDate}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">Budget: ${project.budget}</Typography>
        </Box>

        <DividerStyled />

        {/* Objectives */}
        {project.objectives && project.objectives.length > 0 && (
          <Box>
            <Label variant="body2">Objectives:</Label>
            <Box mt={1}>
              {/* Display objectives as custom styled Chips */}
              {project.objectives.map((objective, index) => (
                <ObjectiveTag key={index} label={objective} />
              ))}
            </Box>
          </Box>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default ProjectListItem;
