import Link from "next/link";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-3">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold">
              LegalConnect
            </h2>
            <p className="mt-3 text-gray-400">
              Find and hire trusted legal experts
              anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about">About</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a href="#">
                <FaFacebook />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaLinkedin />
              </a>

              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Newsletter
            </h3>

            <p className="text-gray-400 mb-3">
              Subscribe for legal updates.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter Email"
                className="input input-bordered rounded-r-none text-black w-full"
              />

              <button className="btn btn-primary rounded-l-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} LegalConnect.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
