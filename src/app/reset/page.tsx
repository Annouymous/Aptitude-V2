"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      alert(
        "Browser storage has been cleared. You will be redirected to the homepage."
      );
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Resetting...</h1>
    </div>
  );
}
