"use client"

import { motion  } from "framer-motion";
import { FaCity, FaFaceSmile, FaPeopleGroup, FaTrowel } from "react-icons/fa6"
import { SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { ExpSkeleton } from "@/ui/home/loading";
import { GetAllAchievements } from "@/lib/repository/about/achievement";

const Exp = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [exps, setSetExps] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const ctaData = await GetAllAchievements("", 0, 0, "", "asc", "");
        if (ctaData) {
          setSetExps(ctaData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || exps.length === 0) return <ExpSkeleton />

  return (
    <div className="flex flex-wrap">
      <motion.div 
        className="w-full md:w-3/12 flex flex-col justify-center items-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-primary p-20 bg-neutral text-neutral-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.2}
      >
        <motion.div 
          className="bg-primary w-fit p-5 text-neutral-content rounded-full mb-3"
          whileHover={{ scale: 1.1 }}
        >
          <FaFaceSmile className="text-5xl" />
        </motion.div>
        <h2 className="text-5xl font-semibold">{exps.find((item) => item.code === "customers").total}+</h2>
        <h3 className="text-2xl font-medium">{exps.find((item) => item.code === "customers").title}</h3>
      </motion.div>
      <motion.div 
        className="w-full md:w-3/12 flex flex-col justify-center items-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-primary p-20 bg-neutral text-neutral-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.4}
      >
        <motion.div 
          className="bg-primary w-fit p-5 text-neutral-content rounded-full mb-3"
          whileHover={{ scale: 1.1 }}
        >
          <FaCity className="text-5xl" />
        </motion.div>
        <h2 className="text-5xl font-semibold">{exps.find((item) => item.code === "projects").total}+</h2>
        <h3 className="text-2xl font-medium">{exps.find((item) => item.code === "projects").title}</h3>
      </motion.div>
      <motion.div 
        className="w-full md:w-3/12 flex flex-col justify-center items-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-primary p-20 bg-neutral text-neutral-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.6}
      >
        <motion.div 
          className="bg-primary w-fit p-5 text-neutral-content rounded-full mb-3"
          whileHover={{ scale: 1.1 }}
        >
          <FaTrowel className="text-5xl" />
        </motion.div>
        <h2 className="text-5xl font-semibold">{exps.find((item) => item.code === "tools").total}+</h2>
        <h3 className="text-2xl font-medium">{exps.find((item) => item.code === "tools").title}</h3>
      </motion.div>
      <motion.div 
        className="w-full md:w-3/12 flex flex-col justify-center items-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-primary p-20 bg-neutral text-neutral-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.8}
      >
        <motion.div 
          className="bg-primary w-fit p-5 text-neutral-content rounded-full mb-3"
          whileHover={{ scale: 1.1 }}
        >
          <FaPeopleGroup className="text-5xl" />
        </motion.div>
        <h2 className="text-5xl font-semibold">{exps.find((item) => item.code === "pros").total}+</h2>
        <h3 className="text-2xl font-medium">{exps.find((item) => item.code === "pros").title}</h3>
      </motion.div>
    </div>
  )
}

export default Exp