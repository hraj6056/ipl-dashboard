import React from "react";

export const Loader = () => (
  <div className="flex justify-center items-center min-h-[30vh]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin dark:border-white dark:border-t-transparent"></div>
    <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
      Loading...
    </span>
  </div>
);
