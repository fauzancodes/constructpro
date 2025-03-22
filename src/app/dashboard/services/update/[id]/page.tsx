"use client"

import { UpdateService, GetServiceById } from "@/lib/repository/service";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Service } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ServiceFields } from "@/types/fields";

const UpdateServices = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<Service | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetServiceById(id);
        if (result.success) {
          if (result.datasets) {
            const serviceData: Service = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              description: result.datasets.description ?? undefined,
              order: result.datasets.order ?? undefined,
              status: result.datasets.status ?? undefined,
              image: result.datasets.image ?? undefined,
            };
            setSelectedData(serviceData);
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

  const handleUpdate = async (formData: Service) => {
    try {
      setIsLoading(true)
      const result = await UpdateService(formData);
  
      if (result?.success) {
        router.push("/dashboard/services");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={ServiceFields()}
      title="Layanan"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateServices