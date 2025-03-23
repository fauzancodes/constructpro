"use client"

import { CreateClient } from "@/lib/repository/client";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Client } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClientFields } from "@/types/fields";

const CreateClients = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<Client | null>(null);

  const handleCreate = async (formData: Client) => {
    try {
      setIsLoading(true)
      const result = await CreateClient(formData);
  
      if (result?.success) {
        router.push("/dashboard/clients");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
      fields={ClientFields()}
      title="Client"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default CreateClients