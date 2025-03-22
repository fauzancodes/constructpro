"use client"

import { motion } from "framer-motion";
import Image from "next/image"
import { SlideRightVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { AboutImagesSkeleton } from "@/ui/home/loading";
import { GetAllAboutUs } from "@/lib/repository/about/aboutUs";

const Images = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [about, setAbout] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const aboutData = await GetAllAboutUs("", 0, 0, "", "asc");
        if (aboutData) {
          setAbout(aboutData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || about.length === 0) return <AboutImagesSkeleton />

  return (
    <div className="w-full md:w-5/12 relative mb-5 md:mb-0">
      <motion.div
        className="md:absolute w-full md:w-10/12 h-full right-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideRightVariant}
        custom={0}
      >
        <Image src={about[0].image1} alt="Tentang Kami" width={1000} height={1000} className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        className="hidden md:block absolute w-50 h-50 top-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideRightVariant}
        custom={0.2}
      >
        <Image src={about[0].image2} alt="Tentang Kami" width={1000} height={1000} className="h-full w-full object-cover border-5 border-base-100" />
      </motion.div>
      <motion.div
        className="hidden md:block absolute w-75 h-50 top-70"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideRightVariant}
        custom={0}
      >
        <Image src={about[0].image3} alt="Tentang Kami" width={1000} height={1000} className="h-full w-full object-cover border-5 border-base-100" />
      </motion.div>
    </div>
  )
}

export default Images