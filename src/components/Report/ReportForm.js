import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import GradientButton from "../common/Button";

const topics = [
  "Deforestation and Its Impact on Climate Change in Nepal's Forest Ecosystems",
  "Gender-Responsive Climate Change Adaptation Strategies in Nepal",
  "The Role of Women in Disaster Risk Reduction in Nepal's Vulnerable Regions",
  "Climate Change and Water Security in Nepal's Rural Areas",
  "The Role of Women in Sustainable Agriculture and Climate Change Adaptation in Nepal",
  "Addressing the Sexual and Reproductive Health Needs in Climate-Impacted Communities in Nepal",
  "Water, Sanitation, and Hygiene (WASH) Challenges in Nepal's Vulnerable Regions",
  "The Impact of Climate Change on Community-Based Disaster Preparedness in Nepal",
  "Urban Planning and Climate Resilience in Nepal’s Growing Cities",
  "Community-Led Renewable Energy Solutions in Nepal's Rural Areas",
  "Assessing the Impact of Recent Floods on Infrastructure and Livelihoods in Nepal",
  "Mitigating Climate-Induced Health Risks through Improved Water and Sanitation Systems in Nepal",
  "The Role of Technology in Enhancing Community Climate Resilience in Nepal",
  "Improving Climate Resilience in Nepal’s Water-Scarce Regions through Innovative Solutions",
  "Sexual and Reproductive Health in the Context of Climate Change: Nepal’s Response",
  "Deforestation and Its Role in Nepal’s Climate Change Mitigation Strategies",
  "Climate Change and Women’s Access to Clean Water in Nepal’s Rural Areas",
  "The Importance of Community-Based Climate Change Mitigation in Nepal’s Mountains",
  "Challenges of Implementing Water and Sanitation Solutions in Climate-Vulnerable Areas of Nepal",
  "Building Resilient Communities: Integrating Climate Adaptation and Disaster Preparedness in Nepal",
  "Water, Climate Change, and Food Security: The Nexus in Nepal’s Agriculture",
  "Improving Water Resource Management for Sustainable Development in Nepal’s Rural Communities",
  "Climate-Smart Urban Planning for Nepal’s Growing Cities and Towns",
  "The Role of Deforestation in Nepal’s Greenhouse Gas Emissions and Climate Policy",
  "Community-Level Approaches to Climate Resilience and Adaptation in Nepal's Rural Areas",
  "Sexual and Reproductive Health in a Changing Climate: Implications for Women in Nepal",
  "Gender and Climate Change in Nepal's Indigenous Communities",
  "Climate Change, Community Health, and the Future of Nepal’s Healthcare System",
  "The Role of Nepal's Government in Promoting Water Security and Sanitation in a Changing Climate",
  "Impact of Climate Change on Nepal’s Terai Region: Water Resources and Agriculture",
  "Addressing Climate-Induced Migration and Its Effects on Sexual and Reproductive Health in Nepal",
  "Climate Action and Its Role in Mitigating the Health Impacts of Air Pollution in Nepal’s Cities",
  "Women’s Leadership in Sustainable Agriculture and Climate Adaptation in Nepal’s Rural Areas",
  "Womenn's Leadership in Digital Transformation",
  "Gender-Responsive Disaster Preparedness and Recovery in Nepal’s Vulnerable Regions",
  "Integrating Gender into Climate Change Policies for Water, Sanitation, and Hygiene in Nepal",
  "The Role of Women in Climate-Smart Water Management in Nepal’s Rural Communities",
  "Gender-Sensitive Approaches to Deforestation and Conservation in Nepal’s Forests",
  "The Impact of Deforestation on Local Communities and Ecosystems in Nepal's Mountain Regions",
  "Climate-Resilient Infrastructure and Water Management in Nepal's Urban Areas",
  "Promoting Clean Energy and Reducing Deforestation: Nepal’s Path to Climate Mitigation",
  "Integrating Climate Change Adaptation into Nepal's National Water and Sanitation Policies",
  "Building Resilience in Vulnerable Communities through Sustainable Water Management in Nepal",
  "Sexual and Reproductive Health Rights in the Context of Climate-Driven Disasters in Nepal",
  "The Role of Local Communities in Nepal’s Climate Resilience Strategies",
  "Climate Change, Gender Equality, and Urban Planning in Nepal’s Largest Cities",
  "Assessing Vulnerabilities and Opportunities for Climate-Smart Sanitation Solutions in Nepal",
  "The Role of Nepal’s Forest Resources in Climate Change Mitigation and Adaptation",
  "Building Community Capacity for Disaster Risk Reduction and Climate Adaptation in Nepal",
  "Improving Sanitation and Waste Management in Nepal’s Flood-Prone Areas",
  "Exploring the Intersection of Climate Change and Human Health in Nepal",
  "Sexual and Reproductive Health Policies and Climate Change in Nepal",
  "The Role of Climate-Smart Infrastructure in Ensuring Urban Resilience in Nepal",
  "Water Scarcity, Climate Change, and Sustainable Solutions for Nepal’s Rural Communities",
  "Deforestation, Biodiversity Loss, and Climate Change Adaptation in Nepal",
  "Community-Driven Approaches to Achieving SDG 6: Clean Water and Sanitation in Nepal",
  "The Impacts of Climate Change on Public Health and Sanitation Infrastructure in Nepal",
  "Community-Based Approaches to Improving Sanitation in Climate-Impact Areas of Nepal",
  "Promoting Climate-Smart Water Solutions for Sustainable Development in Nepal",
  "How Urban Planning Can Mitigate the Impacts of Climate Change in Nepal’s Cities",
  "The Impact of Extreme Weather Events on Water Resources and Sanitation Systems in Nepal",
  "Climate Change and the Impact on Food Security in Nepal’s Rural Communities",
  "Adapting Health Systems to Climate Change: Nepal’s Response to Emerging Threats",
  "The Role of Nepal's Indigenous Communities in Climate Action and Conservation",
  "Understanding the Impact of Climate Change on Rural Health Systems and Services in Nepal",
  "Building Climate Resilience through Community-Led Health and Sanitation Programs in Nepal",
  "The Interlinkage Between Climate Change and Urban Sanitation Infrastructure in Nepal",
  "Deforestation and Local Community Livelihoods: Nepal’s Transition to Sustainable Forest Management",
];

const ReportForm = ({
  topic,
  setTopic,
  maxAnalysts,
  setMaxAnalysts,
  feedback,
  setFeedback,
  handleGenerateReport,
  loadingReportGeneration,
  loadingReports,
}) => {
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleReportGeneration = () => {
    setLoadingMessage(
      "Generating Report... It may take some time... Won't work on Firefox"
    );
    handleGenerateReport();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginBottom: 4,
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.02)",
        },
      }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel>Topic (Optional)</InputLabel>
        <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t, index) => (
            <MenuItem key={index} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Max Analysts"
        value={maxAnalysts}
        onChange={(e) => setMaxAnalysts(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
      />

      <TextField
        label="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      {/* Use the GradientButton here */}
      <GradientButton
        onClick={handleReportGeneration} // Trigger report generation
        disabled={loadingReportGeneration || loadingReports} // Disable when loading
      >
        Generate Report
      </GradientButton>

      {/* Show loading spinner and message when report is being generated */}
      {loadingReportGeneration && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 2,
          }}
        >
          <CircularProgress />
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            {loadingMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportForm;
