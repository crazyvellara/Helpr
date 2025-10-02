// src/components/RequestHelp.js
import React, { useState } from "react";
import { supabase } from "../supabase-config";

export default function RequestHelp() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [requestText, setRequestText] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const { error } = await supabase.from("requests").insert([
      {
        name,
        location,
        request: requestText,
        contact,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setStatus("Error saving request: " + error.message);
    } else {
      setStatus("Submitted successfully ✅");
      setName("");
      setLocation("");
      setRequestText("");
      setContact("");
    }
  }

  return (
    <div>
      <h2>Request Help</h2>
      <form onSubmit={handleSubmit} className="request-form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="What help you need"
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          required
        />
        <input
          placeholder="Contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div style={{ marginTop: 10 }}>{status}</div>
    </div>
  );
}
