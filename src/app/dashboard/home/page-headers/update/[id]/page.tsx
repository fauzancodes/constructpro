"use client"

import { UpdatePageHeader, GetPageHeaderById } from "@/lib/repository/home/pageHeader";
import MutationForm from "@/ui/dashboard/mutationForm"
import { PageHeader } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { PageHeaderFields } from "@/types/fields";

const UpdatePageHeaders = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<PageHeader | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetPageHeaderById(id);
        if (result.success) {
          if (result.datasets) {
            const pageHeaderData: PageHeader = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              code: result.datasets.code ?? undefined,
              image: result.datasets.image ?? undefined,
            };
            setSelectedData(pageHeaderData);
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

  const handleUpdate = async (formData: PageHeader) => {
    try {
      setIsLoading(true)
      const result = await UpdatePageHeader(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/page-headers");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={PageHeaderFields()}
      title="Page Header"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdatePageHeaders