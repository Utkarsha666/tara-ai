import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Chatbot = ({
  isChatOpen,
  userInput,
  chatHistory,
  isLoadingResponse,
  handleSubmit,
  handleInputChange,
  toggleChat,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: isChatOpen ? "350px" : "60px", // If chat is open, expand to 350px, otherwise 60px for icon
        height: isChatOpen ? "450px" : "60px", // If chat is open, expand to 450px, otherwise 60px for icon
        borderRadius: "15px",
        backgroundColor: "linear-gradient(135deg, #003c5b 0%, #005f7f 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "width 0.3s, height 0.3s",
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        zIndex: 2000,
      }}
    >
      {/* Chatbot Icon when closed */}
      {!isChatOpen && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleChat();
          }}
          style={{
            fontSize: "30px",
            color: "white",
            cursor: "pointer",
          }}
        >
          💬
        </span>
      )}

      {/* Chatbot Container (When open) */}
      {isChatOpen && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f9f9f9",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Chat History */}
          <Box sx={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
            {chatHistory && chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: chat.type === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    marginBottom: "12px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        chat.type === "user" ? "#007bff" : "#e0e0e0",
                      color: chat.type === "user" ? "white" : "black",
                      borderRadius: "20px",
                      padding: "10px 15px",
                      maxWidth: "80%",
                      wordWrap: "break-word",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Check if the message is the typing indicator */}
                    {chat.message === "..." ? (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        Bot is typing...
                      </Typography>
                    ) : (
                      <>
                        <strong>{chat.type === "user" ? "You" : "Bot"}:</strong>{" "}
                        {chat.message}
                      </>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No messages yet...
              </Typography>
            )}
          </Box>

          {/* Input and Submit */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Type your message..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "20px",
                border: "none",
                marginRight: "10px",
              }}
            />
            {isLoadingResponse && <CircularProgress size={24} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chatbot;
