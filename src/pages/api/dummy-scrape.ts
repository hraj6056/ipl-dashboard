// /pages/api/dummy-scrape.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Match } from "../../types/Match";

interface ApiResponse {
  liveMatch: Match;
  pointsTable: any[];
  schedule: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const dummyData: Match = {
    id: "1",
    homeTeam: {
      name: "Mumbai Indians",
      logo: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
    },
    awayTeam: {
      name: "Chennai Super Kings",
      logo: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
    },
    date: "2025-07-08",
    time: "19:30",
    venue: "Wankhede Stadium",
    status: "live",
    score: {
      firstInnings: `MI ${Math.floor(Math.random() * 200)}/3 (20)`,
      secondInnings: `CSK ${Math.floor(Math.random() * 50)}/0 (5)`,
    },
    toss: "Mumbai Indians won the toss and elected to bat.",
    someMilestone: "Rohit Sharma reached 50 runs!",
  };

  res.status(200).json({
    liveMatch: dummyData,
    pointsTable: [],
    schedule: [],
  });
}
