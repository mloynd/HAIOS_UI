import React from "react"
export function Avatar({ role }) {
  const label = role === 'user' ? '🧑' : '🤖'
  return <div className="text-xl">{label}</div>
}
