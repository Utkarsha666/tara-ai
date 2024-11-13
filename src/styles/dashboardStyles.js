// styles/dashboardStyles.js

export const loadingBoxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
};

export const graphContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "20px",
  gap: "20px",
};

export const paperStyles = {
  flex: 1,
  backgroundColor: "#fff",
  padding: 2,
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.02)",
  },
};

export const selectContainerStyles = {
  position: "relative",
  zIndex: 1000,
  marginBottom: 2,
};

export const relationSelectorStyles = {
  control: (base) => ({
    ...base,
    padding: "5px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    boxRadius: 8,
    zIndex: 1000,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 1000,
  }),
};

export const chatbotBoxStyles = (isChatOpen) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  width: isChatOpen ? "350px" : "60px",
  height: isChatOpen ? "450px" : "60px",
  borderRadius: "15px",
  backgroundColor: "#007bff",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "width 0.3s, height 0.3s",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  zIndex: 2000,
});
