import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import CircularLoading from "./components/common/CircularLoading";

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

// Import styled components
import {
  Container,
  Title as DashboardTitle,
  DashboardOverview,
  TotalProjectsCard,
  CapacityBuildingCard,
  EventsCard,
  BoxItem,
  ChartContainer,
  StyledPaper,
  PaperTitle,
} from "./styles/ImpactPoints/ImpactPointsStyles";

const ImpactPoints = () => {
  // State to store the total projects and loading state
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch total projects from the API
  useEffect(() => {
    const fetchTotalProjects = async () => {
      try {
        const response = await fetch(
          "https://climate-and-gender-ai.onrender.com/api/project/count",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1dGthcnNoYSIsImV4cCI6MTczMTU4NTcyNn0.EkBh96ggG8wSsTRHHC7RWLXT0EdAAZmslnQOo0FHQBU",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTotalProjects(data);
        } else {
          console.error("Failed to fetch total projects");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalProjects();
  }, []);

  // Mock Data for the Charts (unchanged)
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
    <Container>
      <DashboardTitle variant="h4" gutterBottom>
        Impact Points Dashboard
      </DashboardTitle>

      {/* Show loading sign if data is still being fetched */}
      {loading ? (
        <CircularLoading size={60} message="Loading Data..." />
      ) : (
        <>
          {/* Dashboard Overview Boxes */}
          <DashboardOverview>
            {/* Total Projects Box */}
            <BoxItem>
              <TotalProjectsCard>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  >
                    Total Projects
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {totalProjects} {/* Display the dynamically fetched value */}
                </Typography>
              </TotalProjectsCard>
            </BoxItem>

            {/* Capacity Building Program Box - Set to 0 */}
            <BoxItem>
              <CapacityBuildingCard>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  >
                    Capacity Building Program
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  0 {/* Set the value to 0 for now */}
                </Typography>
              </CapacityBuildingCard>
            </BoxItem>

            {/* Events Box - Set to 0 */}
            <BoxItem>
              <EventsCard>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  >
                    Events
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  0 {/* Set the value to 0 for now */}
                </Typography>
              </EventsCard>
            </BoxItem>
          </DashboardOverview>

          {/* Graphs Section */}
          <ChartContainer>
            {/* Beneficiaries Served Chart */}
            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">
                  Beneficiaries Served Over Time
                </PaperTitle>
                <Line
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    datasets: [
                      {
                        label:
                          "Beneficiaries Served (Gender Equality Projects)",
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
              </StyledPaper>
            </BoxItem>

            {/* Impact Scores by Project Chart */}
            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">Impact Scores by Project</PaperTitle>
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
              </StyledPaper>
            </BoxItem>

            {/* Capacity Building Program Chart */}
            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">
                  Capacity Building Program - Growth
                </PaperTitle>
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
              </StyledPaper>
            </BoxItem>

            {/* Engagement Score Chart */}
            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">Engagement Score Over Time</PaperTitle>
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
              </StyledPaper>
            </BoxItem>
          </ChartContainer>
        </>
      )}
    </Container>
  );
};

export default ImpactPoints;
