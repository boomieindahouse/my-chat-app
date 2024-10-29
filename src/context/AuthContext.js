// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation"; // นำเข้า useRouter

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // เรียกใช้ useRouter

  const logIn = () => {
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setIsAuthenticated(false);
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
