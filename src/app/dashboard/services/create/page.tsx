"use client"

import { CreateService } from "@/lib/repository/service";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Service } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ServiceFields } from "@/types/fields";

const CreateServices = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<Service | null>(null);

  const handleCreate = async (formData: Service) => {
    try {
      setIsLoading(true)
      const result = await CreateService(formData);
  
      if (result?.success) {
        router.push("/dashboard/services");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
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

export default CreateServices