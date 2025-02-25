"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../context/AuthContext";

/**
 * This layout has a topbar and a sidebar for logged-in routes.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
