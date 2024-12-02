import React from "react";
import { Box, Typography, Container } from "@mui/material";

const ResourceHub = () => {
  return (
    <Container>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Resource Hub
        </Typography>
        <Typography variant="body1">
          Welcome to the Resource Hub! Here you can find various resources
          related to the project, including documents, tutorials, and more.
        </Typography>
      </Box>
    </Container>
  );
};

export default ResourceHub;
