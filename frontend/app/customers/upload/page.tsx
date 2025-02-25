"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function BulkUploadPage() {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !token) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/bulk-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(`Success: ${res.data.successCount}, Errors: ${res.data.errorCount}`);
      setFile(null);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bulk Upload Customers</h1>
      <form onSubmit={handleUpload} className="bg-white p-4 rounded shadow max-w-md">
        {message && <p className="mb-2 text-green-600">{message}</p>}
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
