"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Dashboard = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000";
    const socket = io(socketUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server with ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("newCustomer", (data: any) => {
      console.log("new customer", data);
      setNotifications((prev) => [
        `New customer added: ${data.name}`,
        ...prev,
      ]);
    });

    socket.on("paymentOverdue", (data: any) => {
      console.log("payment overdue", data);
      setNotifications((prev) => [
        `Payment overdue for #${data.customerId}`,
        ...prev,
      ]);
    });

    socket.on("paymentReceived", (data: any) => {
      console.log("payment received", data);
      setNotifications((prev) => [
        `Payment received for #${data.customerId}`,
        ...prev,
      ]);
    });

    socket.on("paymentStatusUpdated", (data: any) => {
      console.log("payment status updated", data);
      setNotifications((prev) => [data.message, ...prev]);
    });
  }, []);


  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
}


export default Dashboard;