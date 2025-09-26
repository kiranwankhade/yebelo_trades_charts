import React from "react";

export default function TokenSelector({ tokens, selected, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-medium text-[#616175]">Select Token:</label>
      <select
        className="border rounded p-2"
        value={selected}
        onChange={e => onChange(e.target.value)}
      >
        {tokens.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
}
