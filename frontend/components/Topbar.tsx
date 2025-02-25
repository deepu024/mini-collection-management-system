"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 border-b">
      <span className="font-semibold">Welcome!</span>
      <div>
        {confirmLogout ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Confirm Logout
            </button>
            <button onClick={() => setConfirmLogout(false)} className="px-3 py-1">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmLogout(true)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
