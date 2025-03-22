"use client"

import { UpdateWorkValue, GetWorkValueById } from "@/lib/repository/about/workValue";
import MutationForm from "@/ui/dashboard/mutationForm"
import { WorkValue } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { WorkValueFields } from "@/types/fields";

const UpdateWorkValues = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<WorkValue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetWorkValueById(id);
        if (result.success) {
          if (result.datasets) {
            const workValueData: WorkValue = {
              id: result.datasets.id,
              description: result.datasets.description ?? undefined,
              subtitle1: result.datasets.subtitle1 ?? undefined,
              subtitle2: result.datasets.subtitle2 ?? undefined,
              subdescription1: result.datasets.subdescription1 ?? undefined,
              subdescription2: result.datasets.subdescription2 ?? undefined,
              callToAction1: result.datasets.callToAction1 ?? undefined,
              callToAction2: result.datasets.callToAction2 ?? undefined,
            };
            setSelectedData(workValueData);
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

  const handleUpdate = async (formData: WorkValue) => {
    try {
      setIsLoading(true)
      const result = await UpdateWorkValue(formData);
  
      if (result?.success) {
        router.push("/dashboard/about/work-values");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={WorkValueFields()}
      title="Nilai Kerja"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateWorkValues