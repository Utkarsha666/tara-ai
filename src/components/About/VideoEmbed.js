import React from "react";
import { Box } from "@mui/material";

const VideoEmbed = () => {
  return (
    <Box
      sx={{
        marginTop: 0,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        padding: 0,
        marginBottom: 4,
      }}
    >
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/W04aJAqnDHE?si=d4zdmGSHMTGjzLeB"
        title="About"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default VideoEmbed;
