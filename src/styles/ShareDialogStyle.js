export const dialogStyles = {
  // Dialog Container with rounded corners and shadow
  dialogContainer: {
    borderRadius: "16px", // Rounded corners for the dialog
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for modern look
  },

  // Dialog Title with gradient color and modern font
  dialogTitle: {
    fontWeight: "bold",
    color: "transparent", // To hide the text color when using gradient
    backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)", // Gradient effect for title
    WebkitBackgroundClip: "text", // Clip the background to text
    backgroundClip: "text",
    fontSize: "1.5rem", // Adjust font size for prominence
  },

  // Dialog content with extra padding for spacing
  dialogContent: {
    paddingTop: "20px", // Increase top padding for better spacing
    paddingBottom: "20px", // Increase bottom padding
  },

  // Styling for TextField components (Title & Content inputs)
  textField: {
    borderRadius: "8px", // Rounded corners for input fields
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px", // Ensure the outline is also rounded
    },
    marginBottom: "12px", // Space between the title and content
  },

  // Dialog Actions (Buttons container)
  dialogActions: {
    padding: "16px", // More padding for spacing between buttons
  },

  // Button styling (Primary and Secondary)
  dialogButton: {
    fontWeight: "bold",
    borderRadius: "12px", // Rounded button corners
    padding: "8px 16px", // Add more padding to buttons for a modern look
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for buttons
    textTransform: "none", // Disable uppercase for more professional look
    fontSize: "1rem", // Adjust font size for readability
    backgroundImage: "linear-gradient(45deg, #ff6e7f, #ff7b8c)", // Gradient effect for buttons
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #ff7b8c, #ff6e7f)", // Reversed gradient on hover
    },
  },

  // Cancel Button with secondary color
  cancelButton: {
    backgroundColor: "#f0f0f0",
    color: "#3f51b5", // Use a calm color for Cancel button
    "&:hover": {
      backgroundColor: "#e0e0e0", // Slight darkening on hover
    },
  },

  // Share Button with primary gradient color
  shareButton: {
    backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)", // Gradient color for Share button
    color: "white", // Ensure text color is white on gradient background
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #2575fc, #6a11cb)", // Reverse gradient on hover
    },
  },
};
