"use client";

import { motion } from "framer-motion";
import { SlideRightVariant, SlideUpVariant } from "@/ui/animation/animation";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HomeServicesSkeleton } from "@/ui/home/loading";
import { GetAllSectionHeaders } from "@/lib/repository/home/sectionHeader";
import { GetAllPortfolios } from "@/lib/repository/portfolio";
import { StringToDate } from "@/lib/utilities/common";

const Works = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sectionHeaders, setSetSectionHeaders] = useState<any[]>([]);
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const worksData = await GetAllPortfolios("", 0, 0, "end", "desc", "true", "");
        if (worksData) {
          setWorks(worksData.data);
        }
        const sectionHeaderData = await GetAllSectionHeaders("", 0, 0, "", "asc", "03");
        if (sectionHeaderData) {
          setSetSectionHeaders(sectionHeaderData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || works.length === 0 || sectionHeaders.length === 0) return <HomeServicesSkeleton />

  return (
    <div className="w-full p-5 md:p-20 bg-neutral/90">
      <div className="w-full md:w-6/12 relative md:pl-10 pt-16 mb-20 flex flex-wrap justify-between">
        <motion.h3
          className="text-neutral font-bold text-9xl absolute left-0 top-0 -z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0}
        >
          03
        </motion.h3>
        <motion.h2
          className="font-semibold text-4xl md:text-5xl text-neutral-content"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0.2}
        >
          {sectionHeaders[0].title}
        </motion.h2>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-5">
        {works.map((item, index) => (
          index < 6 && <motion.div 
            key={index} 
            className="w-full md:w-[49%] relative h-96"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={index % 2 === 0 ? 0 : 0.2}
          >
            <Image src={item.image1} alt={item.title} width={1000} height={1000} className="w-full h-full object-cover" />
            <motion.div
              className="absolute bg-neutral/75 text-neutral-content top-0 bottom-0 right-0 left-0 flex flex-col justify-end items-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="m-10 pt-3 border-t-2 border-neutral-content flex items-center gap-5">
                <div>
                  <Link href={`/portfolio/${item.slug}`}>
                    <h2 className="font-semibold text-4xl mt-5 hover:underline hover:text-primary">{item.title}</h2>
                  </Link>
                  <p>{item.start && StringToDate(item.start)} {item.end && "-"} {item.end && StringToDate(item.end)}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                >
                  <Link href={`/portfolio/${item.slug}`} className="btn hover:btn-primary text-primary hover:text-primary-content rounded-full text-2xl h-12 w-12">
                    <FaPlus />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>        
        ))}
      </div>
    </div>
  );
};

export default Works;
