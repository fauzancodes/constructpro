"use client"

import { UpdateBlogCategory, GetBlogCategoryById } from "@/lib/repository/blog/category";
import MutationForm from "@/ui/dashboard/mutationForm"
import { BlogCategory } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BlogCategoryFields } from "@/types/fields";

const UpdateBlogCategorys = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<BlogCategory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetBlogCategoryById(id);
        if (result.success) {
          if (result.datasets) {
            const blogCategoryData: BlogCategory = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              order: result.datasets.order ?? undefined,
              status: result.datasets.status ?? undefined,
            };
            setSelectedData(blogCategoryData);
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

  const handleUpdate = async (formData: BlogCategory) => {
    try {
      setIsLoading(true)
      const result = await UpdateBlogCategory(formData);
  
      if (result?.success) {
        router.push("/dashboard/blog/categories");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={BlogCategoryFields()}
      title="Blog Category"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateBlogCategorys