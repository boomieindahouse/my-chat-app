// src/app/page.js
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-10 text-3xl">Welcome to ChatWeb</h1>
    </div>
  );
}
