"use client";

import CardProfile from "@/components/CardProfile";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
// import Aos from "aos";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // optional: biar lebih smooth
      once: true, // animasi cuma jalan sekali
    });
  }, []);
  return (
    <div className="flex w-screen pt-[17vh]">
      <div className="w-full flex flex-col md:px-20 p-4 justify-center items-center">
        <div
          data-aos="zoom-in"
          className="h-full flex justify-center items-center w-full font-bold text-[var(--pink)] text-3xl">
          BOARD OF DIRECTOR
        </div>
        <div className="md:grid md:grid-cols-3 flex flex-col md:flex-row mt-10 bg-gray-100 w-full h-full rounded-3xl py-20 justify-center items-center md:gap-0 gap-16">
          <div
            data-aos="flip-right"
            className="flex justify-center items-center">
            <CardProfile
              name="THALITHA N K"
              photo="/director/thalita.png"
              width={400}
              height={300}></CardProfile>
          </div>
          <div
            className="flex justify-center items-center"
            data-aos="flip-right">
            <CardProfile
              name="KEISHA NARA S"
              photo="/director/keisha.png"
              width={400}
              height={300}></CardProfile>
          </div>
          <div
            className="justify-center md:flex hidden items-center"
            data-aos="flip-right">
            <CardProfile
              name="KHAIRINA A"
              photo="/director/khairina.png"
              width={190}
              height={300}></CardProfile>
          </div>
          <div
            className="flex md:hidden justify-center items-center"
            data-aos="flip-right">
            <CardProfile
              name="KHAIRINA A"
              photo="/director/khairina.png"
              width={270}
              height={300}></CardProfile>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
