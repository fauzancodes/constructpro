"use client"

import { CreateImageSlider } from "@/lib/repository/home/imageSlider";
import MutationForm from "@/ui/dashboard/mutationForm"
import { ImageSlider } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageSliderFields } from "@/types/fields";

const CreateImageSliders = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<ImageSlider | null>(null);

  const handleCreate = async (formData: ImageSlider) => {
    try {
      setIsLoading(true)
      const result = await CreateImageSlider(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/image-sliders");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
      fields={ImageSliderFields()}
      title="Image Slider"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default CreateImageSliders