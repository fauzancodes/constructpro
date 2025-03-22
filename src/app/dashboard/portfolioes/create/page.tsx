"use client"

import { CreatePortfolio } from "@/lib/repository/portfolio";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Portfolio } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PortfolioFields } from "@/types/fields";
import { GetAllServices } from "@/lib/repository/service";

const CreatePortfolios = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<Portfolio | null>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllServices("", 0, 0, "title", "asc", "true");
        if (result) {
          setServices(result.data);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (formData: Portfolio) => {
    try {
      setIsLoading(true)
      const result = await CreatePortfolio(formData);
  
      if (result?.success) {
        router.push("/dashboard/portfolioes");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
      fields={PortfolioFields(services)}
      title="Portofolio"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
      multiImage
      smallImagePreview
    />
  )
}

export default CreatePortfolios