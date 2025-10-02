import React, { useEffect, useState } from 'react';

const categories = [
  {
    title: 'WATER & FOOD',
    items: [
      { id: 'water_3days', title: '3 days drinking water (1 gallon per person)' },
      { id: 'preservable_foods', title: 'Preservable foods' },
      { id: 'emergency_cooking', title: 'Emergency cooking supplies' },
    ],
  },
  {
    title: 'MEDICAL',
    items: [
      { id: 'first_aid', title: 'First aid kit' },
      { id: 'prescribed_meds', title: 'Prescribed medicines' },
      { id: 'hand_sanitizer', title: 'Hand sanitizers' },
    ],
  },
  {
    title: 'SHELTER ESSENTIALS',
    items: [
      { id: 'blankets', title: 'Blankets' },
      { id: 'sleeping_bag', title: 'Sleeping bag' },
    ],
  },
  {
    title: 'COMMUNICATION',
    items: [
      { id: 'power_bank', title: 'Power bank' },
      { id: 'whistle', title: 'Whistle' },
      { id: 'adaptors', title: 'Adaptors' },
    ],
  }, 
  {
    title: 'TOOLS',
    items: [
      { id: 'flash_light', title: 'Flash light' },
      { id: 'extra_batteries', title: 'Extra batteries' },
      { id: 'knife', title: 'Knife' },
      { id: 'tape', title: 'Tape' },
      { id: 'plastic_bag', title: 'Plastic bag' },
      { id: 'essential documents', title: 'essential documents' },
    ],
  },
];

function Checklist() {
  const [values, setValues] = useState({});

  useEffect(() => {
    // load saved values from localStorage
    const saved = {};
    categories.forEach((cat) => {
      cat.items.forEach((it) => {
        const raw = localStorage.getItem(it.id);
        saved[it.id] = raw === 'true' ? true : false;
      });
    });
    setValues(saved);
  }, []);

  useEffect(() => {
    // persist changes to localStorage when values change
    Object.keys(values).forEach((k) => {
      localStorage.setItem(k, values[k] ? 'true' : 'false');
    });
  }, [values]);

  function toggle(id) {
    setValues((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    const cleared = {};
    Object.keys(values).forEach((k) => (cleared[k] = false));
    setValues(cleared);
    Object.keys(cleared).forEach((k) => localStorage.removeItem(k));
  }

  return (
    <div className="checklist-root">
      <h2>Emergency Checklist</h2>
      <p className="note">Stored locally on this device — works offline.</p>

      {categories.map((cat) => (
        <details key={cat.title} className="cat-box" open>
          <summary><strong>{cat.title}</strong></summary>
          <div className="items">
            {cat.items.map((it) => (
              <label key={it.id} className="item-row">
                <input type="checkbox" checked={!!values[it.id]} onChange={() => toggle(it.id)} />
                <span>{it.title}</span>
              </label>
            ))}
          </div>
        </details>
      ))}

      <div className="actions">
        <button className="primary" onClick={resetAll}>Reset checklist</button>
      </div>
    </div>
  );
}

export default Checklist;

