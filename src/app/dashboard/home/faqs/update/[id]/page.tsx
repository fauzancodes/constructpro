"use client"

import { UpdateFAQ, GetFAQById } from "@/lib/repository/home/faq";
import MutationForm from "@/ui/dashboard/mutationForm"
import { FAQ } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FAQFields } from "@/types/fields";

const UpdateFAQs = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<FAQ | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetFAQById(id);
        if (result.success) {
          if (result.datasets) {
            const faqData: FAQ = {
              id: result.datasets.id,
              question: result.datasets.question ?? undefined,
              order: result.datasets.order ?? undefined,
              answer: result.datasets.answer ?? undefined,
            };
            setSelectedData(faqData);
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

  const handleUpdate = async (formData: FAQ) => {
    try {
      setIsLoading(true)
      const result = await UpdateFAQ(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/faqs");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={FAQFields()}
      title="FAQ"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
    />
  )
}

export default UpdateFAQs