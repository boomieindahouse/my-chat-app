// src/app/home/page.js
"use client";

import { useEffect, useState } from "react"; // เพิ่ม useEffect ที่นี่
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // นำเข้า useAuth

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); // สร้าง state สำหรับเก็บผู้ใช้
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // ตรวจสอบสถานะการเข้าสู่ระบบ

  useEffect(() => {
    // ถ้าผู้ใช้ยังไม่ได้เข้าสู่ระบบ ให้เปลี่ยนเส้นทางไปยังหน้า sign in
    if (!isAuthenticated) {
      router.push("/signin");
    } else {
      // ดึงข้อมูลผู้ใช้เมื่อเข้าสู่ระบบแล้ว
      const fetchUsers = async () => {
        const response = await fetch('/api/getUsers'); // เรียก API เพื่อดึงผู้ใช้
        const data = await response.json();
        setUsers(data); // เก็บผู้ใช้ใน state
      };

      fetchUsers();
    }
  }, [isAuthenticated, router]);

  // ฟังก์ชันสำหรับค้นหา username และไปที่หน้าแชทของผู้ใช้
  const handleSearch = () => {
    console.log("Searching for:", searchTerm.trim()); // เช็คค่าที่กรอก
    console.log("Available users:", users); // เช็คผู้ใช้ที่มีในฐานข้อมูล

    const foundUser = users.find(user => user.username === searchTerm.trim());
    if (searchTerm.trim() && foundUser) {
      router.push(`/chat/${searchTerm}`);
    } else {
      alert("ไม่พบผู้ใช้! กรุณาตรวจสอบชื่อผู้ใช้ที่ค้นหา"); // แจ้งเตือนถ้าไม่พบผู้ใช้
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to ChatWeb</h1>
      <div className="flex items-center space-x-4 w-1/2">
        <input
          type="text"
          placeholder="Search username to chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
}
