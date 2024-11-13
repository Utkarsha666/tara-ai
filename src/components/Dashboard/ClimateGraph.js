// components/ClimateChangeGraph.js
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

const ClimateGraph = ({ data }) => {
  return (
    <Paper sx={{ ...paperStyles, flex: 1 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Climate Change Predictions
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6347" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF6347" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="Date"
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
            dataKey="Predicted_Temperature"
            stroke="url(#tempGradient)"
            strokeWidth={3}
            dot={{ stroke: "#FF6347", strokeWidth: 2, r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Predicted_Precipitation"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ClimateGraph;
