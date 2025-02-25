export const cookiesOptions: Record<string, unknown> = {
    httpOnly: true, // Cookie is not accessible via client-side script
    secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS in production
    sameSite: "strict", // Cookie will only be sent in a first-party context
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };