"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = ({ user, role = "user" }) => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Lawyers", path: "/browse-lawyers" },
    { name: "Dashboard", path: "/dashboard" },

  ];

  const dashboardLinks = {
    admin: [
      { name: "Admin Dashboard", path: "/dashboard/admin" },
      { name: "Manage Lawyers", path: "/dashboard/manage-lawyers" },
      { name: "Manage Users", path: "/dashboard/manage-users" },
    ],
    lawyer: [
      { name: "Lawyer Dashboard", path: "/dashboard/lawyer" },
      { name: "Appointments", path: "/dashboard/appointments" },
      { name: "Profile", path: "/dashboard/profile" },
    ],
    user: [
      { name: "My Dashboard", path: "/dashboard" },
      { name: "My Bookings", path: "/dashboard/bookings" },
      { name: "Profile", path: "/dashboard/profile" },
    ],
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            LegalEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium transition ${
                  pathname === link.path
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() =>
                    setDashboardOpen(!dashboardOpen)
                  }
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                  <ChevronDown size={18} />
                </button>

                {dashboardOpen && (
                  <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-52 py-2">
                    {dashboardLinks[role]?.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search */}
            <form className="flex">
              <input
                type="text"
                placeholder="Search lawyers..."
                className="border rounded-l-lg px-3 py-2 focus:outline-none"
              />
              <button
                className="bg-blue-600 text-white px-4 rounded-r-lg"
              >
                Search
              </button>
            </form>

            {/* Auth */}
            {user ? (
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block ${
                  pathname === link.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard Mobile */}
            {user && (
              <>
                <h3 className="font-semibold">Dashboard</h3>

                {dashboardLinks[role]?.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block pl-4 text-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}

            {/* Search */}
            <form className="flex">
              <input
                type="text"
                placeholder="Search lawyers..."
                className="border px-3 py-2 rounded-l-lg w-full"
              />
              <button className="bg-blue-600 text-white px-4 rounded-r-lg">
                Go
              </button>
            </form>

            {user ? (
              <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-center bg-blue-600 text-white py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;