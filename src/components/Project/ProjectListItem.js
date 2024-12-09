import { React, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CheckCircle, HelpOutline } from "@mui/icons-material"; // Import icons
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
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    onClick();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <CheckCircle sx={{ color: "green", marginRight: 1 }} />;
      case "Pending":
        return <HelpOutline sx={{ color: "orange", marginRight: 1 }} />;
      case "Completed":
        return <CheckCircle sx={{ color: "red", marginRight: 1 }} />;
      default:
        return null;
    }
  };

  const handleToggleExpand = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <StyledCard onClick={handleClick}>
      <StyledCardContent>
        {/* Project Title */}
        <ProjectName variant="h6">{project.projectName}</ProjectName>

        {/* Status Badge */}
        <Box display="flex" alignItems="center">
          {getStatusIcon(project.status)} {/* Status icon */}
          <Status
            variant="body2"
            statusColor={
              project.status === "Ongoing"
                ? "green"
                : project.status === "Pending"
                ? "orange"
                : "red"
            }
          >
            {project.status}
          </Status>
        </Box>

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
              {/* Display objectives as a numbered list */}
              <ol style={{ paddingLeft: "20px" }}>
                {(isExpanded
                  ? project.objectives
                  : project.objectives.slice(0, 3)
                ).map((objective, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Display objective name */}
                    <ObjectiveTag label={objective.name} />

                    {/* Display completion status on the extreme right */}
                    <Typography
                      variant="body2"
                      color={objective.completed ? "green" : "red"}
                      style={{ marginLeft: "auto" }} // This moves the status to the extreme right
                    >
                      {objective.completed ? "Completed" : "Not Completed"}
                    </Typography>
                  </li>
                ))}
              </ol>
              {/* Toggle button for "See More" / "See Less" */}
              {project.objectives.length > 3 && (
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={handleToggleExpand} // Handle only the expansion here
                >
                  {isExpanded ? "See Less" : "See More"}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default ProjectListItem;
