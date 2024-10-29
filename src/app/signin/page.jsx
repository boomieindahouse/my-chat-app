"use client"; // เพิ่มบรรทัดนี้

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; // นำเข้า useAuth

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { logIn, isAuthenticated } = useAuth(); // เรียกใช้ logIn และ isAuthenticated

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อเปิดหน้า Sign In
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home"); // ถ้าเข้าสู่ระบบแล้ว ให้ไปหน้า home
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      logIn(); // เรียกใช้ logIn เมื่อเข้าสู่ระบบสำเร็จ
      router.push("/home");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-1/3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
