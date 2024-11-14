import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import ContactForm from "./components/About/ContactForm";
import VideoEmbed from "./components/About/VideoEmbed";
import AlertSnackbar from "./components/common/AlertSnackbar";
import TaraLogo from "./assets/images/Tara-Logo.png";

const About = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <VideoEmbed />

      {/* Profile Section */}
      <Box sx={styles.profileBox}>
        <Box
          component="img"
          src={TaraLogo}
          alt="Tara Logo"
          sx={styles.profileImage}
        />
        <Box>
          <Typography variant="h5" sx={styles.profileName}>
            Tara
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI-Powered Advocate for Social Change
          </Typography>
          <Typography variant="body2" sx={styles.quote}>
            {" "}
            "Empowering voices for positive change."{" "}
          </Typography>
        </Box>
      </Box>

      {/* About Tara Section */}
      <Box sx={styles.aboutBox}>
        <Typography variant="h3" sx={styles.title}>
          Empowering Climate Action with Tara
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 3,
            lineHeight: 1.8,
            fontSize: "1.15rem",
            color: "#333333",
            maxWidth: "800px",
            fontFamily: "Roboto, sans-serif",
            textAlign: "center",
          }}
        >
          Tara is more than just an AI—she’s a climate advocate focused on
          building resilience and driving gender-responsive solutions in Nepal.
          Using the latest trends and AI tools, Tara helps communities tackle
          climate challenges, track their impact, and manage projects for a
          sustainable future. Tara’s mission is simple: empower communities,
          promote gender equality, and drive data-informed, impactful climate
          action.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 4,
            lineHeight: 1.8,
            fontSize: "1.15rem",
            color: "#333333", // Keeping the body text in dark gray
            maxWidth: "800px",
            fontFamily: "Roboto, sans-serif",
            textAlign: "center",
          }}
        >
          With advanced AI tools, Tara transforms complex climate data into
          actionable insights, supporting policy innovation, local empowerment,
          and collaborative climate solutions. The Tara community hub is a space
          where connection meets compassion—where Tara learns from local voices,
          integrates emerging trends, and adapts to the needs of the people she
          serves. Tara is more than a tool; she’s a trusted partner in building
          a resilient, sustainable Nepal, driven by compassion, innovation, and
          collective action.
        </Typography>

        <Box sx={{ marginTop: 3 }}>
          <img src={TaraLogo} alt="Climate Action" style={styles.logoImage} />
        </Box>
      </Box>

      {/* Contact Us Form */}
      <ContactForm handleSnackbar={handleSnackbar} />

      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
};

const styles = {
  profileBox: {
    display: "flex",
    alignItems: "center",
    marginTop: 4,
    padding: 3,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    marginBottom: 4,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-5px)",
    },
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginRight: 2,
  },
  profileName: {
    fontWeight: 700,
    color: "#1e3a8a",
  },
  quote: {
    marginTop: 1,
  },
  aboutBox: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 4,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    marginBottom: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "900px",
    margin: "0 auto",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-5px)",
    },
  },
  title: {
    fontWeight: 700,
    color: "#1e3a8a",
    marginBottom: 2,
    fontSize: "2.8rem",
    lineHeight: 1.4,
  },
  description: {
    marginBottom: 3,
    lineHeight: 1.8,
    fontSize: "1.15rem",
    color: "#333333",
    maxWidth: "800px",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
  },
  logoImage: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    borderRadius: "50%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
  },
};

export default About;
