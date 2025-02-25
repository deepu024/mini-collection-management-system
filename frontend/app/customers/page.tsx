"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


interface Customer {
  id: number;
  name: string;
  contactInfo?: string;
  outstandingAmount: number;
  paymentDueDate?: string;
  paymentStatus: string;
  createdAt?: string;
}

export default function CustomersPage() {
  const { token } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCustomers() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="space-x-3">
          <a
            href="/customers/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Customer
          </a>
          <a
            href="/customers/upload"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Bulk Upload
          </a>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Contact</th>
              <th className="text-left p-2">Outstanding</th>
              <th className="text-left p-2">Due Date</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
          {customers.map((c) => (
  <tr key={c.id}>
    <td>{c.id}</td>
    <td>{c.name}</td>
    <td>{c.contactInfo}</td>
    <td>{c.outstandingAmount}</td>
    <td>
      {c.paymentDueDate
        ? new Date(c.paymentDueDate).toLocaleDateString()
        : ""}
    </td>
    <td>{c.paymentStatus}</td>

    {/* If you have an Edit link */}
    <td>
      <a href={`/customers/${c.id}/edit`} className="text-blue-600">
        Edit
      </a>
    </td>
  </tr>
))}

            {customers.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
