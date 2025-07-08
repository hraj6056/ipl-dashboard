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
      (team: unknown, idx: number) => {
        const t = team as {
          TeamName: string;
          TeamLogo: string;
          Matches: string;
          PrevPosition: string;
          Wins: string;
          Loss: string;
          Points: string;
          NetRunRate: string;
          IsQualified: string;
          Performance?: string;
        };
        return {
          position: idx + 1,
          team: t.TeamName,
          logoUrl: t.TeamLogo,
          matchesPlayed: parseInt(t.Matches),
          prevPosition: parseInt(t.PrevPosition),
          wins: parseInt(t.Wins),
          losses: parseInt(t.Loss),
          points: parseInt(t.Points),
          netRunRate: t.NetRunRate,
          isQualified: t.IsQualified === "1",
          performance: t.Performance?.split(",") as ("W" | "L" | "N")[],
        };
      }
    );

    // Parse schedule
    const scheduleJson = scheduleRes.data
      .replace(/^MatchSchedule\(/, "")
      .replace(/\);$/, "");
    const parsedSchedule = JSON.parse(scheduleJson);

    const schedule: ScheduleEntry[] = parsedSchedule.Matchsummary.map(
      (match: unknown) => {
        const m = match as {
          MatchID: string | number;
          MatchDateNew: string;
          MatchTime: string;
          GroundName: string;
          city?: string;
          HomeTeamName: string;
          MatchHomeTeamLogo: string;
          AwayTeamName: string;
          MatchAwayTeamLogo: string;
          MatchStatus: string;
          Commentss?: string;
          TossDetails?: string;
          FirstBattingSummary?: string;
          SecondBattingSummary?: string;
        };
        return {
          matchId: m.MatchID.toString(),
          date: m.MatchDateNew,
          time: m.MatchTime,
          venue: m.GroundName,
          city: m.city,
          homeTeam: {
            name: m.HomeTeamName,
            logo: m.MatchHomeTeamLogo,
          },
          awayTeam: {
            name: m.AwayTeamName,
            logo: m.MatchAwayTeamLogo,
          },
          status:
            m.MatchStatus === "Post"
              ? "completed"
              : m.MatchStatus === "Live"
              ? "live"
              : "upcoming",
          result: m.Commentss ?? "",
          toss: m.TossDetails ?? "",
          score: {
            firstInnings: m.FirstBattingSummary ?? "-",
            secondInnings: m.SecondBattingSummary ?? "-",
          },
        };
      }
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
