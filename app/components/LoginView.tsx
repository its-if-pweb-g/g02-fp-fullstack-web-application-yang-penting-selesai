"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/AuthContext";

interface FormData {
  email: string;
  password: string;
}

export default function LoginView() {

  const router = useRouter();

  const { login } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setIsEmailValid(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
      );
    }

    if (name === "password") {
      setIsPasswordValid(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(value)
      );
    }

  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      setAlert({ message: "All fields are required.", type: "error" });
      setLoading(false);
      return;
    }

    if (!isEmailValid) {
      setAlert({ message: "Please enter a valid email address.", type: "error" });
      setLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setAlert({ message: "Password must be at least 8 characters long and contain an uppercase letter, a number, and a special character.", type: "error" });
      setLoading(false);
      return;
    }

    try {

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if( res.ok ) {
        login(data.token);
        router.push("/");

      } else {
        setAlert({ message: data.message || "Failed to login", type: "error" });

      }

    } catch (error) {
        console.error("Error during login:", error);
        setAlert({ message: "An error occurred", type: "error" });

    } finally {
        setLoading(false);

    }

  }, [formData, isEmailValid, isPasswordValid]);

  return (
    <div className="mx-auto max-w-lg ">
      <section className="rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <div className="flex flex-col lg:min-h-screen">
          <div className="relative block h-16">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="-hue-rotate-[167deg] opacity-90 absolute inset-0 h-full w-full object-cover rounded-t-lg "
            />
          </div>

          <main className="items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="grow w-full mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Masuk ke TokoKu!
              </h1>

              {alert && (
                <div className={`mt-4 p-4 rounded ${alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {alert.message}
                </div>
              )}

              <form action="#" className=" mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your email"
                    className="mt-1 w-full rounded-md border-gray-200  bg-white p-2 pe-12 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="create a password"
                    className="mt-1 w-full rounded-md border-gray-200  bg-white p-2 pe-12 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="col-span-6 mt-2 flex flex-col sm:items-center">
                  <button disabled={loading} className="mb-4 inline-block w-full rounded-md border border-[#a9ca4e] bg-[#a9ca4e] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#859F3D] focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  <p className="mt-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                    Baru di TokoKu?{" "}
                    <a
                      href="/auth/register"
                      className="text-gray-700 underline dark:text-gray-200">
                      {" "}
                      Daftar
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
