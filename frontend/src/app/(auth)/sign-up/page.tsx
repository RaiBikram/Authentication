"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  // Define the mutation using useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      return api.post("/register", data);
    },
    onSuccess: (response) => {
      toast.success(response.data.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "" });
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed!");
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    mutate(formData);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isPending}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isPending}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isPending}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 flex justify-center"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
