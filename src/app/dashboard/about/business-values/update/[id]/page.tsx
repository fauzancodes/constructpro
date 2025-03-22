"use client"

import { UpdateBusinessValue, GetBusinessValueById } from "@/lib/repository/about/businessValue";
import MutationForm from "@/ui/dashboard/mutationForm"
import { BusinessValue } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BusinessValueFields } from "@/types/fields";

const UpdateBusinessValues = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<BusinessValue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetBusinessValueById(id);
        if (result.success) {
          if (result.datasets) {
            const businessValueData: BusinessValue = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              description: result.datasets.description ?? undefined,
              code: result.datasets.code ?? undefined,
              order: result.datasets.order ?? undefined,
            };
            setSelectedData(businessValueData);
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

  const handleUpdate = async (formData: BusinessValue) => {
    try {
      setIsLoading(true)
      const result = await UpdateBusinessValue(formData);
  
      if (result?.success) {
        router.push("/dashboard/about/business-values");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={BusinessValueFields()}
      title="Nilai Bisnis"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateBusinessValues