import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center
      bg-gradient-to-br from-indigo-600 via-sky-500 to-teal-400
      dark:from-gray-900 dark:via-slate-800 dark:to-gray-900
      transition-all duration-700"
    >
      <div className="flex items-center justify-center w-full h-full px-4">
        {children}
      </div>
    </div>
  );
}
