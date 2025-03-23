"use client"

import { motion  } from "framer-motion";
import Image from "next/image"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { SlideRightVariant, SlideUpVariant } from "@/ui/animation/animation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HomeServicesSkeleton } from "@/ui/home/loading";
import { GetAllServices } from "@/lib/repository/service";
import { GetAllSectionHeaders } from "@/lib/repository/home/sectionHeader";

const Services = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sectionHeaders, setSetSectionHeaders] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const servicesData = await GetAllServices("", 0, 0, "order", "asc", "true");
        if (servicesData) {
          setServices(servicesData.data);
        }
        const sectionHeaderData = await GetAllSectionHeaders("", 0, 0, "", "asc", "02");
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

  if (isLoading || services.length === 0 || sectionHeaders.length === 0) return <HomeServicesSkeleton />

  return (
    <div className="w-full p-5 md:p-20">
      <div className="w-full relative md:pl-10 pt-16 mb-20">
        <motion.h3 
          className="text-base-300 font-bold text-9xl absolute left-0 top-0 -z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0}
        >
          02
        </motion.h3>
        <motion.h2 
          className="font-semibold text-4xl md:text-5xl"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0.2}
        >
          {sectionHeaders[0].title}
        </motion.h2>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-10">
        {services.map((item, index) => (
          <motion.div 
            key={index} 
            className="w-full md:w-[48%] min-h-96 border border-base-300 p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={index % 2 === 0 ? 0 : 0.2}
          >
            <Image src={item.image} alt={item.title} width={1000} height={1000} className="mb-5 h-80 object-cover"/>
            <h3 className="mb-5 font-semibold text-2xl">{item.title}</h3>
            <p className="mb-5">{item.description}</p>
            <motion.div 
              className="w-fit"
              whileHover={{ scale: 1.1 }}
            >
              <Link href={"/services"} className="btn text-primary hover:btn-primary hover:text-primary-content">
                Learn More
                <FaArrowUpRightFromSquare className="ml-3" />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services