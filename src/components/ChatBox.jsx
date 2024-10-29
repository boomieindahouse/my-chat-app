// src/components/ChatBox.js
"use client";

import { useState, useEffect } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div>
      <div className="border p-4 h-64 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2">
        Send
      </button>
    </div>
  );
}
