import React from "react"
export function Card({ children, className }) {
  return <div className={`rounded border bg-white shadow ${className}`}>{children}</div>
}
