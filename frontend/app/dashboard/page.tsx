"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Dashboard() {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Connect to the socket server
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000");

    // Listen for the "newCustomer" event
    socket.on("newCustomer", (data: any) => {
      setNotifications((prev) => [
        `New customer added: ${data.name}`,
        ...prev,
      ]);
    });

    // Payment Overdue
    socket.on("paymentOverdue", (data: any) => {
      setNotifications((prev) => [
        `Payment overdue for #${data.customerId}`,
        ...prev,
      ]);
    });

    // Payment Received
    socket.on("paymentReceived", (data: any) => {
      setNotifications((prev) => [
        `Payment received for #${data.customerId}`,
        ...prev,
      ]);
    });

    // Payment status updates (fallback)
    socket.on("paymentStatusUpdated", (data: any) => {
      setNotifications((prev) => [
        data.message,
        ...prev,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
