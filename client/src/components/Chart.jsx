import React from "react";
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../assets/data";
export const Chart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart width={150} height={100} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="total" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
