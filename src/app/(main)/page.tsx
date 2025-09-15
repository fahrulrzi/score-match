"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

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

  return (
    <div className=" w-screen relative overflow-hidden h-screen pt-[19vh]">
      <div className="h-96 w-96 absolute rounded-full -translate-y-80 -translate-x-20 bg-[var(--pink)] opacity-25 -z-50"></div>
      <div className="flex flex-col md:gap-6 gap-3 md:p-16 md:py-14 px-8 text-justify z-50">
        <div className="flex">
          <div className="font-bold text-black text-2xl">
            What We Provide You!
          </div>
        </div>
        <div className="md:gap-3 flex flex-col ">
          <div className="md:text-4xl text-2xl font-extrabold text-[var(--pink)]">
            A trusted and secure
          </div>
          <div className="md:text-5xl text-3xl font-extrabold text-[var(--green)]">
            CREDIT SCORING PLATFORM
          </div>
        </div>
        <div className=" md:w-2/5 text-black">
          SkorMatch adalah solusi penilaian kredit modern yang mengintegrasikan
          perhitungan matematis dengan analisis data yang akurat untuk
          memberikan penilaian kredit yang objektif. Dengan SkorMatch, proses
          penilaian kredit Anda dapat dilakukan dengan lebih cepat, akurat, dan
          inklusif.
        </div>
        <div className="flex md:gap-28 md:w-2/5">
          <Link
            href="/score"
            className="cursor-pointer font-bold text-white bg-[var(--pink)] hover:bg-[var(--pink-hover)] focus:ring-4 focus:ring-blue-300 duration-200 rounded-lg text-sm px-10 py-2.5 me-2 mb-2 focus:outline-none">
            Get Started
          </Link>
          {username ? null : (
            <Link
              href="/login"
              className="cursor-pointer font-bold bg-[var(--green)] text-black hover:bg-[var(--green-hover)] focus:ring-4 focus:ring-blue-300 duration-200 rounded-lg text-sm px-10 py-2.5 me-2 mb-2 focus:outline-none">
              Login
            </Link>
          )}
        </div>
        <div className="md:text-3xl text-2xl font-bold text-[var(--green)]">
          Beyond Scores — Insight You Can Trust.
        </div>
      </div>
      <div className="h-[800px] w-[800px] absolute right-30 left-auto top-96 rounded-full bg-[var(--green)] opacity-25 -z-50"></div>
      <div className="h-[800px] w-[800px] absolute right-0 md:flex hidden left-auto top-44 rounded-full bg-[var(--green)] -z-50 translate-x-52"></div>
      <Image
        src="/component/wallet.png"
        alt="Score Match Logo"
        width={1080}
        height={1080}
        className="h-96 w-96 md:flex hidden absolute top-64 right-36 left-auto z-0"
      />
      <div className="h-[800px] w-[800px] absolute right-0 md:flex hidden left-auto top-44 rounded-full bg-[var(--green)] -z-50 translate-x-52"></div>
    </div>
  );
}
