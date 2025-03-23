"use client"

import { motion  } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { SlideUpVariant } from "@/ui/animation/animation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FooterSkeleton } from "@/ui/home/loading";
import { GetAllContacts } from "@/lib/repository/contact/contact";
import { GetAllSocialMedias } from "@/lib/repository/contact/socialMedia";
import { GetAllAboutUs } from "@/lib/repository/about/aboutUs";
import { GetAllServices } from "@/lib/repository/service";
import { GetAllPortfolios } from "@/lib/repository/portfolio";
import { SelectSocialMediaIcon } from "@/lib/utilities/common";

const Footer = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true)
  const [about, setAbout] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [socialMedia, setSocialMedia] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [portfolioes, setPortfolioes] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const aboutData = await GetAllAboutUs("", 0, 0, "", "asc");
        if (aboutData) {
          setAbout(aboutData.data);
        }
        const contactData = await GetAllContacts("", 0, 0, "", "asc");
        if (contactData) {
          setContacts(contactData.data);
        }
        const socialMediaData = await GetAllSocialMedias("", 0, 0, "title", "asc");
        if (socialMediaData) {
          setSocialMedia(socialMediaData.data);
        }
        const servicesData = await GetAllServices("", 0, 0, "title", "asc");
        if (servicesData) {
          setServices(servicesData.data);
        }
        const portfolioesData = await GetAllPortfolios("", 0, 0, "end", "desc");
        if (portfolioesData) {
          setPortfolioes(portfolioesData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [shortDescription, setShortDescription] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && about.length > 0) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(about[0]?.description, "text/html");
      const firstP = doc.querySelector("p");
      setShortDescription(firstP?.textContent?.trim() || "");
    }
  }, [about]);
  
  if (pathname.includes("/dashboard")) return null

  const email = contacts.find((item) => item.code === "email")
  const phone = contacts.find((item) => item.code === "phone")
  const address = contacts.find((item) => item.code === "address")

  return (
    <div className="w-full bg-base-200 px-5 md:px-10 border-t-5 border-primary">
      {isLoading || about.length === 0 ? (
        <FooterSkeleton />
      ) : (
        <div className="py-20 flex flex-wrap gap-y-10 md:gap-y-0">
          <motion.div 
            className="w-full md:w-3/12"
            initial="hidden"
            whileInView="visible"
          viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            <h2 className="font-semibold text-3xl">{about[0].title}</h2>
            <p className="my-5">{shortDescription}</p>
            <div className="flex items-center gap-3 text-xl">
              {socialMedia.map((item, index) => (
                <Link key={index} href={item.link} target="_blank" className="btn hover:btn-primary rounded-full p-0 text-lg w-12 h-12">
                  {SelectSocialMediaIcon(item.title.toLocaleLowerCase())}
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="w-full md:w-3/12 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
          viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.2}
          >
            <p className="font-semibold mb-3">LAYANAN</p>
            {services.map((item, index) => (
              index < 6 && (
                <motion.div
                  key={index}
                  whileHover={{ translateX: "0.5rem" }}
                >
                  <Link href={"/services"} className="btn btn-ghost hover:btn-link text-[16px] font-normal p-0 h-fit mb-3">
                    <FaArrowRight />
                    {item.title}
                  </Link>
                </motion.div>
              )
            ))}
          </motion.div>
          <motion.div 
            className="w-full md:w-3/12 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
          viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.4}
          >
            <p className="font-semibold mb-3">PROYEK TERBARU</p>
            {portfolioes.map((item, index) => (
              index < 6 && (
                <motion.div
                  key={index}
                  whileHover={{ translateX: "0.5rem" }}
                >
                  <Link href={`/portfolio/${item.id}`} className="btn btn-ghost hover:btn-link text-[16px] font-normal p-0 h-fit mb-3">
                    <FaArrowRight />
                    {item.title}
                  </Link>
                </motion.div>
              )
            ))}
          </motion.div>
          <motion.div 
            className="w-full md:w-3/12 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
          viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0.6}
          >
            <p className="font-semibold mb-3">KONTAK</p>
            <motion.div
              whileHover={{ translateX: "0.5rem" }}
            >
              <Link href={email?.link || "#"} className="btn btn-ghost hover:btn-link text-[16px] font-normal p-0 h-fit mb-3 text-left">
                <FaArrowRight />
                {email?.title}: {email?.description}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ translateX: "0.5rem" }}
            >
              <Link href={phone?.link || "#"} className="btn btn-ghost hover:btn-link text-[16px] font-normal p-0 h-fit mb-3 text-left">
                <FaArrowRight />
                {phone?.title}: {phone?.description}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ translateX: "0.5rem" }}
            >
              <Link href={address?.link || "#"} className="btn btn-ghost hover:btn-link text-[16px] font-normal p-0 h-fit mb-3 text-left">
                <FaArrowRight className="w-10" />
                {address?.title}: {address?.description}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      )}
      <div className="py-5 md:py-10 border-t border-base-300 flex flex-wrap items-center justify-between font-medium">
        <p className="mb-3 md:mb-0">
          &copy; {new Date().getFullYear()} ConstructPro. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row md:gap-5">
          <Link href={`#`} className="btn btn-ghost hover:btn-link text-[16px] p-0 h-fit">Syarat Dan Ketentuan</Link>
          <Link href={`#`} className="btn btn-ghost hover:btn-link text-[16px] p-0 h-fit">Kebijakan Privasi</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer