import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography, Table, TableBody, TableRow } from "@mui/material";
import CircularLoading from "./components/common/CircularLoading";
import { AuthContext } from "./AuthContext";
import { CheckCircle, HelpOutline } from "@mui/icons-material";
import {
  fetchTotalProjects,
  fetchCapacityBuildingPrograms,
  fetchTeamData,
  fetchStatusData,
  fetchTimeTrackingData,
  fetchImpactScoreData,
} from "./utils/api/ImpactPointsAPI.js";

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
  TableHeader,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  TableTitle,
  StatusCell,
} from "./styles/ImpactPoints/ImpactPointsStyles";

const ImpactPoints = () => {
  // Use the AuthContext to get the token
  const { token } = useContext(AuthContext);

  // State to store the total projects, team data, and loading state
  const [totalProjects, setTotalProjects] = useState(0);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState({
    Ongoing: 0,
    Completed: 0,
    Pending: 0,
  });
  const [capacityBuildingPrograms, setCapacityBuildingPrograms] = useState(0);
  const [timeTrackingData, setTimeTrackingData] = useState(null);
  const [impactScoreData, setImpactScoreData] = useState(null);

  // Prepare the data for impact score chart
  const ongoingProjects =
    impactScoreData?.projects.filter(
      (project) => project.status === "Ongoing"
    ) || [];

  // Extract the impact scores and project names for ongoing projects
  const impactScores = ongoingProjects.map((project) => project.impactScore);
  const impactProjectNames = ongoingProjects.map(
    (project) => project.projectName
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          // Fetch all the data concurrently using Promise.all
          const [
            projectsData,
            capacityData,
            teamDataResult,
            statusDataResult,
            timeTrackingDataResult,
            impactScoreDataResult,
          ] = await Promise.all([
            fetchTotalProjects(token),
            fetchCapacityBuildingPrograms(token),
            fetchTeamData(token),
            fetchStatusData(token),
            fetchTimeTrackingData(token),
            fetchImpactScoreData(token),
          ]);

          // Set the fetched data into state
          setTotalProjects(projectsData);
          setCapacityBuildingPrograms(capacityData);
          setTeamData(teamDataResult);
          setStatusData(statusDataResult);
          setTimeTrackingData(timeTrackingDataResult);
          setImpactScoreData(impactScoreDataResult);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Team Distribution Data
  const teamLabels = teamData
    ? Object.keys(teamData["Team Distribution by Project"])
    : [];
  const teamDistribution = teamData
    ? Object.values(teamData["Team Distribution by Project"])
    : [];

  // Prepare data for visualization (filter out completed projects)
  const projectNames = Object.keys(
    timeTrackingData?.["Time Tracking by Project"] || {}
  ).filter(
    (project) =>
      timeTrackingData["Time Tracking by Project"][project]?.status ===
      "Ongoing"
  );

  // Prepare the data for each bar in the chart
  const elapsedTimes = projectNames.map((project) =>
    Math.max(
      0,
      timeTrackingData["Time Tracking by Project"][project]?.elapsedTime || 0
    )
  );
  const remainingTimes = projectNames.map((project) =>
    Math.max(
      0,
      timeTrackingData["Time Tracking by Project"][project]?.remainingTime || 0
    )
  );
  const totalTimesSpent = projectNames.map((project) =>
    Math.max(
      0,
      timeTrackingData["Time Tracking by Project"][project]?.totalTimeSpent || 0
    )
  );

  // Function to return the icon based on the status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <CheckCircle />;
      case "Completed":
        return <CheckCircle />;
      case "Pending":
        return <HelpOutline />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <DashboardTitle variant="h4" gutterBottom>
        M&E Dashboard
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
                  {capacityBuildingPrograms}
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
            {/* Team Distribution Chart */}
            {teamData && (
              <BoxItem>
                <StyledPaper>
                  <PaperTitle variant="h6">
                    Team Distribution by Project (Ongoing)
                  </PaperTitle>
                  <Bar
                    data={{
                      labels: teamLabels, // Project names on the X-axis
                      datasets: [
                        {
                          label: "Team", // Label for the dataset
                          data: teamDistribution, // Team distribution data
                          backgroundColor: [
                            "#8e44ad",
                            "#2ecc71",
                            "#f39c12",
                            "#3498db",
                          ], // Custom colors for the bars
                          borderRadius: 12,
                          borderSkipped: false,
                          barPercentage: 0.6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false, // Disable the legend display
                        },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return `Team Members: ${tooltipItem.raw}`; // Customize the tooltip to show number of team members
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Projects", // Label for the X-axis
                          },
                          ticks: {
                            display: false, // Hide the project names on the X-axis
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "No of Team Members", // Label for the Y-axis
                          },
                          beginAtZero: true, // Ensure the Y-axis starts at 0
                        },
                      },
                    }}
                  />
                </StyledPaper>
              </BoxItem>
            )}
            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">Project Status</PaperTitle>
                <Bar
                  data={{
                    labels: ["Ongoing", "Completed", "Pending"], // The status labels (Ongoing, Completed, Pending)
                    datasets: [
                      {
                        label: "Status", // Single label for the legend
                        data: [
                          statusData.Ongoing, // Data for Ongoing
                          statusData.Completed, // Data for Completed
                          statusData.Pending, // Data for Pending
                        ],
                        backgroundColor: [
                          "#8e44ad", // Color for Ongoing
                          "#2ecc71", // Color for Completed
                          "#f39c12", // Color for Pending
                        ],
                        borderRadius: 12,
                        borderSkipped: false,
                        barPercentage: 0.6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Status",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Number of Projects", // y-axis label
                        },
                        beginAtZero: true, // Ensure the y-axis starts from 0
                      },
                    },
                  }}
                />
              </StyledPaper>
            </BoxItem>

            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">
                  Time Tracking by Project (Ongoing)
                </PaperTitle>

                <Bar
                  data={{
                    labels: projectNames, // Project names on the X-axis
                    datasets: [
                      {
                        label: "Elapsed Time (days)", // Label for the first dataset
                        data: elapsedTimes, // Elapsed times for each project
                        backgroundColor: "rgba(255, 99, 132, 0.6)", // Color for the bars (red)
                        stack: "stack1", // Stack group for the dataset
                        borderRadius: 12,
                        borderSkipped: false,
                        barPercentage: 0.6,
                      },
                      {
                        label: "Remaining Time (days)", // Label for the second dataset
                        data: remainingTimes, // Remaining times for each project
                        backgroundColor: "rgba(54, 162, 235, 0.6)", // Color for the bars (blue)
                        stack: "stack2", // Stack group for the dataset
                        borderRadius: 12,
                        borderSkipped: false,
                        barPercentage: 0.6,
                      },
                      {
                        label: "Time Spent (days)", // Label for the third dataset
                        data: totalTimesSpent, // Total time spent for each project
                        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for the bars (green)
                        stack: "stack3", // Stack group for the dataset
                        borderRadius: 12,
                        borderSkipped: false,
                        barPercentage: 0.6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Time Tracking by Project (Ongoing)", // Title for the chart
                      },
                      legend: {
                        position: "top", // Position of the legend
                        labels: {
                          boxWidth: 20, // Size of the legend box
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} days`; // Custom tooltip content
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Projects", // Label for the X-axis
                        },
                        ticks: {
                          display: false, // Hide the project names on the X-axis
                        },
                        grid: {
                          display: false, // Hide grid lines for X-axis
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Time (days)", // Label for the Y-axis
                        },
                        beginAtZero: true, // Ensure the Y-axis starts at 0
                        stacked: true, // Enable stacking of bars
                      },
                    },
                  }}
                />
              </StyledPaper>
            </BoxItem>

            <BoxItem>
              <StyledPaper>
                <PaperTitle variant="h6">
                  Impact Scores by Project (Ongoing)
                </PaperTitle>

                <Bar
                  data={{
                    labels: impactProjectNames,
                    datasets: [
                      {
                        label: "Impact Score",
                        data: impactScores,
                        backgroundColor: "rgba(255, 159, 64, 0.6)",
                        borderRadius: 12,
                        borderSkipped: false,
                        barPercentage: 0.6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: false,
                      },
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        // Tooltip configuration remains enabled to show details on hover
                        callbacks: {
                          label: function (tooltipItem) {
                            return `Impact Score: ${tooltipItem.raw}`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Projects",
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Impact Score",
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </StyledPaper>
            </BoxItem>
          </ChartContainer>

          <Box sx={{ padding: 2, borderRadius: 8 }}>
            <TableTitle variant="h5" gutterBottom>
              Projects
            </TableTitle>

            {impactScoreData &&
            impactScoreData.projects &&
            impactScoreData.projects.length > 0 ? (
              <StyledTableContainer component={StyledPaper}>
                <Table aria-label="impact scores table">
                  <TableHeader>
                    <TableRow>
                      <StyledTableCell>Project Name</StyledTableCell>
                      <StyledTableCell>Impact Score</StyledTableCell>
                      <StyledTableCell>Completed</StyledTableCell>
                      <StyledTableCell>% Completed</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {impactScoreData.projects.map((project, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{project.projectName}</StyledTableCell>
                        <StyledTableCell>{project.impactScore}</StyledTableCell>
                        <StyledTableCell>
                          {project.completedObjectives}/
                          {project.totalObjectives}
                        </StyledTableCell>
                        <StyledTableCell>
                          {project.completionPercentage.toFixed(2)}%
                        </StyledTableCell>
                        <StatusCell status={project.status}>
                          {getStatusIcon(project.status)}
                          {project.status}
                        </StatusCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Typography>No data available</Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default ImpactPoints;
