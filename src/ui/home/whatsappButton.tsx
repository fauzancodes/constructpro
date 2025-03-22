"use client"

import { FaCircleXmark, FaPaperPlane, FaUser, FaWhatsapp } from "react-icons/fa6"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GetAllSocialMedias } from "@/lib/repository/contact/socialMedia";

const WhatsappButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [socialMedia, setSocialMedia] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

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

  return (
    <div className="fixed bottom-5 right-5">
      {!showModal && <motion.button 
        className="bg-[#03D758] rounded-full w-15 h-15 flex justify-center items-center p-3 cursor-pointer hover:bg-[#04A884] relative"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowModal(true)}
      >
        <FaWhatsapp className="text-base-100 w-full h-full" />
        <div className="badge bg-error text-base-100 border-0 rounded-full w-5 h-5 absolute top-0 right-0">2</div>
      </motion.button>}
      {showModal && <div className="bg-base-100 w-[25rem] rounded-2xl shadow-xl">
        <div className="bg-[#03D758] p-5 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
          <div className="text-xl font-semibold text-base-100">Admin Gema Karya Makmur</div>
          <button onClick={() => setShowModal(false)} className="text-base-100 hover:text-base-200 cursor-pointer w-10 h-10">
            <FaCircleXmark className="w-full h-full" />
          </button>
        </div>
        <div className="p-5">
          <div className="chat chat-start">
            <div className="chat-bubble">
              Halo 👋
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble">
              Selamat datang di Gema Karya Makmur,
              <br/><br/>
              Silakan sampaikan kebutuhan proyek konstruksi Anda. Kami siap membantu mewujudkan pembangunan yang efisien dan berkualitas untuk mendukung perkembangan bisnis dan infrastruktur Anda.
              <br/><br/>
              Terima kasih!
            </div>
          </div>
          {!isLoading && socialMedia.length > 0 && <Link href={`${socialMedia.find((item) => item.title.toLocaleLowerCase() === "whatsapp").link}?text=Halo!%20Saya%20tertarik%20untuk%20menggunakan%20jasa%20konstruksi%20Anda.%20Bisa%20bantu%20saya%20untuk%20informasi%20lebih%20lanjut?%20Terima%20kasih!`} target="_blank" rel="noopener noreferrer" className="bg-[#03D758] hover:bg-[#04A884] flex items-center justify-between text-base-100 cursor-pointer w-full rounded-full px-5 py-3 mt-5">
            <FaUser className="border rounded-full text-3xl p-1" />
            <div className="font-medium text-lg">Chat Admin Gema Karya Makmur</div>
            <FaPaperPlane className="text-2xl" />
          </Link>}
        </div>
      </div>}
    </div>
  )
}

export default WhatsappButton