export interface ScheduleEntry {
  matchId: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  status: "upcoming" | "live" | "completed";
  result?: string;
  score?: {
    firstInnings: string;
    secondInnings: string;
  };
}
