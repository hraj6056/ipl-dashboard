import { GetServerSideProps } from "next";
import { Navbar } from "../components/Navbar";
import { ScheduleList } from "../components/ScheduleList";
import { ScheduleEntry } from "../types/ScheduleEntry";
import { Skeleton } from "@/components/Skeleton";

const fetcher = () => fetch("/api/scrape").then((res) => res.json());

interface HistoryProps {
  completedMatches: ScheduleEntry[];
}

export default function HistoryPage({ completedMatches }: HistoryProps) {
  if (completedMatches.length === 0) {
    return (
      <div className="space-y-4 mt-4">
        <Skeleton height="2rem" width="50%" />
        <Skeleton height="10rem" />
        <Skeleton height="10rem" />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Completed Matches
        </h1>
        {completedMatches.length > 0 ? (
          <ScheduleList schedule={completedMatches} />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            No completed matches yet.
          </p>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const res = await fetch(`${protocol}://${host}/api/scrape`);
  const data = await res.json();

  const completedMatches = data.schedule.filter(
    (m: ScheduleEntry) => m.status === "completed"
  );

  return {
    props: {
      completedMatches,
    },
  };
};
