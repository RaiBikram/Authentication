"use client";
import Layout from "@/components/layout/Layout";

import useAuth from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function Home() {
  const { data, isLoading } = useAuth();
const {}=useMutation({
  mutationFn:async()=>{
    return await api.post("/verify-email")
  }
})
  // If data is a single user object, wrap it in an array
  const users = data ? (Array.isArray(data) ? data : [data.user]) : [];
  // console.log(data)
  const handleClick = () => {};
  return (
    <div>
      <Layout>
        <div className="min-h-[60vh] w-full p-20">
          Home
          {isLoading ? (
            <p>Loading...</p>
          ) : users.length > 0 ? (
            users.map((user: any, index: number) => (
              <div key={index}>
                <p>Full name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>
                  Verified: {user.isVerified ? "true" : "false"}
                  &nbsp;
                  {!user.isVerified && (
                    <span className="text-blue-600">
                      <Button onClick={handleClick}>Verify Now</Button>
                    </span>
                  )}
                </p>

                <p>Role:{user.role}</p>
              </div>
            ))
          ) : (
            <p>No user data found.</p>
          )}
        </div>
      </Layout>
    </div>
  );
}
