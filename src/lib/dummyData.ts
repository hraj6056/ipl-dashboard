import { Match } from "../types/Match";
import { PointsTableEntry } from "../types/PointsTableEntry";
import { ScheduleEntry } from "../types/ScheduleEntry";

export const dummyMatch: Match = {
  id: "1",
  homeTeam: {
    name: "Mumbai Indians",
    logo: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
  },
  awayTeam: {
    name: "Chennai Super Kings",
    logo: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
  },
  date: "2025-07-07",
  time: "19:30 IST",
  venue: "Wankhede Stadium",
  status: "live",
  score: {
    firstInnings: "MI 150/3 (15)",
    secondInnings: "CSK 0/0 (0)",
  },
};

export const dummyPointsTable: PointsTableEntry[] = [
  {
    position: 1,
    prevPosition: 1,
    team: "Mumbai Indians",
    logoUrl: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
    matchesPlayed: 10,
    wins: 8,
    losses: 2,
    points: 16,
    netRunRate: "+1.200",
    isQualified: true,
    performance: ["W", "W", "W", "L", "W"],
  },
  {
    position: 2,
    prevPosition: 2,
    team: "Chennai Super Kings",
    logoUrl: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
    matchesPlayed: 10,
    wins: 7,
    losses: 3,
    points: 14,
    netRunRate: "+0.950",
    isQualified: true,
    performance: ["W", "L", "W", "W", "W"],
  },
  {
    position: 3,
    prevPosition: 3,
    team: "Royal Challengers Bengaluru",
    logoUrl: "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
    matchesPlayed: 10,
    wins: 6,
    losses: 4,
    points: 12,
    netRunRate: "+0.500",
    isQualified: false,
    performance: ["L", "W", "W", "L", "W"],
  },
];

export const dummySchedule: ScheduleEntry[] = [
  {
    matchId: "1872",
    date: "3 Jun 2025",
    time: "19:30",
    venue: "Narendra Modi Stadium",
    city: "Ahmedabad",
    homeTeam: {
      name: "Royal Challengers Bengaluru",
      logo: "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
    },
    awayTeam: {
      name: "Punjab Kings",
      logo: "https://scores.iplt20.com/ipl/teamlogos/PBKS.png",
    },
    status: "completed",
    result: "Royal Challengers Bengaluru Won by 6 Runs (Winners)",
    score: {
      firstInnings: "190/9 (20.0 Ov)",
      secondInnings: "184/7 (20.0 Ov)",
    },
  },
];
