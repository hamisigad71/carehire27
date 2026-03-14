"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BusinessPortal() {
  const router = useRouter();

  useEffect(() => {
    router.push("/business/dashboard");
  }, [router]);

  return null;
}
