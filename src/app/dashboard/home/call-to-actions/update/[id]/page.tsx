"use client"

import { UpdateCallToAction, GetCallToActionById } from "@/lib/repository/home/callToAction";
import MutationForm from "@/ui/dashboard/mutationForm"
import { CallToAction } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CallToActionFields } from "@/types/fields";

const UpdateCallToActions = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<CallToAction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetCallToActionById(id);
        if (result.success) {
          if (result.datasets) {
            const callToActionData: CallToAction = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              description: result.datasets.description ?? undefined,
              callToAction1: result.datasets.callToAction1 ?? undefined,
              callToAction2: result.datasets.callToAction2 ?? undefined,
              image1: result.datasets.image1 ?? undefined,
              image2: result.datasets.image2 ?? undefined,
              image3: result.datasets.image3 ?? undefined,
              image4: result.datasets.image4 ?? undefined,
              image5: result.datasets.image5 ?? undefined,
              image6: result.datasets.image6 ?? undefined,
            };
            setSelectedData(callToActionData);
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

  const handleUpdate = async (formData: CallToAction) => {
    try {
      setIsLoading(true)
      const result = await UpdateCallToAction(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/call-to-actions");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={CallToActionFields()}
      title="Call To Action"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
      multiImage
    />
  )
}

export default UpdateCallToActions