"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    } else {
      const fetchCurrentUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/getCurrentUser?id=${userId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Current User:", data); // เช็คข้อมูลผู้ใช้ที่ดึงมาได้
          setCurrentUser(data);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/getUsers');
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchCurrentUser();
      fetchUsers();
    }
  }, [isAuthenticated, router, userId]);

  const handleSearch = () => {
    const foundUser = users.find(user => user.username === searchTerm.trim());
    if (searchTerm.trim() && foundUser) {
      router.push(`/chat/${searchTerm}`);
    } else {
      alert("ไม่พบผู้ใช้! กรุณาตรวจสอบชื่อผู้ใช้ที่ค้นหา");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to ChatWeb</h1>
      
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-6">
          Welcome {currentUser ? currentUser.username : "Loading..."}
        </h1>
      </div>

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
