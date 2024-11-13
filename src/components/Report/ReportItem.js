import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReactMarkdown from "react-markdown";
import ReportDialog from "../common/ReportDialog";

const ReportItem = ({ reportData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Extract the title from the first # Heading 1
  const extractTitleFromMarkdown = (text) => {
    const headingMatch = text.match(/^# (.+)$/m);
    return headingMatch ? headingMatch[1] : "Untitled";
  };

  // Truncate content to a specific word limit (e.g., 30 words)
  const truncateContent = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + " ...";
  };

  // Extract the title (first # Heading 1)
  const title = extractTitleFromMarkdown(reportData.report);

  // Step 1: Remove the first # Heading 1 completely
  const contentWithoutHeading1 = reportData.report.replace(/^# .+?\n/, "");

  // Step 2: Remove the first ## Heading 2 completely
  const contentWithoutBothHeadings = contentWithoutHeading1.replace(
    /^## .+?\n/,
    ""
  );

  // Step 3: Get the first 30 words of the content after both headings are removed
  const truncatedContent = truncateContent(contentWithoutBothHeadings, 30);

  return (
    <>
      {/* Report Item Card */}
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          marginBottom: 2,
          transition: "all 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "auto",
          "&:hover": {
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            transform: "scale(1.02)",
          },
        }}
        onClick={handleOpenDialog}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box>
            {/* Displaying Title, Date, and Analysts */}
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Analysts:</strong>{" "}
              {reportData.analysts.map((a) => a.name).join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Date:</strong>{" "}
              {new Date(reportData.created_at).toLocaleDateString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <IconButton color="primary" sx={{ fontSize: 28, marginBottom: 1 }}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton color="error" sx={{ fontSize: 28 }}>
              <ThumbDownIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Truncated content preview */}
        <Box sx={{ mt: 2 }}>
          <ReactMarkdown
            components={{
              h1: () => null, // Skip <h1> headings in the preview
              h2: () => null, // Skip <h2> headings
              h3: () => null, // Skip <h3> headings
              h4: () => null, // Skip <h4> headings
              h5: () => null, // Skip <h5> headings
              h6: () => null, // Skip <h6> headings
              p: ({ children }) => (
                <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                  {children}
                </Typography>
              ),
            }}
          >
            {truncatedContent}
          </ReactMarkdown>
        </Box>
      </Box>

      {/* Use ReportDialog component for the full report view */}
      <ReportDialog
        reportData={reportData}
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default ReportItem;
