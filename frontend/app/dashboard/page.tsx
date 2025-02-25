"use client";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) return;
    // Connect to the backend
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("WebSocket connected");
    });
    // Example real-time events
    newSocket.on("paymentStatusUpdated", (data: any) => {
      setNotifications((prev) => [
        ...prev,
        `Payment status updated for customer #${data.customerId} -> ${data.status}`,
      ]);
    });
    newSocket.on("newCustomer", (data: any) => {
      setNotifications((prev) => [...prev, `New customer: ${data.name}`]);
    });
    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    return () => {
      newSocket.close();
    };
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4 text-gray-600">Welcome to the dashboard!</p>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-400">No notifications yet.</p>
        ) : (
          <ul className="list-disc ml-5">
            {notifications.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
