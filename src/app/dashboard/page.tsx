"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/quotation");
  }, [router]);

  return null;
}

export default Dashboard