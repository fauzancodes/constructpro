"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { GetUserById } from "@/lib/repository/user";
import Loading from "@/ui/home/loading";
import SideNav from "@/ui/dashboard/sideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("gemakaryamakmur_token");
      
      if (!token) {
        console.log("token not found")
        router.push("/login");
        return;
      }

      try {
        const decoded = jwt.decode(token) as { id: string; exp: number } | null;
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded && decoded.exp < currentTime) {
          console.log("token is expired")
          localStorage.removeItem("gemakaryamakmur_token");
          router.push("/login");
          return;
        }

        if (!decoded) {
          console.log("invalid token")
          localStorage.removeItem("gemakaryamakmur_token");
          router.push("/login");
          return;
        }

        const id = decoded.id;
        const user = await GetUserById(id);
        
        if (!user) {
          console.log("user not found")
          localStorage.removeItem("gemakaryamakmur_token");
          router.push("/login");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error validating token", error);
        localStorage.removeItem("gemakaryamakmur_token");
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-screen p-2 md:p-3 flex">
      <SideNav />
      <div className="w-full bg-base-300 rounded-box ml-2 md:ml-5 overflow-y-auto p-2 md:p-3 shadow">{children}</div>
    </div>
  )
}

export default Layout