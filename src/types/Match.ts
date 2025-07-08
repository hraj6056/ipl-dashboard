export interface Match {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  date: string;
  time: string;
  venue: string;
  status: "live" | "completed" | "upcoming";
  score: {
    firstInnings: string;
    secondInnings: string;
  };
  toss?: string;
  someMilestone?: string;
}
