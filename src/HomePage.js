import React, { useContext, useState } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Carousel from "react-material-ui-carousel";
import GradientButton from "./components/common/Button";

// Common styles for boxes
const commonBoxStyles = {
  display: "flex",
  alignItems: "center",
  marginY: 4,
  padding: 3,
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(145deg, #f0f4f7, #c9d6e3)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-5px)",
  },
};

const HomePage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const images = [
    require("./assets/images/homepage.png"),
    require("./assets/images/homepage2.png"),
    require("./assets/images/homepage3.png"),
  ];

  const [loading, setLoading] = useState(true);

  return (
    <Box sx={{ backgroundColor: "#ffffff", borderRadius: 8 }}>
      <Container maxWidth="ld">
        {/* Carousel for Banner Images */}
        <Carousel
          sx={{
            height: "400px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: 8,
          }}
          indicators={true}
          autoPlay={true}
          interval={5000}
          navButtonsAlwaysVisible
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: 8,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                height: "400px",
              }}
            >
              {loading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    color: "white",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.9,
                }}
                onLoad={() => setLoading(false)}
              />
              {/* Overlay for Login Button */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  color: "white",
                  padding: 2,
                  backdropFilter: "blur(0px)",
                }}
              >
                <GradientButton
                  loading={false}
                  onClick={isLoggedIn ? logout : () => {}}
                  component={isLoggedIn ? "button" : Link}
                  to={!isLoggedIn ? "/login" : undefined}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </GradientButton>
              </Box>
            </Box>
          ))}
        </Carousel>

        {/* Information Text Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            padding: 3,
            marginTop: 2,
            borderRadius: 8,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            color: "white",
            textAlign: "center",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              transform: "translateY(-5px)",
            },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Welcome to TARA – Your AI-Powered Project Management Solution{" "}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            TARA is an all-in-one platform designed to supercharge your project
            management and decision-making. With its AI-driven tools, you can
            manage projects, collaborate seamlessly, track performance, and make
            smarter decisions—faster.
          </Typography>
        </Box>

        {/* Content Sections */}
        <Box sx={{ padding: 4, fontFamily: "Montserrat, sans-serif" }}>
          {/* Tara Section */}
          <ContentBox
            image={require("./assets/images/Tara-Logo.png")}
            title="Tara: The AI-Driven Advocate for Social Change"
            text={
              <>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  TARA’s AI-powered Research Assistant,{" "}
                </Typography>
                provides actionable recommendations based on current trends and
                insights. It helps you stay informed and generate customized
                reports to maximize impact and drive effective outcomes.
              </>
            }
            imageFirst={true}
          />

          {/* Data-Driven Insights */}
          <ContentBox
            image={require("./assets/images/engagement.png")}
            title="Data-Driven Insights"
            text={
              <>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  The Chatbot Assistance
                </Typography>{" "}
                quickly answers your questions by accessing an up-to-date
                knowledge base. Users can easily manage content by adding or
                removing documents to keep information accurate and accessible.
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold" }}
                ></Typography>
              </>
            }
            imageFirst={false}
          />

          {/* Building Climate-Resilient Communities */}
          <ContentBox
            image={require("./assets/images/join-us.png")}
            title="Building Climate-Resilient Communities"
            text={
              <>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  The TARA Collaboration Hub
                </Typography>{" "}
                is a platform for seamless communication and collaboration. Form
                teams, join channels, share updates, and engage in discussions,
                all in one place, to drive collective action and work towards
                sustainable solutions.
              </>
            }
            imageFirst={true}
          />

          {/* Impact */}
          <ContentBox
            image={require("./assets/images/impact.png")}
            title="Impact Dashboard for Climate Action"
            text={
              <>
                TARA streamlines{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  project management and M&E{" "}
                </Typography>
                with easy-to-use project cards, real-time tracking, and
                automated impact reporting. Stay aligned and make data-driven
                decisions with transparent insights throughout the project.
              </>
            }
            imageFirst={false}
          />

          {/* Resources */}
          <ContentBox
            image={require("./assets/images/resources.png")}
            title="Impact Dashboard for Climate Action"
            text={
              <>
                The{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Resource Hub{" "}
                </Typography>
                is an intuitive platform that helps you organize work-related
                documents with ease. Create folders, upload various file types
                (images, PDFs, and more), and navigate resources effortlessly
                through a user-friendly interface.
              </>
            }
            imageFirst={true}
          />
        </Box>
      </Container>
    </Box>
  );
};

// Content Box component for each section
const ContentBox = ({ image, title, text, imageFirst }) => (
  <Box
    sx={{
      ...commonBoxStyles,
      flexDirection: imageFirst ? "row-reverse" : "row",
    }}
  >
    {/* Image Box */}
    <Box
      sx={{
        width: "40%",
        borderRadius: 20,
        overflow: "hidden",
        marginRight: imageFirst ? 0 : 3,
        marginLeft: imageFirst ? 3 : 0,
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>

    {/* Text Box */}
    <Box sx={{ width: "60%", textAlign: imageFirst ? "right" : "left" }}>
      <Typography>{text}</Typography>
    </Box>
  </Box>
);

export default HomePage;
