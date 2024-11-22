export const fetchReports = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/report/get-reports",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  const data = await response.json();
  return data.reports.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
};

export const generateReport = async (topic, maxAnalysts, token) => {
  const response = await fetch(
    `https://taranepal.onrender.com/report/generate-report?topic=${encodeURIComponent(
      topic
    )}&max_analysts=${maxAnalysts}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate report");
  }

  return await response.json();
};

export const submitFeedback = async (threadId, feedback, token) => {
  const response = await fetch(
    `https://taranepal.onrender.com/report/submit-feedback?thread_id=${encodeURIComponent(
      threadId
    )}&feedback=${encodeURIComponent(feedback)}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }

  return await response.json();
};
