"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState } from "react";
import { GetBlogBySlug } from "@/lib/repository/blog/blog";
import { GetBlogCategoryById } from "@/lib/repository/blog/category";
import { GenerateIdFromText, HandleScrollToElement, StringToDate } from "@/lib/utilities/common";
import { BlogPageSkeleton, BlogSideNavPageSkeleton } from "@/ui/home/loading";

type Props = {
  slug: string;
}

const DetailPage = ({ slug }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [blog, setBlog] = useState<any | null>(null);
  const [category, setCategory] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const blogData = await GetBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData.datasets);
          
          const categoryData = await GetBlogCategoryById(blogData.datasets?.categoryId ?? "");
          if (categoryData) {
            setCategory(categoryData.datasets);
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

  const data = blog

  const headerData: { id: string; content: string }[] = [];

  const processedBody = data?.body && data.body !== "" ? blog.body.replace(/<h[1-2]>(.*?)<\/h[1-2]>/g, (match: string, p1: string) => {
    const id = GenerateIdFromText(p1);
    headerData.push({ id, content: p1 });
    return `<h1 id="${id}">${p1}</h1>`;
  }) : "<p>Data tidak ditemukan.<p>"

  return (
    <div className="w-full flex flex-wrap justify-center p-5 md:p-20 gap-5">
      {isLoading ? (
        <BlogPageSkeleton />
      ) : !blog ? (
        <p className="w-full md:w-[68%] h-96 flex items-center justify-center text-center">Data tidak ditemukan.</p>
      ) : (
        <div className="w-full md:w-[68%] flex flex-col gap-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            <Image src={data.image} alt={data.title} width={1000} height={1000} className="w-full h-[30rem] object-cover" />
          </motion.div>
          <motion.div 
            className="flex flex-wrap items-center gap-10 font-medium mb-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            <div>{data.author}</div>
            <div>{StringToDate(data.date)}</div>
            <div>{category.title}</div>
          </motion.div>
          <motion.h2 
            className="font-semibold text-4xl mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            {data.title}
          </motion.h2>
          <motion.p 
            className=""
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            {data.description}
          </motion.p>
          <motion.div 
            id="blog-detail" 
            dangerouslySetInnerHTML={{ __html: processedBody }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          ></motion.div>
          <motion.div 
            className="mt-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SlideUpVariant}
            custom={0}
          >
            <span className="font-medium mr-2">Tags:</span> {data.tags.replaceAll(", ",",").replaceAll(" ","").split(",").map((item: any, index: number) => (
              <motion.span 
                key={index} 
                className="px-3 py-2 btn bg-base-100 font-normal mr-2"
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}
      {isLoading ? (
        <BlogSideNavPageSkeleton />
      ) : !blog ? (
        null
      ) : (
        <div className="hidden md:block w-full md:w-[30%] sticky top-20 p-5 bg-base-200 h-fit">
          <h4 className="font-semibold text-2xl mb-5">DAFTAR ISI</h4>
          {headerData.map((item, index) => (
            <button key={index} onClick={() => HandleScrollToElement(item.id)} className="w-full btn btn-ghost hover:underline hover:text-primary justify-start text-start p-0 h-fit mb-3 !bg-transparent !border-0 !shadow-none text-lg font-normal">{item.content}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DetailPage