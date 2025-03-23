"use client"

import { motion, AnimatePresence  } from "framer-motion";
import Image from "next/image"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { FadeVariant, SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroSkeleton } from "@/ui/home/loading";
import { GetAllImageSliders } from "@/lib/repository/home/imageSlider";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [imageSlieders, setImageSliders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const imageSlidersData = await GetAllImageSliders("", 0, 0, "order", "asc", );
        if (imageSlidersData) {
          setImageSliders(imageSlidersData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [index, setIndex] = useState(0);
  const data = imageSlieders;

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [data.length]);

  if (isLoading || data.length === 0) return <HeroSkeleton />

  return (
    <header className="min-h-[40rem] relative">
      {data.map((item, i) => (
        <AnimatePresence key={i} mode="wait">
          {index === i && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={FadeVariant}
              className="absolute inset-0"
            >
              <Image
                src={item?.image}
                alt="Hero Image"
                width={1440}
                height={900}
                className="h-[40rem] object-cover w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      <motion.div
        className="bg-neutral/90 absolute text-neutral-content bottom-30 md:bottom-5 md:left-15 h-[27rem] w-full md:w-6/12 flex flex-col justify-center items-center md:items-start p-5 md:p-20"
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={data[index]?.title}
            className="text-5xl md:text-6xl font-bold mb-10 text-center md:text-start"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={SlideUpVariant}
            custom={0.4}
          >
            {data[index]?.title}
          </motion.h1>
        </AnimatePresence>
        <motion.div
          variants={SlideUpVariant}
          custom={0.6}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={data[index]?.title}
          whileHover={{ scale: 1.1 }}
        >
          <Link href={"/services"} className="btn text-primary hover:btn-primary hover:text-primary-content btn-lg w-fit">
            Learn More
            <FaArrowUpRightFromSquare className="ml-3" />
          </Link>
        </motion.div>
      </motion.div>
    </header>
  )
}

export default Hero