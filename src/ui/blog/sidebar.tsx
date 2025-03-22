"use client"

import { motion } from "framer-motion"
import { SlideUpVariant } from "@/ui/animation/animation"
import { FaSearch } from "react-icons/fa"
import Image from "next/image"
import { FaRegClock } from "react-icons/fa6"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GetAllBlogCategories } from "@/lib/repository/blog/category"
import { BlogSideNavPageSkeleton } from "@/ui/home/loading"
import { GetAllBlogs, GetBlogTags } from "@/lib/repository/blog/blog"
import Link from "next/link"
import { StringToDate } from "@/lib/utilities/common"

type Props = {
  setSelectedCategoryId: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchTags: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setTotalPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const Sidebar = ({ setSelectedCategoryId, setSearch, setSearchTags, setCurrentPage, setTotalPage, setOffset }: Props) => {
  const [isLoadingBlogCategory, setIsLoadingBlogCategory] = useState(true)
  const [categories, setCategories] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingBlogCategory(true);

        const categoriesData = await GetAllBlogCategories("", 0, 0, "order", "asc", "true");
        if (categoriesData) {
          setCategories(categoriesData.data);
        }
        const blogsData = await GetAllBlogs("", 0, 3, "date", "desc", "true", "", false);
        if (blogsData) {
          setBlogs(blogsData.data); 
        }
        const tagsData = await GetBlogTags();
        if (tagsData) {
          setTags(tagsData); 
        }

        setIsLoadingBlogCategory(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoadingBlogCategory(false);
      }
    };

    fetchData();
  }, []);

  if (isLoadingBlogCategory) return <BlogSideNavPageSkeleton />

  if (categories.length === 0) return <p className="w-full md:w-[30%] h-96 flex items-center justify-center text-center">Data tidak ditemukan.</p>

  const handleCategoryFilter = (id: string) => {
    setSelectedCategoryId(id)
  }

  const handleTagsFilter = (tag: string) => {
    setSearchTags(tag)
  }

  return (
    <div className="w-full md:w-[30%] flex flex-col gap-5">
      <motion.div 
        className="bg-base-200 p-10"initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.2}
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-semibold text-2xl">PENCARIAN</legend>
          <div className="join">
            <input onChange={(e) => {
              setCurrentPage(1)
              setTotalPage(1)
              setOffset(0)
              setSearch(e.target.value)
            }} type="text" className="input join" placeholder="Cari....." />
            <button className="btn btn-primary join-item"><FaSearch /></button>
          </div>
        </fieldset>
      </motion.div>
      <motion.div 
        className="bg-base-200 p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        <h2 className="font-semibold text-2xl mb-3">KATEGORI</h2>
        <motion.button 
          className="cursor-pointer flex justify-between bg-base-100 mb-3 w-full hover:bg-primary hover:text-primary-content"
          whileHover={{ scale: 1.1 }}
          onClick={() => handleCategoryFilter("")}
        >
          <div className="border border-base-300 w-full p-3 font-medium text-start">SEMUA</div>
          {/* <div className="border border-base-300 py-3 px-5">{1}</div> */}
        </motion.button>
        {categories.map((item, index) => (
          <motion.button 
            key={index} 
            className="cursor-pointer flex justify-between bg-base-100 mb-3 w-full hover:bg-primary hover:text-primary-content"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleCategoryFilter(item.id)}
          >
            <div className="border border-base-300 w-full p-3 font-medium text-start">{item.title.toLocaleUpperCase()}</div>
            {/* <div className="border border-base-300 py-3 px-5">{1}</div> */}
          </motion.button>
        ))}
      </motion.div>
      <motion.div 
        className="bg-base-200 p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        <h2 className="font-semibold text-2xl mb-3">POST TERBARU</h2>
        {blogs.length === 0 ? (
          <p className="w-full flex items-center justify-center text-center">Data tidak ditemukan.</p>
        ) : blogs.map((item, index) => (
          <Link key={index} href={`/blog/${item.id}`} >
            <div className="flex items-center gap-3 mb-3">
              <Image src={item.image} alt={item.title} width={500} height={500} className="w-20 h-20 object-cover" />
              <div>
                <p className="flex items-center gap-1"><FaRegClock />{StringToDate(item.date)}</p>
                <h3 className="font-medium">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
      <motion.div 
        className="bg-base-200 p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        <h2 className="font-semibold text-2xl mb-3">TAG POPULER</h2>
        <div className="flex flex-wrap gap-3">
          {tags.length === 0 ? (
            <p className="w-full flex items-center justify-center text-center">Data tidak ditemukan.</p>
          ): tags.map((item, index) => (
            <motion.button 
              key={index} 
              className="px-3 py-2 btn bg-base-100 font-normal"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleTagsFilter(item.name.toLocaleLowerCase() === "semua" ? "" : item.name)}
            >
              {item.name} ({item.total})
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Sidebar