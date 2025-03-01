import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/verify-email", { token });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email verified successfully!");
      setTimeout(() => router.push("/sign-in"), 3000);
    },
    onError: () => {
      toast.error("Invalid or expired token. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter verification code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {isPending ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      {isSuccess && <p className="text-green-500">✅ Email verified!</p>}
      {isError && <p className="text-red-500">❌ Verification failed.</p>}
    </div>
  );
};

export default VerifyEmail;
