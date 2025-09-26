import React from "react";

export default function TokenSelector({ tokens, selected, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full max-w-sm">
      <label className="font-medium text-[#616175] mb-1 sm:mb-0">Select Token:</label>
      <select
        className="border rounded p-2 w-full sm:w-auto"
        value={selected}
        onChange={e => onChange(e.target.value)}
      >
        {tokens.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
