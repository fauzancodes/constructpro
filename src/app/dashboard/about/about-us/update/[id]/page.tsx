"use client"

import { UpdateAboutUs, GetAboutUsById } from "@/lib/repository/about/aboutUs";
import MutationForm from "@/ui/dashboard/mutationForm"
import { AboutUs } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { AboutUsFields } from "@/types/fields";

const UpdateAboutUss = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<AboutUs | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetAboutUsById(id);
        if (result.success) {
          if (result.datasets) {
            const aboutUsData: AboutUs = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              description: result.datasets.description ?? undefined,
              callToAction: result.datasets.callToAction ?? undefined,
              image1: result.datasets.image1 ?? undefined,
              image2: result.datasets.image2 ?? undefined,
              image3: result.datasets.image3 ?? undefined,
            };
            setSelectedData(aboutUsData);
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

  const handleUpdate = async (formData: AboutUs) => {
    try {
      setIsLoading(true)
      const result = await UpdateAboutUs(formData);
  
      if (result?.success) {
        router.push("/dashboard/about/about-us");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={AboutUsFields()}
      title="Tentang Kami"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
      multiImage
    />
  )
}

export default UpdateAboutUss