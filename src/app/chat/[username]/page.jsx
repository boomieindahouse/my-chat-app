"use client";

import React, { useEffect, useState } from "react"; // เพิ่มการนำเข้า React
import { useRouter } from "next/navigation";

export default function ChatPage({ params }) {
  const { username } = React.use(params); // ใช้ React.use เพื่อดึงค่า username
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!username) {
      router.push("/home");
    }
  }, [username, router]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'You' }]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Chat with {username}</h1>
      <div className="w-1/2 h-64 border p-4 rounded overflow-y-scroll bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex w-1/2 mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
          Send
        </button>
      </form>
    </div>
  );
}
