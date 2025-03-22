"use client"

import { motion  } from "framer-motion";
import { FaArrowUpRightFromSquare, FaBusinessTime, FaMedal, FaMicrochip } from "react-icons/fa6"
import { SlideUpVariant } from "@/ui/animation/animation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BusinessValueSkeleton } from "@/ui/home/loading";
import { GetAllBusinessValues } from "@/lib/repository/about/businessValue";

type Props = {
  withButton?: boolean;
}

const Value = ({ withButton }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [businessValues, setBusinessValues] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const businessValuesData = await GetAllBusinessValues("", 0, 0, "order", "asc", "");
        if (businessValuesData) {
          setBusinessValues(businessValuesData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || businessValues.length === 0) return <BusinessValueSkeleton />

  return (
    <div className="w-full flex flex-wrap justify-between gap-5 p-5 md:p-20">
      {businessValues.map((item, index) => (
        <motion.div 
          key={index} 
          className="w-full md:w-[32%] bg-base-200 border border-base-300 relative pb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={index*0.2}
        >
          {item.code.toLocaleLowerCase() === "quality" && <div className="bg-base-100 w-fit p-5 border border-base-300 mb-10">
            <FaMedal className="text-5xl" />
          </div>}
          {item.code.toLocaleLowerCase() === "pro" && <div className="bg-base-100 w-fit p-5 border border-base-300 mb-10">
            <FaBusinessTime className="text-5xl" />
          </div>}
          {item.code.toLocaleLowerCase() === "tech" && <div className="bg-base-100 w-fit p-5 border border-base-300 mb-10">
            <FaMicrochip className="text-5xl" />
          </div>}
          <h2 className="font-semibold text-xl mb-3 mx-10">{item.title}</h2>
          <p className="mx-10">{item.description}</p>
          {withButton &&
          <motion.div 
            className="w-fit mt-5 mx-10"
            whileHover={{ scale: 1.1 }}
          >
            <Link href={"/about"} className="btn text-primary hover:btn-primary hover:text-primary-content">
              PELAJARI LEBIH LANJUT
              <FaArrowUpRightFromSquare className="ml-3" />
            </Link>
          </motion.div>
          }
        </motion.div>
      ))}
    </div>
  )
}

export default Value