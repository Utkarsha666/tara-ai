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
            Empowering Climate Action with Tara
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Tara, an AI-powered climate advocate inspired by the Buddhist
            Goddess, uses the latest trends and data to drive gender-responsive
            climate action in Nepal. With an intuitive dashboard, interactive
            chatbot, and community hub, Tara empowers users to brainstorm,
            manage projects, track impact, and generate reports, creating
            sustainable solutions for building resilient, climate-friendly
            communities.
          </Typography>
        </Box>

        {/* Content Sections */}
        <Box sx={{ padding: 4, fontFamily: "Montserrat, sans-serif" }}>
          {/* Understanding the Challenge */}
          <ContentBox
            image={require("./assets/images/challenge.png")}
            title="Understanding the Challenge"
            text={
              <>
                The{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  United Nations Sustainable Development Goals (SDGs)
                </Typography>{" "}
                address critical challenges like gender inequality and climate
                change. Nepal, highly vulnerable to floods, landslides, and
                disasters, needs urgent action to build resilience and promote
                gender equality.
              </>
            }
            imageFirst={false}
          />

          {/* Tara Section */}
          <ContentBox
            image={require("./assets/images/Tara-Logo.png")}
            title="Tara: The AI-Driven Advocate for Social Change"
            text={
              <>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Tara: AI-Powered Advocate for Social Change,{" "}
                </Typography>
                analyzes latest trends and integrates human feedback to deliver
                actionable solutions that shape policy, enhance climate
                resilience, and drive sustainable progress.
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
                Through an{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  interactive dashboard
                </Typography>{" "}
                and a{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Q&A chatbot
                </Typography>
                , users can explore data, ask questions, and access essential
                documents seamlessly.
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
                  Join our Community Hub
                </Typography>
                , where activists, policymakers, and leaders collaborate on
                sustainable climate solutions. Share posts, track projects,
                access programs, and view events—all in one place. This hub
                fosters collective action for resilient, gender-responsive
                climate action.
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
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Track and Manage Impact
                </Typography>
                , monitor initiatives, track beneficiaries, and generate
                comprehensive impact reports. Manage programs, projects, and
                teams efficiently, ensuring transparency and data-driven
                decision-making.
              </>
            }
            imageFirst={false}
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
