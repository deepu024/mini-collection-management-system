"use client";

import React, { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        { email, password }
      );
      setMsg("Registered successfully! Please login.");
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {msg && <p className="mb-2 text-green-600">{msg}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="border w-full p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </main>
  );
}
