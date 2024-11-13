import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ImpactPoints = () => {
  // Mock Data for the Charts
  const totalReports = 50;
  const capacityBuildingData = [10, 15, 20, 25, 30, 35, 40];
  const engagementScoreData = [5, 12, 18, 25, 30, 28, 33];

  // Beneficiaries Served Data
  const beneficiariesData = [15, 25, 35, 30, 50];
  const climateBeneficiariesData = [5, 10, 20, 15, 25];

  // Impact Scores by Project Data
  const impactScores = [70, 65, 70, 50];
  const impactProjects = [
    "Women Empowerment",
    "Climate Resilience",
    "Education",
    "Health",
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Impact Points Dashboard
      </Typography>

      {/* Dashboard Overview Boxes */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
          marginBottom: 3,
        }}
      >
        {/* Total Projects Box */}
        <Box sx={{ flex: 1, minWidth: "220px" }}>
          <Paper
            sx={{
              padding: "20px",
              background: "linear-gradient(to right, #8e44ad, #3498db)", // Gradient background
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
                Total Projects
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff" }}>
              {totalReports}
            </Typography>
          </Paper>
        </Box>

        {/* Capacity Building Program Box */}
        <Box sx={{ flex: 1, minWidth: "220px" }}>
          <Paper
            sx={{
              padding: "20px",
              background: "linear-gradient(to right, #f39c12, #e74c3c)", // Gradient background
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
                Capacity Building Program
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff" }}>
              15
            </Typography>
          </Paper>
        </Box>

        {/* Events Box */}
        <Box sx={{ flex: 1, minWidth: "220px" }}>
          <Paper
            sx={{
              padding: "20px",
              background: "linear-gradient(to right, #3498db, #2ecc71)", // Gradient background
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
                Events
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff" }}>
              20
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Graphs Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Two columns
          gap: 3,
          marginBottom: 3,
        }}
      >
        {/* Beneficiaries Served Chart */}
        <Box>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Beneficiaries Served Over Time
            </Typography>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                  {
                    label: "Beneficiaries Served (Gender Equality Projects)",
                    data: beneficiariesData,
                    fill: false,
                    borderColor: "#8e44ad",
                    borderWidth: 3,
                    tension: 0.4,
                  },
                  {
                    label: "Beneficiaries Served (Climate Change Projects)",
                    data: climateBeneficiariesData,
                    fill: false,
                    borderColor: "#2ecc71",
                    borderWidth: 3,
                    tension: 0.4,
                  },
                ],
              }}
            />
          </Paper>
        </Box>

        {/* Impact Scores by Project Chart */}
        <Box>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Impact Scores by Project
            </Typography>
            <Bar
              data={{
                labels: impactProjects,
                datasets: [
                  {
                    label: "Impact Score",
                    data: impactScores,
                    backgroundColor: [
                      "#8e44ad",
                      "#2ecc71",
                      "#f39c12",
                      "#3498db",
                    ],
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.6,
                  },
                ],
              }}
            />
          </Paper>
        </Box>

        {/* Capacity Building Program Chart */}
        <Box>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Capacity Building Program - Growth
            </Typography>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Capacity Building Program",
                    data: capacityBuildingData,
                    fill: false,
                    borderColor: "#f39c12",
                    borderWidth: 3,
                    tension: 0.4,
                  },
                ],
              }}
            />
          </Paper>
        </Box>

        {/* Engagement Score Chart */}
        <Box>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Engagement Score Over Time
            </Typography>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Engagement Score",
                    data: engagementScoreData,
                    fill: false,
                    borderColor: "#3498db",
                    borderWidth: 3,
                    tension: 0.4,
                  },
                ],
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ImpactPoints;
