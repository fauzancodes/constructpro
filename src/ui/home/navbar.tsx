"use client"

import { GetAllContacts } from "@/lib/repository/contact/contact";
import { motion  } from "framer-motion";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { NavbarHeaderSkeleton } from "@/ui/home/loading";
import { GetAllSocialMedias } from "@/lib/repository/contact/socialMedia";
import { SelectSocialMediaIcon } from "@/lib/utilities/common";
import { FaCity } from "react-icons/fa6";


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
      {isLoading || contact.length === 0 ? (
        <NavbarHeaderSkeleton />
      ) : (
        <div className="w-full bg-neutral text-neutral-content px-3 md:px-15 py-3 text-sm flex flex-wrap justify-between items-center">
          <div>Telp: {contact[0].description}</div>
          <div className="hidden md:block">Professional Construction Solutions: Fast, Solid and Quality!</div>
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
          <Link href={`/`} className="text-2xl font-semibold flex items-center gap-3"><FaCity className="hidden md:block"/> ConstructPro</Link>
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
          <Link href={`/quotation`} className="btn btn-outline btn-neutral text-lg font-medium px-8">GET QUOTATION</Link>
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
      <li><Link href={`/`} className={`text-neutral hover:text-primary text-lg ${pathname === "/" || pathname === "/#" ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>HOME</Link></li>
      <li><Link href={`/about`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/about") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>ABOUT US</Link></li>
      <li><Link href={`/services`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/services") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>SERVICES</Link></li>
      <li><Link href={`/portfolio`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/portfolio") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>PORTOFOLIOS</Link></li>
      <li><Link href={`/blog`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/blog") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>BLOGS</Link></li>
      <li><Link href={`/contact`} className={`text-neutral hover:text-primary text-lg ${pathname.includes("/contact") ? "font-semibold text-primary" : "font-medium"} btn btn-link !no-underline`}>CONTACTS</Link></li>
    </>
  )
}