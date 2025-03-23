"use client"

import { motion } from "framer-motion";
import Image from "next/image"
import { FaEnvelope, FaMapLocationDot, FaPhone } from "react-icons/fa6"
import { SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { GetAllContacts } from "@/lib/repository/contact/contact";
import { ContactPageSkeleton } from "../home/loading";
import Link from "next/link";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const contactData = await GetAllContacts("", 0, 0, "", "asc");
        if (contactData) {
          setContacts(contactData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <ContactPageSkeleton />
  if (contacts.length === 0) return <p className="w-full text-center my-40">Data tidak ditemukan.</p>
  
  const email = contacts.find((item) => item.code === "email")
  const phone = contacts.find((item) => item.code === "phone")
  const address = contacts.find((item) => item.code === "address")

  return (
    <div className="w-full flex flex-wrap justify-center gap-5 p-5 md:p-20">
      <motion.div 
        className="w-full md:w-[32%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        <Image src={email.image} alt="Email" width={1000} height={1000} className="p-3 border border-base-300 h-72 object-cover" />
        <div className="flex min-h-32">
          <div className="p-5 border border-base-300 w-3/12 flex items-center">
            <FaEnvelope className="text-6xl text-primary" />
          </div>
          <div className="p-5 border border-base-300 w-9/12 flex flex-col justify-center">
            <p className="text-primary font-medium text-lg">{email?.title}</p>
            <Link href={email?.link} target="_blank" className="font-medium text-xl break-words hover:underline hover:text-primary">{email?.description}</Link>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="w-full md:w-[32%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.2}
      >
        <Image src={phone.image} alt="Email" width={1000} height={1000} className="p-3 border border-base-300 h-72 object-cover" />
        <div className="flex min-h-32">
          <div className="p-5 border border-base-300 w-3/12 flex items-center">
            <FaPhone className="text-6xl text-primary" />
          </div>
          <div className="p-5 border border-base-300 w-9/12 flex flex-col justify-center">
            <p className="text-primary font-medium text-lg">{phone?.title}</p>
            <Link href={phone?.link} target="_blank" className="font-medium text-xl break-words hover:underline hover:text-primary">{phone?.description}</Link>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="w-full md:w-[32%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.4}
      >
        <Image src={address.image} alt="Email" width={1000} height={1000} className="p-3 border border-base-300 h-72 object-cover" />
        <div className="flex min-h-32">
          <div className="p-5 border border-base-300 w-3/12 flex items-center">
            <FaMapLocationDot className="text-6xl text-primary" />
          </div>
          <div className="p-5 border border-base-300 w-9/12 flex flex-col justify-center">
            <p className="text-primary font-medium text-lg">{address?.title}</p>
            <Link href={address.link} target="_blank" className="font-medium text-xl break-words hover:underline hover:text-primary">{address?.description}</Link>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="w-full p-5 border border-base-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.49131638702!2d106.66470516517266!3d-6.229720928946075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1742708551690!5m2!1sen!2sid" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-[30rem]"></iframe>
      </motion.div>
    </div>
  )
}

export default Detail