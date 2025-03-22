"use client"

import { motion  } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { SlideUpVariant } from "@/ui/animation/animation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainCTASkeleton } from "@/ui/home/loading";
import { GetAllCallToActions } from "@/lib/repository/home/callToAction";

const CTA2 = () => {
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

  if (isLoading || cta.length === 0) return <MainCTASkeleton />

  return (
    <div className="w-full h-[40rem] bg-full bg-base-200 flex flex-col items-center justify-center gap-10 p-5 relative">
      <motion.h2 
        className="font-semibold text-5xl md:text-6xl md:w-6/12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        {cta[0].title}
      </motion.h2>
      <motion.div
        className="w-fit"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
        whileHover={{ scale: 1.1 }}
      >
        <Link href={"/contact"} className="btn btn-primary btn-lg">
          {cta[0].callToAction2}
          <FaArrowUpRightFromSquare className="ml-3" />
        </Link>
      </motion.div>
      {[0, 1, 2, 3, 4, 5].map((index) => {
        let imageUrl: string = "/images/image-placeholder.webp"
        let size = "h-50 w-50"
        if (index > 1) size = "h-40 w-40"
        if (index > 3) size = "h-30 w-30"

        let left, top, right, bottom
        if (index === 0) {
          left = "left-30"
          top = "top-20"
          imageUrl = cta[0].image1
        }
        if (index === 1) {
          left = "right-30"
          top = "top-20"
          imageUrl = cta[0].image2
        }
        if (index === 2) {
          left = "left-10"
          top = "top-70"
          imageUrl = cta[0].image3
        }
        if (index === 3) {
          left = "right-10"
          top = "top-70"
          imageUrl = cta[0].image4
        }
        if (index === 4) {
          left = "left-60"
          top = "bottom-20"
          imageUrl = cta[0].image5
        }
        if (index === 5) {
          left = "right-60"
          top = "bottom-20"
          imageUrl = cta[0].image6
        }

        return (
          <motion.div 
            key={index} 
            className={`hidden md:block absolute ${left} ${top} ${right} ${bottom} ${size} border border-base-300 p-5 rounded-full`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={index % 2 === 0 ? 0 : 0.2}
            whileHover={{ scale: 1.1}}
          >
            <Image src={imageUrl} alt="Hubungi Kami" width={1000} height={1000} className="h-full w-full object-cover rounded-full" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default CTA2