import React, { useState } from "react";
import Link from "next/link";

import { DarkModeToggle } from "./DarkModeToggle";
import { NotificationBell } from "./NotificationBell";

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center relative">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link
          href="/"
          className="text-lg font-semibold w-full text-center sm:text-left"
        >
          IPL Dashboard
        </Link>
        {/* Hamburger button for mobile */}
        <button
          className="sm:hidden ml-2 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Menu links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center space-y-3 mt-4 sm:mt-0 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-row sm:items-center sm:static sm:w-auto w-full bg-indigo-600 sm:bg-transparent z-50`}
      >
        <Link href="/">
          <span className="hover:underline cursor-pointer block py-1 px-2 text-center sm:text-left">
            Home
          </span>
        </Link>
        <Link href="/schedule">
          <span className="hover:underline cursor-pointer block py-1 px-2 text-center sm:text-left">
            Schedule
          </span>
        </Link>
        <Link href="/history">
          <span className="hover:underline cursor-pointer block py-1 px-2 text-center sm:text-left">
            History
          </span>
        </Link>
        <div className="flex justify-center flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-start items-center space-x-2 mt-2 sm:mt-0">
          <DarkModeToggle />
          <NotificationBell />
        </div>
      </div>
    </nav>
  );
};
