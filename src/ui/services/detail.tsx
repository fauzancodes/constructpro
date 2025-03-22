"use client"

import { motion } from "framer-motion";
import Image from "next/image"
import { SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { ServicePageSkeleton } from "@/ui/home/loading";
import { GetAllServices } from "@/lib/repository/service";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const servicesData = await GetAllServices("", 0, 0, "order", "asc", "true");
        if (servicesData) {
          setServices(servicesData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <ServicePageSkeleton />
  if (services.length === 0) return <p className="w-full text-center my-40">Data tidak ditemukan.</p>

  return (
    <div className="w-full flex flex-wrap justify-between p-5 md:p-20 gap-3">
      {services.map((item, index) => (
        <motion.div 
          key={index} 
          className="w-full md:w-[32%] bg-neutral min-h-[30rem]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={index % 3 === 0 ? 0 : index % 3 === 1 ? 0.2 : 0.4}
        >
          {item.image && <Image src={item.image} alt={item.title} width={1000} height={1000} className="h-72 object-cover" />}
          <div className="p-8">
            <h2 className="text-primary font-semibold text-2xl mb-5">{item.title}</h2>
            {item.description && <p className="text-neutral-content">{item.description}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Detail