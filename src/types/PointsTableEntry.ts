export interface PointsTableEntry {
  position: number;
  prevPosition: number;
  team: string;
  logoUrl?: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  points: number;
  netRunRate: string;
  isQualified?: boolean;
  performance: string[];
}
