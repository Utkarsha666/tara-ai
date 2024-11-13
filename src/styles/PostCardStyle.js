import { styled } from "@mui/material/styles";
import { Box, Typography, TextareaAutosize, Button } from "@mui/material";

// Post Card Wrapper
export const PostCardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  background: "#fff", // Lighter gradient
  borderRadius: "6%", // Rounded corners for the entire post card
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  maxWidth: "750px",
  width: "100%",
  margin: "20px auto",
  overflow: "hidden", // Important to ensure border-radius is respected
  boxSizing: "border-box", // Ensures padding is within the dimensions
  "&:hover": {
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.02)",
  },
  "& .MuiAvatar-root": {
    borderRadius: "50%", // Ensure avatars are round too
  },
}));

// Post Header Section: Title, Author & Time
export const PostHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(1.5),
}));

export const PostTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.7rem", // Larger and bolder font for better readability
  color: "#000", // Black text for visibility
  lineHeight: 1.4,
  marginBottom: theme.spacing(1),
}));

// Post User Time Section (Author and Date alignment)
export const PostUserTime = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "0.9rem",
  color: "#555", // Darker grey for readability
  opacity: 0.8,
}));

// Avatar Section
export const AvatarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const Avatar = styled("img")({
  width: "50px", // Slightly larger avatar
  height: "50px",
  borderRadius: "50%", // Fully rounded avatar
  objectFit: "cover",
  marginRight: "12px", // More space between avatar and text
});

// Post Content Section
// Post Content Section
export const PostContent = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: "#000", // Black text for better contrast
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
  letterSpacing: "0.5px",
  display: "-webkit-box", // Enables multi-line truncation
  overflow: "hidden", // Hides the overflowed text
  WebkitBoxOrient: "vertical", // Ensures the text truncation works on multi-line
  WebkitLineClamp: 30, // Limits content to 6 lines (adjust this number to your preference)
  textOverflow: "ellipsis", // Adds ellipsis when content is truncated
  wordWrap: "break-word", // Ensures long words break and wrap correctly
}));

// Comment Section
export const CommentsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1),
  borderTop: "0.5px solid #ddd", // Subtle grey line to separate comments
}));

// Input for Adding Comments
export const CommentInput = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: "16px", // Rounded input field
  border: "1px solid #ddd", // Light border
  backgroundColor: "#fff", // White background for input
  fontSize: "1rem",
  lineHeight: 1.6,
  minHeight: "60px",
  resize: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
  "&:focus": {
    borderColor: "#6a1b9a", // Purple border on focus
    boxShadow: "0px 0px 8px rgba(106, 27, 154, 0.3)",
    outline: "none",
  },
  "&::placeholder": {
    color: "#aaa",
    fontStyle: "italic",
  },
}));

// Comment Button with Purple Gradient
export const CommentButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: "linear-gradient(135deg, #9c27b0, #ab47bc)",
  color: "#fff",
  fontWeight: 600,
  borderRadius: "50%", // More rounded button
  padding: theme.spacing(1.5, 3),
}));
