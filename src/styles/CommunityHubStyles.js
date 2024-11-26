// src/styles/CommunityHubStyles.js

export const bannerImageStyle = {
  width: "100%",
  height: 300,
  backgroundImage: `url(${require("../assets/images/community-2.png")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: 12,
  marginBottom: 3,
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: 14,
  },
};

export const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
  gap: 1,
  marginBottom: 4,
  marginTop: 3,
  flexWrap: "wrap", // Allow wrapping on smaller screens
  "@media (max-width: 600px)": {
    justifyContent: "center", // Center content on smaller screens
    gap: 1, // Less gap on smaller screens
  },
};

export const cardStyles = {
  background: "linear-gradient(145deg, #f0f4f7, #c9d6e3)",
  borderRadius: 12,
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  width: "220px",
  padding: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  },
};

export const centeredCardStyles = {
  background: "linear-gradient(145deg, #f0f4f7, #c9d6e3)",
  borderRadius: 12,
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  width: "220px",
  padding: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  margin: "0 auto", // Center it horizontally
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  },
};

export const buttonStyles = {
  background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
  color: "white",
  borderRadius: 25,
  padding: "12px 30px",
  textTransform: "none",
  fontWeight: 600,
  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #5c6bc0, #3f51b5)",
    transform: "scale(1.05)",
    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
  },
};

export const titleStyle = {
  fontSize: "2rem", // Increased font size for better prominence
  fontWeight: 400, // Bolder weight for emphasis
  color: "#333",
  textAlign: "center",
  marginTop: "3rem", // Increased margin top to push it further down
  marginBottom: "2.5rem", // A little more space after the title
  letterSpacing: "1px", // Slight spacing between letters for a modern touch
};

export const errorStyle = {
  color: "red",
  fontWeight: 600,
};

export const loadingStyle = {
  textAlign: "center",
  marginTop: "2rem",
};
