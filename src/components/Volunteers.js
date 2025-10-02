// src/components/Volunteers.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase-config"; // import supabase client

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [status, setStatus] = useState("");
  const [vName, setVName] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vLocality, setVLocality] = useState("");
  const [vSkills, setVSkills] = useState("");

  // Load volunteers list
  async function fetchVolunteers() {
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setVolunteers(data);
    }
  }

  useEffect(() => {
    fetchVolunteers();

    // Optional: subscribe for realtime updates
    const channel = supabase
      .channel("volunteers-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "volunteers" },
        (payload) => {
          console.log("Change received!", payload);
          fetchVolunteers(); // refresh list when insert/update/delete happens
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("volunteers").insert([
      {
        name: vName,
        phone: vPhone,
        email: vEmail,
        locality: vLocality,
        skills: vSkills,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      setStatus("Error: " + error.message);
    } else {
      setStatus("Volunteer registered ✅");
      setVName("");
      setVPhone("");
      setVEmail("");
      setVLocality("");
      setVSkills("");
    }
  }

  return (
    <div>
      <h2>Volunteers & Resources</h2>

      {volunteers.length > 0 ? (
        volunteers.map((v, i) => (
          <div className="vol-card" key={v.id || i}>
            <div>
              <strong>{v.name}</strong> ({v.skills})
            </div>
            <div>{v.locality}</div>
            <div>{v.email}</div>
            <div style={{ marginTop: 8 }}>
              <a href={`tel:${v.phone}`} className="primary">
                Call: {v.phone}
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>No volunteers yet.</p>
      )}

      <h3 style={{ marginTop: 20 }}>Register as Volunteer</h3>
      <form onSubmit={handleSubmit} className="request-form">
        <input
          placeholder="Full Name"
          value={vName}
          onChange={(e) => setVName(e.target.value)}
          required
        />
        <input
          placeholder="Phone Number"
          value={vPhone}
          onChange={(e) => setVPhone(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={vEmail}
          onChange={(e) => setVEmail(e.target.value)}
          required
        />
        <input
          placeholder="Locality"
          value={vLocality}
          onChange={(e) => setVLocality(e.target.value)}
          required
        />
        <input
          placeholder="Skills"
          value={vSkills}
          onChange={(e) => setVSkills(e.target.value)}
          required
        />
        <button className="primary" type="submit">
          Register
        </button>
      </form>

      {status && <div style={{ marginTop: 10 }}>{status}</div>}
    </div>
  );
}
