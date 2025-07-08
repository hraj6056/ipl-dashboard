import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { dummyMatch } from "../../lib/dummyData";
import { Match } from "../../types/Match";
import { PointsTableEntry } from "../../types/PointsTableEntry";
import { ScheduleEntry } from "../../types/ScheduleEntry";
import { computePointsProgression } from "@/lib/utils";
import { HistoryPoint } from "@/types/HistoryPoint";

interface ApiResponse {
  liveMatch: Match;
  pointsTable: PointsTableEntry[];
  schedule: ScheduleEntry[];
  pointsHistory: HistoryPoint[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const [pointsRes, scheduleRes] = await Promise.all([
      axios.get(
        "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js"
      ),
      axios.get(
        "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js"
      ),
    ]);

    // Parse points table
    const pointsJson = pointsRes.data
      .replace(/^ongroupstandings\(/, "")
      .replace(/\);$/, "");
    const parsedPoints = JSON.parse(pointsJson);

    const pointsTable: PointsTableEntry[] = parsedPoints.points.map(
      (team: any, idx: number) => ({
        position: idx + 1,
        team: team.TeamName,
        logoUrl: team.TeamLogo,
        matchesPlayed: parseInt(team.Matches),
        prevPosition: parseInt(team.PrevPosition),
        wins: parseInt(team.Wins),
        losses: parseInt(team.Loss),
        points: parseInt(team.Points),
        netRunRate: team.NetRunRate,
        isQualified: team.IsQualified === "1",
        performance: team.Performance?.split(",") as ("W" | "L" | "N")[],
      })
    );

    // Parse schedule
    const scheduleJson = scheduleRes.data
      .replace(/^MatchSchedule\(/, "")
      .replace(/\);$/, "");
    const parsedSchedule = JSON.parse(scheduleJson);

    const schedule: ScheduleEntry[] = parsedSchedule.Matchsummary.map(
      (match: any) => ({
        matchId: match.MatchID.toString(),
        date: match.MatchDateNew,
        time: match.MatchTime,
        venue: match.GroundName,
        city: match.city,
        homeTeam: {
          name: match.HomeTeamName,
          logo: match.MatchHomeTeamLogo,
        },
        awayTeam: {
          name: match.AwayTeamName,
          logo: match.MatchAwayTeamLogo,
        },
        status:
          match.MatchStatus === "Post"
            ? "completed"
            : match.MatchStatus === "Live"
            ? "live"
            : "upcoming",
        result: match.Commentss ?? "",
        toss: match.TossDetails ?? "",
        score: {
          firstInnings: match.FirstBattingSummary ?? "-",
          secondInnings: match.SecondBattingSummary ?? "-",
        },
      })
    );

    const liveMatchData = parsedSchedule.Matchsummary?.[0];

    const liveMatch: Match = {
      id: liveMatchData?.MatchID?.toString() ?? "0",
      homeTeam: {
        name: liveMatchData?.HomeTeamName ?? "N/A",
        logo: liveMatchData?.HomeTeamLogo ?? "",
      },
      awayTeam: {
        name: liveMatchData?.AwayTeamName ?? "N/A",
        logo: liveMatchData?.AwayTeamLogo ?? "",
      },
      date: liveMatchData?.MatchDateNew ?? "-",
      time: liveMatchData?.MatchTime ?? "-",
      venue: liveMatchData?.GroundName ?? "-",
      status:
        liveMatchData?.MatchStatus === "Post"
          ? "completed"
          : liveMatchData?.MatchStatus === "Live"
          ? "live"
          : "upcoming",
      toss: liveMatchData?.TossDetails ?? "",
      score: {
        firstInnings: liveMatchData?.FirstBattingSummary ?? "-",
        secondInnings: liveMatchData?.SecondBattingSummary ?? "-",
      },
    };

    const pointsHistory = computePointsProgression(schedule);

    res.status(200).json({
      liveMatch,
      pointsTable,
      schedule,
      pointsHistory,
    });
  } catch (error) {
    console.error("API fetch failed:", error);
    res.status(500).json({
      liveMatch: dummyMatch,
      pointsTable: [],
      schedule: [],
      pointsHistory: [],
    });
  }
}
