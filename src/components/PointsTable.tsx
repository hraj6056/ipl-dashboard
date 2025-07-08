import React from "react";
import { PointsTableEntry } from "../types/PointsTableEntry";

interface Props {
  entries: PointsTableEntry[];
}

export const PointsTable: React.FC<Props> = ({ entries }) => (
  <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="p-3 text-left text-gray-900 dark:text-gray-100">#</th>
          <th className="p-3 text-left text-gray-900 dark:text-gray-100">
            Team
          </th>
          <th className="p-3 text-center text-gray-900 dark:text-gray-100">
            P
          </th>
          <th className="p-3 text-center text-gray-900 dark:text-gray-100">
            W
          </th>
          <th className="p-3 text-center text-gray-900 dark:text-gray-100">
            L
          </th>
          <th className="p-3 text-center text-gray-900 dark:text-gray-100">
            Pts
          </th>
          <th className="p-3 text-center text-gray-900 dark:text-gray-100">
            NRR
          </th>
          <th className="p-3 text-center text-gray-900 dark:text-gray-100">
            Form
          </th>
        </tr>
      </thead>
      <tbody>
        {entries?.map((team) => {
          const positionChange =
            team.prevPosition && team.prevPosition > team.position
              ? "up"
              : team.prevPosition && team.prevPosition < team.position
              ? "down"
              : "same";

          return (
            <tr
              key={team.team}
              className={`group transition ${
                team.isQualified
                  ? "border-l-4 border-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {/* Position */}
              <td className="p-3 text-center text-black dark:text-white font-medium">
                {team.position}
                <span className="ml-1 text-xs align-middle">
                  {positionChange === "up" && (
                    <span className="text-green-500">▲</span>
                  )}
                  {positionChange === "down" && (
                    <span className="text-red-500">▼</span>
                  )}
                  {positionChange === "same" && (
                    <span className="text-gray-400">—</span>
                  )}
                </span>
              </td>

              {/* Team */}
              <td className="p-3 flex items-center gap-2 text-black dark:text-white whitespace-nowrap relative">
                {team.logoUrl && (
                  <img
                    src={team.logoUrl}
                    alt={team.team}
                    className="h-5 w-5 object-contain shrink-0"
                  />
                )}
                <span>{team.team}</span>
                {team.isQualified && (
                  <span
                    className="ml-2 inline-flex items-center justify-center h-4 w-4 text-[0.65rem] font-bold text-yellow-700 bg-yellow-300 rounded-full"
                    title="Qualified"
                  >
                    Q
                  </span>
                )}
              </td>

              {/* Matches Played */}
              <td className="p-3 text-center text-black dark:text-white">
                {team.matchesPlayed}
              </td>

              {/* Wins */}
              <td className="p-3 text-center text-green-700 dark:text-green-400 font-semibold">
                {team.wins}
              </td>

              {/* Losses */}
              <td className="p-3 text-center text-red-700 dark:text-red-400 font-semibold">
                {team.losses}
              </td>

              {/* Points */}
              <td className="p-3 text-center font-bold text-black dark:text-white">
                {team.points}
              </td>

              {/* NRR */}
              <td
                className="p-3 text-center text-black dark:text-white"
                title="Net Run Rate"
              >
                {team.netRunRate}
              </td>

              {/* Recent Form */}
              <td className="p-3 text-center">
                <div className="flex gap-0.5 justify-center">
                  {team.performance.map((r, idx) => (
                    <span
                      key={idx}
                      className="text-xs"
                      title={
                        r === "W" ? "Win" : r === "L" ? "Loss" : "No Result"
                      }
                    >
                      {r === "W" ? "✅" : r === "L" ? "❌" : "🟡"}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
