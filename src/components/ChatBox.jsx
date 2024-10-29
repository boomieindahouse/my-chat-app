// src/components/ChatBox.jsx
"use client";

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // เปลี่ยน URL ตามเซิร์ฟเวอร์ของคุณ

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // ฟังเหตุการณ์ที่รับข้อความ
    socket.on('receive message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // ลบ listener เมื่อ component ถูก unmount
    return () => {
      socket.off('receive message');
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim()) {
      socket.emit('send message', messageInput); // ส่งข้อความไปยังเซิร์ฟเวอร์
      setMessageInput(''); // เคลียร์ input
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message"
        className="border p-2 rounded w-full"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white py-2 px-4 rounded">
        Send
      </button>
    </div>
  );
}
