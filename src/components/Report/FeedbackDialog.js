import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import GradientButton from "../common/Button";

const FeedbackDialog = ({
  open,
  onClose,
  analysts,
  message,
  onSubmitFeedback,
  loading,
}) => {
  const [feedback, setFeedback] = useState(
    "Add a community leader from rural Nepal"
  );

  const handleSubmit = () => {
    onSubmitFeedback(feedback);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ backgroundColor: "#f4f6f8", borderBottom: "1px solid #e0e0e0" }}
      >
        <Typography variant="h6" color="primary">
          Provide Feedback
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ paddingTop: 2 }}>
        {/* Message section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {message}
          </Typography>
        </Box>

        {/* Analysts Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Analysts:
          </Typography>
          <Grid container spacing={2}>
            {analysts.map((analyst, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar sx={{ bgcolor: "#3f51b5", margin: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" color="textPrimary">
                      {analyst.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Role:</strong> {analyst.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Affiliation:</strong> {analyst.affiliation}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ marginTop: 1 }}
                    >
                      <strong>Description:</strong> {analyst.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Feedback Text Field */}
        <Paper elevation={1} sx={{ padding: 2 }}>
          <TextField
            label="Your Feedback"
            multiline
            rows={4}
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        </Paper>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <GradientButton onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </GradientButton>
        <GradientButton
          onClick={handleSubmit}
          color="primary"
          loading={loading}
          disabled={!feedback || loading}
        >
          Submit Feedback
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
