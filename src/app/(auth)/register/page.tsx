"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { register } from "@/lib/Auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama");
      alert("Password tidak sama");
      return;
    }

    setError("");

    try {
      const res = await register({ username, email, password });
      console.log(res);

      window.location.href = "/";
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="bg-gray-200 justify-center items-center flex h-svh">
      <section className="w-screen">
        <div className="h-full">
          <div className="flex h-full flex-wrap items-center justify-center">
            <div className="shrink-1 mb-12 justify-center items-center md:flex grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 hidden">
              <Image
                src="/icon.png"
                className="w-96 h-96 bg-white p-8 rounded-xl"
                alt="Score Match"
                width={1080}
                height={1080}
              />
            </div>

            <div className="md:mb-0 md:w-8/12 lg:w-8/12 xl:w-5/12 w-full h-full md:p-20 p-8">
              <form className="bg-white text-black p-8 rounded-lg">
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 me-4 text-lg">Sign up to Score Match</p>
                </div>

                {/* Username Input */}
                <div className="relative mb-6 mt-8 bg-gray-200 rounded-lg items-center flex">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`peer block w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 placeholder:opacity-0 focus:placeholder:opacity-100`}
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-3  max-w-[90%] truncate text-black transition-all duration-200 ease-out pointer-events-none 
                ${
                  username
                    ? "-translate-y-[1.4rem] scale-[0.8] text-primary"
                    : "peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.8] opacity-50 peer-focus:text-primary"
                }`}>
                    Username
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative mb-6 mt-8 bg-gray-200 rounded-lg items-center flex">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`peer block w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 placeholder:opacity-0 focus:placeholder:opacity-100`}
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-3  max-w-[90%] truncate text-black transition-all duration-200 ease-out pointer-events-none 
                ${
                  email
                    ? "-translate-y-[1.4rem] scale-[0.8] text-primary"
                    : "peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.8] opacity-50 peer-focus:text-primary"
                }`}>
                    Email address
                  </label>
                </div>

                <div className="flex md:gap-4 justify-center items-center md:flex-row flex-col">
                  {/* Password Input */}
                  <div className="relative mb-6 bg-gray-200 rounded-lg items-center flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`peer block w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 placeholder:opacity-0 focus:placeholder:opacity-100`}
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className={`absolute left-3 max-w-[90%] truncate text-black transition-all duration-200 ease-out pointer-events-none
                ${
                  password
                    ? "-translate-y-[1.4rem] scale-[0.8] text-primary"
                    : "peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.8] opacity-50 peer-focus:text-primary"
                }`}>
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                  {/* Confirm Password Input */}
                  <div className="relative mb-6 bg-gray-200 rounded-lg items-center flex">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`peer block w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 placeholder:opacity-0 focus:placeholder:opacity-100`}
                      placeholder="Confirm Password"
                    />
                    <label
                      htmlFor="confirmPassword"
                      className={`absolute left-3 max-w-[90%] truncate text-black transition-all duration-200 ease-out pointer-events-none
                ${
                  confirmPassword
                    ? "-translate-y-[1.4rem] scale-[0.8] text-primary"
                    : "peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.8] opacity-50 peer-focus:text-primary"
                }`}>
                      Confirm Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none">
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-block w-full cursor-pointer rounded bg-[var(--pink)] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-[var(--pink-hover)] hover:shadow-lg focus:bg-primary-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-lg">
                  Create account
                </button>

                {error && (
                  <p className="text-red-500 text-sm mt-4 text-center">
                    {error}
                  </p>
                )}

                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                  <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="inline-block w-full cursor-pointer rounded bg-gray-400 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-500 hover:shadow-lg focus:bg-primary-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-lg">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
