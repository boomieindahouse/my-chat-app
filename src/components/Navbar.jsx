// src/components/Navbar.jsx
"use client"; // เพิ่มบรรทัดนี้ที่ด้านบนสุด

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl">ChatWeb</h1>
      <div>
        {isAuthenticated ? (
          <button onClick={logOut} className="p-2">
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/signin" className="p-2 px-5">
              Sign In
            </Link>
            <Link href="/signup" className="p-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
