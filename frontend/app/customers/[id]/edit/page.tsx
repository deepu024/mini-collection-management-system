"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id;

  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [outstandingAmount, setOutstandingAmount] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch existing customer details
    async function fetchCustomer() {
      try {
        const token = localStorage.getItem("token"); // or from context
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const c = res.data;
        setName(c.name || "");
        setContactInfo(c.contactInfo || "");
        setOutstandingAmount(String(c.outstandingAmount || 0));
        setPaymentDueDate(c.paymentDueDate ? c.paymentDueDate.slice(0, 10) : "");
        setPaymentStatus(c.paymentStatus || "PENDING");
      } catch (err: any) {
        console.error(err);
      }
    }
    fetchCustomer();
  }, [customerId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token"); // or from context
      const body = {
        name,
        contactInfo,
        outstandingAmount,
        paymentDueDate,
        paymentStatus,
      };
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/${customerId}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Customer updated successfully!");
      // Optionally redirect back to customers list
      // router.push("/customers");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Customer #{customerId}</h1>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Info</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Outstanding Amount</label>
          <input
            type="number"
            step="0.01"
            className="border p-2 w-full rounded"
            value={outstandingAmount}
            onChange={(e) => setOutstandingAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Due Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={paymentDueDate}
            onChange={(e) => setPaymentDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Status</label>
          <select
            className="border p-2 w-full rounded"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="OVERDUE">OVERDUE</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
