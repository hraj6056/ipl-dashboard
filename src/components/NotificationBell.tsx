import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNotification } from "@/context/NotificationContext";

export const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const { notifications, clearNotifications } = useNotification();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bellRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click, but not if click is inside bell or dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Position dropdown on desktop
  useLayoutEffect(() => {
    if (open && bellRef.current && window.innerWidth >= 640) {
      const rect = bellRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 8, // 8px gap
        left: rect.right - 320, // 320px = dropdown width
        width: 320,
        zIndex: 9999,
      });
    } else if (open && window.innerWidth < 640) {
      setDropdownStyle({
        position: "fixed",
        top: 96, // ~top-24, adjust if needed
        left: "50%",
        transform: "translateX(-50%)",
        width: "90vw",
        maxWidth: 400,
        zIndex: 9999,
      });
    }
  }, [open]);

  // Dropdown content
  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className="max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg"
    >
      {notifications.length === 0 ? (
        <p className="p-4 text-gray-500 dark:text-gray-400">No notifications</p>
      ) : (
        <>
          <div className="flex justify-between items-center p-2 border-b dark:border-gray-600">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Notifications
            </span>
            <button
              onClick={clearNotifications}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          </div>
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-gray-200"
              >
                <p className="font-medium">{n.title}</p>
                <p className="text-xs">{n.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {n.timestamp}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  ) : null;

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={bellRef}
        onClick={() => setOpen(!open)}
        className="relative focus:outline-none"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
            {notifications.length}
          </span>
        )}
      </button>
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          dropdown,
          document.getElementById("notification-portal")!
        )}
    </div>
  );
};
