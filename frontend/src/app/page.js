"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch jobs from your Express API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // If a category is selected, we add it as a query parameter (?category=...)
      const url = category 
        ? `${process.env.NEXT_PUBLIC_API_URL}/jobs?category=${category}`
        : `${process.env.NEXT_PUBLIC_API_URL}/jobs`;
      
      const res = await fetch(url);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-run whenever the category dropdown changes
  useEffect(() => {
    fetchJobs();
  }, [category]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
        
        <div className="flex gap-4">
          {/* Category Filter Dropdown */}
          <select 
            className="border p-2 rounded bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>

          {/* Button to navigate to the 'New Job' page */}
          <Link href="/jobs/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Post a Job
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <div className="text-center p-10 border-2 border-dashed rounded text-gray-400">
              No jobs found. Be the first to post one!
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="border p-5 rounded-lg shadow-sm bg-white hover:border-blue-300 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">{job.title}</h2>
                    <p className="text-gray-600 mt-1">{job.location}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {job.category}
                  </span>
                </div>
                <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">Status: {job.status}</span>
                  <Link href={`/jobs/${job._id}`} className="text-blue-600 font-semibold hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}