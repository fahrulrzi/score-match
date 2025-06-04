import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-full overflow-hidden relative">
      <div className="flex flex-col md:gap-6 md:p-16 md:py-14">
        <div className="flex">
          <div className="font-bold text-black text-2xl">
            What We Provide You!
          </div>
          <div>-----</div>
        </div>
        <div className="md:gap-3 flex flex-col ">
          <div className="md:text-4xl font-extrabold text-[var(--pink)]">
            A trusted and secure
          </div>
          <div className="md:text-5xl font-extrabold text-[var(--green)]">
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
            href="/register"
            className="cursor-pointer font-bold text-white bg-[var(--pink)] hover:bg-[var(--pink-hover)] focus:ring-4 focus:ring-blue-300 duration-200 rounded-lg text-sm px-10 py-2.5 me-2 mb-2 focus:outline-none">
            Get Started
          </Link>
          <Link
            href="/login"
            className="cursor-pointer font-bold bg-[var(--green)] text-black hover:bg-[var(--green-hover)] focus:ring-4 focus:ring-blue-300 duration-200 rounded-lg text-sm px-10 py-2.5 me-2 mb-2 focus:outline-none">
            Login
          </Link>
        </div>
        <div className="text-3xl font-bold text-[var(--green)]">
          Beyond Scores — Insight You Can Trust.
        </div>
      </div>
    </div>
  );
}
