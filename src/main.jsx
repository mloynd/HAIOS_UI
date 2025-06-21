import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Chat from './Chat.jsx'
import RightPanel from './RightPanel.jsx'

function App() {
  return (
    <div className="grid grid-cols-[2fr_1fr] h-screen">
      <Chat />
      <RightPanel />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
