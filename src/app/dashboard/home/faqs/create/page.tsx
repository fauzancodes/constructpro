"use client"

import { CreateFAQ } from "@/lib/repository/home/faq";
import MutationForm from "@/ui/dashboard/mutationForm"
import { FAQ } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FAQFields } from "@/types/fields";

const CreateFAQs = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<FAQ | null>(null);

  const handleCreate = async (formData: FAQ) => {
    try {
      setIsLoading(true)
      const result = await CreateFAQ(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/faqs");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
      fields={FAQFields()}
      title="FAQ"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default CreateFAQs