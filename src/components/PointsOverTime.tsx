import { HistoryPoint } from "@/types/HistoryPoint";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: HistoryPoint[];
}

export const PointsOverTimeChart: React.FC<Props> = ({ data }) => {
  const teams = Array.from(new Set(data.map((d) => d.team)));

  // Assign a numeric index to each match for ordering
  const matches = Array.from(new Set(data.map((d) => d.match))).map((m, i) => ({
    idx: i + 1,
    label: m,
  }));

  const chartData = matches.map(({ idx, label }) => {
    const row: Record<string, number | string | null> = {
      matchIndex: idx,
      matchLabel: label,
    };
    teams.forEach((team) => {
      const point = data.find((d) => d.match === label && d.team === team);
      row[team] = point?.points ?? null;
    });
    return row;
  });

  return (
    <div className="w-full overflow-x-auto">
      <div
        style={{
          minWidth: Math.max(800, chartData.length * 50),
          height: 400,
        }}
        className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Points Progress Over Matches
        </h3>
        <LineChart
          width={Math.max(800, chartData.length * 50)}
          height={300}
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis
            dataKey="matchIndex"
            tickFormatter={(index) => `#${index}`}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(index) => {
              const match = chartData.find((d) => d.matchIndex === index);
              return match?.matchLabel || `Match #${index}`;
            }}
            formatter={(value, name) => [`${value} pts`, name]}
            contentStyle={{
              background: "#1f2937",
              borderRadius: "8px",
              border: "none",
              color: "white",
            }}
          />
          <Legend verticalAlign="top" height={40} />
          {teams.map((team, idx) => (
            <Line
              key={team}
              type="monotone"
              dataKey={team}
              stroke={`hsl(${(idx * 40) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </div>
    </div>
  );
};
