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
      const token = localStorage.getItem("constructpro_token");
      
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
          localStorage.removeItem("constructpro_token");
          router.push("/login");
          return;
        }

        if (!decoded) {
          console.log("invalid token")
          localStorage.removeItem("constructpro_token");
          router.push("/login");
          return;
        }

        const id = decoded.id;
        const user = await GetUserById(id);
        
        if (!user) {
          console.log("user not found")
          localStorage.removeItem("constructpro_token");
          router.push("/login");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error validating token", error);
        localStorage.removeItem("constructpro_token");
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
    <>
      <p className="h-screen w-full flex md:hidden justify-center items-center text-center p-5 text-2xl font-medium">
        ⚠️⚠️⚠️⚠️⚠️<br/><br/>
        Page for small screen is not available, please open with larger screen<br/><br/>
        ⚠️⚠️⚠️⚠️⚠️
      </p>
      <div className="w-full h-screen p-2 md:p-3 md:flex hidden">
        <SideNav />
        <div className="w-full bg-base-300 rounded-box ml-2 md:ml-5 overflow-y-auto p-2 md:p-3 shadow">{children}</div>
      </div>
    </>
  )
}

export default Layout