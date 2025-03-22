"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClientsSkeleton } from "@/ui/home/loading";
import { GetAllClients } from "@/lib/repository/client";

const Clients = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const clientsData = await GetAllClients("", 0, 0, "order", "asc");
        if (clientsData) {
          setClients(clientsData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || clients.length === 0) return <ClientsSkeleton />

  return (
    <div className="w-full overflow-hidden relative p-5 md:p-20">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 240,
          ease: "linear",
        }}
        style={{ width: "max-content" }}
      >
        {[...clients, ...clients, ...clients].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.image && <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="w-10 h-10 rounded-full object-cover"
            />}
            <p className="text-nowrap text-4xl">{item.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Clients;
