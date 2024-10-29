// src/context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // เช็ค token ใน Local Storage เมื่อเริ่มต้น
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logIn = () => {
    // ตั้งค่า isAuthenticated เป็น true และเก็บ token ใน Local Storage
    localStorage.setItem("token", "your-token-here"); // ปรับ token ตามที่คุณใช้
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // ลบ token จาก Local Storage
    router.push("/"); // เปลี่ยนเส้นทางไปที่หน้าแรกเมื่อออกจากระบบ
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
