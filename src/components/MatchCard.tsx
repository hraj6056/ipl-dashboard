import React from "react";
import { Match } from "../types/Match";
import Image from "next/image";

interface Props {
  match: Match;
}

export const MatchCard: React.FC<Props> = ({ match }) => (
  <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 dark:border-gray-700 shadow hover:shadow-lg transition duration-300 flex flex-col items-center space-y-4">
    {/* Teams */}
    <div className="flex flex-wrap justify-center items-center gap-4 w-full">
      {/* Home Team */}
      <div className="flex items-center gap-2 max-w-[45%]">
        {match?.homeTeam?.logo && (
          <Image
            src={match.homeTeam.logo}
            alt={match.homeTeam.name}
            width={24}
            height={24}
            className="h-6 w-6 object-contain shrink-0"
          />
        )}
        <span className="font-semibold text-black dark:text-white break-words">
          {match?.homeTeam?.name}
        </span>
      </div>
      <span className="text-gray-500 dark:text-gray-400">vs</span>
      {/* Away Team */}
      <div className="flex items-center gap-2 max-w-[45%]">
        <span className="font-semibold text-black dark:text-white break-words">
          {match?.awayTeam?.name}
        </span>
        {match?.awayTeam?.logo && (
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

    {/* Venue and Date */}
    <div className="text-center space-y-1 w-full">
      <p className="text-gray-600 dark:text-gray-300">{match?.venue}</p>
      <p className="text-gray-600 dark:text-gray-300">
        {match?.date} — {match?.time}
      </p>
    </div>

    {/* Score */}
    {match?.score && (
      <div className="text-center">
        <div className="inline-block bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded text-sm font-medium">
          {match?.score?.firstInnings} | {match?.score?.secondInnings}
        </div>
      </div>
    )}

    {/* Status */}
    <div className="text-center">
      {match?.status === "live" && (
        <div className="inline-block bg-red-100 text-red-700 dark:bg-red-200 px-2 py-1 rounded text-sm font-semibold">
          LIVE
        </div>
      )}
      {match?.status === "completed" && (
        <div className="inline-block bg-green-100 text-green-700 dark:bg-green-200 px-2 py-1 rounded text-sm font-semibold">
          Completed
        </div>
      )}
      {match?.status === "upcoming" && (
        <div className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900 px-2 py-1 rounded text-sm font-semibold">
          Upcoming
        </div>
      )}
    </div>
  </div>
);
