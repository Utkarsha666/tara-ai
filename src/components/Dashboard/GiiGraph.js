import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { paperStyles } from "../../styles/dashboardStyles";

const GiiGraph = ({ data }) => {
  // Log to check if data is received
  console.log("Data received in GiiGraph:", data);

  // Ensure that data exists and is an array
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ ...paperStyles, flex: 1 }}>
        <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
          No GII Data Available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ ...paperStyles, flex: 1 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Gender Inequality Index Forecast
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="ds" // The X-Axis expects 'ds' as the date field
            tick={{ fill: "#555" }}
            axisLine={{ stroke: "#aaa" }}
          />
          <YAxis tick={{ fill: "#555" }} axisLine={{ stroke: "#aaa" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="y" // The Y-Axis expects 'y' as the value field
            stroke="#FF6347"
            strokeWidth={3}
            dot={{ stroke: "#FF6347", strokeWidth: 2, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GiiGraph;
