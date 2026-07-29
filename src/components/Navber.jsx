"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {

  const router = useRouter();
  

 const { 
        data: session, 
       
    } = authClient.useSession() 
    const user = session?.user

    console.log(session)

   


     const handleSignOut = async() => {
await authClient.signOut();
    }

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Lawyers", path: "/browse-lawyers" },
    { name: "Dashboard", path: "/dashboard" },

  ];


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
  <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg">
    Logout
  </button>
) : (
  <div className="flex items-center gap-2">
    <Link
      href="/login"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Login
    </Link>

    <Link
      href="/register"
      className=" bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Register
    </Link>
  </div>
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

           

            {/* Search */}
            <form className="flex">
              <input
                type="text"
                placeholder="Search lawyers..."
                 
                className="border px-3 py-2 rounded-l-lg w-full"
              />
               <button
                className="bg-blue-600 text-white px-4 rounded-r-lg"
              >
                Search
              </button>
              
            </form>

           {user ? (
  <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg">
    Logout
  </button>
) : (
  <div className="flex items-center gap-2">
    <Link
      href="/login"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Login
    </Link>

    <Link
      href="/register"
      className="border border-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Register
    </Link>
  </div>
)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;