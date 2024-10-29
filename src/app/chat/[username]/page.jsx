// src/app/chat/[username]/page.js
"use client";

import React from "react"; // เพิ่มบรรทัดนี้
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatPage({ params }) {
  const { username } = React.use(params);
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push("/home"); // ถ้าไม่มี username ให้กลับไปหน้า home
    }
  }, [username, router]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Chat with {username}</h1>
      <div className="w-1/2 h-64 border p-4 rounded overflow-y-scroll bg-gray-100">
        {/* ส่วนนี้จะแสดงข้อความแชท */}
        <p>Welcome to the chat with {username}!</p>
      </div>
    </div>
  );
}
