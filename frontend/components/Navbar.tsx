"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div>
        <a href="/" className="text-xl font-bold">
          Mini Collection
        </a>
      </div>
      <div>
        {token ? (
          <button
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <a href="/login" className="text-blue-600 underline">
              Login
            </a>
            <a href="/register" className="text-blue-600 underline">
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
