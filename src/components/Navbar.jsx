// src/components/Navbar.js
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">ChatWeb</h1>
      <div className="space-x-4">
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
