"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";

function parseJwt(token: string | null) {
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const jsonPayload = decodeURIComponent(
      Array.from(atob(payloadBase64))
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function ProtectedAdminClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // try {
    //   const token = localStorage.getItem("token");
    //   const account = api.post('/me').then((res) => res.data);
    //   const payload = parseJwt(token);
    //   const now = Math.floor(Date.now() / 1000);

    //   if (!token || !account) {
    //     router.replace("/login");
    //     return;
    //   }
    //   setReady(true);
    // } catch {
    //   router.replace("/login");
    // }
    setReady(true);
  }, [router]);

  if (!ready) return <div className="p-6">Loading…</div>;
  return <>{children}</>;
}