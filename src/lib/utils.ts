import { ScheduleEntry } from "@/types/ScheduleEntry";
import { HistoryPoint } from "@/types/HistoryPoint";

export function computePointsProgression(
  schedule: ScheduleEntry[]
): HistoryPoint[] {
  const teamPointsMap: Record<string, number> = {};
  const history: HistoryPoint[] = [];

  // Sort matches by date
  const sorted = [...schedule].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  sorted.forEach((match) => {
    // Initialize teams
    const home = match.homeTeam.name;
    const away = match.awayTeam.name;
    if (!(home in teamPointsMap)) teamPointsMap[home] = 0;
    if (!(away in teamPointsMap)) teamPointsMap[away] = 0;

    // Only consider completed matches
    if (match.status === "completed") {
      if (match.result?.includes(home)) {
        teamPointsMap[home] += 2;
      } else if (match.result?.includes(away)) {
        teamPointsMap[away] += 2;
      } else {
        // Tie or No Result
        teamPointsMap[home] += 1;
        teamPointsMap[away] += 1;
      }
    }

    // Record points after this match
    history.push({
      match: `${home} vs ${away}`,
      team: home,
      points: teamPointsMap[home],
    });
    history.push({
      match: `${home} vs ${away}`,
      team: away,
      points: teamPointsMap[away],
    });
  });

  return history;
}
