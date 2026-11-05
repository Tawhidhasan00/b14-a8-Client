"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Notifications() {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("auth") !== "google") return;
    toast.success("Logged in successfully", { id: "google-login" });
    url.searchParams.delete("auth");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [userId]);

  return <Toaster position="top-center" />;
}
