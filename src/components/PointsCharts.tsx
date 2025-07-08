import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PointsTableEntry } from "../types/PointsTableEntry";

interface Props {
  entries: PointsTableEntry[];
}

export const PointsChart: React.FC<Props> = ({ entries }) => {
  const data = entries.map((team) => ({
    name: team.team,
    Wins: team.wins,
    Losses: team.losses,
    Points: team.points,
    Qualified: team.isQualified ? "Qualified" : "Not Qualified",
  }));

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Wins vs Losses
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
          <YAxis />
          <Tooltip
            contentStyle={{
              background: "#1f2937",
              borderRadius: "8px",
              border: "none",
              color: "white",
            }}
          />
          <Legend />
          <Bar
            dataKey="Wins"
            stackId="a"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Losses"
            stackId="a"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
