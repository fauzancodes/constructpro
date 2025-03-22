"use client"

import { UpdatePortfolio, GetPortfolioById } from "@/lib/repository/portfolio";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Portfolio } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { PortfolioFields } from "@/types/fields";
import { GetAllServices } from "@/lib/repository/service";

const UpdatePortfolios = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetPortfolioById(id);
        if (result.success) {
          if (result.datasets) {
            const portfolioData: Portfolio = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              description: result.datasets.description ?? undefined,
              start: result.datasets.start ?? undefined,
              end: result.datasets.end ?? undefined,
              status: result.datasets.status ?? undefined,
              image1: result.datasets.image1 ?? undefined,
              image2: result.datasets.image2 ?? undefined,
              image3: result.datasets.image3 ?? undefined,
              image4: result.datasets.image4 ?? undefined,
              image5: result.datasets.image5 ?? undefined,
              image6: result.datasets.image6 ?? undefined,
              image7: result.datasets.image7 ?? undefined,
              image8: result.datasets.image8 ?? undefined,
              image9: result.datasets.image9 ?? undefined,
              image10: result.datasets.image10 ?? undefined,
              serviceId: result.datasets.serviceId ?? undefined,
              client: result.datasets.client ?? undefined,
              address: result.datasets.address ?? undefined,
              slug: result.datasets.slug ?? undefined,
            };
            setSelectedData(portfolioData);
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

  const handleUpdate = async (formData: Portfolio) => {
    try {
      setIsLoading(true)
      const result = await UpdatePortfolio(formData);
  
      if (result?.success) {
        router.push("/dashboard/portfolioes");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
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

export default UpdatePortfolios