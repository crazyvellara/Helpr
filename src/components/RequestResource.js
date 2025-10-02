// src/components/RequestResource.js
import React, { useState } from "react";
import { supabase } from "../supabase-config"; // supabase client

export default function RequestResource() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("RequestResource").insert([
      {
        name,
        location,
        item,
        quantity,
        contact,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setStatus("Error saving request: " + error.message);
    } else {
      setStatus("Resource request submitted ✅");
      setName("");
      setLocation("");
      setItem("");
      setQuantity("");
      setContact("");
    }
  }

  return (
    <div>
      <h2>Request a Resource</h2>
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
        <input
          placeholder="Item Needed"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          placeholder="Contact"
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
