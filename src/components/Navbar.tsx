"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string): boolean => pathname === path;

  const getLinkClassName = (path: string): string => {
    const base =
      "block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 text-lg";
    return isActive(path)
      ? `${base} text-[#b8e28a] font-semibold`
      : `${base} text-black hover:text-[#b8e28a] md:dark:hover:text-[#b8e28a]`;
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsed = JSON.parse(user);
          setUsername(parsed.user?.username || null);
        } catch {
          setUsername(null);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie =
      "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUsername(null);
    window.location.href = "/login";
  };

  return (
    <nav className="border-gray-200 px-0 md:px-20 w-screen md:h-[17vh] h-fit backdrop-blur-xs">
      <div className="w-screen flex flex-row flex-wrap items-center md:p-0 p-6 md:justify-start justify-between md:gap-36">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/icon.png"
            alt="Score Match Logo"
            width={1080}
            height={1080}
            className="h-20 w-20 sm:h-30 sm:w-30"
          />
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`transition-all w-full duration-300 ease-in-out z-50 ${
            isMenuOpen ? "flex relative" : "hidden"
          } md:flex md:w-4/6 sm:mt-6`}
          id="navbar-default">
          <ul className="font-medium flex bg-[var(--pink)] md:bg-transparent justify-center items-center flex-col w-full md:static absolute md:gap-14 p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className={getLinkClassName("/")}
                aria-current={isActive("/") ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/score"
                onClick={toggleMenu}
                className={getLinkClassName("/score")}
                aria-current={isActive("/score") ? "page" : undefined}>
                Score
              </Link>
            </li>
            <li>
              <Link
                href="/database"
                onClick={toggleMenu}
                className={getLinkClassName("/database")}
                aria-current={isActive("/database") ? "page" : undefined}>
                Database
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                onClick={toggleMenu}
                className={getLinkClassName("/about-us")}
                aria-current={isActive("/about-us") ? "page" : undefined}>
                About Us
              </Link>
            </li>

            {/* === Auth Section === */}
            <li className="mt-4 md:mt-0 md:me-0 md:ms-auto">
              {username ? (
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                  <span className="text-lg font-medium text-black">
                    👋 {username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-[var(--green)] text-white px-4 py-1 rounded hover:bg-[var(--green-hover)] text-sm transition">
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="bg-[var(--green)] text-white px-4 py-2 rounded hover:bg-[var(--green-hover)] transition md:w-full w-full justify-center flex text-sm">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
