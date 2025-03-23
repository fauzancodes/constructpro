"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { FaBriefcase, FaCalendarDays, FaMapLocationDot, FaUser } from "react-icons/fa6";
import { SlideRightVariant, SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { GetPortfolioBySlug } from "@/lib/repository/portfolio";
import { PortfolioDetailPageSkeleton } from "@/ui/home/loading";
import { GetServiceById } from "@/lib/repository/service";
import { StringToDate } from "@/lib/utilities/common";

type Props = {
  slug: string;
}

const DetailPage = ({ slug }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [portfolio, setPortfolio] = useState<any | null>(null);
  const [service, setService] = useState<any | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const portfolioData = await GetPortfolioBySlug(slug);
        if (portfolioData) {
          setPortfolio(portfolioData.datasets);
          
          const serviceData = await GetServiceById(portfolioData.datasets?.serviceId ?? "");
          if (serviceData) {
            setService(serviceData.datasets);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <PortfolioDetailPageSkeleton />
  if (portfolio === null) return <p className="w-full h-[20rem] flex items-center justify-center text-center">Data tidak ditemukan.</p>

  const data = portfolio

  console.log("data:", data)

  return (
    <div className="w-full p-5 md:p-20 flex flex-wrap items-start justify-between gap-5">
      <motion.div 
        className={`w-full ${data.description ? "md:w-3/12 order-1" : "flex flex-wrap order-2"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideRightVariant}
        custom={0}
      >
        {data.description && <h3 className="bg-primary p-5 text-primary-content font-semibold text-2xl text-center">INFORMASI PROYEK</h3>}
        {data.client && <div className={`flex items-center border border-base-300 ${!data.description && "w-full md:w-3/12"}`}>
          <FaUser className="m-5 text-3xl text-primary" />
          <div className={`p-5 bg-base-200 w-full h-full ${!data.description && "flex flex-col justify-center"}`}>
            <p className="text-xl">Client:</p>
            <p className="text-xl font-medium">{data?.client}</p>
          </div>
        </div>}
        {service.title && <div className={`flex items-center border border-base-300 ${!data.description && "w-full md:w-3/12"}`}>
          <FaBriefcase className="m-5 text-3xl text-primary" />
          <div className={`p-5 bg-base-200 w-full h-full ${!data.description && "flex flex-col justify-center"}`}>
            <p className="text-xl">Layanan:</p>
            <p className="text-xl font-medium">{service?.title}</p>
          </div>
        </div>}
        {(Boolean(data.start) || Boolean(data.end)) && <div className={`flex items-center border border-base-300 ${!data.description && "w-full md:w-3/12"}`}>
          <FaCalendarDays className="m-5 text-3xl text-primary" />
          <div className={`p-5 bg-base-200 w-full h-full ${!data.description && "flex flex-col justify-center"}`}>
            <p className="text-xl">Durasi:</p>
            <p className="text-xl font-medium">
              {data.start && StringToDate(data.start)}
              {data.start && data.end && " to "} 
              {data.end && StringToDate(data.end)}
            </p>
          </div>
        </div>}
        {data.address && <div className={`flex items-center border border-base-300 ${!data.description && "w-full md:w-3/12"}`}>
          <FaMapLocationDot className="m-5 text-3xl text-primary" />
          <div className={`p-5 bg-base-200 w-full h-full ${!data.description && "flex flex-col justify-center"}`}>
            <p className="text-xl">Alamat:</p>
            <p className="text-xl font-medium">{data?.address}</p>
          </div>
        </div>}
      </motion.div>
      <div className={`w-full ${data.description ? "md:w-8/12 order-2" : "order-1"}`}>
        <motion.h1 
          className={`${data.description ? "mb-5" : "my-5"} font-semibold text-5xl`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={0.2}
        >
          {data?.title}
        </motion.h1>
        <motion.div 
          id="project-detail" 
          dangerouslySetInnerHTML={{ __html: data?.description }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={0.6}
        ></motion.div>
      </div>
      <div className="w-full flex flex-wrap order-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
          let imageUrl: string = "/images/image-placeholder.webp"
          if (index === 0) {
            imageUrl = data.image1
          }
          if (index === 1) {
            imageUrl = data.image2
          }
          if (index === 2) {
            imageUrl = data.image3
          }
          if (index === 3) {
            imageUrl = data.image4
          }
          if (index === 4) {
            imageUrl = data.image5
          }
          if (index === 5) {
            imageUrl = data.image6
          }
          if (index === 6) {
            imageUrl = data.image7
          }
          if (index === 7) {
            imageUrl = data.image8
          }
          if (index === 8) {
            imageUrl = data.image9
          }
          if (index === 9) {
            imageUrl = data.image10
          }

          if (imageUrl) return (
            <motion.div 
              key={index} 
              className={`${index === 0 ? "md:w-8/12" : "md:w-4/12"} w-full h-96 border-5 border-base-100`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={SlideUpVariant}
              custom={index % 3 === 0 ? 0 : index % 3 === 1 ? 0.2 : 0.4}
            >
              <Image src={imageUrl} alt={data.title} width={1000} height={1000} className="h-full w-full object-cover" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default DetailPage