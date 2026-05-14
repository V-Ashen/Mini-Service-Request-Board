"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // Get the ID from the URL
  const router = useRouter();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`;

  // 1. Fetch the single job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [API_URL]);

  // 2. Handle Status Update (PATCH)
  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updatedJob = await res.json();
        setJob(updatedJob); // Update UI with new status
      }
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  // 3. Handle Delete (DELETE)
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await fetch(API_URL, { method: "DELETE" });
      if (res.ok) {
        router.push("/"); // Go back to home after deleting
        router.refresh();
      }
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  if (loading) return <p className="p-10 text-center">Loading details...</p>;
  if (!job) return <p className="p-10 text-center text-red-500">Job not found.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Board
      </Link>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-50 p-6 border-b flex justify-between items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              {job.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{job.title}</h1>
          </div>
          <button 
            onClick={handleDelete}
            className="bg-red-50 text-red-600 px-4 py-2 rounded font-semibold hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase">Description</h3>
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">{job.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Location</h3>
              <p className="text-gray-700 mt-1">{job.location || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Posted On</h3>
              <p className="text-gray-700 mt-1">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Contact Person</h3>
              <p className="text-gray-700 mt-1">{job.contactName || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Contact Email</h3>
              <p className="text-gray-700 mt-1">{job.contactEmail}</p>
            </div>
          </div>

          {/* Status Update Dropdown */}
          <div className="pt-6 border-t flex items-center gap-4">
            <span className="font-bold text-gray-900">Change Status:</span>
            <select 
              value={job.status} 
              disabled={updating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border p-2 rounded bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            {updating && <span className="text-sm text-gray-400 italic">Updating...</span>}
          </div>
        </div>
      </div>
    </main>
  );
}