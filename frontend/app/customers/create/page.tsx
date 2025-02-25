"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function CreateCustomerPage() {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [outstandingAmount, setOutstandingAmount] = useState("0");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`,
        {
          name,
          contactInfo,
          outstandingAmount: parseFloat(outstandingAmount),
          paymentDueDate,
          paymentStatus: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Customer created successfully!");
      setName("");
      setContactInfo("");
      setOutstandingAmount("0");
      setPaymentDueDate("");
      setStatus("PENDING");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error creating customer");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Customer</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md">
        {message && <p className="mb-2 text-green-600">{message}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contact Info</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Outstanding Amount
          </label>
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={outstandingAmount}
            onChange={(e) => setOutstandingAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Payment Due Date</label>
          <input
            type="date"
            className="border w-full p-2 rounded"
            value={paymentDueDate}
            onChange={(e) => setPaymentDueDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Payment Status</label>
          <select
            className="border w-full p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="OVERDUE">OVERDUE</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
}
