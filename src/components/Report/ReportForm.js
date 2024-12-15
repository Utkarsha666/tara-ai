import React from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  Divider,
  Autocomplete,
  Chip,
} from "@mui/material";
import GradientButton from "../common/Button";

// Example research topics for NGOs and gender perspectives
const suggestedTopics = [
  "AI in Early Warning: Gender Perspective",
  "Gender-Responsive Disaster Risk Reduction",
  "AI for Gender-Inclusive Climate Resilience",
  "Empowering Women in Climate Action for Vulnerable Communities",
  "Promoting Gender Equality in Climate Change Policies",
  "Innovative Solutions for Climate-Induced Migration: A Gender Lens",
  "The Role of Women in Disaster Management in Climate-Affected Regions",
  "Leveraging AI for Climate Adaptation in Women-Lead Initiatives",
  "Women in Renewable Energy: Addressing Gender Barriers",
  "Building Gender-Equitable Climate Governance Systems",
  "Empowering Women Farmers with Climate-Smart Agriculture Solutions",
  "Technology-Driven Approaches to Addressing Water Scarcity Amid Climate Change",
  "Addressing the Impact of Climate Change on Maternal Health",
];

const ReportForm = ({
  topic,
  setTopic,
  maxAnalysts,
  setMaxAnalysts,
  handleGenerateReport,
  loadingReportGeneration,
  loadingReports,
}) => {
  // Ensure topic updates correctly on selection or custom text input
  const handleInputChange = (event, newInputValue) => {
    setTopic(newInputValue); // Directly set the new value
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        marginBottom: 4,
        padding: 3,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        "&:hover": {
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
          transform: "scale(1.02)",
        },
      }}
    >
      {/* Header Section */}
      <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2 }}>
        Research Report Generator
      </Typography>
      <Typography variant="body2" sx={{ color: "#555", marginBottom: 2 }}>
        Choose a research topic from the list or create your own. You can also
        specify the maximum number of analysts to generate the report.
      </Typography>

      {/* Predefined Topics Dropdown */}
      <Autocomplete
        value={topic} // Bind to parent state
        onChange={(event, newValue) => setTopic(newValue)} // When a predefined option is selected
        onInputChange={handleInputChange} // When user types in custom text
        options={suggestedTopics || []} // Ensure options is defined
        freeSolo // Allow custom text input
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select or Enter Research Topic"
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="Start typing or select a topic"
            sx={{ backgroundColor: "#F9F9F9", borderRadius: 2 }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Chip label={option} sx={{ margin: "4px 0" }} />
          </li>
        )}
      />

      {/* Max Analysts Input */}
      <TextField
        type="number"
        label="Max Analysts"
        value={maxAnalysts}
        onChange={(e) => setMaxAnalysts(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
        sx={{
          backgroundColor: "#F9F9F9",
          borderRadius: 2,
        }}
      />

      {/* Divider for clean visual separation */}
      <Divider sx={{ marginY: 3 }} />

      {/* Generate Report Button */}
      <GradientButton
        onClick={handleGenerateReport}
        disabled={loadingReportGeneration || loadingReports}
        sx={{
          marginTop: 2,
          backgroundColor: "#3f51b5",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#283593",
          },
        }}
      >
        {loadingReportGeneration ? "Generating..." : "Generate Report"}
      </GradientButton>

      {/* Loading State */}
      {loadingReportGeneration && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 3,
          }}
        >
          <CircularProgress size={40} sx={{ marginBottom: 2 }} />
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#777" }}
          >
            Generating the report... Please wait a moment.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportForm;
