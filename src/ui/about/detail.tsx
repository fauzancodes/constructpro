"use client"

import { motion } from "framer-motion";
import { SlideUpVariant } from "@/ui/animation/animation";
import Link from "next/link";
import { AboutDetailSkeleton } from "@/ui/home/loading";
import { GetAllAboutUs } from "@/lib/repository/about/aboutUs";
import { useEffect, useState } from "react";
import { GetAllAchievements } from "@/lib/repository/about/achievement";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [about, setAbout] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const aboutData = await GetAllAboutUs("", 0, 0, "", "asc");
        if (aboutData) {
          setAbout(aboutData.data);
        }
        const achievementsData = await GetAllAchievements("", 0, 0, "", "asc", "");
        if (achievementsData) {
          setAchievements(achievementsData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || about.length === 0 || achievements.length === 0) return <AboutDetailSkeleton />

  return (
    <div className="w-full md:w-6/12">
      <motion.h1 
        className="font-semibold text-5xl mb-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        {about[0].title}
      </motion.h1>
      <motion.div 
        dangerouslySetInnerHTML={{ __html: about[0].description }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      ></motion.div>
      <motion.div
        className="mt-5 w-fit"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
        whileHover={{ scale: 1.1 }}
      >
        <Link href={"/quotation"} className="btn btn-primary btn-lg">
          {about[0].callToAction}
        </Link>
      </motion.div>
      <motion.div 
        className="flex flex-wrap justify-between items-center gap-5 mt-10 bg-neutral text-neutral-content p-5 md:p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        {achievements.map((item, index) => (
          <div key={index}>
            <div className="font-semibold text-5xl text-primary">{item.total}+</div>
            <div>{item.title}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Detail