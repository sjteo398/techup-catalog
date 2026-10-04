import React from "react";

export default function SpecTable({ specs }) {
  const entries = Object.entries(specs || {}).filter(([, v]) => v && v !== "—");
  return (
    <table className="w-full text-left border-collapse border border-slate-200 text-sm rounded-lg overflow-hidden" data-testid="spec-table">
      <tbody>
        {entries.map(([k, v]) => (
          <tr key={k} className="spec-row border-b border-slate-100 last:border-0">
            <th className="w-40 sm:w-52 align-top px-4 py-3 eyebrow text-slate-500 font-semibold">{k}</th>
            <td className="px-4 py-3 font-mono text-xs sm:text-sm text-slate-800">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
