"use client"

import { motion } from "framer-motion";
import { SlideUpVariant } from "@/ui/animation/animation";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { GetAllServices } from "@/lib/repository/service";
import { PortfolioPageSkeleton, ServicePortfolioPageSkeleton } from "@/ui/home/loading";
import { GetAllPortfolios } from "@/lib/repository/portfolio";
import { StringToDate } from "@/lib/utilities/common";

const Detail = () => {
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  const [isLoadingPortfolioes, setIsLoadingPortfolioes] = useState(true)
  const [services, setServices] = useState<any[]>([]);
  const [portfolioes, setPortfolioes] = useState<any[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingPortfolioes(true);

        const portfolioesData = await GetAllPortfolios("", 0, 0, "end", "desc", "true", selectedServiceId);
        if (portfolioesData) {
          setPortfolioes(portfolioesData.data);
        }

        setIsLoadingPortfolioes(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoadingPortfolioes(false);
      }
    };

    fetchData();
  }, [selectedServiceId]);

  const HandleServiceFilter = (id: string) => {
    setSelectedServiceId(id)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingServices(true);

        const servicesData = await GetAllServices("", 0, 0, "order", "asc", "true");
        if (servicesData) {
          setServices(servicesData.data);
        }

        setIsLoadingServices(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoadingServices(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center gap-5 p-5 md:p-20">
      {isLoadingServices ? (
        <ServicePortfolioPageSkeleton />
      ) : (
        <motion.div 
          className="w-full flex flex-wrap justify-center items-center gap-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={0}
        >
          <button onClick={() => HandleServiceFilter("")} className="btn btn-ghost hover:btn-link text-lg p-0 h-fit">ALL</button>
          {services.map((item, index) => (
            <button key={index} onClick={() => HandleServiceFilter(item.id)} className="btn btn-ghost hover:btn-link text-lg p-0 h-fit">{item.title.toLocaleUpperCase()}</button>
          ))}
        </motion.div>
      )}
      {isLoadingPortfolioes ? (
        <PortfolioPageSkeleton />
      ) : portfolioes.length === 0 ? (
        <p className="w-full text-center">Data tidak ditemukan.</p>
      ) : (
        portfolioes.map((item, index) => (
          <motion.div 
            key={index} 
            className="w-full md:w-[32%] h-96 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={index % 3 === 0 ? 0 : index % 3 === 1 ? 0.2 : 0.4}
          >
            <Image src={item.image1} alt={item.title} width={1000} height={1000} className="w-full h-full object-cover" />
            <motion.div
              className="absolute bg-neutral/75 text-neutral-content top-0 bottom-0 right-0 left-0 flex flex-col justify-end items-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-5 right-5"
                whileHover={{ scale: 1.1 }}
              >
                <Link href={`/portfolio/${item.slug}`} className="btn hover:btn-primary text-primary hover:text-primary-content rounded-full text-2xl h-12 w-12">
                  <FaPlus />
                </Link>
              </motion.div>
              <div className="m-10 pt-3 border-t-2 border-neutral-content flex items-center gap-5">
                <div>
                  <Link href={`/portfolio/${item.slug}`}>
                    <h2 className="font-semibold text-4xl mt-5 hover:underline hover:text-primary">{item.title}</h2>
                  </Link>
                  <p>{item.start && StringToDate(item.start)} {item.start && item.end && "-"} {StringToDate(item.end)}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>        
        ))
      )}
    </div>
  )
}

export default Detail