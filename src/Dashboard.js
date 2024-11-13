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
import Chatbot from "./components/Dashboard/Chatbot";
import { Box, Typography } from "@mui/material";

// Importing CircularLoading component
import CircularLoading from "./components/common/CircularLoading"; // Import CircularLoading

import {
  graphContainerStyles,
  chatbotBoxStyles,
} from "./styles/dashboardStyles";
import { fetchChatbotResponse } from "./utils/api/DashboardAPI"; // Import the chatbot API function

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [climateData, setClimateData] = useState([]);
  const [giiData, setGiiData] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [selectedRelation, setSelectedRelation] = useState("CAUSES");
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chatbot visibility
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]); // Initialize chat history
  const [userInput, setUserInput] = useState(""); // Initialize user input
  const [isLoadingResponse, setIsLoadingResponse] = useState(false); // Track if response is loading
  const [hasGreeted, setHasGreeted] = useState(false); // State to track if the greeting message has been shown

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Fetch graph data when selectedRelation changes
  useEffect(() => {
    const fetchGraph = async () => {
      if (!token) return;

      try {
        const graph = await fetchGraphData(token, selectedRelation);
        setGraphData(graph);
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setError("Failed to load graph data. Please try again later.");
      }
    };

    fetchGraph();
  }, [token, selectedRelation]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////// Chatbot Utility /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  // Handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Handle message submission
  const handleSubmit = async () => {
    if (!userInput) return;

    // Add user message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", message: userInput },
    ]);
    setUserInput(""); // Clear the input field

    setIsLoadingResponse(true);

    // Add a bot "typing" message to simulate the typing indicator
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "bot", message: "..." }, // Typing indicator
    ]);

    try {
      // Fetch chatbot response
      const response = await fetchChatbotResponse(token, userInput);

      // Update chat history with the response and remove the "typing" message
      setChatHistory((prevHistory) => [
        ...prevHistory.filter((chat) => chat.message !== "..."), // Remove typing indicator
        { type: "bot", message: response.answer },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);

      // Remove typing indicator and show error message
      setChatHistory((prevHistory) => [
        ...prevHistory.filter((chat) => chat.message !== "..."),
        { type: "bot", message: "Sorry, I couldn't understand that." },
      ]);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  // Toggle chat visibility
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // Handle click outside the chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the chatbot container, close it
      const chatbotContainer = document.getElementById("chatbot-container");
      if (chatbotContainer && !chatbotContainer.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  // Add the bot greeting message only once when the chat is opened
  useEffect(() => {
    if (isChatOpen && !hasGreeted) {
      // Add bot's greeting message when the chatbot is opened
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "bot",
          message:
            "Hello, Currently my knowledge is limited on only Climate Change and Gender Inequality in Nepal",
        },
      ]);
      setHasGreeted(true); // Set the greeting flag to true
    }
  }, [isChatOpen, hasGreeted]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          padding: 3,
        }}
      >
        {/* Use CircularLoading component here instead of CircularProgress */}
        <CircularLoading
          size={60}
          color="primary"
          message="Loading Dashboard..."
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        <ClimateGraph data={climateData} />
        <GiiGraph data={giiData.data} />
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

        <RelationshipVisualizer
          nodes={graphData.nodes}
          edges={graphData.edges}
        />
      </Box>

      {/* Chatbot Component */}
      <Box
        sx={chatbotBoxStyles(isChatOpen)}
        onClick={(e) => e.stopPropagation()} // Prevent closing on clicks inside chatbot
      >
        <div id="chatbot-container">
          <Chatbot
            isChatOpen={isChatOpen}
            toggleChat={toggleChat}
            chatHistory={chatHistory} // Pass chat history here
            userInput={userInput} // Pass user input here
            isLoadingResponse={isLoadingResponse} // Pass loading state here
            handleInputChange={handleInputChange} // Handle input change here
            handleSubmit={handleSubmit} // Handle message submission here
          />
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
