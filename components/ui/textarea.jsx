import React from "react"
export function Textarea({ ...props }) {
  return <textarea className="w-full rounded border p-2" rows={3} {...props} />
}
