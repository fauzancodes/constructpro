"use client"

import { motion } from "framer-motion";
import Image from "next/image"
import Link from "next/link"
import { SlideUpVariant } from "@/ui/animation/animation";
import Sidebar from "@/ui/blog/sidebar";
import { useEffect, useState } from "react";
import { BlogPageSkeleton } from "../home/loading";
import { GetAllBlogs } from "@/lib/repository/blog/blog";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { RenderPaginationItems } from "@/ui/dashboard/tableFooter";
import { StringToDate } from "@/lib/utilities/common";

const Detail = () => {
  const [isLoadingBlog, setIsLoadingBlog] = useState(true)
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingBlog(true);

        const blogsData = await GetAllBlogs(search, offset, perPage, "date", "desc", "true", selectedCategoryId, true, searchTags);
        if (blogsData) {
          setBlogs(blogsData.data); 
          setTotalPage(blogsData.totalPage);
        }

        setIsLoadingBlog(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoadingBlog(false);
      }
    };

    fetchData();
  }, [selectedCategoryId, search, searchTags, currentPage]);

  const handlePageChange = (page: number) => {
    setIsLoadingBlog(true)
    setCurrentPage(page);
    setOffset(page > 1 ? (page - 1) * perPage : 0);
    setIsLoadingBlog(false)
  };

  return (
    <div className="w-full flex flex-wrap justify-center p-5 md:p-20 gap-5">
      {isLoadingBlog ? (
        <BlogPageSkeleton />
      ) : blogs.length === 0 ? (
        <p className="w-full md:w-[68%] h-96 flex items-center justify-center text-center">Data tidak ditemukan.</p>
      ) : (
        <div className="w-full md:w-[68%] flex flex-col gap-5">
          {blogs.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={SlideUpVariant}
              custom={0}
            >
              <Link href={`/blog/${item.slug}`}>
                <Image src={item.image} alt={item.title} width={1000} height={1000} className="object-cover h-96" />
              </Link>
              <div className="bg-base-200 p-8">
                <div className="flex flex-wrap items-center gap-10 font-medium mb-3">
                  <div>{item.author}</div>
                  <div>{StringToDate(item.date)}</div>
                  <div>{item.category.title}</div>
                </div>
                <Link href={`/blog/${item.slug}`}>
                  <h2 className="font-semibold text-3xl mb-5 hover:underline hover:text-primary">{item.title}</h2>
                </Link>
                <p className="mb-5">{item.description}</p>
                <motion.div 
                  className="w-fit"
                  whileHover={{ scale: 1.1 }}
                >
                  <Link href={`/blog/${item.slug}`} className="btn btn-primary btn-lg">Baca Selengkapnya</Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
          <motion.div className="join">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              className="join-item btn" 
              disabled={currentPage === 1}
            ><FaArrowLeft /></button>
            {RenderPaginationItems(totalPage, currentPage, handlePageChange)}
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              className="join-item btn" 
              disabled={currentPage === totalPage}
            ><FaArrowRight /></button>
          </motion.div>
        </div>
      )}
      <Sidebar 
        setSelectedCategoryId={setSelectedCategoryId} 
        setSearch={setSearch}
        setSearchTags={setSearchTags}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        setTotalPage={setTotalPage}
      />
    </div>
  )
}

export default Detail