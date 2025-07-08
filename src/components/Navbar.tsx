import React from "react";
import Link from "next/link";

import { DarkModeToggle } from "./DarkModeToggle";
import { NotificationBell } from "./NotificationBell";

export const Navbar: React.FC = () => (
  <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
    <Link href="/" className="text-lg font-semibold">
      IPL T20 Dashboard
    </Link>
    <div className="space-x-4 flex items-center">
      <Link href="/">
        <span className="hover:underline cursor-pointer">Home</span>
      </Link>
      <Link href="/schedule">
        <span className="hover:underline cursor-pointer">Schedule</span>
      </Link>
      <Link href="/history">
        <span className="hover:underline cursor-pointer">History</span>
      </Link>
      <DarkModeToggle />
      <NotificationBell />
    </div>
  </nav>
);
