"use client"

import { CreateBlogCategory } from "@/lib/repository/blog/category";
import MutationForm from "@/ui/dashboard/mutationForm"
import { BlogCategory } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogCategoryFields } from "@/types/fields";

const CreateBlogCategorys = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<BlogCategory | null>(null);

  const handleCreate = async (formData: BlogCategory) => {
    try {
      setIsLoading(true)
      const result = await CreateBlogCategory(formData);
  
      if (result?.success) {
        router.push("/dashboard/blog/categories");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
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

export default CreateBlogCategorys