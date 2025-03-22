"use client"

import { GetAllContacts } from "@/lib/repository/contact/contact";
import { motion  } from "framer-motion";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { NavbarHeaderSkeleton } from "@/ui/home/loading";
import { GetAllSocialMedias } from "@/lib/repository/contact/socialMedia";
import { SelectSocialMediaIcon } from "@/lib/utilities/common";


const Navbar = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true)
  const [contact, setContact] = useState<any[]>([]);
  const [socialMedia, setSocialMedia] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const contactData = await GetAllContacts("", 0, 0, "", "asc", "phone");
        if (contactData) {
          setContact(contactData.data);
        }
        const socialMediaData = await GetAllSocialMedias("", 0, 0, "title", "asc");
        if (socialMediaData) {
          setSocialMedia(socialMediaData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (pathname.includes("/dashboard")) return null

  return (
    <>
      {isLoading ? (
        <NavbarHeaderSkeleton />
      ) : (
        <div className="w-full bg-neutral text-neutral-content px-3 md:px-15 py-3 text-sm flex flex-wrap justify-between items-center">
          <div>Telp: {contact[0].description}</div>
          <div className="hidden md:block">Solusi Konstruksi Profesional: Cepat, Kokoh, dan Berkualitas!</div>
          <div className="flex items-center gap-3 text-xl">
            {socialMedia.map((item, index) => (
              <Link key={index} href={item.link} target="_blank" className="hover:text-primary">
                {SelectSocialMediaIcon(item.title.toLocaleLowerCase())}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="navbar bg-base-100/75 backdrop-blur-sm shadow-3xl md:px-15 sticky top-0 z-10">
        <div className="navbar-start">
          <div className="dropdown mr-3">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <NavbarItems />
            </ul>
          </div>
          <Link href={`/`} className="text-2xl font-semibold hidden md:block">
            <Image src={"/images/gkm_icon.png"} alt="Gema Karya Makmur" width={500} height={500} className="h-15 w-fit object-contain" />
          </Link>
          <Link href={`/`} className="text-2xl font-semibold md:hidden">GKM</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavbarItems />
          </ul>
        </div>
        <motion.div 
          className="navbar-end"
          whileHover={{ scale: 1.1 }}
        >
          <Link href={`/quotation`} className="btn btn-outline btn-neutral text-lg font-medium px-8">AJUKAN PENAWARAN</Link>
        </motion.div>
      </div>
    </>
  )
}

export default Navbar

const NavbarItems = () => {
  const pathname = usePathname();

  return (
    <>
      <li><Link href={`/`} className={`text-neutral hover:text-primary text-lg ${pathname === "/" || pathname === "/#" ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>BERANDA</Link></li>
      <li><Link href={`/about`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/about") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>TENTANG KAMI</Link></li>
      <li><Link href={`/services`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/services") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>LAYANAN</Link></li>
      <li><Link href={`/portfolio`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/portfolio") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>PORTOFOLIO</Link></li>
      <li><Link href={`/blog`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/blog") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>BLOG</Link></li>
      <li><Link href={`/contact`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/contact") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>KONTAK</Link></li>
    </>
  )
}