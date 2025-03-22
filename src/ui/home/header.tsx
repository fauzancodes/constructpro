"use client"

import { motion } from "framer-motion";
import Image from 'next/image'
import { SlideRightVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { HeaderSkeleton } from "@/ui/home/loading";
import { GetAllPageHeaders } from "@/lib/repository/home/pageHeader";

type Props = {
  code: string;
}

const Header = ({ code }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [headers, setHeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const headersData = await GetAllPageHeaders("", 0, 0, "", "asc", code);
        if (headersData) {
          setHeaders(headersData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || headers.length === 0) return <HeaderSkeleton />

  return (
    <div className="h-96 flex items-center relative">
      <Image src={headers[0].image} alt="TENTANG KAMI" width={1000} height={1000} className="w-full h-full object-cover absolute" />
      <motion.div 
        className="w-full md:w-fit p-10 bg-base-200/75 border border-base-100 backdrop-blur-sm font-semibold text-5xl md:m-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideRightVariant}
        custom={0}
      >
        {headers[0].title}
      </motion.div>
    </div>
  )
}

export default Header