import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  fetchReports,
  generateReport,
  submitFeedback,
} from "./utils/api/ReportAPI";
import ReportForm from "./components/Report/ReportForm";
import ReportItem from "./components/Report/ReportItem";
import Alert from "./components/common/Alert";
import Pagination from "./components/common/Pagination";
import {
  Box,
  Container,
  Snackbar,
  LinearProgress,
  Typography,
} from "@mui/material";
import ReportDialog from "./components/common/ReportDialog";
import FeedbackDialog from "./components/Report/FeedbackDialog";
import LoadingDialog from "./components/common/LoadingDialog";

const Report = () => {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingReportGeneration, setLoadingReportGeneration] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [topic, setTopic] = useState(
    "Wind and Solar Energy Solutions for Rural and Remote Areas"
  );
  const [maxAnalysts, setMaxAnalysts] = useState(3);
  const [feedback, setFeedback] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [analystsData, setAnalystsData] = useState([]);
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReportsData = async () => {
      setLoadingReports(true);
      try {
        const reports = await fetchReports(token);
        setReports(reports);
      } catch (error) {
        setErrorMessage(error.message);
        setOpenSnackbar(true);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchReportsData();
  }, [token]);

  const handleGenerateReport = async () => {
    setLoadingReportGeneration(true);
    try {
      const tempReport = await generateReport(topic, maxAnalysts, token);
      setAnalystsData(tempReport.analysts);
      setMessage(tempReport.message); // The message asking for feedback
      setThreadId(tempReport.thread_id); // Save thread_id
      setFeedbackDialogOpen(true); // Open feedback dialog
    } catch (error) {
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    } finally {
      setLoadingReportGeneration(false);
    }
  };

  const handleSubmitFeedback = async (feedbackText) => {
    setLoadingFeedback(true); // Set loading state to true while submitting feedback
    setFeedbackDialogOpen(false); // Close the feedback dialog

    // Open the loading dialog
    setLoadingDialogOpen(true);

    try {
      // Submit feedback to the server
      const response = await submitFeedback(threadId, feedbackText, token);

      // Insert the new report at the top of the reports list
      setReports((prevReports) => [response, ...prevReports]);

      setGeneratedReport(response); // Set the final report response

      // Close the loading dialog and show the report dialog
      setLoadingDialogOpen(false);
      setDialogOpen(true); // Open the report dialog with the final report
    } catch (error) {
      setErrorMessage(error.message);
      setOpenSnackbar(true);

      // Close the loading dialog in case of an error
      setLoadingDialogOpen(false);
    }
  };

  const totalReports = reports.length;
  const reportsPerPage = 5;
  const totalPages = Math.ceil(totalReports / reportsPerPage);
  const currentReports = reports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setGeneratedReport(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        AI-Powered Research Assistant
      </Typography>

      <ReportForm
        topic={topic}
        setTopic={setTopic}
        maxAnalysts={maxAnalysts}
        setMaxAnalysts={setMaxAnalysts}
        handleGenerateReport={handleGenerateReport}
        loadingReportGeneration={loadingReportGeneration}
        loadingReports={loadingReports}
      />

      {loadingReports && (
        <Box sx={{ marginTop: 2 }}>
          <LinearProgress />
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Loading Previous Reports...
          </Typography>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>
        Past Generated Reports
      </Typography>

      <Box
        sx={{
          marginTop: 4,
          position: "relative",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
          padding: 2,
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        {currentReports.map((reportData) => (
          <ReportItem key={reportData._id} reportData={reportData} />
        ))}
      </Box>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Loading Dialog with CircularLoading */}
      <LoadingDialog
        open={loadingDialogOpen}
        message="Generating Report, It will take some time, won't work on Firefox"
      />

      {/* Feedback Dialog */}
      <FeedbackDialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        analysts={analystsData}
        message={message}
        onSubmitFeedback={handleSubmitFeedback}
      />

      {/* Report Dialog */}
      {generatedReport && (
        <ReportDialog
          reportData={generatedReport}
          dialogOpen={dialogOpen}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </Container>
  );
};

export default Report;
