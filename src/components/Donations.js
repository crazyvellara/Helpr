// src/components/Donation.js
import React, { useState } from "react";
import { supabase } from "../supabase-config"; // supabase client

export default function Donation() {
  // Fund donation form states
  const [fname, setFName] = useState("");
  const [femail, setFEmail] = useState("");
  const [famount, setFAmount] = useState("");
  const [fcontact, setFContact] = useState("");
  const [fundStatus, setFundStatus] = useState("");

  // Resource donation form states
  const [rname, setRName] = useState("");
  const [rquantity, setRQuantity] = useState("");
  const [rlocation, setRLocation] = useState("");
  const [rcontact, setRContact] = useState("");
  const [rnote, setRNote] = useState("");
  const [resStatus, setResStatus] = useState("");

  // Submit fund donation
  async function handleFundSubmit(e) {
    e.preventDefault();
    setFundStatus("Submitting...");

    const { error } = await supabase.from("funds_donations").insert([
      {
        name: fname,
        email: femail,
        amount: famount,
        contact: fcontact,
      },
    ]);

    if (error) {
      console.error("Fund donation error:", error);
      setFundStatus("Error: " + error.message);
    } else {
      setFundStatus("Thank you for your contribution ❤️");
      setFName("");
      setFEmail("");
      setFAmount("");
      setFContact("");
    }
  }

  // Submit resource donation
  async function handleResSubmit(e) {
    e.preventDefault();
    setResStatus("Submitting...");

    const { error } = await supabase.from("resource_donations").insert([
      {
        resource_name: rname,
        quantity: rquantity,
        location: rlocation,
        contact: rcontact,
        note: rnote,
      },
    ]);

    if (error) {
      console.error("Resource donation error:", error);
      setResStatus("Error: " + error.message);
    } else {
      setResStatus("Resource donation recorded ✅");
      setRName("");
      setRQuantity("");
      setRLocation("");
      setRContact("");
      setRNote("");
    }
  }

  return (
    <div>
      <h2>Donation Page</h2>

      {/* Section 1: Fund Donation */}
      <section style={{ marginBottom: 30 }}>
        <h3>Donate Funds</h3>
        <p>You can scan the QR code below to donate directly via UPI.</p>
        <img
          src="/upi-qr.png"
          alt="UPI QR Code"
          style={{ width: 200, marginBottom: 20 }}
        />
        <form onSubmit={handleFundSubmit} className="request-form">
          <input
            placeholder="Your Name (optional)"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
          />
          <input
            placeholder="Email (optional)"
            value={femail}
            onChange={(e) => setFEmail(e.target.value)}
          />
          <input
            placeholder="Donation Amount (For Documentaion)"
            value={famount}
            onChange={(e) => setFAmount(e.target.value)}
          />
          <input
            placeholder="Contact Number (optional)"
            value={fcontact}
            onChange={(e) => setFContact(e.target.value)}
          />
          <button className="primary" type="submit">
            Submit Details
          </button>
        </form>
        {fundStatus && <div style={{ marginTop: 10 }}>{fundStatus}</div>}
      </section>

      {/* Section 2: Resource Donation */}
      <section>
        <h3>Donate Resources</h3>
        <form onSubmit={handleResSubmit} className="request-form">
          <input
            placeholder="Resource Name"
            value={rname}
            onChange={(e) => setRName(e.target.value)}
            required
          />
          <input
            placeholder="Quantity"
            value={rquantity}
            onChange={(e) => setRQuantity(e.target.value)}
            required
          />
          <input
            placeholder="Location"
            value={rlocation}
            onChange={(e) => setRLocation(e.target.value)}
            required
          />
          <input
            placeholder="Contact Number"
            value={rcontact}
            onChange={(e) => setRContact(e.target.value)}
            required
          />
          <textarea
            placeholder="Additional Notes (optional)"
            value={rnote}
            onChange={(e) => setRNote(e.target.value)}
          />
          <button className="primary" type="submit">
            Submit Resource Donation
          </button>
        </form>
        {resStatus && <div style={{ marginTop: 10 }}>{resStatus}</div>}
      </section>
    </div>
  );
}
