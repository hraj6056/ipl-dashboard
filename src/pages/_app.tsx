import "@/styles/globals.css";
import { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import {
  NotificationProvider,
  useNotification,
} from "@/context/NotificationContext";
import { usePersistentSWR } from "@/lib/usePersistentSWR";

const fetcher = () => fetch("/api/scrape").then((res) => res.json());

function AppContent({ Component, pageProps }: AppProps) {
  const { data } = usePersistentSWR("/api/scrape", fetcher);
  const { addNotification } = useNotification();

  const previousStatus = useRef<string | undefined>(undefined);
  const previousFirstInnings = useRef<string | undefined>(undefined);
  const previousSecondInnings = useRef<string | undefined>(undefined);
  const previousToss = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!data?.liveMatch) return;

    const { status, score, toss, homeTeam, awayTeam } = data.liveMatch;

    // Status changes
    if (status && previousStatus.current !== status) {
      addNotification({
        id: `${Date.now()}-status`,
        title: status === "live" ? "Match is LIVE!" : "Match Completed",
        message: `${homeTeam.name} vs ${awayTeam.name}`,
        timestamp: new Date().toLocaleTimeString(),
        type: "status",
      });
      previousStatus.current = status;
    }

    // Toss
    if (toss && previousToss.current !== toss) {
      addNotification({
        id: `${Date.now()}-toss`,
        title: "Toss Result",
        message: toss,
        timestamp: new Date().toLocaleTimeString(),
        type: "toss",
      });
      previousToss.current = toss;
    }

    // First innings
    if (
      score?.firstInnings &&
      previousFirstInnings.current !== score.firstInnings
    ) {
      addNotification({
        id: `${Date.now()}-first`,
        title: "First Innings Update",
        message: `${homeTeam.name}: ${score.firstInnings}`,
        timestamp: new Date().toLocaleTimeString(),
        type: "score",
      });
      previousFirstInnings.current = score.firstInnings;
    }

    // Second innings
    if (
      score?.secondInnings &&
      previousSecondInnings.current !== score.secondInnings
    ) {
      addNotification({
        id: `${Date.now()}-second`,
        title: "Second Innings Update",
        message: `${awayTeam.name}: ${score.secondInnings}`,
        timestamp: new Date().toLocaleTimeString(),
        type: "score",
      });
      previousSecondInnings.current = score.secondInnings;
    }
  }, [data, addNotification]);

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <NotificationProvider>
      <AppContent {...props} />
    </NotificationProvider>
  );
}
