"use client"

import { motion } from "framer-motion";
import { SlideRightVariant, SlideUpVariant } from "@/ui/animation/animation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HomeServicesSkeleton } from "@/ui/home/loading";
import { GetAllSectionHeaders } from "@/lib/repository/home/sectionHeader";
import { GetAllFAQs } from "@/lib/repository/home/faq";
import { GetAllCallToActions } from "@/lib/repository/home/callToAction";

const FAQ = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sectionHeaders, setSetSectionHeaders] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [cta, setCTA] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const faqsData = await GetAllFAQs("", 0, 0, "order", "asc");
        if (faqsData) {
          setFaqs(faqsData.data);
        }
        const sectionHeaderData = await GetAllSectionHeaders("", 0, 0, "", "asc", "04");
        if (sectionHeaderData) {
          setSetSectionHeaders(sectionHeaderData.data);
        }
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

  if (isLoading || faqs.length === 0 || sectionHeaders.length === 0 || cta.length === 0) return <HomeServicesSkeleton />
  
  return (
    <div className="w-full p-5 md:p-20">
      <div className="w-full md:w-6/12 relative md:pl-10 pt-16 mb-20 flex flex-wrap justify-between">
        <motion.h3
          className="text-neutral-content font-bold text-9xl absolute left-0 top-0 -z-10"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0}
        >
          04
        </motion.h3>
        <motion.h2
          className="text-neutral  font-semibold text-4xl md:text-5xl"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0.2}
        >
          {sectionHeaders[0].title}
        </motion.h2>
      </div>
      <div className="w-full flex flex-wrap justify-between items-start md:items-stretch">
        <motion.div 
          className="w-full md:w-5/12 relative"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideRightVariant}
          custom={0}
        >
          <Image src={cta[0].image2} alt="FAQ" width={1000} height={1000} className="h-full object-cover" />
          <motion.h2 
            className="bg-neutral/75 text-neutral-content font-medium text-2xl p-10 md:mt-10 md:absolute bottom-0 w-full md:w-96"
            initial="hidden"
            whileInView="visible"
        viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            {cta[0].description}
          </motion.h2>
        </motion.div>
        <motion.div 
          className="w-full md:w-6/12 join join-vertical bg-base-100"
          initial="hidden"
          whileInView="visible"
        viewport={{ once: true }}
          variants={SlideUpVariant}
          custom={0.2}
        >
          {faqs.map((item, index) => (
            <div key={index} className="collapse collapse-plus join-item border-base-300 border-b">
              <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
              <div className="collapse-title font-semibold">{item.question}</div>
              <div className="collapse-content text-sm">{item.answer}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ