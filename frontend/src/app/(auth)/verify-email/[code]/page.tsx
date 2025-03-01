"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const { code } = useParams<{ code?: string }>(); // Ensure code is optional
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!code) throw new Error("Verification token is missing.");
      const response = await api.post("/verify-email", { code });
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Email verified successfully!");
      setTimeout(() => router.push("/sign-in"), 3000);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Invalid or expired token. Please try again."
      );
    },
  });

  const handleConfirm = () => {
    setIsConfirmed(true);
    mutate();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      <h2 className="text-xl font-semibold">Email Verification</h2>

      {!code ? (
        <p className="text-red-600">Verification token is missing.</p>
      ) : (
        <>
          <p className="text-gray-600">
            Click the button below to verify your email.
          </p>

          <button
            onClick={handleConfirm}
            disabled={isPending || isConfirmed}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            {isPending ? "Verifying..." : "Confirm Email"}
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
