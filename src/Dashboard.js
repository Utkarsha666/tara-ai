import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
  fetchClimateData,
  fetchGiiData,
  fetchGraphData,
} from "./utils/api/DashboardAPI";
import ClimateGraph from "./components/Dashboard/ClimateGraph";
import GiiGraph from "./components/Dashboard/GiiGraph";
import RelationshipVisualizer from "./components/Dashboard/RelationshipVisualizer";
import SelectRelation from "./components/Dashboard/SelectRelation";
import { Box, Typography } from "@mui/material";

// Importing CircularLoading component
import CircularLoading from "./components/common/CircularLoading";

// Importing SuccessSnackbar
import SuccessSnackbar from "./components/common/SuccessSnackbar";

import { graphContainerStyles } from "./styles/dashboardStyles";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [climateData, setClimateData] = useState([]);
  const [giiData, setGiiData] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [selectedRelation, setSelectedRelation] = useState("CAUSES");
  const [isLoading, setIsLoading] = useState(true); // Loading state for data
  const [isGraphLoading, setIsGraphLoading] = useState(true); // Loading state for graphs

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const relations = [
    "Effects",
    "CAUSES",
    "Integrates",
    "Damages",
    "Effected-By",
    "Impact",
    "Applies-To",
    "Funds",
    "Contributes",
    "Developed",
    "Governing",
    "Specifies",
    "Promotes",
  ];

  // Fetch climate and Gii data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const climate = await fetchClimateData(token);
        const gii = await fetchGiiData(token);
        console.log("Gii Data fetched:", gii.data);

        setClimateData(climate);
        setGiiData(gii);
        setIsLoading(false); // Data loading complete
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Data loading complete
        setSnackbarMessage(
          "Failed to load Climate and Gii Data. Please try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, [token]);

  // Fetch graph data when selectedRelation changes
  useEffect(() => {
    const fetchGraph = async () => {
      if (!token) return;

      setIsGraphLoading(true); // Start loading the graph

      try {
        const graph = await fetchGraphData(token, selectedRelation);
        setGraphData(graph);
        setIsGraphLoading(false); // Graph data loaded
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setIsGraphLoading(false); // Graph loading complete even in case of error
        setSnackbarMessage("Failed to load graph data. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchGraph();
  }, [token, selectedRelation]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: "#fff",
      }}
    >
      {/* Graph Container */}
      <Box sx={graphContainerStyles}>
        {/* Show Circular Loading when data is loading */}
        {isLoading ? (
          <CircularLoading message="Loading Climate and Gii Data..." />
        ) : (
          <>
            <ClimateGraph data={climateData} isLoading={isLoading} />
            <GiiGraph data={giiData.data} isLoading={isLoading} />
          </>
        )}
      </Box>

      {/* Relationship Visualizer */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "md",
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          marginTop: 3,
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
            transform: "scale(1.02)",
          },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Relationship Visualizer
        </Typography>

        <SelectRelation
          relations={relations}
          selectedRelation={selectedRelation}
          onSelectRelation={setSelectedRelation}
        />

        {/* Show Circular Loading when graph data is loading */}
        {isGraphLoading ? (
          <CircularLoading message="Loading Graph Data..." />
        ) : (
          <RelationshipVisualizer
            nodes={graphData.nodes}
            edges={graphData.edges}
          />
        )}
      </Box>

      {/* SuccessSnackbar for error message */}
      <SuccessSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default Dashboard;
