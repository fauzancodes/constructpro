"use client"

import { UpdateSectionHeader, GetSectionHeaderById } from "@/lib/repository/home/sectionHeader";
import MutationForm from "@/ui/dashboard/mutationForm"
import { SectionHeader } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { SectionHeaderFields } from "@/types/fields";

const UpdateSectionHeaders = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<SectionHeader | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetSectionHeaderById(id);
        if (result.success) {
          if (result.datasets) {
            const sectionHeaderData: SectionHeader = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              code: result.datasets.code ?? undefined,
            };
            setSelectedData(sectionHeaderData);
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

  const handleUpdate = async (formData: SectionHeader) => {
    try {
      setIsLoading(true)
      const result = await UpdateSectionHeader(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/section-headers");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={SectionHeaderFields()}
      title="Section Header"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateSectionHeaders