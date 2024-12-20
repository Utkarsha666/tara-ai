import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchChatbotResponse } from "../../utils/api/DashboardAPI";

const ChatbotWrapper = ({ token, username }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const chatbotRef = useRef(null); // Reference to the chatbot container

  // Handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Handle message submission
  const handleSubmit = async () => {
    if (!userInput) return;

    // Check if user is logged in
    if (!token || token.length === 0) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "bot",
          message:
            " 🚫 Looks like you are not logged in to answer your queries",
        },
      ]);
      setUserInput(""); // Clear the input field
      return; // Don't send the message to the chatbot
    }

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", message: userInput },
    ]);
    setUserInput(""); // Clear the input field

    setIsLoadingResponse(true); // Set loading state to true before sending the request

    try {
      const response = await fetchChatbotResponse(token, userInput);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", message: response.answer },
      ]);
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", message: "Sorry, I couldn't understand that." },
      ]);
    } finally {
      setIsLoadingResponse(false); // Set loading state to false after receiving the response
    }
  };

  // Toggle chat visibility
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // Add greeting message when the chatbot opens
  useEffect(() => {
    if (isChatOpen && !hasGreeted) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "bot",
          message: "Hello 👋, How can I assist you?",
        },
      ]);
      setHasGreeted(true);
    }
  }, [isChatOpen, hasGreeted]);

  // Clear chat history if the token is empty (i.e., user logs out)
  useEffect(() => {
    if (!token || token.length === 0) {
      setChatHistory([]); // Clear the chat history if the user logs out
    }
  }, [token]);

  // Handle click outside to minimize the chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsChatOpen(false); // Close chatbot when clicking outside
      }
    };

    // Only add the event listener when the chatbot is open
    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  // Helper function to format markdown and handle newlines, bold, and lists
  const formatMessage = (message) => {
    // Handle emojis by ensuring they're displayed correctly
    let formattedMessage = message;

    // Convert markdown-style bold (**text**) to <strong> tags
    formattedMessage = formattedMessage.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    // Convert markdown-style italics (*text*) to <em> tags
    formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert newline characters to <br /> for line breaks
    formattedMessage = formattedMessage.replace(/\n/g, "<br />");

    // Handle tab characters (\t) by replacing with spaces (for formatting purposes)
    formattedMessage = formattedMessage.replace(
      /\t/g,
      "&nbsp;&nbsp;&nbsp;&nbsp;"
    );

    // Convert markdown-style bullet points (* text) to <ul><li> tags
    formattedMessage = formattedMessage.replace(
      /^\s*\*\s(.*?)$/gm,
      "<ul><li>$1</li></ul>"
    );

    // Convert numbered lists (1. text) to <ol><li> tags
    formattedMessage = formattedMessage.replace(
      /^(\d+)\.\s(.*?)$/gm,
      "<ol><li>$2</li></ol>"
    );

    // Return the formatted message, allowing HTML rendering
    return formattedMessage;
  };

  return (
    <Box position="relative">
      <Box
        ref={chatbotRef}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 350,
          maxWidth: "100%",
          height: 500,
          background: "#fff",
          borderRadius: 8,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          transform: isChatOpen ? "scale(1)" : "scale(0.1)",
          opacity: isChatOpen ? 1 : 0,
          zIndex: 1000,
          overflow: "hidden", // Prevents content from overflowing beyond the chatbot window
        }}
      >
        <Box p={2} display="flex" flexDirection="column" height="100%">
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Chatbot
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    chat.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "80%",
                    padding: 1.5,
                    borderRadius: 12,
                    backgroundColor:
                      chat.type === "user" ? "#007bff" : "#f1f1f1",
                    color: chat.type === "user" ? "white" : "black",
                    wordWrap: "break-word",
                    boxShadow: 4,
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(chat.message),
                    }}
                  />
                </Box>
              </Box>
            ))}

            {/* Show the animated typing dots only if the bot is typing */}
            {isLoadingResponse && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                sx={{
                  position: "absolute",
                  bottom: 20,
                  width: "100%",
                  left: 0,
                }}
              >
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    animation: "typing-dot 1.5s infinite",
                  }}
                />
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    animation: "typing-dot 1.5s infinite 0.2s",
                  }}
                />
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    animation: "typing-dot 1.5s infinite 0.4s",
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Only show the text input if there's no typing indicator */}
          {!isLoadingResponse && (
            <Box component="form" onSubmit={(e) => e.preventDefault()}>
              <TextField
                fullWidth
                variant="outlined"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                sx={{
                  marginBottom: 2,
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#007bff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0056b3",
                  },
                }}
                placeholder="Type a message..."
              />
            </Box>
          )}
        </Box>
      </Box>

      <Button
        onClick={toggleChat}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 70,
          height: 70,
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 4,
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#0056b3",
          },
          fontSize: "45px",
        }}
      >
        💬
      </Button>

      {/* Add Typing Dot Animation using sx prop */}
      <style>
        {`
          @keyframes typing-dot {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default ChatbotWrapper;
