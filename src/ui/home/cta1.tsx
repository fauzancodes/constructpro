"use client"

import { motion  } from "framer-motion";
import Image from "next/image"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { SlideRightVariant, SlideUpVariant } from "@/ui/animation/animation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExpSkeleton } from "@/ui/home/loading";
import { GetAllCallToActions } from "@/lib/repository/home/callToAction";

const CTA1 = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cta, setCTA] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const ctaData = await GetAllCallToActions("", 0, 0, "", "asc");
        if (ctaData) {
          setCTA(ctaData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || cta.length === 0) return <ExpSkeleton />

  return (
    <div className="flex flex-wrap relative bg-neutral/75 p-5 md:p-20">
      <Image src={cta[0].image1} alt="Kerja Sama" width={1000} height={1000} className="w-full h-full absolute left-0 top-0 -z-10 object-cover grayscale" />
      <div className="w-full md:w-6/12">
        <motion.h2 
          className="text-4xl md:text-6xl font-semibold mb-10 text-neutral-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0}
        >
          {cta[0].title}
        </motion.h2>
        <div className="flex flex-wrap gap-5">
          <motion.div
            className="w-full md:w-fit"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.2}
            whileHover={{ scale: 1.1 }}
          >
            <Link href={"/quotation"} className="btn btn-primary btn-lg">
              {cta[0].callToAction1}
              <FaArrowUpRightFromSquare className="ml-3" />
            </Link>
          </motion.div>
          <motion.div
            className="w-full md:w-fit"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.4}
            whileHover={{ scale: 1.1 }}
          >
            <Link href={"/contact"} 
              className="btn btn-lg text-primary hover:btn-primary hover:text-primary-content"
            >
              {cta[0].callToAction2}
              <FaArrowUpRightFromSquare className="ml-3" />
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.h2 
        className="bg-primary text-primary-content font-medium text-2xl p-10 mt-10 md:absolute bottom-0 right-20 w-96"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.6}
      >
        {cta[0].description}
      </motion.h2>
    </div>
  )
}

export default CTA1