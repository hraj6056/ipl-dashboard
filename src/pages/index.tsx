import { Navbar } from "../components/Navbar";
import { MatchCard } from "../components/MatchCard";
import { PointsTable } from "../components/PointsTable";
import { Loader } from "../components/Loader";
import { Match } from "../types/Match";
import { PointsTableEntry } from "../types/PointsTableEntry";
import { ScheduleEntry } from "../types/ScheduleEntry";
import { PointsChart } from "@/components/PointsCharts";
import { PointsOverTimeChart } from "@/components/PointsOverTime";
import { HistoryPoint } from "@/types/HistoryPoint";
import { usePersistentSWR } from "@/lib/usePersistentSWR";
import { Skeleton } from "@/components/Skeleton";

interface ApiResponse {
  liveMatch: Match;
  pointsTable: PointsTableEntry[];
  schedule: ScheduleEntry[];
  pointsHistory: HistoryPoint[];
}

const fetcher = () => fetch("/api/scrape").then((res) => res.json());

export default function Home() {
  const { data, error, isValidating } = usePersistentSWR<ApiResponse>(
    "/api/scrape",
    fetcher
  );

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">Failed to load data.</div>
    );
  }

  if (!data)
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );

  if (isValidating && !data) {
    return (
      <div className="space-y-4 mt-4">
        <Skeleton height="2rem" width="50%" />
        <Skeleton height="10rem" />
        <Skeleton height="10rem" />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <section>
          <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">
            Current Match
          </h1>
          <MatchCard match={data.liveMatch} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-white">
            Points Table
          </h2>
          <PointsTable entries={data.pointsTable} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-white">
            Points Visualization
          </h2>
          <PointsChart entries={data.pointsTable} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-white">
            Points Over Time
          </h2>
          <PointsOverTimeChart data={data.pointsHistory} />
        </section>
      </main>
    </div>
  );
}
