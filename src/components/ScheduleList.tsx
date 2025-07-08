import React from "react";
import { ScheduleEntry } from "../types/ScheduleEntry";
import Image from "next/image";

interface Props {
  schedule: ScheduleEntry[];
}

export const ScheduleList: React.FC<Props> = ({ schedule }) => (
  <ul className="grid gap-4 sm:grid-cols-2">
    {schedule.map((match) => (
      <li
        key={match.matchId}
        className="border rounded-lg p-4 bg-white dark:bg-gray-900 dark:border-gray-700 shadow hover:shadow-lg transition duration-300 space-y-3"
      >
        {/* Teams */}
        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center gap-2 max-w-[40%]">
            {match.homeTeam.logo && (
              <Image
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                width={24}
                height={24}
                className="h-6 w-6 object-contain shrink-0"
              />
            )}
            <span className="font-semibold text-black dark:text-white break-words">
              {match.homeTeam.name}
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400">vs</span>
          <div className="flex items-center gap-2 max-w-[40%]">
            <span className="font-semibold text-black dark:text-white break-words">
              {match.awayTeam.name}
            </span>
            {match.awayTeam.logo && (
              <Image
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                width={24}
                height={24}
                className="h-6 w-6 object-contain shrink-0"
              />
            )}
          </div>
        </div>

        {/* Date + Venue */}
        <div className="text-center space-y-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {match.date} — {match.time}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {match.venue}
            {match.city && `, ${match.city}`}
          </p>
        </div>

        {/* Result or Scores */}
        {match.status === "completed" && (
          <>
            {match.result && (
              <p className="text-sm text-center text-green-700 dark:text-green-400 font-medium">
                {match.result}
              </p>
            )}
            {match.score && (
              <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                {match.score.firstInnings} | {match.score.secondInnings}
              </p>
            )}
          </>
        )}

        {/* Status Badges */}
        {match.status === "live" && (
          <div className="text-center">
            <span className="inline-block bg-red-100 text-red-700 dark:bg-red-200 px-2 py-1 rounded text-sm font-semibold">
              LIVE
            </span>
          </div>
        )}

        {match.status === "upcoming" && (
          <div className="text-center">
            <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900 px-2 py-1 rounded text-sm font-medium">
              Upcoming
            </span>
          </div>
        )}
      </li>
    ))}
  </ul>
);
