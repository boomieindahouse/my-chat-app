// src/app/chat/page.jsx
"use client";

import ChatBox from '@/components/ChatBox';

export default function ChatPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Chat Room</h1>
      <ChatBox />
    </div>
  );
}
