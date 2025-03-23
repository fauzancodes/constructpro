"use client"

import { UpdateBlog, GetBlogById } from "@/lib/repository/blog/blog";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Blog } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BlogFields } from "@/types/fields";
import { GetAllBlogCategories } from "@/lib/repository/blog/category";

const UpdateBlogs = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<Blog | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllBlogCategories("", 0, 0, "title", "asc", "true");
        if (result) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetBlogById(id);
        if (result.success) {
          if (result.datasets) {
            const blogData: Blog = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              description: result.datasets.description ?? undefined,
              date: result.datasets.date ?? undefined,
              status: result.datasets.status ?? undefined,
              image: result.datasets.image ?? undefined,
              categoryId: result.datasets.categoryId ?? undefined,
              author: result.datasets.author ?? undefined,
              body: result.datasets.body ?? undefined,
              tags: result.datasets.tags ?? undefined,
              slug: result.datasets.slug ?? undefined,
            };
            setSelectedData(blogData);
          }
        } else {
          console.error(result.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching status:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (formData: Blog) => {
    try {
      setIsLoading(true)
      const result = await UpdateBlog(formData);
  
      if (result?.success) {
        router.push("/dashboard/blog/articles");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={BlogFields(categories)}
      title="Blog Article"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
      multiImage
      smallImagePreview
    />
  )
}

export default UpdateBlogs