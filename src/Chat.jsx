import React, { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const payload = {
      input,
      session_id: "default"
    }

    try {
      const res = await fetch('https://bridge-y5on.onrender.com/bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      const reply = data.reply || JSON.stringify(data)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Error talking to bridge.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full border-r bg-white">
      <div className="p-4 border-b text-xl font-bold bg-gray-50">🔥 Council Fire HAIOS</div>
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded shadow max-w-xl ${m.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-green-100 self-start mr-auto'}`}>
            <div className="text-xs text-gray-500 mb-1">{m.role}</div>
            <div>{m.content}</div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Assistant is thinking...</div>}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input className="flex-1 border rounded p-2" placeholder="Ask or instruct..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded">Send</button>
      </div>
    </div>
  )
}
