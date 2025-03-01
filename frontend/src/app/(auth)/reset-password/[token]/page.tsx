"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const ResetNewPassword = () => {
  const router = useRouter();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
// console.log(token)
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/reset-password", {
        resetToken:token,
        password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.data.message || "Password reset successfully!");
      setTimeout(() => router.push("/"), 3000);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "frontend");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please enter a new password.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    mutate();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={isPending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              disabled={isPending}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetNewPassword;
