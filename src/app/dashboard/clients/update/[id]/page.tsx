"use client"

import { UpdateClient, GetClientById } from "@/lib/repository/client";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Client } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ClientFields } from "@/types/fields";

const UpdateClients = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<Client | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetClientById(id);
        if (result.success) {
          if (result.datasets) {
            const clientData: Client = {
              id: result.datasets.id,
              name: result.datasets.name ?? undefined,
              order: result.datasets.order ?? undefined,
              image: result.datasets.image ?? undefined,
            };
            setSelectedData(clientData);
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

  const handleUpdate = async (formData: Client) => {
    try {
      setIsLoading(true)
      const result = await UpdateClient(formData);
  
      if (result?.success) {
        router.push("/dashboard/clients");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
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

export default UpdateClients