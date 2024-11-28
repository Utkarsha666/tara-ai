// styles/AppStyles.js

const appStyles = {
  appBar: {
    position: "fixed",
  },
  toolbar: {
    height: "70px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "110px",
    width: "auto",
    objectFit: "contain",
    marginRight: "10px",
  },
  logoutButton: {
    fontSize: "16px",
    fontWeight: "bold",
    background: (theme) => theme.palette.primary.main, // Use the primary color from the theme
    borderRadius: "8px",
    padding: "8px 16px",
    "&:hover": {
      background: (theme) => theme.palette.secondary.main, // Use the secondary color from the theme
      transform: "scale(1.05)",
      transition: "all 0.3s ease",
    },
  },
  sidebar: {
    position: "fixed",
    top: "60px",
    left: 0,
    width: "200px",
    height: "calc(100% - 70px)",
    background: (theme) => theme.palette.primary.main,
    color: "white",
    padding: 2,
    boxShadow: 3,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: "12px",
  },
  listItem: {
    color: "#D3D3D3",
    paddingLeft: "16px",
    paddingY: "12px",
    "&:hover": {
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
      transform: "scale(1.05)",
      transition: "all 0.3s ease",
    },
  },
  listItemText: {
    fontSize: "16px",
    fontWeight: "500",
    marginLeft: "12px",
  },
  manageMenu: {
    color: "#D3D3D3",
    display: "flex",
    alignItems: "center",
    paddingY: "12px",
    "&:hover": {
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
      transform: "scale(1.05)",
      transition: "all 0.3s ease",
    },
  },
  manageMenuIcon: {
    color: "#D3D3D3",
    minWidth: "25px",
  },
  menu: {
    marginTop: "0px",
    "& .MuiPaper-root": {
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    },
  },
  aboutMenuItem: {
    color: "#D3D3D3",
    paddingLeft: "16px",
    paddingY: "12px",
    "&:hover": {
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
      transform: "scale(1.05)",
      transition: "all 0.3s ease",
    },
  },
  accountIcon: {
    color: "white",
    fontSize: "35px",
  },
  container: {
    flex: 1,
    padding: 2,
    marginLeft: "250px",
  },
};

export default appStyles;
