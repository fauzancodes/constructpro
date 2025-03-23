"use client"

import { CreateBlog } from "@/lib/repository/blog/blog";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Blog } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogFields } from "@/types/fields";
import { GetAllBlogCategories } from "@/lib/repository/blog/category";

const CreateBlogs = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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

  const handleCreate = async (formData: Blog) => {
    try {
      setIsLoading(true)
      const result = await CreateBlog(formData);
  
      if (result?.success) {
        router.push("/dashboard/blog/articles");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
      fields={BlogFields(categories)}
      title="Blog Article"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default CreateBlogs