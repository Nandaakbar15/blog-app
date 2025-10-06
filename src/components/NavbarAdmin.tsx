"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function NavBarAdmin() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // ⬅️ Ganti nama fungsi menjadi lebih deskriptif
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login"); // ⬅️ Arahkan pengguna ke halaman login
  };

  return (
    <div className="flex justify-end items-center bg-white shadow px-6 py-3 relative">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle className="text-3xl text-gray-600" />
        <span className="font-medium">Admin</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-14 right-6 w-48 bg-white rounded-lg shadow-lg border">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              ⚙️ Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              📊 Activity
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              🚪 Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
