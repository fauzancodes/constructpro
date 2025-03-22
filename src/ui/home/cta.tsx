"use client"

import { motion  } from "framer-motion";
import Image from "next/image"
import { FaArrowUpRightFromSquare, FaClock, FaUsers } from "react-icons/fa6"
import { SlideRightVariant, SlideUpVariant } from "@/ui/animation/animation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTASkeleton } from "@/ui/home/loading";
import { GetAllWorkValues } from "@/lib/repository/about/workValue";
import { GetAllSectionHeaders } from "@/lib/repository/home/sectionHeader";

const CTA = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cta, setCTA] = useState<any[]>([]);
  const [sectionHeaders, setSetSectionHeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const ctaData = await GetAllWorkValues("", 0, 0, "", "asc");
        if (ctaData) {
          setCTA(ctaData.data);
        }
        const sectionHeaderData = await GetAllSectionHeaders("", 0, 0, "", "asc", "01");
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

  if (isLoading || cta.length === 0 || sectionHeaders.length === 0) return <CTASkeleton />

  return (
    <div className="w-full flex flex-wrap gap-10 p-5 md:p-20">
      <motion.div 
        className="w-full md:w-5/12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideRightVariant}
        custom={0}
      >
        <Image src={cta[0].image} alt="Contact Us" width={1000} height={1000} />
        <div className="bg-primary p-10">
          <p className="text-base-100 font-medium text-2xl mb-5">{cta[0].callToAction1}</p>
          <motion.div 
            className="w-fit"
            whileHover={{ scale: 1.1 }}
          >
            <Link href={`/contact`} className="btn text-primary hover:btn-primary hover:text-primary-content">
              {cta[0].callToAction2}
              <FaArrowUpRightFromSquare className="ml-3" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <div className="w-full md:w-6/12 md:pl-10 pt-16 relative">
        <motion.h3 
          className="text-base-300 font-bold text-9xl absolute left-0 top-0 -z-10"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0.2}
        >
          01
        </motion.h3>
        <motion.h2 
          className="font-semibold text-4xl md:text-5xl mb-5"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0.4}
        >
          {sectionHeaders[0].title}
        </motion.h2>
        <motion.p 
          className="mb-10"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={0}
        >
          {cta[0].description}
        </motion.p>
        <div className="flex flex-wrap gap-5 justify-between">
          <motion.div 
            className="w-full md:w-5/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.2}
          >
            <div>
              <div className="bg-base-300 w-fit p-5 text-primary rounded-full">
                <FaUsers className="text-5xl" />
              </div>
            </div>
            <hr className="mb-5 mt-10"/>
            <h3 className="font-semibold text-2xl">{cta[0].subtitle1}</h3>
            <p>{cta[0].subdescription1}</p>
          </motion.div>
          <motion.div 
            className="w-full md:w-5/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.4}
          >
            <div>
              <div className="bg-base-300 w-fit p-5 text-primary rounded-full">
                <FaClock className="text-5xl" />
              </div>
            </div>
            <hr className="mb-5 mt-10"/>
            <h3 className="font-semibold text-2xl">{cta[0].subtitle1}</h3>
            <p>{cta[0].subdescription1}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CTA