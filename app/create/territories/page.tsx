"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TerritoriesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/create/result");
  }, [router]);

  return null;
}
