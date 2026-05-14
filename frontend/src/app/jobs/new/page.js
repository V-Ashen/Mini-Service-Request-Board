"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewJobPage() {
  const router = useRouter();
  
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Plumbing", // default value
    location: "",
    contactName: "",
    contactEmail: ""
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Simple Client-side Validation
    if (!formData.title || !formData.description || !formData.contactEmail) {
      setError("Please fill in all required fields (Title, Description, Email).");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Redirect back to home page after success
        router.push("/");
        router.refresh(); 
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Board
      </Link>
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Post a New Service Request</h1>

      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-lg shadow-sm space-y-4">
        {error && <p className="text-red-500 bg-red-50 p-3 rounded border border-red-200">{error}</p>}

        <div>
          <label className="block font-semibold mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Need a plumber for a leaking tap"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Glasgow"
              className="w-full border p-2 rounded outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded outline-none"
            placeholder="Describe the issue in detail..."
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contact Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 disabled:bg-blue-300 transition"
        >
          {submitting ? "Posting..." : "Post Request"}
        </button>
      </form>
    </main>
  );
}