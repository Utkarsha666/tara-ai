import React from "react";
import { Button, Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <Box
    sx={{
      marginTop: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2, // Space between elements
    }}
  >
    {/* Previous Button */}
    <Button
      variant="contained"
      color="primary"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: "50px", // Rounded button
        padding: "6px 16px",
        "&:hover": {
          backgroundColor: currentPage === 1 ? "gray" : "#1976d2", // Custom hover for disabled state
        },
      }}
    >
      <ChevronLeftIcon />
      Previous
    </Button>

    {/* Page Indicator */}
    <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
      Page {currentPage} of {totalPages}
    </Typography>

    {/* Next Button */}
    <Button
      variant="contained"
      color="primary"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: "50px", // Rounded button
        padding: "6px 16px",
        "&:hover": {
          backgroundColor:
            currentPage === totalPages
              ? "gray"
              : "linear-gradient(135deg, #003c5b 0%, #005f7f 100%)",
        },
      }}
    >
      Next
      <ChevronRightIcon />
    </Button>
  </Box>
);

export default Pagination;
