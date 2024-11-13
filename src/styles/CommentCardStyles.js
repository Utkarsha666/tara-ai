// src/components/Community/CommentCard.styles.js
import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar } from "@mui/material";

// Comment Card Wrapper
export const CommentCardWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#eeeeee",
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(2),
}));

// Comment Header: User Info & Date
export const CommentHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

// Comment Content: Text
export const CommentContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontSize: "1rem",
  color: "#333",
}));
