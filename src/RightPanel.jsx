import React, { useEffect, useState } from 'react'

export default function RightPanel() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch('https://mcp-server-wah4.onrender.com/logs/default')
      .then(res => res.json())
      .then(setLogs)
      .catch(err => console.error('Error fetching logs:', err))
  }, [])

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b text-lg font-semibold">📜 Session Logs</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        {logs.map((log, idx) => (
          <div key={idx} className="border rounded bg-white p-2 shadow-sm">
            <div><strong>Input:</strong> {log.input}</div>
            <div><strong>Route:</strong> {log.route}</div>
            <div><strong>Response:</strong> {JSON.stringify(log.response)}</div>
            <div className="text-xs text-gray-400 mt-1">{log.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
