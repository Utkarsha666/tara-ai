import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import emailjs from "emailjs-com";

const ContactForm = ({ handleSnackbar }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_bzmk4mi",
        "template_qvolg1o",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "aNmLxPjG1A9MJQn2a"
      )
      .then(() => {
        handleSnackbar("Email sent successfully!", "success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        handleSnackbar("Failed to send email.", "error");
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: "100%", sm: "60%", md: "50%" },
        margin: "auto",
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: 4,
        marginTop: 4, // Add marginTop for space above
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, marginBottom: 3, textAlign: "center" }}
      >
        Contact Us
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.1rem",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C6BC0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C6BC0",
          },
        }}
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.1rem",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C6BC0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C6BC0",
          },
        }}
        required
        type="email"
      />
      <TextField
        fullWidth
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.1rem",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C6BC0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C6BC0",
          },
        }}
        required
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          padding: "12px 24px",
          borderRadius: 2,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#3f51b5",
          },
        }}
      >
        Send Message
      </Button>
    </Box>
  );
};

export default ContactForm;
