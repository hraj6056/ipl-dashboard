import { Navbar } from "../components/Navbar";
import { ScheduleList } from "../components/ScheduleList";
import { Loader } from "../components/Loader";
import { usePersistentSWR } from "@/lib/usePersistentSWR";
import { Skeleton } from "@/components/Skeleton";

const fetcher = () => fetch("/api/scrape").then((res) => res.json());

export default function SchedulePage() {
  const { data, error, isLoading, isValidating } = usePersistentSWR(
    "/api/scrape",
    fetcher
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
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Match Schedule
        </h1>

        {error && (
          <p className="text-red-500 dark:text-red-400">
            Failed to load schedule. Please refresh.
          </p>
        )}

        {isLoading || !data ? (
          <Loader />
        ) : (
          <ScheduleList schedule={data.schedule} />
        )}
      </main>
    </div>
  );
}
