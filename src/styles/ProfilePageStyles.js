const profileStyles = {
  container: {
    padding: 3,
  },
  paper: {
    padding: 3,
    borderRadius: 8,
    background: "linear-gradient(145deg, #f0f4f7, #c9d6e3)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    "&:hover": {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-5px)",
    },
  },
  button: {
    marginTop: 3,
    display: "flex",
    justifyContent: "center",
  },
};

export default profileStyles;
