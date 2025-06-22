import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

function ChatMessage({ role, content }) {
  return (
    <Card className={`p-4 max-w-xl ${role === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-100'}`}>
      <div className="flex items-start gap-2">
        <Avatar role={role} />
        <div className="text-sm whitespace-pre-wrap">{content}</div>
      </div>
    </Card>
  )
}

function ChatPanel() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://bridge-y5on.onrender.com/bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, session_id: 'default' })
      })
      const data = await res.json()
      const reply = data.reply || JSON.stringify(data)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error talking to bridge.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full border-r bg-white">
      <div className="flex items-center gap-2 p-4 border-b bg-gray-50">
        <img src="/fire-logo.png" alt="Fire Logo" className="h-6 w-6" />
        <div className="font-semibold text-lg">Council Fire HAIOS</div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => <ChatMessage key={i} {...msg} />)}
        {loading && <Skeleton />}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t flex gap-2">
        <Textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()} />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}

function RightPanel() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch('https://mcp-server-wah4.onrender.com/logs/default')
      .then(res => res.json())
      .then(setLogs)
  }, [])

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b text-lg font-semibold">📜 Logs</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        {logs.map((log, i) => (
          <Card key={i} className="p-2 text-left">
            <div><strong>Input:</strong> {log.input}</div>
            <div><strong>Route:</strong> {log.route}</div>
            <div><strong>Response:</strong> {JSON.stringify(log.response)}</div>
            <div className="text-xs text-gray-400">{log.timestamp}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="grid grid-cols-[2fr_1fr] h-screen">
      <ChatPanel />
      <RightPanel />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
