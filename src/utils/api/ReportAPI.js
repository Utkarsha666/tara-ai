export const fetchReports = async (token) => {
  const response = await fetch(
    "https://climate-and-gender-ai.onrender.com/report/get-reports",
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

export const generateReport = async (topic, maxAnalysts, feedback, token) => {
  const response = await fetch(
    `https://climate-and-gender-ai.onrender.com/report/generate-report?topic=${encodeURIComponent(
      topic
    )}&max_analysts=${maxAnalysts}&feedback=${encodeURIComponent(feedback)}`,
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
