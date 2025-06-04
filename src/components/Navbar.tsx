"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  const getLinkClassName = (path: string): string => {
    const baseClasses =
      "block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 text-lg";

    if (isActive(path)) {
      return `${baseClasses} text-white bg-blue-700 md:bg-transparent md:text-[#b8e28a] font-semibold`;
    }

    return `${baseClasses} text-gray-900 hover:text-[#b8e28a] text-black md:dark:hover:text-[#b8e28a]`;
  };

  return (
    <nav className="border-gray-200 px-0 sm:px-20 w-screen backdrop-blur-xs">
      <div className="max-w-screen-xl flex flex-wrap items-center p-0 sm:justify-start justify-between sm:gap-36">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/icon.png"
            alt="Flowbite Logo"
            width={1080}
            height={1080}
            className="h-12 w-12 sm:h-30 sm:w-30"
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
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto sm:mt-6`}
          id="navbar-default">
          <ul className="font-medium flex flex-col gap-14  p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <Link
                href="/"
                className={getLinkClassName("/")}
                aria-current={isActive("/") ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/score"
                className={getLinkClassName("/score")}
                aria-current={isActive("/score") ? "page" : undefined}>
                Score
              </Link>
            </li>
            <li>
              <Link
                href="/database"
                className={getLinkClassName("/database")}
                aria-current={isActive("/database") ? "page" : undefined}>
                Database
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={getLinkClassName("/about-us")}
                aria-current={isActive("/about-us") ? "page" : undefined}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
