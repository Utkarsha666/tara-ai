import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { fetchReports, generateReport } from "./utils/api/ReportAPI";
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

const Report = () => {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingReportGeneration, setLoadingReportGeneration] = useState(false);
  const [topic, setTopic] = useState(
    "The Role of Nepal's Indigenous Communities in Climate Action and Conservation"
  );
  const [maxAnalysts, setMaxAnalysts] = useState(1);
  const [feedback, setFeedback] = useState("Add Executive Director of NGO");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

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
      const newReport = await generateReport(
        topic,
        maxAnalysts,
        feedback,
        token
      );
      setReports((prevReports) => [newReport, ...prevReports]); // Insert at the top
      setGeneratedReport(newReport); // Save the generated report
      setDialogOpen(true); // Open the dialog
      setCurrentPage(1); // Reset to first page when new report is added
    } catch (error) {
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    } finally {
      setLoadingReportGeneration(false);
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
    setGeneratedReport(null); // Clear the report data when closing
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Report
      </Typography>

      <ReportForm
        topic={topic}
        setTopic={setTopic}
        maxAnalysts={maxAnalysts}
        setMaxAnalysts={setMaxAnalysts}
        feedback={feedback}
        setFeedback={setFeedback}
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
          <ReportItem
            key={reportData._id}
            reportData={reportData}
            handleOpenDialog={() => {}}
          />
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
