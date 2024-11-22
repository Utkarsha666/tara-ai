// utils/api.js

export const fetchClimateData = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/forecast_climate_change_prediction",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error fetching climate data");
  return response.json();
};

export const fetchGiiData = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/gii_forecast",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error fetching GII data");
  return response.json();
};

export const fetchGraphData = async (token, relation) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/get-graph?relation_option=${relation}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error fetching graph data");
  return response.json();
};

export const fetchChatbotResponse = async (token, input) => {
  const response = await fetch(
    `https://taranepal.onrender.com/chatbot/question?user_input=${encodeURIComponent(
      input
    )}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error fetching chatbot response");
  return response.json();
};
