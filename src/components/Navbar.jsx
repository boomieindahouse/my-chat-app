// src/components/Navbar.jsx
"use client";

import React, { useState, useEffect } from "react"; // เพิ่มการนำเข้า React
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ตรวจสอบเส้นทางนี้
import socket from "@/utils/socket"; // นำเข้า socket

const Navbar = () => {
  const { isAuthenticated, logOut } = useAuth();
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      // ฟังเหตุการณ์ receiveMessage จากเซิร์ฟเวอร์
      socket.on("receiveMessage", () => {
        setNotificationCount(prevCount => prevCount + 1);
      });
    }

    // ทำการถอนการติดตั้งเมื่อมีการเปลี่ยนแปลง
    return () => {
      socket.off("receiveMessage");
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    logOut();
    router.push("/signin");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">ChatWeb</h1>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <button onClick={handleLogout} className="text-white">Logout</button>
            <div className="relative">
              {/* แสดงปุ่ม Notification เมื่อผู้ใช้เข้าสู่ระบบ */}
              <button className="bg-blue-500 p-2 rounded">
                Notifications {notificationCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1">{notificationCount}</span>}
              </button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/signin")} className="text-white">Sign In</button>
            <button onClick={() => router.push("/signup")} className=" p-2 rounded">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
